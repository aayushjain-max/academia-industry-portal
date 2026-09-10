'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Accreditation Analytics', href: '/institution/dashboard', icon: 'analytics' },
    { label: 'Governance & Verification', href: '/institution/governance', icon: 'verified' },
    { label: 'Cohort Skill Heatmap', href: '/institution/heatmap', icon: 'grid_view' },
    { label: 'Placement Funnel', href: '/institution/placement-analytics', icon: 'filter_alt' },
    { label: 'Accreditation Reports', href: '/institution/reports', icon: 'article' },
    { label: 'Students & Passports', href: '/institution/students', icon: 'school' },
  ];

  return (
    <div data-portal="institution" className="portal-institution min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Institution Node Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">NODE INSTANCE // INSTITUTION</span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase">IIT Bombay</span>
                <span className="font-label-mono text-[10px] bg-portal-primary text-portal-on-primary px-1.5 py-0.5 border border-border-strong font-bold">NAAC A++</span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block">
                INST-DEL-0842 // NIRF #03
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                AUTONOMOUS ACCREDITED
              </span>
            </div>

            <nav className="space-y-1 font-mono text-xs">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-space-sm px-space-md py-2.5 transition-colors border-l-2 ${
                      isActive
                        ? 'bg-portal-primary-soft/40 text-fg-primary border-portal-primary font-bold shadow-[inset_2px_0px_0px_0px_var(--portal-primary)]'
                        : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle/50 border-transparent'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-portal-primary' : ''}`}>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
            <div className="flex justify-between">
              <span>ACTIVE COHORT:</span>
              <span className="text-fg-primary font-bold">12,480</span>
            </div>
            <div className="flex justify-between">
              <span>AUDIT CYCLE:</span>
              <span className="text-fg-primary font-bold">2024-Q3</span>
            </div>
            <div className="flex justify-between">
              <span>AICTE COMPLIANCE:</span>
              <span className="text-status-success font-bold">VERIFIED</span>
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

