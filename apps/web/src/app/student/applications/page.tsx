'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@portal/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

export default function StudentApplicationsPage() {
  const [filter, setFilter] = useState<'all' | 'interview' | 'review' | 'offer'>('all');
  const [activeChamber, setActiveChamber] = useState<any | null>(null);

  const applications = [
    {
      id: 'APP-TN-0912',
      company: 'TechNova Research Labs',
      role: 'Backend Distributed Systems Engineer',
      stipend: '₹45,000 / mo (PPO ₹22 LPA)',
      stage: 'ROUND 02 INTERVIEW',
      date: 'OCT 24 // 14:00 IST',
      status: 'INTERVIEW SCHEDULED',
      statusType: 'signal' as const,
      category: 'interview',
      proctored: true,
      panel: 'Dr. S. Kulkarni (Principal Architect)',
      techFocus: 'Microservices, Docker Compose, PostgreSQL indexing',
    },
    {
      id: 'APP-TCS-4410',
      company: 'Tata Consultancy Services',
      role: 'Cloud Infrastructure Associate',
      stipend: '₹38,000 / mo',
      stage: 'SCREENING EVALUATION',
      date: 'OCT 26, 2024',
      status: 'UNDER REVIEW',
      statusType: 'default' as const,
      category: 'review',
      proctored: false,
      panel: 'Enterprise Talent Assessment Engine',
      techFocus: 'Kubernetes Cluster Administration, Linux Kernels',
    },
    {
      id: 'APP-BARC-7801',
      company: 'Barclays Global Service',
      role: 'FinTech Microservices Intern',
      stipend: '₹50,000 / mo (PPO ₹18.5 LPA)',
      stage: 'OFFER LETTER ISSUED',
      date: 'NOV 01, 2024',
      status: 'OFFER PENDING',
      statusType: 'success' as const,
      category: 'offer',
      proctored: false,
      panel: 'Global Core Banking Hiring Board',
      techFocus: 'Event Sourcing, Apache Kafka, Resiliency Patterns',
    },
    {
      id: 'APP-ISRO-3021',
      company: 'ISRO Space Applications Centre',
      role: 'Satellite Telemetry Research Fellow',
      stipend: '₹35,000 / mo Grant',
      stage: 'SECURITY CLEARANCE',
      date: 'OCT 28, 2024',
      status: 'UNDER REVIEW',
      statusType: 'default' as const,
      category: 'review',
      proctored: false,
      panel: 'SAC Payload Evaluation Committee',
      techFocus: 'DSP, SDR Telemetry, High-speed Demodulation',
    },
    {
      id: 'APP-CISCO-8809',
      company: 'Cisco Networking Systems',
      role: 'Autonomous SDN Kernel Fellow',
      stipend: '₹55,000 / mo',
      stage: 'TECHNICAL INTERVIEW',
      date: 'OCT 29 // 11:30 IST',
      status: 'INTERVIEW SCHEDULED',
      statusType: 'signal' as const,
      category: 'interview',
      proctored: true,
      panel: 'Core Routing Architecture Team',
      techFocus: 'eBPF, Linux Packet Filtering, Golang Networking',
    },
  ];

  const filtered = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.category === filter;
  });

  return (
    <div className="space-y-space-lg">
      {/* Top Protocol Header */}
      <div className="pb-space-md border-b border-border-strong flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-wider block">
            ATS LIFECYCLE TRACKER // CANDIDATE STU-8042
          </span>
          <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight uppercase mt-1 font-extrabold">
            Active Application Dockets
          </h1>
          <p className="font-body-md text-fg-muted mt-1">
            Real-time pipeline progression, proctored interview chambers, and extended corporate offer letters.
          </p>
        </div>

        <div className="flex items-center gap-space-sm font-label-mono text-xs">
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">ACTIVE</span>
            <span className="text-fg-primary font-bold text-sm">05</span>
          </div>
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">INTERVIEWS</span>
            <span className="text-status-warning font-bold text-sm">02</span>
          </div>
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">OFFERS</span>
            <span className="text-status-success font-bold text-sm">01</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-bg-surface border border-border-strong p-2 flex items-center gap-2 overflow-x-auto">
        {(['all', 'interview', 'review', 'offer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 font-label-mono text-xs uppercase border transition-colors ${
              filter === tab
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
            }`}
          >
            {tab === 'all' && 'All Applications (05)'}
            {tab === 'interview' && 'Interviews Scheduled (02)'}
            {tab === 'review' && 'Under Evaluation (02)'}
            {tab === 'offer' && 'Extended Offers (01)'}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-space-md">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="bg-bg-surface border border-border-strong p-space-lg hover:shadow-[3px_3px_0px_0px_#18181B] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                <Badge variant={app.statusType}>{app.status}</Badge>
                <span className="font-mono text-fg-muted">{app.id}</span>
                <span className="text-border-hairline">|</span>
                <span className="text-fg-primary font-bold">{app.company}</span>
              </div>

              <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                {app.role}
              </h2>

              <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                <span>STIPEND / BAND: <strong className="text-fg-primary">{app.stipend}</strong></span>
                <span>•</span>
                <span>STAGE: <strong className="text-fg-secondary">{app.stage}</strong></span>
                <span>•</span>
                <span>PANEL: <strong className="text-fg-secondary">{app.panel}</strong></span>
              </div>

              <div className="font-mono text-[11px] text-fg-secondary bg-bg-subtle p-2 border border-border-hairline inline-block">
                CORE TECHNICAL FOCUS: {app.techFocus}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2 shrink-0">
              <span className="font-label-mono text-xs font-bold text-fg-primary">{app.date}</span>
              {app.proctored ? (
                <Button
                  variant="signal"
                  size="sm"
                  onClick={() => setActiveChamber(app)}
                >
                  Join Proctored Chamber
                </Button>
              ) : app.statusType === 'success' ? (
                <Button variant="primary" size="sm">
                  Review Letter of Intent (LOI)
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  Inspect Requisition Docket
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Proctored Chamber Modal */}
      <Dialog open={!!activeChamber} onOpenChange={(open) => !open && setActiveChamber(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Secure Proctored Interview Chamber</DialogTitle>
            <DialogDescription>
              {activeChamber?.company} // {activeChamber?.role}
            </DialogDescription>
          </DialogHeader>

          {activeChamber && (
            <div className="space-y-space-md font-mono text-xs">
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-2">
                <div className="flex justify-between">
                  <span className="text-fg-muted">SESSION SCHEDULE:</span>
                  <span className="text-accent-signal font-bold">{activeChamber.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">LEAD EVALUATOR:</span>
                  <span className="text-fg-primary font-bold">{activeChamber.panel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">SECURITY MODE:</span>
                  <span className="text-status-success font-bold">NATIONAL AIR-GAPPED ENVIRONMENT</span>
                </div>
              </div>

              <div className="space-y-1 text-fg-secondary font-sans text-xs">
                <span className="font-bold font-mono text-fg-primary block uppercase">Proctor Checklist:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Webcam &amp; microphone hardware permissions authenticated</li>
                  <li>Dual-monitor detection enabled &amp; full-screen lock engaged</li>
                  <li>In-browser Python/Go execution sandbox active with test runner</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button
              variant="signal"
              size="sm"
              onClick={() => {
                alert(`Connecting to ${activeChamber?.company} proctored terminal...`);
                setActiveChamber(null);
              }}
            >
              Enter Proctored Chamber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
