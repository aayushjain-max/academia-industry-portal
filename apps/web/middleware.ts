import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface JwtPayload {
  role?: string;
  user_role?: string;
  exp?: number;
  user_id?: string;
  email?: string;
}

async function verifyJwtSignature(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET_KEY || process.env.SECRET_KEY || process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    // If no secret configured in edge environment, fall back to structural/expiration checks
    return true;
  }
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, sigB64] = parts;
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const rawSig = Uint8Array.from(atob(sigB64.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    return await crypto.subtle.verify('HMAC', key, rawSig, data);
  } catch {
    return false;
  }
}

function extractPayloadFromToken(token?: string): JwtPayload | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload: JwtPayload = JSON.parse(jsonPayload);
      
      // Check expiration if present
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return null;
      }
      return payload;
    }
  } catch {
    // Parsing error
  }
  return null;
}

function sanitizeRedirectPath(path?: string | null): string {
  if (!path) return '/';
  if (path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')) {
    return path;
  }
  return '/';
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  let payload = extractPayloadFromToken(token);

  if (token && payload) {
    const isSigValid = await verifyJwtSignature(token);
    if (!isSigValid) {
      payload = null;
    }
  }
  const tokenRole = payload?.role || payload?.user_role || null;
  const activeRole = (tokenRole || '').toUpperCase().trim();
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password');

  const isProtectedRoute =
    pathname.startsWith('/student') ||
    pathname.startsWith('/industry') ||
    pathname.startsWith('/academician') ||
    pathname.startsWith('/institution') ||
    pathname.startsWith('/admin');

  // If visiting auth route while authenticated with valid token, redirect to appropriate dashboard
  if (isAuthRoute && token && activeRole) {
    let dashboardRoute = '/';
    if (activeRole === 'STUDENT') dashboardRoute = '/student/dashboard';
    else if (activeRole === 'INDUSTRY') dashboardRoute = '/industry/dashboard';
    else if (activeRole === 'INSTITUTION_ADMIN' || activeRole === 'INSTITUTION') dashboardRoute = '/institution/dashboard';
    else if (activeRole === 'ACADEMICIAN') dashboardRoute = '/academician/dashboard';
    else if (activeRole === 'SUPER_ADMIN' || activeRole === 'ADMIN') dashboardRoute = '/admin/dashboard';
    
    return NextResponse.redirect(new URL(dashboardRoute, request.url));
  }

  // If visiting protected route without valid token, redirect to login
  if (isProtectedRoute && (!token || !payload)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', sanitizeRedirectPath(pathname));
    const response = NextResponse.redirect(loginUrl);
    // Clear potentially stale invalid token cookies
    response.cookies.delete('access_token');
    return response;
  }

  // Enforce role-specific prefixes
  if (isProtectedRoute && activeRole) {
    const isSuperAdmin = activeRole === 'SUPER_ADMIN' || activeRole === 'ADMIN';

    if (pathname.startsWith('/student') && activeRole !== 'STUDENT' && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/industry') && activeRole !== 'INDUSTRY' && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/institution') && activeRole !== 'INSTITUTION_ADMIN' && activeRole !== 'INSTITUTION' && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/academician') && activeRole !== 'ACADEMICIAN' && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/admin') && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api).*)'],
};

