'use client';

import React from 'react';
import Link from 'next/link';

export default function IndustryProjectsPage() {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-portal-primary" />
          <span>IND-SPRINT-2024 // CORPORATE SPONSORED CHALLENGES</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          Live Industry Challenges &amp; Micro-Grants
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          Active problem statements released to student teams with sponsored hardware kits, cloud vouchers, and pre-placement offer fast-tracks.
        </p>
      </div>

      <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
            Active Challenges (08)
          </span>
          <Link
            href="/industry/collaborations"
            className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-bold"
          >
            ← View All Programs &amp; Labs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-bg-canvas border border-border-hairline space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-xs px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold">
                SIH PROBLEM #PS-094
              </span>
              <span className="font-label-mono text-xs text-status-success font-bold">GRANT: ₹5L</span>
            </div>
            <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
              FPGA-Accelerated Telemetry Demodulation Pipeline
            </h3>
            <p className="font-body-sm text-xs text-fg-muted">
              Design a low-power demodulator handling high-rate L-band telemetry with zero dropped packets under simulated RF noise.
            </p>
            <div className="pt-2 border-t border-border-hairline flex justify-between items-center text-xs font-label-mono">
              <span className="text-fg-secondary">18 Student Submissions</span>
              <span className="text-status-warning font-semibold">Evaluation in Progress</span>
            </div>
          </div>

          <div className="p-4 bg-bg-canvas border border-border-hairline space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-xs px-2 py-0.5 bg-primary text-on-primary font-bold">
                SIH PROBLEM #PS-112
              </span>
              <span className="font-label-mono text-xs text-status-success font-bold">GRANT: ₹8L</span>
            </div>
            <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
              Distributed Byzantine Fault-Tolerant Consensus for Edge IoT
            </h3>
            <p className="font-body-sm text-xs text-fg-muted">
              Implement BFT consensus engine resilient to up to 33% malicious nodes with sub-20ms latency across 500 edge nodes.
            </p>
            <div className="pt-2 border-t border-border-hairline flex justify-between items-center text-xs font-label-mono">
              <span className="text-fg-secondary">24 Student Submissions</span>
              <span className="text-status-success font-semibold">Shortlisting Finalists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

