'use client';

import React from 'react';
import Link from 'next/link';

export default function PlacementAnalyticsPage() {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-status-success" />
          <span>INST-DEL-0842 // CAMPUS PLACEMENT CONVERSION TELEMETRY</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          Campus Recruitment Funnel &amp; Employer Allocation
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          End-to-end recruitment conversion pipeline across 1,200 qualifying engineering scholars and 48 corporate partners.
        </p>
      </div>

      <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
            7-Stage Conversion Pipeline
          </span>
          <Link
            href="/institution/dashboard"
            className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-bold"
          >
            ← Back to All Analytics
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-bg-subtle border border-border-hairline">
            <span className="font-label-mono text-xs text-fg-muted uppercase">Registered</span>
            <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">1,200</div>
            <span className="text-xs text-fg-muted">100% Cohort</span>
          </div>
          <div className="p-4 bg-bg-subtle border border-border-hairline">
            <span className="font-label-mono text-xs text-fg-muted uppercase">Screened</span>
            <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">1,080</div>
            <span className="text-xs text-fg-muted">90% Verified</span>
          </div>
          <div className="p-4 bg-bg-subtle border border-border-hairline">
            <span className="font-label-mono text-xs text-fg-muted uppercase">Shortlisted</span>
            <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">720</div>
            <span className="text-xs text-fg-muted">60% Qualified</span>
          </div>
          <div className="p-4 bg-bg-subtle border border-border-hairline">
            <span className="font-label-mono text-xs text-fg-muted uppercase">Offers Extended</span>
            <div className="font-metric-tabular text-2xl font-bold text-status-success mt-1">185</div>
            <span className="text-xs text-status-success font-semibold">15.4% Minted</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border-hairline flex justify-end">
          <Link
            href="/institution/dashboard"
            className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
          >
            Open Complete Interactive Funnel
          </Link>
        </div>
      </div>
    </div>
  );
}
