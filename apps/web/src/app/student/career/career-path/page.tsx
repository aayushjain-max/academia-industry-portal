'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { getCareerPaths, CareerPathItem } from '@/features/career/api';
import { Loader2 } from 'lucide-react';

export default function StudentCareerPathPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [careerPaths, setCareerPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPaths() {
      try {
        const data = await getCareerPaths();
        if (Array.isArray(data) && data.length > 0) {
          setCareerPaths(
            data.map((item: CareerPathItem) => ({
              id: item.id ? `PATH-${item.id.slice(0, 6).toUpperCase()}` : 'PATH-DEFAULT',
              title: item.title,
              entity: `${item.industry || 'Technology & Software Systems'} // Growth: ${item.growth_projection || 'High'}`,
              timestamp: item.salary_range ? `₹${(item.salary_range.min / 100000).toFixed(1)}L - ₹${(item.salary_range.max / 100000).toFixed(1)}L CTC` : '₹12.0L - 24.0L CTC',
              status: 'OPTIMAL PATHWAY',
              variant: 'success' as const,
              details: item.description,
              skills: Array.isArray(item.core_skills) ? item.core_skills : ['Python', 'PostgreSQL', 'Docker'],
              steps: Array.isArray(item.recommended_steps) ? item.recommended_steps : ['Complete Foundations', 'Build Capstone', 'Pass Assessment'],
            }))
          );
        } else {
          setCareerPaths(fallbackPaths);
        }
      } catch (err) {
        console.error('Failed to load career paths:', err);
        setCareerPaths(fallbackPaths);
      } finally {
        setLoading(false);
      }
    }
    loadPaths();
  }, []);

  const fallbackPaths = [
    {
      id: 'PATH-DIST-SYS',
      title: 'Distributed Systems & Backend Infrastructure Engineer',
      entity: 'Enterprise Cloud & Fintech // Growth: +34% YoY Demand',
      timestamp: '₹18.0L - 28.0L CTC',
      status: 'TOP COHORT FIT (94%)',
      variant: 'success' as const,
      details: 'Architect high-throughput event streaming systems, microservices, and fault-tolerant data stores.',
      skills: ['Python', 'Golang', 'PostgreSQL', 'Docker', 'Kubernetes', 'Apache Kafka'],
      steps: ['Master Concurrency & AsyncIO', 'Deploy Multi-Node K8s Cluster', 'Achieve 90%+ Assessment Score'],
    },
    {
      id: 'PATH-EDGE-AI',
      title: 'Edge AI & Embedded Neural Telematics Engineer',
      entity: 'Autonomous Robotics & Aerospace // Growth: +42% YoY Demand',
      timestamp: '₹16.0L - 26.0L CTC',
      status: 'HIGH DEFENSE DEMAND',
      variant: 'signal' as const,
      details: 'Develop quantized machine learning models for resource-constrained FPGA and micro-controller hardware.',
      skills: ['C++20', 'PyTorch', 'TensorRT', 'Embedded C', 'ROS2'],
      steps: ['Complete Embedded Systems Sprint', 'Publish SIH Hardware Capstone', 'Pass Edge Inference Benchmark'],
    },
  ];

  const filtered = careerPaths.filter((r) => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.entity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="TIER 01 ACCREDITED"
      category="STUDENT PORTAL // ACADEMIC TALENT REPOSITORY"
      title="Career - Career Path"
      description="Student Portal - Career - Career Path module."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="upload" size={14} className="mr-1" />
            Synchronize Docket
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="download" size={14} className="mr-1" />
            Export Audit Ledger
          </Button>
        </>
      }
      kpis={[
        { label: 'Verified Modules', value: '16 / 18', delta: 'OPTIMAL', deltaType: 'success', subtext: 'Updated Today', icon: 'dashboard' },
        { label: 'Skill Benchmark', value: '86.4%', delta: '+4.1%', deltaType: 'success', subtext: 'Cohort Standard', icon: 'verified' },
        { label: 'Dossier Status', value: 'ACTIVE', delta: 'SYNCHRONIZED', deltaType: 'neutral', subtext: 'Root Validated', icon: 'token' },
        { label: 'National Percentile', value: 'TOP 10%', delta: 'AICTE TIER-1', deltaType: 'neutral', subtext: 'SIH-2024 Compliant', icon: 'shield' },
      ]}
    >
      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'active', 'archived'].map((tab) => (
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
              {tab === 'all' ? 'All Telemetry (03)' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter docket reference or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Icon name="search" size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Dockets Feed */}
      <div className="space-y-space-sm">
        {filtered.map((item) => (
          <Card key={item.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={item.variant}>{item.status}</Badge>
                  <span className="font-mono text-fg-muted">{item.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{item.entity}</span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {item.title}
                </h2>

                <p className="text-body-sm text-fg-secondary font-sans">
                  {item.details}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="font-label-mono text-[10px] text-fg-muted uppercase mr-1">Core Vectors:</span>
                  {item.skills?.map((skill: string) => (
                    <span key={skill} className="px-2 py-0.5 bg-bg-subtle text-fg-primary font-label-mono text-[10px] border border-border-hairline font-bold">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                  <span>COMPENSATION BAND: <strong className="text-status-success font-bold font-metric-tabular">{item.timestamp}</strong></span>
                  <span>ROADMAP STEPS: <strong className="text-fg-primary font-semibold">{item.steps?.length || 3} Phases</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button variant="signal" size="sm">Adopt Career Pathway</Button>
                <Button variant="outline" size="sm">Benchmark Skill Gap</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
