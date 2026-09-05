'use client';

import React from 'react';
import Link from 'next/link';

export default function InstitutionReportsPage() {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-status-success" />
          <span>INST-DEL-0842 // STATUTORY COMPLIANCE COMPOSER</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          Accreditation Report Builder &amp; Dossiers
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          Automated NAAC Criteria 5, NIRF Graduate Outcome, and AICTE Industry-Academia MoU audit dossiers with cryptographic SHA-256 seal.
        </p>
      </div>

      <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
            Accreditation Templates Ready for Export
          </span>
          <Link
            href="/institution/dashboard"
            className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-bold"
          >
            ← Open Report Builder Workspace
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
            <span className="font-label-mono text-xs px-2 py-0.5 bg-border-strong text-on-primary">NAAC</span>
            <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
              NAAC Criteria 5 Dossier
            </h3>
            <p className="font-body-sm text-xs text-fg-muted">
              Student support, placement logs, progression and higher education transition register.
            </p>
          </div>
          <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
            <span className="font-label-mono text-xs px-2 py-0.5 bg-bg-subtle text-fg-primary border border-border-hairline font-bold">NIRF</span>
            <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
              NIRF Metric 4.1 Ledger
            </h3>
            <p className="font-body-sm text-xs text-fg-muted">
              Median salary packages, corporate hiring density, and PhD transition tracking.
            </p>
          </div>
          <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
            <span className="font-label-mono text-xs px-2 py-0.5 bg-accent-signal text-fg-primary font-bold">AICTE</span>
            <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
              AICTE MoU &amp; Industrial Training
            </h3>
            <p className="font-body-sm text-xs text-fg-muted">
              Active enterprise covenants, industrial internship hours, and IP patent filing records.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border-hairline flex justify-end">
          <Link
            href="/institution/dashboard"
            className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
          >
            Configure &amp; Export Official PDF
          </Link>
        </div>
      </div>
    </div>
  );
}

