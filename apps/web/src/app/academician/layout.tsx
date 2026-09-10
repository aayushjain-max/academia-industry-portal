'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { getMyAcademicianProfile, getAcademicianDashboardStats, AcademicianProfile } from '@/features/academicians/api';
import { Icon } from '@/components/ui/icon';

export default function AcademicianLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<AcademicianProfile | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, statsData] = await Promise.allSettled([
          getMyAcademicianProfile(),
          getAcademicianDashboardStats(),
        ]);
        if (profData.status === 'fulfilled') setProfile(profData.value);
        if (statsData.status === 'fulfilled') setStats(statsData.value);
      } catch (err) {
        console.error('Failed to load academician sidebar info', err);
      }
    }
    loadData();
  }, []);

  const links = [
    { label: 'Faculty Portfolio Hub', href: '/academician/dashboard', icon: 'dashboard' },
    { label: 'Students & Employability', href: '/academician/students', icon: 'school' },
    { label: 'R&D Collaboration Pods', href: '/academician/research', icon: 'biotech' },
    { label: 'Patents & Publications', href: '/academician/profile', icon: 'menu_book' },
    { label: 'Grant & Opportunity Docket', href: '/academician/opportunities', icon: 'request_quote' },
    { label: 'Applications Tracking', href: '/academician/applications', icon: 'assignment' },
    { label: 'Industry Collaborations', href: '/academician/collaborations', icon: 'hub' },
    { label: 'Industrial Consultancy', href: '/academician/consultancy', icon: 'business_center' },
    { label: 'Faculty Internships', href: '/academician/faculty-internships', icon: 'badge' },
    { label: 'Faculty Development (FDP)', href: '/academician/fdp', icon: 'psychology' },
    { label: 'Industrial Training', href: '/academician/industrial-training', icon: 'engineering' },
    { label: 'Workshops & Seminars', href: '/academician/workshops', icon: 'co_present' },
    { label: 'Research Mentorship', href: '/academician/mentorship', icon: 'groups' },
    { label: 'Portal Settings', href: '/academician/settings', icon: 'settings' },
  ];

  return (
    <div data-portal="academician" className="portal-academician min-h-screen bg-bg-canvas text-fg-primary flex flex-col font-body-md">
      <Navbar />

      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border-strong bg-bg-surface p-space-md shrink-0">
          <div className="space-y-space-md">
            {/* Faculty Node Badge */}
            <div className="p-space-sm border border-border-strong bg-bg-canvas space-y-1">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">
                NODE // ACADEMICIAN
              </span>
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-body-md font-bold text-fg-primary uppercase truncate max-w-[140px]">
                  {profile ? `${profile.first_name} ${profile.last_name}`.trim() || profile.email : 'Authenticated Faculty'}
                </span>
                <span className="font-label-mono text-[10px] bg-portal-primary text-portal-on-primary px-1.5 py-0.5 border border-border-strong font-bold">
                  H-{stats?.h_index ?? 0}
                </span>
              </div>
              <span className="font-label-mono text-[11px] text-fg-secondary block truncate">
                {profile?.designation || 'Faculty Member'} // {profile?.department || 'Department'}
              </span>
              <span className="font-label-mono text-[9px] text-status-success flex items-center gap-1 pt-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                {profile?.is_verified ? 'VERIFIED TENURE' : 'TENURED NODE'} ({profile?.experience_years ?? 0} YRS)
              </span>
            </div>

            <nav className="space-y-0.5 font-mono text-xs max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
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

          <div className="border border-border-hairline p-space-sm bg-bg-subtle/60 font-label-mono text-[10px] space-y-1 text-fg-muted">
            <div className="flex justify-between">
              <span>ACTIVE GRANTS:</span>
              <span className="text-fg-primary font-bold">
                {stats ? `₹${(stats.approved_grant_funds / 100000).toFixed(1)} L` : '₹0.0 L'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CITATIONS:</span>
              <span className="text-fg-primary font-bold">{stats?.total_citations ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span>PUBLICATIONS:</span>
              <span className="text-fg-primary font-bold">{stats?.total_publications ?? 0}</span>
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
