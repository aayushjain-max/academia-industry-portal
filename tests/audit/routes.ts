export interface AuditRoute {
  path: string;
  name: string;
  expectedHeadingRegex?: RegExp;
  minWordCount?: number;
}

export const AUDIT_ROUTES: AuditRoute[] = [
  { path: '/', name: 'Landing Page' },
  { path: '/about', name: 'About Page' },
  { path: '/ecosystem', name: 'Ecosystem Page' },
  { path: '/how-it-works', name: 'How It Works Page' },
  { path: '/contact', name: 'Contact Page' },
  { path: '/privacy', name: 'Privacy Policy Page' },
  { path: '/login', name: 'Login Page' },
  { path: '/register', name: 'Registration Page' },
  { path: '/forgot-password', name: 'Forgot Password Page' },
];
