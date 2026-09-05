'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumbs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const segmentLabels: Record<string, string> = {
    student: 'STUDENT NODE',
    academician: 'ACADEMICIAN NODE',
    industry: 'INDUSTRY NODE',
    institution: 'INSTITUTION NODE',
    admin: 'APEX GOVERNANCE',
    dashboard: 'TOPOLOGY',
    'skill-passport': 'PASSPORT LEDGER',
    'skill-gaps': 'GAP TELEMETRY',
    learning: 'PEDAGOGY',
    courses: 'CURRICULUM TRACKS',
    opportunities: 'OPPORTUNITY MATCHES',
    jobs: 'CORE REQUISITIONS',
    internships: 'INTERNSHIP DOCKET',
    projects: 'MICRO-SPRINTS',
    research: 'R&D PODS',
    profile: 'PORTFOLIO & PATENTS',
    mentorship: 'MENTORSHIP PODS',
    consultancy: 'CONSULTANCY MoUs',
    governance: 'ACCREDITATION',
    heatmap: 'COHORT HEATMAP',
    'placement-analytics': 'PLACEMENT FUNNEL',
    reports: 'AUDIT REPORTS',
    students: 'STUDENTS & CREDENTIALS',
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 font-label-mono text-[11px] text-fg-muted uppercase tracking-wider py-1 select-none overflow-x-auto ${className}`}
    >
      <Link href="/" className="hover:text-fg-primary transition-colors whitespace-nowrap">
        ECOSYSTEM
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const label = segmentLabels[segment] || segment.replace(/-/g, ' ').toUpperCase();

        return (
          <React.Fragment key={href}>
            <span className="text-border-hairline select-none font-bold">//</span>
            {isLast ? (
              <span className="text-fg-primary font-bold whitespace-nowrap" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-fg-primary transition-colors whitespace-nowrap">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
