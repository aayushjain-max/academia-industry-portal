import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function extractRoleFromToken(token?: string): string | null {
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
      const payload = JSON.parse(jsonPayload);
      return payload.role || payload.user_role || null;
    }
  } catch {
    // Fallback if parsing fails
  }
  return null;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const userRoleCookie = request.cookies.get('user_role')?.value;
  const tokenRole = extractRoleFromToken(token);
  const activeRole = tokenRole || userRoleCookie;
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

  // If visiting auth route while authenticated, redirect to appropriate dashboard
  if (isAuthRoute && token && activeRole) {
    const role = activeRole.toLowerCase();
    const dashboardRoute =
      role === 'student'
        ? '/student/dashboard'
        : role === 'industry'
        ? '/industry/dashboard'
        : role === 'institution'
        ? '/institution/dashboard'
        : role === 'academician'
        ? '/academician/dashboard'
        : role === 'admin'
        ? '/admin/dashboard'
        : '/';
    return NextResponse.redirect(new URL(dashboardRoute, request.url));
  }

  // If visiting protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Enforce role-specific prefixes
  if (isProtectedRoute && activeRole) {
    const role = activeRole.toUpperCase();
    if (pathname.startsWith('/student') && role !== 'STUDENT' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/industry') && role !== 'INDUSTRY' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/institution') && role !== 'INSTITUTION' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/academician') && role !== 'ACADEMICIAN' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api).*)'],
};

