'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function IndustryJobsPage() {
  const requisitions = [
    {
      id: 'REQ-TECHNOVA-001',
      title: 'Senior Distributed Backend Engineer (Golang/Python)',
      department: 'Autonomous Infrastructure Pod',
      location: 'Bengaluru Campus',
      openings: 4,
      applicants: 142,
      topMatches: 18,
      status: 'ACTIVE SOURCING',
      statusVariant: 'signal' as const,
      salaryRange: '?18.0 - ?24.0 LPA',
      skills: ['Golang', 'Python', 'Kafka', 'PostgreSQL', 'Docker'],
    },
    {
      id: 'REQ-TECHNOVA-002',
      title: 'Edge AI & Embedded Firmware Telemetry Lead',
      department: 'Robotics Core Hardware',
      location: 'Pune Facility',
      openings: 2,
      applicants: 68,
      topMatches: 9,
      status: 'INTERVIEWS LIVE',
      statusVariant: 'warning' as const,
      salaryRange: '?22.0 - ?28.0 LPA',
      skills: ['C++20', 'RTOS', 'CAN Bus', 'LiDAR SLAM'],
    },
    {
      id: 'REQ-TECHNOVA-003',
      title: 'Cloud Infrastructure & Kubernetes Platform Architect',
      department: 'DevOps & SRE Group',
      location: 'Hyderabad Campus (Hybrid)',
      openings: 3,
      applicants: 94,
      topMatches: 12,
      status: 'OFFER ROLLOUT',
      statusVariant: 'success' as const,
      salaryRange: '?20.0 - ?26.0 LPA',
      skills: ['Kubernetes', 'Helm', 'Terraform', 'Prometheus'],
    },
  ];

  return (
    <NodePageShell
      nodeId="IND-8044 // ENTERPRISE"
      nodeStatus="AICTE TIER-1 RECRUITER"
      category="TALENT SOURCING & AUTOMATED CANDIDATE MATCHING"
      title="Talent Requisitions & Live Openings"
      description="Centrally manage corporate requisitions, inspect algorithmic candidate compatibility scores, and trigger automated proctored technical interview chambers."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="upload" size={14} className="mr-1" />
          Create New Requisition Docket
        </Button>
      }
      kpis={[
        { label: 'Active Requisitions', value: '18 ROLES', delta: '+3 THIS MONTH', deltaType: 'success', subtext: 'Across 4 Engineering Pods', icon: 'work_history' },
        { label: 'Applicant Pipeline', value: '304', delta: '84% TIER-1', deltaType: 'success', subtext: 'Vetted Engineering Candidates', icon: 'groups' },
        { label: 'Interview Conversion', value: '64.2%', delta: '+8.1% vs AVG', deltaType: 'success', subtext: 'High Competency Retention', icon: 'verified' },
        { label: 'Avg Time to Hire', value: '14 DAYS', delta: 'FAST TRACK', deltaType: 'neutral', subtext: 'SIH Skill Matching Speed', icon: 'clock' },
      ]}
    >
      <div className="space-y-space-sm">
        {requisitions.map((req) => (
          <Card key={req.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={req.statusVariant}>{req.status}</Badge>
                  <span className="font-mono text-fg-muted">{req.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{req.department}</span>
                  <span className="text-fg-muted">({req.location})</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {req.title}
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>COMPENSATION: <strong className="text-status-success font-bold font-metric-tabular">{req.salaryRange}</strong></span>
                  <span>TOTAL APPLICANTS: <strong className="text-fg-primary">{req.applicants}</strong></span>
                  <span>TOP 5% MATCHES: <strong className="text-fg-primary font-bold">{req.topMatches} Candidates</strong></span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1 font-label-mono text-[10px]">
                  {req.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-bg-subtle text-fg-secondary border border-border-hairline">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Inspect Top Matched Dossiers</Button>
                <Button variant="outline" size="sm">Edit JD &amp; Skill Criteria</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
