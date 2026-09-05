'use client';

import React, { useState } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card, DataProgress } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: 'MOD-K8S-DOCKER-01',
      title: 'Containerization & Docker Swarm to Kubernetes',
      institution: 'IIT Bombay Cloud Lab x Red Hat',
      deficitTarget: 'DOCKER / K8S (-30% DEFICIT)',
      progress: 45,
      totalModules: 12,
      completedModules: 5,
      timeEstimate: '18 Hours Remaining',
      difficulty: 'INTERMEDIATE // CORE',
      status: 'IN PROGRESS',
      statusVariant: 'warning' as const,
    },
    {
      id: 'MOD-FASTAPI-PROD-02',
      title: 'High-Throughput Microservices with FastAPI & AsyncIO',
      institution: 'TechNova Engineering Academy',
      deficitTarget: 'FASTAPI ARCHITECTURE (-15% DEFICIT)',
      progress: 70,
      totalModules: 10,
      completedModules: 7,
      timeEstimate: '6 Hours Remaining',
      difficulty: 'ADVANCED',
      status: 'IN PROGRESS',
      statusVariant: 'warning' as const,
    },
    {
      id: 'MOD-K8S-PROD-03',
      title: 'Production Kubernetes: Helm, Ingress & Service Mesh',
      institution: 'Linux Foundation / CNCF Node',
      deficitTarget: 'KUBERNETES CLUSTERS (-30% DEFICIT)',
      progress: 15,
      totalModules: 14,
      completedModules: 2,
      timeEstimate: '26 Hours Remaining',
      difficulty: 'ADVANCED // TIER 1',
      status: 'QUEUED SPRINT',
      statusVariant: 'danger' as const,
    },
    {
      id: 'MOD-PG-PERF-04',
      title: 'PostgreSQL Deep Query Planning, EXPLAIN ANALYZE & Partitioning',
      institution: 'IIT Bombay Advanced DB Group',
      deficitTarget: 'BENCHMARK UPGRADE (+6% BOOST)',
      progress: 100,
      totalModules: 8,
      completedModules: 8,
      timeEstimate: 'COMPLETED & VERIFIED',
      difficulty: 'ADVANCED',
      status: 'VERIFIED ON PASSPORT',
      statusVariant: 'success' as const,
    },
  ]);

  return (
    <NodePageShell
      nodeId="STU-8042 // CANDIDATE"
      nodeStatus="REMEDIATION PROTOCOL ACTIVE"
      category="CURRICULUM GAP BRIDGING & ACCELERATION"
      title="Curriculum Tracks & Accelerated Learning"
      description="Personalized pedagogical sprint modules automatically synthesized from your real-time skill deficit diagnostic scan, aligning your capability with live industrial requisitions."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="play_arrow" size={14} className="mr-1" />
            Resume Active Sprint (+14% Boost)
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="tune" size={14} className="mr-1" />
            Recalibrate Learning Roadmap
          </Button>
        </>
      }
      kpis={[
        { label: 'Identified Deficits', value: '02', delta: 'BLOCKING TIER-1', deltaType: 'danger', subtext: 'Docker & Kubernetes', icon: 'warning' },
        { label: 'Sprint Modules Completed', value: '22 / 44', delta: '50.0%', deltaType: 'warning', subtext: '+6 Modules This Month', icon: 'book_open' },
        { label: 'Deficit Closure Velocity', value: '+18.4%', delta: 'EST 14 DAYS', deltaType: 'success', subtext: 'To Complete Placement Readiness', icon: 'check_circle' },
        { label: 'AICTE Credit Transfer', value: '04 CREDITS', delta: 'ELIGIBLE', deltaType: 'neutral', subtext: 'Recognized by IIT Bombay', icon: 'school' },
      ]}
    >
      <div className="space-y-space-sm">
        {courses.map((course) => (
          <Card key={course.id} className="hover:border-border-strong transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={course.statusVariant}>{course.status}</Badge>
                  <span className="font-mono text-fg-muted">{course.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold">{course.institution}</span>
                  <span className="text-status-danger font-bold text-[11px] bg-red-50 px-1 border border-status-danger/30">
                    TARGET: {course.deficitTarget}
                  </span>
                </div>

                <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {course.title}
                </h2>

                <div className="w-full max-w-xl py-1">
                  <DataProgress
                    label={`Module Progress: ${course.completedModules}/${course.totalModules} Completed`}
                    value={course.progress}
                    variant={course.progress === 100 ? 'success' : course.progress > 40 ? 'warning' : 'danger'}
                  />
                </div>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                  <span>TIMELINE: <strong className="text-fg-primary">{course.timeEstimate}</strong></span>
                  <span>DIFFICULTY: <strong className="text-fg-secondary">{course.difficulty}</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Button
                  variant={course.progress === 100 ? 'outline' : 'signal'}
                  size="sm"
                >
                  {course.progress === 100 ? 'Inspect Certification' : 'Enter Interactive Terminal'}
                </Button>
                <Button variant="outline" size="sm">
                  Download Lab Exercises
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
