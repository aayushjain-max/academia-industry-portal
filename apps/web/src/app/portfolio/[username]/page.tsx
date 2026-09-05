import React from 'react';
import Link from 'next/link';

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary p-space-md lg:p-space-xl font-body-md">
      <div className="max-w-4xl mx-auto space-y-space-lg">
        <div className="border border-border-hairline bg-bg-surface p-space-lg space-y-space-md">
          <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-status-success" />
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-fg-muted font-bold">
                PUBLIC SCHOLAR PORTFOLIO // VERIFIED IDENTITY
              </span>
            </div>
            <span className="font-label-mono text-xs px-2 py-0.5 bg-[#FACC15] text-[#18181B] font-bold">
              SIH-2024 VETTED
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg font-extrabold text-fg-primary capitalize">
                {decodeURIComponent(username)}
              </h1>
              <span className="font-label-mono text-xs text-fg-muted block mt-0.5">
                AUTONOMOUS CREDENTIAL PASSPORT ID: #PASSPORT-{username.toUpperCase()}
              </span>
            </div>
            <Link
              href="/"
              className="px-3 py-1.5 border border-border-hairline font-label-mono text-xs text-fg-muted hover:text-fg-primary uppercase"
            >
              ← Portal Core
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-hairline">
            <div className="p-3 bg-bg-subtle border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">Verified Credentials</span>
              <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">14</div>
              <span className="text-xs text-status-success font-semibold">100% Attested</span>
            </div>
            <div className="p-3 bg-bg-subtle border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">Competency Score</span>
              <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">94.8%</div>
              <span className="text-xs text-fg-muted">Top 5th Percentile</span>
            </div>
            <div className="p-3 bg-bg-subtle border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">SIH Track</span>
              <div className="font-metric-tabular text-2xl font-bold text-fg-primary mt-1">Finalist</div>
              <span className="text-xs text-fg-muted">1st Runner Up (PS-094)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

