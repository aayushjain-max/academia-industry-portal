'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Overview // Topology', href: '/student/dashboard', icon: 'dashboard' },
    { label: 'Skill Gap Telemetry', href: '/student/skill-gaps', icon: 'tune' },
    { label: 'Applications (08)', href: '/student/applications', icon: 'work_history' },
    { label: 'Curriculum Tracks', href: '/student/learning/courses', icon: 'menu_book' },
    { label: 'Skill Passport Ledger', href: '/student/skill-passport', icon: 'token' },
    { label: 'Opportunity Matches', href: '/student/opportunities/jobs', icon: 'travel_explore' },
  ];

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Minimalist Swiss Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Student ID Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">NODE INSTANCE // CANDIDATE</span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase">Aarav Sharma</span>
                <span className="font-label-mono text-[10px] bg-accent-signal text-fg-primary px-1 py-0.5 border border-border-strong font-bold">LVL 12</span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block">
                IIT BOMBAY // CS-2025
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                AICTE TIER-01 ACCREDITED
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 font-mono text-xs">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-space-sm px-space-md py-2.5 transition-colors border-l-2 ${
                      isActive
                        ? 'bg-bg-subtle text-fg-primary border-accent-signal font-bold'
                        : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle/50 border-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Ledger Telemetry Footer */}
          <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
            <div className="flex justify-between">
              <span>PASSPORT:</span>
              <span className="text-fg-primary font-bold">SHA-256 SYNC</span>
            </div>
            <div className="flex justify-between">
              <span>COMPLIANCE:</span>
              <span className="text-status-success font-semibold">STANDARD 4.2</span>
            </div>
            <div className="flex justify-between">
              <span>PORTAL CORE:</span>
              <span className="text-fg-primary">NODE 01-STU</span>
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

