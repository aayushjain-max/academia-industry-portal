'use client';

import React from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function IndustryMentorshipPage() {
  const pods = [
    {
      id: 'MENT-TECHNOVA-POD-01',
      mentor: 'Rajesh Kulkarni (Principal Architect)',
      track: 'Distributed Systems & High-Throughput Pipelines',
      institution: 'IIT Bombay & COEP Tech',
      menteesCount: 16,
      sessionsCompleted: '8 / 12 Sessions',
      status: 'SPRINT ACTIVE',
      statusVariant: 'signal' as const,
      nextSession: 'OCT 26, 2024 // 16:00 IST',
    },
    {
      id: 'MENT-TECHNOVA-POD-02',
      mentor: 'Ananya Deshmukh (Head of AI Research)',
      track: 'Edge AI Acceleration & TensorRT Optimization',
      institution: 'IISc Bangalore & BITS Pilani',
      menteesCount: 12,
      sessionsCompleted: '10 / 12 Sessions',
      status: 'CAPSTONE EVALUATION',
      statusVariant: 'warning' as const,
      nextSession: 'OCT 29, 2024 // 14:00 IST',
    },
  ];

  return (
    <NodePageShell
      nodeId="IND-8044 // ENTERPRISE"
      nodeStatus="CORPORATE MENTORSHIP ACTIVE"
      category="ACADEMIA-INDUSTRY MENTORSHIP ECOSYSTEM"
      title="Mentorship Pods & University Office Hours"
      description="Corporate mentorship pods connecting TechNova senior architects with top-performing academic engineering cohorts to bridge production curriculum deficits."
      actions={
        <Button variant="signal" size="sm">
          <Icon name="groups" size={14} className="mr-1" />
          Launch New Mentorship Pod
        </Button>
      }
      kpis={[
        { label: 'Active Mentorship Pods', value: '06', delta: '28 SCHOLARS', deltaType: 'success', subtext: 'IITB, IISc, BITS, COEP', icon: 'groups' },
        { label: 'Mentorship Hours', value: '180 HRS', delta: 'COMMITTED', deltaType: 'neutral', subtext: 'CSR & Talent Pipeline', icon: 'clock' },
        { label: 'Pre-Placement Offers', value: '11 PPOs', delta: 'ISSUED', deltaType: 'success', subtext: 'Direct Conversion Rate: 68%', icon: 'verified' },
        { label: 'Cohort Satisfaction', value: '4.9 / 5.0', delta: 'EXCEPTIONAL', deltaType: 'success', subtext: 'Post-Sprint Student Rating', icon: 'badge' },
      ]}
    >
      <div className="space-y-space-sm">
        {pods.map((pod) => (
          <Card key={pod.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={pod.statusVariant}>{pod.status}</Badge>
                  <span className="font-mono text-fg-muted">{pod.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{pod.institution}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {pod.track}
                </h2>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>LEAD MENTOR: <strong className="text-fg-primary">{pod.mentor}</strong></span>
                  <span>ENROLLED STUDENTS: <strong className="text-fg-primary">{pod.menteesCount}</strong></span>
                  <span>VELOCITY: <strong className="text-fg-primary">{pod.sessionsCompleted}</strong></span>
                  <span>NEXT HUDDLE: <strong className="text-status-danger font-semibold">{pod.nextSession}</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Enter Video Chamber</Button>
                <Button variant="outline" size="sm">Review Student Git Commits</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
