'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function StudentInternshipsPage() {
  const internships = [
    {
      id: 'INT-TECHNOVA-2024-01',
      company: 'TechNova Labs',
      role: 'Distributed Systems & Kernel Telemetry Intern',
      stipend: '?45,000 / mo',
      duration: '6 Months (Jan - Jun 2025)',
      mode: 'On-Site (Bengaluru)',
      match: '94%',
      status: 'URGENT REQUIREMENT',
      skills: ['C++', 'Linux eBPF', 'Rust', 'Docker'],
    },
    {
      id: 'INT-DRDO-CYBER-88',
      company: 'Defence R&D Organisation (CAIR Pod)',
      role: 'Cryptographic Protocol Verification Intern',
      stipend: '?35,000 / mo',
      duration: '3 Months (Winter Sprint)',
      mode: 'On-Site (New Delhi)',
      match: '89%',
      status: 'SECURITY CLEARANCE REQ',
      skills: ['Python', 'Formal Methods', 'SHA-256', 'Network Sockets'],
    },
    {
      id: 'INT-TCS-RND-104',
      company: 'TCS Research & Innovation',
      role: 'Autonomous Systems & Edge AI Fellow',
      stipend: '?40,000 / mo',
      duration: '6 Months',
      mode: 'Hybrid (Pune)',
      match: '86%',
      status: 'ACTIVE SELECTION',
      skills: ['PyTorch', 'TensorRT', 'Embedded Linux'],
    },
  ];

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="AICTE INTERNSHIP COMPLIANT"
      category="CURRICULAR WORK-INTEGRATED LEARNING"
      title="Verified Industrial Internships"
      description="Mandatory AICTE model curriculum internships and corporate R&D fellowships with cryptographic proof of work and direct placement conversion tracks."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="upload" size={14} className="mr-1" />
          Upload NOC from Institution
        </Button>
      }
      kpis={[
        { label: 'Available Internships', value: '42', delta: '14 VERIFIED', deltaType: 'success', subtext: 'AICTE Standard 4.2', icon: 'school' },
        { label: 'Avg Monthly Stipend', value: '?41,500', delta: '+12% YOY', deltaType: 'success', subtext: 'Top Tier Enterprises', icon: 'token' },
        { label: 'PPO Conversion Rate', value: '78.4%', delta: 'HISTORICAL', deltaType: 'neutral', subtext: 'Full-Time Employment', icon: 'verified' },
        { label: 'Curricular Credits', value: '16 / 16', delta: 'COMPLIANT', deltaType: 'success', subtext: 'Degree Requirement', icon: 'check_circle' },
      ]}
    >
      <div className="space-y-space-sm">
        {internships.map((int) => (
          <Card key={int.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <span className="px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold border border-border-strong text-[11px]">
                    {int.match} MATCH
                  </span>
                  <span className="font-mono text-fg-muted">{int.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{int.company}</span>
                  <Badge variant="signal">{int.status}</Badge>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {int.role}
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>STIPEND: <strong className="text-status-success font-bold font-metric-tabular">{int.stipend}</strong></span>
                  <span>DURATION: <strong className="text-fg-primary">{int.duration}</strong></span>
                  <span>MODE: <strong className="text-fg-primary">{int.mode}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1 font-label-mono text-[10px]">
                  {int.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-bg-subtle text-fg-secondary border border-border-hairline">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Submit Application</Button>
                <Button variant="outline" size="sm">View Curriculum Credit Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
