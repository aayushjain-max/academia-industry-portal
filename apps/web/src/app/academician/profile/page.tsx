'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function AcademicianProfilePage() {
  const publications = [
    {
      title: 'Fault-Tolerant Consensus in Asynchronous High-Throughput Edge Clusters',
      journal: 'IEEE Transactions on Parallel and Distributed Systems (TPDS), Vol. 34',
      year: '2024',
      citations: 142,
      doi: '10.1109/TPDS.2024.3129841',
      badge: 'TOP 1% CITATION',
    },
    {
      title: 'Sub-Millisecond Query Scheduling in Geo-Distributed PostgreSQL Shards',
      journal: 'ACM Transactions on Database Systems (TODS), Vol. 48',
      year: '2023',
      citations: 98,
      doi: '10.1145/3541829.3541902',
      badge: 'BEST PAPER CANDIDATE',
    },
    {
      title: 'Thermal Drift Correction Models for Aerospace Battery Management Modules',
      journal: 'Elsevier Journal of Power Sources, Vol. 540',
      year: '2023',
      citations: 215,
      doi: '10.1016/j.jpowsour.2023.231908',
      badge: 'INDUSTRY ADOPTED (TATA MOTORS)',
    },
  ];

  const patents = [
    {
      id: 'IN-PAT-2023-410982',
      title: 'Hardware Cryptographic Coprocessor for Low-Power IoT Telemetry',
      status: 'GRANTED & PUBLISHED',
      filingDate: 'DEC 2021',
      grantDate: 'MAR 2024',
      assignee: 'IIT Bombay x Ministry of Electronics & IT (MeitY)',
    },
    {
      id: 'US-PAT-11940129-B2',
      title: 'Distributed Vector Quantization for Neural Inference at the Edge',
      status: 'GRANTED BY USPTO',
      filingDate: 'JAN 2022',
      grantDate: 'JUL 2024',
      assignee: 'IIT Bombay x TechNova Research Labs',
    },
  ];

  return (
    <NodePageShell
      nodeId="FAC-8043 // ACADEMICIAN"
      nodeStatus="INSTITUTIONAL TENURE VERIFIED"
      category="RESEARCH PORTFOLIO & INTELLECTUAL PROPERTY LEDGER"
      title="Faculty Portfolio, Patents & Citations"
      description="Official institutional registry of academic credentials, peer-reviewed publications, granted national/international patents, and sanctioned industrial consulting dockets."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="upload" size={14} className="mr-1" />
            Register New Publication / Patent
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="download" size={14} className="mr-1" />
            Generate NAAC/NIRF Faculty Dossier
          </Button>
        </>
      }
      kpis={[
        { label: 'Scopus H-Index', value: '28', delta: 'i10: 64', deltaType: 'success', subtext: 'Rank #4 in Department', icon: 'badge' },
        { label: 'Total Citations', value: '3,420+', delta: '+412 THIS YR', deltaType: 'success', subtext: 'Google Scholar & Scopus', icon: 'article' },
        { label: 'Granted Patents', value: '06', delta: '2 COMMODITIZED', deltaType: 'neutral', subtext: 'Bilateral Industry Royalties', icon: 'token' },
        { label: 'Active R&D Grants', value: '?1.85 CR', delta: 'DST & ISRO', deltaType: 'success', subtext: 'Sanctioned Till 2026', icon: 'verified' },
      ]}
    >
      {/* Faculty Summary Bio */}
      <div className="bg-bg-surface border border-border-strong p-space-md lg:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm font-bold text-fg-primary">
              Dr. V. Ramanathan, Ph.D.
            </span>
            <Badge variant="signal">PROFESSOR &amp; HOD</Badge>
          </div>
          <p className="text-body-md text-fg-secondary">
            Department of Computer Science &amp; Engineering, Indian Institute of Technology Bombay
          </p>
          <div className="flex items-center gap-space-md text-xs font-label-mono text-fg-muted pt-1 flex-wrap">
            <span>RESEARCH: Distributed Systems, Database Optimization, Hardware Security</span>
            <span>EXPERIENCE: 19 Years Tenure</span>
            <span>AICTE ID: FAC-IND-80432</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="font-label-mono text-xs text-status-success font-bold block">
            ? NIRF FACULTY AUDIT COMPLETE
          </span>
          <span className="font-mono text-xs text-fg-muted">
            LAST SYNC: OCT 2024
          </span>
        </div>
      </div>

      {/* Publications Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
            Peer-Reviewed Publications (Selected Flagship Papers)
          </span>
          <span className="font-label-mono text-xs text-fg-muted">SCOPUS / IEEE XPLORE VERIFIED</span>
        </div>

        {publications.map((p) => (
          <Card key={p.doi} className="hover:border-border-strong transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                <Badge variant="signal">{p.badge}</Badge>
                <span className="text-fg-muted">{p.year}</span>
                <span className="text-border-hairline">|</span>
                <span className="text-fg-secondary font-mono">DOI: {p.doi}</span>
                <span className="ml-auto font-metric-tabular text-status-success font-bold">
                  {p.citations} Citations
                </span>
              </div>
              <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
                {p.title}
              </h3>
              <p className="text-body-sm text-fg-muted">{p.journal}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Patents Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
            Granted Patents &amp; Intellectual Property
          </span>
          <span className="font-label-mono text-xs text-fg-muted">IPO / USPTO CERTIFIED</span>
        </div>

        {patents.map((pat) => (
          <Card key={pat.id} className="hover:border-border-strong transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                <Badge variant="success">{pat.status}</Badge>
                <span className="text-fg-primary font-mono font-bold">{pat.id}</span>
                <span className="text-border-hairline">|</span>
                <span className="text-fg-muted">GRANTED: {pat.grantDate}</span>
              </div>
              <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
                {pat.title}
              </h3>
              <p className="text-body-sm text-fg-secondary">Assignee: {pat.assignee}</p>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
