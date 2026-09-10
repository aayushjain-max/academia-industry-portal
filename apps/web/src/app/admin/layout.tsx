'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Icon } from '@/components/ui/icon';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Apex Command // Overview', href: '/admin/dashboard', icon: 'dashboard' },
    { label: 'User Directory & Roles', href: '/admin/users', icon: 'manage_accounts' },
    { label: 'Institutions Registry', href: '/admin/institutions', icon: 'account_balance' },
    { label: 'Industry Partners', href: '/admin/industries', icon: 'business' },
    { label: 'Faculty & Researchers', href: '/admin/academicians', icon: 'school' },
    { label: 'Student Candidates', href: '/admin/students', icon: 'group' },
    { label: 'Opportunity Requisitions', href: '/admin/opportunities', icon: 'work' },
    { label: 'Statutory Reports', href: '/admin/reports', icon: 'assessment' },
    { label: 'Skill Taxonomy Matrix', href: '/admin/skills', icon: 'psychology' },
    { label: 'Audit Logs & Moderation', href: '/admin/audit-logs', icon: 'security' },
    { label: 'Sovereign Verification', href: '/admin/verification', icon: 'verified_user' },
  ];

  return (
    <div data-portal="admin" className="portal-admin min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Admin Node Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">
                NODE INSTANCE // APEX ADMIN
              </span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase truncate max-w-[140px]">
                  Apex Command
                </span>
                <span className="font-label-mono text-[10px] bg-portal-primary text-portal-on-primary px-1.5 py-0.5 border border-border-strong font-bold">
                  ROOT
                </span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block truncate">
                AICTE // MINISTRY AUDIT
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                SOVEREIGN NODE ONLINE
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-0.5 font-mono text-xs max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-space-sm px-space-sm py-2 transition-colors border-l-2 ${
                      isActive
                        ? 'bg-portal-primary-soft/40 text-fg-primary border-portal-primary font-bold shadow-[inset_2px_0px_0px_0px_var(--portal-primary)]'
                        : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle/50 border-transparent'
                    }`}
                  >
                    <span className={isActive ? 'text-portal-primary' : ''}>
                      <Icon name={link.icon} size={16} />
                    </span>
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Telemetry Footer */}
          <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
            <div className="flex justify-between">
              <span>NODES ONLINE:</span>
              <span className="text-fg-primary font-bold">854 NODES</span>
            </div>
            <div className="flex justify-between">
              <span>SECURITY TIER:</span>
              <span className="text-status-success font-semibold">APEX-LEVEL 0</span>
            </div>
            <div className="flex justify-between">
              <span>LEDGER INTEGRITY:</span>
              <span className="text-status-success font-bold">100% VALIDATED</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-space-md md:p-space-lg lg:p-space-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
