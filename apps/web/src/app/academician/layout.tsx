'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';

export default function AcademicianLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Faculty Portfolio Hub', href: '/academician/dashboard', icon: 'badge' },
    { label: 'R&D Collaboration Pods', href: '/academician/research', icon: 'biotech' },
    { label: 'Grant & Opportunity Docket', href: '/academician/opportunities', icon: 'request_quote' },
    { label: 'Patents & Publications', href: '/academician/profile', icon: 'menu_book' },
  ];

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Faculty Node Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">NODE INSTANCE // ACADEMICIAN</span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase">Dr. V. Ramanathan</span>
                <span className="font-label-mono text-[10px] bg-accent-signal text-fg-primary px-1 py-0.5 border border-border-strong font-bold">H-28</span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block">
                PROFESSOR &amp; HOD // IIT BOMBAY
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                VERIFIED TENURE (19 YRS)
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

          <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
            <div className="flex justify-between">
              <span>ACTIVE GRANTS:</span>
              <span className="text-fg-primary font-bold">₹1.85 CR</span>
            </div>
            <div className="flex justify-between">
              <span>CITATIONS:</span>
              <span className="text-fg-primary font-bold">3,420+</span>
            </div>
            <div className="flex justify-between">
              <span>PORTAL CORE:</span>
              <span className="text-fg-primary">NODE 02-FAC</span>
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

