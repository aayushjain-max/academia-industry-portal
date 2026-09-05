'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function AcademicianMentorshipPage() {
  const mentees = [
    {
      id: 'SCHOLAR-PHD-2022-04',
      name: 'Pooja Venkatesh',
      degree: 'Ph.D. Candidate (Year 3)',
      topic: 'Byzantine Agreement Protocols in Heterogeneous Edge Networks',
      status: 'THESIS PROPOSAL APPROVED',
      stage: 'Comprehensive Exam Passed',
      lastReview: 'OCT 18, 2024',
      nextDeliverable: 'Draft Chapter 4 Submission (NOV 15)',
    },
    {
      id: 'SCHOLAR-MTECH-2023-11',
      name: 'Siddharth Rao',
      degree: 'M.Tech Research Fellow',
      topic: 'Learned Index Structures for High-Volume Time-Series in PostgreSQL',
      status: 'DEFENSE SCHEDULED',
      stage: 'Final Dissertation Defense',
      lastReview: 'OCT 22, 2024',
      nextDeliverable: 'Oral Defense Chamber (OCT 29 // 11:00)',
    },
    {
      id: 'SCHOLAR-BTECH-SIH-80',
      name: 'Aarav Sharma & Team',
      degree: 'B.Tech Capstone / SIH Finalists',
      topic: 'SkillBridge Sovereign Credential Arbitration Engine',
      status: 'LAB PROTOTYPE STABLE',
      stage: 'National Final Evaluation',
      lastReview: 'OCT 20, 2024',
      nextDeliverable: 'Hardware Chamber Proctored Run',
    },
  ];

  return (
    <NodePageShell
      nodeId="FAC-8043 // ACADEMICIAN"
      nodeStatus="RESEARCH PODS ACTIVE"
      category="POSTGRADUATE & UNDERGRADUATE RESEARCH MENTORSHIP"
      title="Mentorship Pods & Scholar Ledgers"
      description="Supervisory dashboard for doctoral candidates, postgraduate theses, and sponsored student hackathon delegations with automated milestone validation."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="groups" size={14} className="mr-1" />
          Schedule Advisory Session
        </Button>
      }
      kpis={[
        { label: 'Active Ph.D. Scholars', value: '06', delta: '2 SUBMITTING', deltaType: 'success', subtext: 'Funded via DST/CSIR', icon: 'school' },
        { label: 'M.Tech Theses', value: '04', delta: 'ON TRACK', deltaType: 'neutral', subtext: 'Joint Industry Sponsorship', icon: 'book_open' },
        { label: 'Graduated Alumni', value: '18', delta: '100% PLACED', deltaType: 'success', subtext: 'Academia & Core R&D', icon: 'verified' },
        { label: 'Review Velocity', value: '98.2%', delta: 'PROMPT', deltaType: 'success', subtext: 'AICTE Compliance Metric', icon: 'check_circle' },
      ]}
    >
      <div className="space-y-space-sm">
        {mentees.map((m) => (
          <Card key={m.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant="signal">{m.status}</Badge>
                  <span className="font-mono text-fg-muted">{m.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{m.degree}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {m.name} — <span className="font-normal text-fg-secondary text-base">{m.topic}</span>
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>STAGE: <strong className="text-fg-primary">{m.stage}</strong></span>
                  <span>LAST ADVISORY: <strong className="text-fg-primary">{m.lastReview}</strong></span>
                  <span>NEXT MILESTONE: <strong className="text-status-danger font-semibold">{m.nextDeliverable}</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Enter Advisory Chamber</Button>
                <Button variant="outline" size="sm">Review Dissertation Draft</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
