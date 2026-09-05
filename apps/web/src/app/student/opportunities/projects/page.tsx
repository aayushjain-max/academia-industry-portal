'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function StudentProjectsPage() {
  const sprints = [
    {
      id: 'SPRINT-SIH-2024-08',
      title: 'Decentralized Academic Credential Ledger on Polygon / EVM',
      client: 'AICTE / MoE Innovation Cell',
      bounty: '?75,000 Milestone Bounty',
      duration: '4 Weeks Sprint',
      teamSize: '3-4 Developers',
      tags: ['Solidity', 'Next.js', 'PostgreSQL', 'Ethers.js'],
      status: 'REGISTRATION OPEN',
    },
    {
      id: 'SPRINT-IND-ROBOTICS-42',
      title: 'Autonomous Mobile Robot SLAM Drift Correction Filter',
      client: 'Tata Motors Autonomous Vehicle R&D',
      bounty: '?1,20,000 Milestone Bounty',
      duration: '6 Weeks Sprint',
      teamSize: '2 Developers',
      tags: ['ROS2', 'C++20', 'Kalman Filter', 'LiDAR'],
      status: 'EVALUATION IN PROGRESS',
    },
  ];

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="SPRINT READY"
      category="MICRO-INTERNSHIPS & INDUSTRY SPRINTS"
      title="Industry Micro-Internships & Project Bounties"
      description="Time-boxed, milestone-driven industrial engineering challenges designed by tier-1 corporations and government labs for rapid credentialing and portfolio expansion."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="biotech" size={14} className="mr-1" />
          Propose Team Docket
        </Button>
      }
      kpis={[
        { label: 'Active Sprints', value: '18', delta: '+3 THIS WK', deltaType: 'success', subtext: 'Open for Student Registration', icon: 'layers' },
        { label: 'Completed Sprints', value: '04', delta: '100% REPO PROOF', deltaType: 'success', subtext: 'Verified by Enterprise Leads', icon: 'check_circle' },
        { label: 'Total Bounties Earned', value: '?1.85 L', delta: 'VERIFIED', deltaType: 'neutral', subtext: 'Direct UPI Bank Settlement', icon: 'token' },
        { label: 'Corporate MoUs', value: '14', delta: 'CONNECTED', deltaType: 'neutral', subtext: 'Pre-Placement Fast Track', icon: 'hub' },
      ]}
    >
      <div className="space-y-space-sm">
        {sprints.map((sp) => (
          <Card key={sp.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant="signal">{sp.status}</Badge>
                  <span className="font-mono text-fg-muted">{sp.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{sp.client}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {sp.title}
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>BOUNTY: <strong className="text-status-success font-bold font-metric-tabular">{sp.bounty}</strong></span>
                  <span>TIMELINE: <strong className="text-fg-primary">{sp.duration}</strong></span>
                  <span>TEAM FORMAT: <strong className="text-fg-primary">{sp.teamSize}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1 font-label-mono text-[10px]">
                  {sp.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-bg-subtle text-fg-secondary border border-border-hairline">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Register Docket Team</Button>
                <Button variant="outline" size="sm">Download Technical Spec</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
