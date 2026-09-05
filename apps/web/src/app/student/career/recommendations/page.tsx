'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card, DataProgress } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function CareerRecommendationsPage() {
  const careers = [
    {
      role: 'Distributed Systems & Cloud Platform Engineer',
      match: 92,
      medianPackage: '?18.5 LPA',
      growthRate: '+34% YoY National Demand',
      alignment: 'High Compatibility with Python + PostgreSQL + Async Systems',
      topRecruiters: ['TechNova Labs', 'TCS Research', 'Microsoft India', 'PhonePe'],
      criticalGaps: ['Docker / K8s Clustering', 'Kafka Event Streaming'],
    },
    {
      role: 'Site Reliability & Infrastructure Orchestrator (SRE)',
      match: 78,
      medianPackage: '?16.8 LPA',
      growthRate: '+28% YoY National Demand',
      alignment: 'Moderate Compatibility; Requires Linux Kernel & eBPF Depth',
      topRecruiters: ['Razorpay', 'CRED', 'Swiggy', 'Flipkart'],
      criticalGaps: ['Kubernetes Helm Charts', 'Prometheus / Grafana Telemetry'],
    },
    {
      role: 'FinTech Algorithmic Backend Engineer',
      match: 86,
      medianPackage: '?22.0 LPA',
      growthRate: '+42% YoY National Demand',
      alignment: 'High Compatibility with Low-Latency SQL Query Optimization',
      topRecruiters: ['Barclays', 'Goldman Sachs', 'Morgan Stanley'],
      criticalGaps: ['High-Concurrency C++20 / Rust', 'gRPC Protocol Buffers'],
    },
  ];

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="CAREER FORECAST COMPILED"
      category="PREDICTIVE CAREER ARCHITECTURE"
      title="Algorithmic Career Recommendations"
      description="Multi-factor career pathways computed from real-time macro hiring trends, institutional placement logs, and your verified skill passport telemetry."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="tune" size={14} className="mr-1" />
          Update Target CTC & Industry Preferences
        </Button>
      }
      kpis={[
        { label: 'Prime Career Track', value: 'DISTRIBUTED INFRA', delta: '92% MATCH', deltaType: 'success', subtext: 'Based on Python/PostgreSQL', icon: 'hub' },
        { label: 'Target CTC Projection', value: '?18.5 LPA', delta: 'MEDIAN', deltaType: 'neutral', subtext: 'Top Tier 1 Range', icon: 'token' },
        { label: 'Deficits to Top Bracket', value: '02 MODULES', delta: 'REMEDIABLE', deltaType: 'warning', subtext: 'Docker & Kubernetes', icon: 'warning' },
        { label: 'Enterprise Demand Index', value: '96.8 / 100', delta: 'PEAK DEMAND', deltaType: 'success', subtext: 'Q4 Recruitment Season', icon: 'analytics' },
      ]}
    >
      <div className="space-y-space-sm">
        {careers.map((c) => (
          <Card key={c.role} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <span className="px-2 py-0.5 bg-accent-signal text-fg-primary font-bold border border-border-strong text-[11px]">
                    {c.match}% PROFILE ALIGNMENT
                  </span>
                  <span className="text-status-success font-semibold">{c.growthRate}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {c.role}
                </h2>

                <p className="text-body-sm text-fg-muted font-sans">
                  {c.alignment}
                </p>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>MEDIAN REVENUE: <strong className="text-status-success font-bold font-metric-tabular">{c.medianPackage}</strong></span>
                  <span>HIRING PARTNERS: <strong className="text-fg-primary">{c.topRecruiters.join(', ')}</strong></span>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1 font-label-mono text-[11px]">
                  <span className="text-status-danger font-semibold">TARGET REMEDIATION DEFICITS:</span>
                  {c.criticalGaps.map((g) => (
                    <span key={g} className="px-1.5 py-0.5 bg-red-50 text-status-danger border border-status-danger/30 font-semibold">
                      ! {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Launch Gap Remediation Sprint</Button>
                <Button variant="outline" size="sm">Inspect Requisition Dockets</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
