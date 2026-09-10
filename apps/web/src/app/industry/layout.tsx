'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Talent Command & Requisitions', href: '/industry/dashboard', icon: 'hub' },
    { label: 'AI JD Analyzer', href: '/industry/jd-analyzer', icon: 'psychology' },
    { label: 'Candidate Discovery', href: '/industry/candidates', icon: 'person_search' },
    { label: 'Academia Programs & MoUs', href: '/industry/collaborations', icon: 'layers' },
    { label: 'Live Projects & Sprints', href: '/industry/projects', icon: 'biotech' },
    { label: 'Mentorship Pods', href: '/industry/mentorship', icon: 'groups' },
  ];

  return (
    <div data-portal="industry" className="portal-industry min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Industry Node Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">NODE INSTANCE // INDUSTRY</span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase">TechNova Labs</span>
                <span className="font-label-mono text-[10px] bg-portal-primary text-portal-on-primary px-1.5 py-0.5 border border-border-strong font-bold">CORP TIER-1</span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block">
                AUTONOMOUS R&amp;D PARTNER
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                14 BILATERAL MoUs ACTIVE
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
              <span>ACTIVE REQUISITIONS:</span>
              <span className="text-fg-primary font-bold">18 ROLES</span>
            </div>
            <div className="flex justify-between">
              <span>VETTED CANDIDATES:</span>
              <span className="text-fg-primary font-bold">284 DOSSIERS</span>
            </div>
            <div className="flex justify-between">
              <span>R&amp;D GRANT COMMITTED:</span>
              <span className="text-status-success font-bold">₹1.85 CR</span>
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

