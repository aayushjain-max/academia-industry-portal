'use client';

import React, { useState } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function StudentJobsPage() {
  const [filter, setFilter] = useState('all');
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  const jobs = [
    {
      id: 'JOB-TCS-0984',
      title: 'Distributed Systems & Cloud Engineer',
      company: 'Tata Consultancy Services',
      location: 'Bengaluru, KA (Hybrid)',
      type: 'Full-Time Core Placement',
      stipend: '?14.5 LPA',
      matchScore: 92,
      skills: ['Python', 'FastAPI', 'Kubernetes', 'PostgreSQL'],
      missingSkills: ['Terraform'],
      deadline: 'OCT 28, 2024',
      verifiedAICTE: true,
    },
    {
      id: 'JOB-TECHNOVA-441',
      title: 'Backend Microservices Architect',
      company: 'TechNova Labs',
      location: 'Pune, MH (On-Site)',
      type: 'Full-Time Engineering',
      stipend: '?18.0 LPA',
      matchScore: 88,
      skills: ['Golang', 'Docker', 'Redis', 'gRPC'],
      missingSkills: ['Kafka Streams'],
      deadline: 'NOV 05, 2024',
      verifiedAICTE: true,
    },
    {
      id: 'JOB-BARCLAYS-109',
      title: 'FinTech Quantitative Systems Developer',
      company: 'Barclays Global Service',
      location: 'Mumbai, MH (Hybrid)',
      type: 'Full-Time Placement',
      stipend: '?16.2 LPA',
      matchScore: 84,
      skills: ['Python', 'SQL Query Tuning', 'AsyncIO'],
      missingSkills: ['C++20'],
      deadline: 'NOV 12, 2024',
      verifiedAICTE: true,
    },
    {
      id: 'JOB-ISRO-TELE-771',
      title: 'Telemetry Payload Signal Engineer',
      company: 'ISRO Telemetry Node',
      location: 'Sriharikota, AP (On-Site)',
      type: 'National Research Core',
      stipend: '?12.0 LPA',
      matchScore: 78,
      skills: ['C++', 'Digital Signal Processing', 'Python'],
      missingSkills: ['Radar DSP', 'MATLAB Simulink'],
      deadline: 'NOV 20, 2024',
      verifiedAICTE: true,
    },
  ];

  const handleApply = (id: string) => {
    setApplied((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="TIER 01 ACCREDITED"
      category="DETERMINISTIC PLACEMENT ENGINE"
      title="Algorithmic Opportunity Matches"
      description="Cryptographically matched core placement requisitions based on your verified skill passport, HackerRank telemetry, and institutional academic benchmarks."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="tune" size={14} className="mr-1" />
            Recalculate ATS Match
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="token" size={14} className="mr-1" />
            Attach Skill Passport
          </Button>
        </>
      }
      kpis={[
        { label: 'Compatible Roles', value: '28', delta: '+4 NEW', deltaType: 'success', subtext: 'Based on 84% Python/SQL', icon: 'work_history' },
        { label: 'Avg Match Score', value: '85.6%', delta: 'TOP 10%', deltaType: 'success', subtext: 'AICTE Tier-1 Cohort', icon: 'verified_user' },
        { label: 'Active Applications', value: '08', delta: '1 OFFER', deltaType: 'warning', subtext: 'Across 6 Enterprises', icon: 'travel_explore' },
        { label: 'Placement Index', value: '9.4/10', delta: 'HIGH VELOCITY', deltaType: 'neutral', subtext: 'National Ranking: #142', icon: 'dashboard' },
      ]}
    >
      {/* Search and Filters */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap">
          {['all', 'high-match', 'hybrid', 'core-engineering'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={
                'px-3 py-1 font-label-mono text-xs uppercase border transition-colors ' +
                (filter === tab
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary')
              }
            >
              {tab === 'all' ? 'All Roles (28)' : tab === 'high-match' ? 'Match ≥ 85%' : tab}
            </button>
          ))}
        </div>
        <div className="font-label-mono text-xs text-fg-muted">
          PASSPORT LINKED: <strong className="text-status-success font-semibold">SHA-256 (0x4a9...f2)</strong>
        </div>
      </div>

      {/* Jobs Feed */}
      <div className="space-y-space-sm">
        {jobs
          .filter((job) => (filter === 'high-match' ? job.matchScore >= 85 : true))
          .map((job) => {
            const isApplied = !!applied[job.id];
            return (
              <Card key={job.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      <span className="px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold border border-border-strong text-[11px]">
                        {job.matchScore}% MATCH
                      </span>
                      <span className="text-fg-muted font-mono">{job.id}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold">{job.company}</span>
                      {job.verifiedAICTE && (
                        <Badge variant="success">AICTE VERIFIED</Badge>
                      )}
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                      <span>COMPENSATION: <strong className="text-fg-primary font-bold font-metric-tabular">{job.stipend}</strong></span>
                      <span>LOCATION: <strong className="text-fg-primary">{job.location}</strong></span>
                      <span>DEADLINE: <strong className="text-status-danger font-semibold">{job.deadline}</strong></span>
                      <span>TYPE: <strong className="text-fg-secondary">{job.type}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap pt-1 font-label-mono text-[11px]">
                      <span className="text-fg-muted">MATCHED SKILLS:</span>
                      {job.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-green-50 text-status-success border border-status-success/30 font-semibold">
                          ? {s}
                        </span>
                      ))}
                      {job.missingSkills.length > 0 && (
                        <>
                          <span className="text-fg-muted ml-2">DEFICITS:</span>
                          {job.missingSkills.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 bg-red-50 text-status-danger border border-status-danger/30 font-semibold">
                              ! {s}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <Button
                      variant={isApplied ? 'secondary' : 'signal'}
                      size="sm"
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied}
                    >
                      {isApplied ? 'Application Docket Dispatched' : 'Submit Sovereign Application'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Inspect Requisition Spec
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </NodePageShell>
  );
}
