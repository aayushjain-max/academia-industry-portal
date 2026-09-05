'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function AcademicianConsultancyPage() {
  const contracts = [
    {
      id: 'CONS-TECHNOVA-2024-02',
      client: 'TechNova Labs (Bengaluru Autonomous Systems)',
      project: 'Distributed Consensus & Fault-Tolerant Microservices Audit',
      value: '?32.0 Lakhs',
      duration: '12 Months (2024-2025)',
      status: 'ACTIVE CONSULTANCY',
      statusVariant: 'signal' as const,
      deliverables: 'Architecture blueprint, code review of Raft consensus modules, quarterly security audit.',
      hoursBilled: '140 / 250 Hours',
    },
    {
      id: 'CONS-TATAMOTORS-881',
      client: 'Tata Motors EV Systems Division',
      project: 'Battery Health AI Model Validation & Calibration',
      value: '?45.0 Lakhs',
      duration: '18 Months',
      status: 'MILESTONE 03 IN REVIEW',
      statusVariant: 'warning' as const,
      deliverables: 'Telemetry algorithm verification, hardware-in-the-loop (HIL) lab test protocols.',
      hoursBilled: '210 / 300 Hours',
    },
  ];

  return (
    <NodePageShell
      nodeId="FAC-8043 // ACADEMICIAN"
      nodeStatus="INSTITUTIONALLY SANCTIONED"
      category="INDUSTRIAL CONSULTANCY & CORPORATE R&D CONTRACTS"
      title="Industrial Consultancy & Corporate MoUs"
      description="Registry of institutional consultancy dockets, corporate advisory agreements, and revenue-generating bilateral MoUs sanctioned under IIT Bombay consultancy norms."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="upload" size={14} className="mr-1" />
          Register New Corporate Contract
        </Button>
      }
      kpis={[
        { label: 'Active Retainers', value: '03', delta: '?77.0 L VALUE', deltaType: 'success', subtext: 'Corporate Direct Billing', icon: 'token' },
        { label: 'Institutional Share', value: '30%', delta: 'COMPLIANT', deltaType: 'neutral', subtext: 'IITB Dean R&D Norms', icon: 'verified' },
        { label: 'Hours Delivered', value: '350 HRS', delta: 'ON SCHEDULE', deltaType: 'success', subtext: 'Audit Log Synchronized', icon: 'clock' },
        { label: 'Patents Emerging', value: '02', delta: 'JOINT IP', deltaType: 'neutral', subtext: 'Royalty Entitlement Active', icon: 'badge' },
      ]}
    >
      <div className="space-y-space-sm">
        {contracts.map((c) => (
          <Card key={c.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={c.statusVariant}>{c.status}</Badge>
                  <span className="font-mono text-fg-muted">{c.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{c.client}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {c.project}
                </h2>

                <p className="text-body-sm text-fg-muted">
                  Scope: {c.deliverables}
                </p>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>CONTRACT VALUE: <strong className="text-status-success font-bold font-metric-tabular">{c.value}</strong></span>
                  <span>DURATION: <strong className="text-fg-primary">{c.duration}</strong></span>
                  <span>DELIVERED: <strong className="text-fg-primary">{c.hoursBilled}</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Submit Milestone Invoice</Button>
                <Button variant="outline" size="sm">Download Sanction Letter</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
