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
import { Search, Filter, ArrowRight, Check } from 'lucide-react';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'placement' | 'internship' | 'research'>('all');
  const [search, setSearch] = useState('');
  const [applyingOpportunity, setApplyingOpportunity] = useState<any | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const opportunities = [
    {
      id: 'DK-TCS-0984',
      org: 'Tata Consultancy Services',
      role: 'Distributed Systems & Cloud Engineer',
      type: 'placement',
      typeLabel: 'Industrial Placement',
      stipend: '₹45,000 / mo (PPO ₹18.0 LPA)',
      location: 'Bengaluru / Hyderabad',
      tags: ['FastAPI', 'Kubernetes', 'Golang', 'Docker'],
      status: 'ACTIVE SELECTION',
      matchScore: 94,
      desc: 'Architect resilient event pipelines and containerized microservices handling enterprise cloud telemetry.',
    },
    {
      id: 'DK-RND-8042',
      org: 'IISc Bangalore x Tata Motors',
      role: 'EV Battery Management Thermal Algorithms',
      type: 'research',
      typeLabel: 'Joint R&D Project',
      stipend: '₹1.85 Cr Grant Pool (₹50k/mo Fellow)',
      location: 'Bengaluru Campus',
      tags: ['Simulink', 'C++', 'Battery Telemetry', 'Thermal Physics'],
      status: 'LAB FORMATION',
      matchScore: 88,
      desc: 'Develop predictive thermal degradation models for LFP battery packs under Indian extreme ambient temperature profiles.',
    },
    {
      id: 'DK-INT-7712',
      org: 'ISRO Space Applications Centre',
      role: 'Satellite Payload Signal Processing Fellow',
      type: 'internship',
      typeLabel: 'Research Fellowship',
      stipend: '₹35,000 / mo Fellowship',
      location: 'Ahmedabad',
      tags: ['DSP', 'Python', 'Radar', 'SDR'],
      status: 'VERIFICATION ACTIVE',
      matchScore: 92,
      desc: 'High-speed demodulation and signal integrity algorithms for upcoming low-earth-orbit constellation telemetry.',
    },
    {
      id: 'DK-TECH-3301',
      org: 'TechNova Research Labs',
      role: 'Distributed Async Microservices Engineer',
      type: 'placement',
      typeLabel: 'Industrial Placement',
      stipend: '₹60,000 / mo (PPO ₹24.0 LPA)',
      location: 'Pune / Remote',
      tags: ['Python 3.12', 'PostgreSQL', 'Kafka', 'Redis'],
      status: 'ACTIVE SELECTION',
      matchScore: 98,
      desc: 'Build low-latency messaging backends and sharded database clusters for fintech clearing hubs.',
    },
    {
      id: 'DK-DRDO-5120',
      org: 'DRDO Defence Research Pod',
      role: 'Autonomous Drone Navigation & SLAM Engineer',
      type: 'research',
      typeLabel: 'Defense Fellowship',
      stipend: '₹40,000 / mo Grant',
      location: 'Hyderabad',
      tags: ['ROS2', 'C++20', 'LiDAR', 'Edge AI'],
      status: 'LAB FORMATION',
      matchScore: 82,
      desc: 'GPS-denied visual-inertial navigation algorithms for military autonomous aerial vehicles.',
    },
    {
      id: 'DK-CISCO-1109',
      org: 'Cisco Networking Systems',
      role: 'eBPF Kernel Network Observability Intern',
      type: 'internship',
      typeLabel: 'Industrial Internship',
      stipend: '₹55,000 / mo',
      location: 'Bengaluru',
      tags: ['eBPF', 'Linux Kernel', 'Golang', 'C'],
      status: 'ACTIVE SELECTION',
      matchScore: 90,
      desc: 'Implement zero-overhead network packet tracing and security monitoring inside the Linux kernel.',
    },
  ];

  const filtered = opportunities.filter((op) => {
    const matchesTab = activeTab === 'all' || op.type === activeTab;
    const matchesSearch =
      op.role.toLowerCase().includes(search.toLowerCase()) ||
      op.org.toLowerCase().includes(search.toLowerCase()) ||
      op.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleApply = (op: any) => {
    setApplyingOpportunity(op);
  };

  const handleConfirmApply = () => {
    const role = applyingOpportunity?.role;
    const org = applyingOpportunity?.org;
    setApplyingOpportunity(null);
    setAppliedNotice(`Application docket dispatched to ${org} for ${role}.`);
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl space-y-space-lg">
      {/* Toast Notification */}
      {appliedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-bold text-accent-signal">APPLICATION COMMITTED:</span>
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-border-strong pb-space-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>NATIONAL OPPORTUNITY REQUISITION EXCHANGE</span>
            <span>•</span>
            <span className="text-status-success font-semibold">142 ACTIVE DOCKETS</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg uppercase font-extrabold text-fg-primary tracking-tight mt-1">
            Explore Opportunities &amp; R&amp;D Grants
          </h1>
          <p className="font-body-md text-fg-muted mt-1 max-w-3xl">
            Algorithmic talent matchmaking connecting vetted student dockets with enterprise requisitions, research lab pods, and government fellowships.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="p-2.5 bg-bg-surface border border-border-strong text-center">
            <span className="text-fg-muted block text-[10px]">AVG MATCH FIT</span>
            <span className="font-bold text-fg-primary text-base">91.4%</span>
          </div>
          <div className="p-2.5 bg-bg-surface border border-border-strong text-center">
            <span className="text-fg-muted block text-[10px]">VERIFIED PARTNERS</span>
            <span className="font-bold text-status-success text-base">48 MoUs</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'placement', 'internship', 'research'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 font-label-mono text-xs uppercase border whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
              }`}
            >
              {tab === 'all' && 'All Requisitions (06)'}
              {tab === 'placement' && 'Core Placements'}
              {tab === 'internship' && 'Internships'}
              {tab === 'research' && 'Joint R&D Grants'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by skill, role, or enterprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-1 focus:ring-fg-primary pr-8"
          />
          <Search size={14} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filtered.map((op) => (
          <div
            key={op.id}
            className="bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_#18181B] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between border-b border-border-hairline pb-2 mb-3 font-mono text-xs">
                <span className="text-fg-muted">{op.id}</span>
                <span className="font-bold text-accent-signal bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[10px]">
                  {op.matchScore}% COMPATIBILITY
                </span>
              </div>

              <span className="font-label-mono text-[11px] text-fg-muted block mb-0.5">{op.org}</span>
              <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary mb-2 group-hover:text-accent-signal transition-colors">
                {op.role}
              </h2>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-metric-tabular text-headline-sm text-fg-primary font-bold tnum">
                  {op.stipend}
                </span>
              </div>

              <p className="font-body-sm text-xs text-fg-secondary mb-4 line-clamp-2">
                {op.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {op.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-label-mono text-[10px] uppercase text-fg-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border-hairline flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">
                {op.typeLabel}
              </span>
              <Button
                variant="signal"
                size="sm"
                onClick={() => handleApply(op)}
                className="font-label-mono text-xs font-bold"
              >
                <span>Apply with Passport</span>
                <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Apply Dialog */}
      <Dialog open={!!applyingOpportunity} onOpenChange={(open) => !open && setApplyingOpportunity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Commit Requisition Application</DialogTitle>
            <DialogDescription>
              {applyingOpportunity?.org} // {applyingOpportunity?.role}
            </DialogDescription>
          </DialogHeader>

          {applyingOpportunity && (
            <div className="space-y-space-md font-mono text-xs">
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-2">
                <div className="flex justify-between">
                  <span className="text-fg-muted">DOCKET NUMBER:</span>
                  <span className="text-fg-primary font-bold">{applyingOpportunity.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">COMPATIBILITY MATCH:</span>
                  <span className="text-status-success font-bold">{applyingOpportunity.matchScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">CREDENTIAL DOSSIER:</span>
                  <span className="text-fg-primary font-bold">did:sih:stu-8042-aarav</span>
                </div>
              </div>

              <div className="text-fg-secondary font-sans text-xs space-y-1">
                <span className="font-bold font-mono text-fg-primary block uppercase">Attestation Package:</span>
                <p>
                  Your cryptographically verified skills in <strong>{applyingOpportunity.tags.join(', ')}</strong> and verified SIH-2024 Finalist badge will be dispatched to the hiring board.
                </p>
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
              onClick={handleConfirmApply}
            >
              Confirm &amp; Transmit Docket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
