'use client';

import React from 'react';
import Link from 'next/link';

export default function IndustryCandidatesPage() {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-status-success" />
          <span>IND-TALENT-2024 // VETTED CANDIDATE CLEARINGHOUSE</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          Vetted Candidate Talent Pool &amp; Passports
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          284 Pre-screened collegiate engineering candidates with verifiable credentials, SIH track awards, and live GitHub commit portfolios.
        </p>
      </div>

      <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
            Featured Finalists
          </span>
          <Link
            href="/industry/dashboard"
            className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-bold"
          >
            ← Open Pipeline Stepper
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-bg-canvas border border-border-hairline space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-headline-sm text-body-lg font-bold text-fg-primary">Aarav Sharma</span>
                <span className="font-label-mono text-xs text-fg-muted block">IIT BOMBAY // B.TECH CS (9.32 CGPA)</span>
              </div>
              <span className="px-2 py-0.5 bg-portal-primary text-portal-on-primary font-label-mono text-xs font-bold">
                98.4% MATCH
              </span>
            </div>
            <p className="font-body-sm text-xs text-fg-secondary">
              Specialization: Distributed Systems, Async Python, Golang, Kubernetes CRDs, Apache Kafka.
            </p>
            <div className="pt-2 border-t border-border-hairline flex justify-between items-center text-xs">
              <span className="text-status-success font-semibold">✓ Technical Round Cleared</span>
              <Link href="/industry/dashboard" className="text-fg-primary underline font-bold">
                Interview Panel →
              </Link>
            </div>
          </div>

          <div className="p-4 bg-bg-canvas border border-border-hairline space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-headline-sm text-body-lg font-bold text-fg-primary">Priya Venkatesh</span>
                <span className="font-label-mono text-xs text-fg-muted block">IIIT HYDERABAD // AEROSPACE (9.18 CGPA)</span>
              </div>
              <span className="px-2 py-0.5 bg-portal-primary text-portal-on-primary font-label-mono text-xs font-bold">
                94.2% MATCH
              </span>
            </div>
            <p className="font-body-sm text-xs text-fg-secondary">
              Specialization: Embedded C++20, Rust, RTOS, FPGA Verilog, Satellite Telemetry Processing.
            </p>
            <div className="pt-2 border-t border-border-hairline flex justify-between items-center text-xs">
              <span className="text-portal-primary font-semibold">★ Offer Extended Stage</span>
              <Link href="/industry/dashboard" className="text-fg-primary underline font-bold">
                Review Dossier →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

