'use client';
// Unauthorized Page
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@portal/ui';

export default function UnauthorizedPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const roleCookie = cookies.find((c) => c.trim().startsWith('user_role='));
    if (roleCookie) {
      setRole(roleCookie.split('=')[1]?.trim()?.toLowerCase() || null);
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setRole(parsed.role?.toLowerCase() || null);
        } catch {}
      }
    }
  }, []);

  const getDashboardRoute = () => {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'industry':
        return '/industry/dashboard';
      case 'institution':
        return '/institution/dashboard';
      case 'academician':
        return '/academician/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <main className="min-h-[screen] flex items-center justify-center p-space-md bg-bg-canvas">
      <div className="max-w-xl w-full border border-border-strong bg-bg-surface p-space-xl space-y-space-lg shadow-[4px_4px_0px_0px_#18181B]">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-status-danger inline-block" />
            <span className="font-label-mono text-xs uppercase font-bold tracking-wider text-status-danger">
              SECURITY PROTOCOL // ACCESS RESTRICTED
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-fg-muted">STATUS CODE: 403 FORBIDDEN</span>
        </div>

        <div className="space-y-space-sm">
          <h1 className="font-headline-lg font-bold text-fg-primary uppercase tracking-tight">
            Unauthorized Node Clearance
          </h1>
          <p className="font-body-md text-fg-secondary leading-relaxed">
            Your current security credentials and role classification do not grant cryptographic permission
            to access the requested subsystem endpoint.
          </p>
        </div>

        <div className="p-space-md border border-border-hairline bg-bg-subtle/50 font-label-mono text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-fg-muted">USER IDENTITY ROLE:</span>
            <span className="text-fg-primary font-bold uppercase">{role || 'UNAUTHENTICATED'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-muted">AUDIT LEDGER DISPATCH:</span>
            <span className="text-fg-primary font-bold">LOGGED & VERIFIED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-muted">SECURITY POLICY:</span>
            <span className="text-fg-primary">RBAC ENFORCEMENT LEVEL 01</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs border-t border-border-hairline">
          <Link href={getDashboardRoute()} className="w-full sm:w-auto">
            <Button variant="signal" size="md" fullWidth>
              Return to Authorized Dashboard
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="md" fullWidth>
              Switch Role / Re-authenticate
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}