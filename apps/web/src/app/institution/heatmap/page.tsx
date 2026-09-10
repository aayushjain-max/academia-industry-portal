'use client';

import React from 'react';
import Link from 'next/link';

export default function InstitutionHeatmapPage() {
  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-portal-primary" />
          <span>INST-DEL-0842 // AICTE MODEL CURRICULUM AUDIT</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          Live Cohort Skill Heatmap &amp; Enterprise Gap Telemetry
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          Direct comparative vector analysis between collegiate training syllabi and live industry hiring benchmarks.
        </p>
      </div>

      <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-lg">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
            Curricular Competency Alignment Matrix
          </span>
          <Link
            href="/institution/dashboard"
            className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-bold"
          >
            ← Back to All Analytics
          </Link>
        </div>

        {/* Heatmap Grid Items */}
        <div className="space-y-4">
          <div className="p-3 bg-portal-primary-soft/30 border-l-4 border-portal-primary space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-body-md font-bold text-fg-primary">
                Container Orchestration &amp; Cloud Native (Kubernetes, Docker, Helm)
              </span>
              <span className="font-label-mono text-xs px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold">
                -47% DEFICIT
              </span>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-fg-muted">Supply: 42%</span>
              <div className="col-span-10 bg-white h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-border-strong h-full" style={{ width: '42%' }} />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-portal-primary font-bold">Demand: 89%</span>
              <div className="col-span-10 bg-white h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-portal-primary h-full" style={{ width: '89%' }} />
              </div>
            </div>
            <p className="text-xs text-fg-muted">
              Prescription: Launch 4-credit Cloud-Native Computing elective aligned with Linux Foundation curriculum.
            </p>
          </div>

          <div className="p-3 bg-bg-surface border border-border-hairline space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-body-md font-bold text-fg-primary">
                Distributed High-Throughput Pipelines (Kafka, Redis, gRPC)
              </span>
              <span className="font-label-mono text-xs px-2 py-0.5 bg-status-warning/20 text-status-warning font-bold">
                -18% DEFICIT
              </span>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-fg-muted">Supply: 64%</span>
              <div className="col-span-10 bg-bg-subtle h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-border-strong h-full" style={{ width: '64%' }} />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-portal-primary font-bold">Demand: 82%</span>
              <div className="col-span-10 bg-bg-subtle h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-portal-primary h-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-bg-surface border border-border-hairline space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-body-md font-bold text-fg-primary">
                Python, AsyncIO &amp; Algorithmic Problem Solving
              </span>
              <span className="font-label-mono text-xs px-2 py-0.5 bg-status-success/20 text-status-success font-bold">
                OPTIMAL (-8%)
              </span>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-fg-muted">Supply: 88%</span>
              <div className="col-span-10 bg-bg-subtle h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-border-strong h-full" style={{ width: '88%' }} />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-xs">
              <span className="col-span-2 text-portal-primary font-bold">Demand: 96%</span>
              <div className="col-span-10 bg-bg-subtle h-2.5 overflow-hidden border border-border-hairline">
                <div className="bg-portal-primary h-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

