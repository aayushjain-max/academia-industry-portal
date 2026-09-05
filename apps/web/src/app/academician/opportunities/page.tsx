'use client';

import React, { useState } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function AcademicianOpportunitiesPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const opportunities = [
    {
      id: 'GRANT-ISRO-2024-91',
      title: 'Autonomous Navigation & Edge Computer Vision for Micro-Satellites',
      sponsor: 'Indian Space Research Organisation (ISRO)',
      funding: '?2.45 Cr',
      duration: '36 Months',
      category: 'Space & Avionics',
      deadline: 'NOV 15, 2024',
      status: 'CALL FOR PROPOSALS',
      statusVariant: 'signal' as const,
      tags: ['C++', 'FPGA', 'Computer Vision', 'RTOS'],
      docket: 'DOK-AERO-092',
    },
    {
      id: 'GRANT-DST-SERB-4402',
      title: 'Quantum Key Distribution in Silicon Heterostructures',
      sponsor: 'Department of Science and Technology (DST / SERB)',
      funding: '?1.80 Cr',
      duration: '24 Months',
      category: 'Quantum Computing',
      deadline: 'DEC 01, 2024',
      status: 'PEER REVIEW ACTIVE',
      statusVariant: 'warning' as const,
      tags: ['Quantum Mechanics', 'Photonics', 'Nanotech'],
      docket: 'DOK-PHY-440',
    },
    {
      id: 'IND-TATA-MOTORS-804',
      title: 'Solid-State Battery Thermal Runaway Simulation & Sensor ML',
      sponsor: 'Tata Motors Corporate R&D',
      funding: '?95.0 Lakhs',
      duration: '18 Months',
      category: 'Electric Mobility',
      deadline: 'OCT 30, 2024',
      status: 'SHORTLISTING CO-PIS',
      statusVariant: 'success' as const,
      tags: ['Simulink', 'Battery Chemistry', 'Thermal Modeling'],
      docket: 'DOK-AUTO-804',
    },
    {
      id: 'GRANT-DRDO-CYBER-112',
      title: 'Hardware Cryptographic Primitives & Side-Channel Defense',
      sponsor: 'Defence R&D Organisation (DRDO)',
      funding: '?3.10 Cr',
      duration: '48 Months',
      category: 'Cyber Defense',
      deadline: 'JAN 10, 2025',
      status: 'OPEN REQUISITION',
      statusVariant: 'signal' as const,
      tags: ['Cryptography', 'ASIC Design', 'Hardware Security'],
      docket: 'DOK-DEF-112',
    },
  ];

  const filtered = opportunities.filter((op) => {
    const matchSearch = op.title.toLowerCase().includes(search.toLowerCase()) || op.sponsor.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchSearch;
    return matchSearch && op.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <NodePageShell
      nodeId="FAC-8043 // ACADEMICIAN"
      nodeStatus="TENURE VERIFIED"
      category="RESEARCH GRANTS & SPONSORED DOCKET MATRIX"
      title="R&D Grant & Opportunity Docket"
      description="Centrally synchronized portal for government (DST, ISRO, DRDO) and bilateral industry research grants, sponsored lab equipment, and faculty consultancy requisitions."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="upload" size={14} className="mr-1" />
            Submit Joint Proposal
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="download" size={14} className="mr-1" />
            Export Grant Ledger
          </Button>
        </>
      }
      kpis={[
        { label: 'Available Pool', value: '?14.2 Cr', delta: '12 CALLS', deltaType: 'success', subtext: 'Across 6 National Agencies', icon: 'token' },
        { label: 'Proposals In Review', value: '03', delta: 'PENDING', deltaType: 'warning', subtext: 'Total Value: ?4.25 Cr', icon: 'article' },
        { label: 'Sanctioned MoUs', value: '08', delta: '+2 THIS YR', deltaType: 'success', subtext: '100% Fund Realized', icon: 'verified' },
        { label: 'Co-PI Match Rate', value: '94.2%', delta: 'OPTIMAL', deltaType: 'neutral', subtext: 'Inter-Departmental Pods', icon: 'hub' },
      ]}
    >
      {/* Filter and Search Bar */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'space', 'quantum', 'mobility', 'cyber'].map((tab) => (
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
              {tab === 'all' ? 'All Domains' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter grant title or sponsor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Icon name="search" size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Grant Cards List */}
      <div className="space-y-space-sm">
        {filtered.map((item) => (
          <Card key={item.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-[11px]">
                  <Badge variant={item.statusVariant}>{item.status}</Badge>
                  <span className="text-fg-muted font-mono">{item.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{item.sponsor}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {item.title}
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>GRANT: <strong className="text-status-success font-bold font-metric-tabular">{item.funding}</strong></span>
                  <span>DURATION: <strong className="text-fg-primary">{item.duration}</strong></span>
                  <span>DEADLINE: <strong className="text-status-danger font-semibold">{item.deadline}</strong></span>
                  <span>DOCKET: <strong className="text-fg-primary font-mono">{item.docket}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-bg-subtle text-fg-secondary font-label-mono text-[10px] border border-border-hairline">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Apply as Principal Investigator</Button>
                <Button variant="outline" size="sm">Download RFP Guidelines</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
