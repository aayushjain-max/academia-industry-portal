'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { CareerRole, GapAnalysisResult, ReadinessScoreResult, ActionPlanResult } from '@/types/student-features';
import { calculateSkillGaps, calculateReadinessIndex, generateActionPlan } from '@/lib/scoring';

const CAREER_ROLES: CareerRole[] = [
  {
    id: 'role-01',
    title: 'Full Stack Engineer',
    category: 'Software Engineering',
    description: 'Specializes in modern TypeScript, Next.js, distributed backends, REST/GraphQL APIs, and cloud databases.',
    benchmark_skills: {
      'TypeScript': 8.5,
      'Next.js / React': 8.5,
      'PostgreSQL': 7.5,
      'System Architecture': 7.0,
      'Containerization (Docker)': 7.0,
      'REST / API Design': 8.0,
    },
    is_industry_verified: true,
  },
  {
    id: 'role-02',
    title: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    description: 'Focuses on Python, PyTorch/TensorFlow, LLM inference, embedding pipelines, and data processing.',
    benchmark_skills: {
      'Python': 9.0,
      'Machine Learning': 8.5,
      'LLM & Prompt Eng': 8.0,
      'Vector Databases': 7.5,
      'Data Pipelines': 7.0,
      'Mathematical Foundations': 8.0,
    },
    is_industry_verified: true,
  },
  {
    id: 'role-03',
    title: 'Cloud & DevOps Architect',
    category: 'Cloud Infrastructure',
    description: 'Expertise in Kubernetes orchestration, CI/CD pipelines, AWS/GCP architecture, and infrastructure as code.',
    benchmark_skills: {
      'Kubernetes / Docker': 8.5,
      'CI/CD Pipelines': 8.0,
      'Cloud Architecture': 8.0,
      'Linux & Networking': 7.5,
      'Security & Hardening': 7.5,
      'Monitoring & Observability': 7.0,
    },
    is_industry_verified: true,
  },
];

const STUDENT_SKILLS: Record<string, number> = {
  'typescript': 8.8,
  'next.js / react': 8.5,
  'postgresql': 7.2,
  'rest / api design': 7.8,
  'system architecture': 5.0,
  'containerization (docker)': 4.5,
  'python': 7.5,
  'machine learning': 4.0,
  'ci/cd pipelines': 5.5,
  'linux & networking': 6.0,
};

const ATTEMPTED_SKILL_TAGS = [
  'TypeScript',
  'Next.js / React',
  'PostgreSQL',
  'REST / API Design',
  'System Architecture',
];

export default function StudentReadinessPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(CAREER_ROLES[0].id);

  const selectedRole = useMemo(() => {
    return CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0];
  }, [selectedRoleId]);

  const gapAnalysis: GapAnalysisResult = useMemo(() => {
    return calculateSkillGaps(selectedRole, STUDENT_SKILLS);
  }, [selectedRole]);

  const readinessScore: ReadinessScoreResult = useMemo(() => {
    return calculateReadinessIndex(selectedRole, STUDENT_SKILLS, ATTEMPTED_SKILL_TAGS);
  }, [selectedRole]);

  const actionPlan: ActionPlanResult = useMemo(() => {
    return generateActionPlan(selectedRole.title, gapAnalysis.gaps);
  }, [selectedRole, gapAnalysis]);

  return (
    <NodePageShell
      nodeId="STU-8042 // IRI-COCKPIT"
      nodeStatus="AICTE BENCHMARK V4.2 ACTIVE"
      category="INDUSTRY READINESS TELEMETRY"
      title="Industry Readiness Index (IRI)"
      description="Multi-factor career readiness scoring benchmarked against real-time industry job specs and verified skills."
      actions={
        <div className="flex items-center gap-space-sm flex-wrap shrink-0">
          <Link href="/student/assessment" className="inline-flex">
            <Button variant="signal" size="sm" className="whitespace-nowrap">
              <Icon name="quiz" size={14} className="mr-1.5" />
              Take Verification Test
            </Button>
          </Link>
          <Link href="/portfolio/aarav-sharma" className="inline-flex">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Icon name="visibility" size={14} className="mr-1.5" />
              Preview Public Portfolio
            </Button>
          </Link>
        </div>
      }
      kpis={[
        {
          label: 'Overall IRI Score',
          value: `${readinessScore.overallScore}%`,
          delta: readinessScore.tier.replace('_', ' '),
          deltaType: readinessScore.overallScore >= 70 ? 'success' : 'warning',
          subtext: 'Weighted Multi-Factor Index',
          icon: 'speed',
        },
        {
          label: 'Skill Match Ratio',
          value: `${readinessScore.skillReadiness}%`,
          delta: 'TARGET ALIGNED',
          deltaType: 'success',
          subtext: 'Weighted Benchmark Overlap',
          icon: 'verified',
        },
        {
          label: 'Assessment Coverage',
          value: `${readinessScore.assessmentCoverage}%`,
          delta: `${ATTEMPTED_SKILL_TAGS.length} VERIFIED`,
          deltaType: 'neutral',
          subtext: 'Verified Against Tests',
          icon: 'rule',
        },
        {
          label: 'Skill Consistency',
          value: `${readinessScore.consistency}%`,
          delta: 'NO CRITICAL DROPOUT',
          deltaType: 'success',
          subtext: 'Even Competency Balance',
          icon: 'balance',
        },
      ]}
    >
      {/* Target Role Selector Toolbar */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="space-y-1">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase block">
            TARGET CAREER ROLE BENCHMARK
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {CAREER_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`px-3 py-1.5 font-label-mono text-xs uppercase border transition-colors ${
                  selectedRoleId === role.id
                    ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                    : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
                }`}
              >
                {role.title}
              </button>
            ))}
          </div>
        </div>

        <div className="text-right">
          <span className="font-label-mono text-[10px] text-fg-muted block">READINESS TIER</span>
          <span className="font-label-mono text-xs font-bold px-2 py-0.5 bg-accent-signal text-fg-primary border border-border-strong">
            {readinessScore.tier}
          </span>
        </div>
      </div>

      {/* Main Readiness Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {/* Left 2 Cols: Benchmark Comparison & Gap Matrix */}
        <div className="lg:col-span-2 space-y-space-md">
          {/* Skill Breakdown Telemetry Bars */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                  Skill Benchmark Telemetry
                </h3>
                <p className="font-body-sm text-fg-muted">
                  Comparison between your verified score (0-10) and the industry benchmark for {selectedRole.title}.
                </p>
              </div>
              <span className="font-label-mono text-xs text-status-success font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-status-success rounded-full" />
                ACTIVE BENCHMARK
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {gapAnalysis.gaps.map((item) => {
                const currentPct = (item.current_score / 10) * 100;
                const requiredPct = (item.required_score / 10) * 100;

                return (
                  <div key={item.skill} className="space-y-1.5 p-3 border border-border-hairline bg-bg-canvas">
                    <div className="flex items-center justify-between text-xs font-label-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-fg-primary">{item.skill}</span>
                        <Badge
                          variant={
                            item.severity === 'Critical'
                              ? 'danger'
                              : item.severity === 'Moderate'
                              ? 'warning'
                              : 'success'
                          }
                        >
                          {item.severity === 'Met' ? 'REQUIREMENT MET' : `${item.severity} GAP (-${item.gap}pt)`}
                        </Badge>
                      </div>

                      <div className="text-fg-muted">
                        CANDIDATE: <strong className="text-fg-primary">{item.current_score}</strong> / REQ:{' '}
                        <strong>{item.required_score}</strong>
                      </div>
                    </div>

                    {/* Telemetry Double-Bar */}
                    <div className="relative w-full h-3 bg-bg-subtle border border-border-hairline overflow-hidden">
                      {/* Candidate Score */}
                      <div
                        className={`h-full ${
                          item.severity === 'Critical'
                            ? 'bg-error'
                            : item.severity === 'Moderate'
                            ? 'bg-status-warning'
                            : 'bg-status-success'
                        }`}
                        style={{ width: `${currentPct}%` }}
                      />
                      {/* Required Target Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-fg-primary z-10"
                        style={{ left: `${requiredPct}%` }}
                        title={`Required: ${item.required_score}/10`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Plan Breakdown */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-space-md">
            <div>
              <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                Prioritized Action Plan
              </h3>
              <p className="font-body-sm text-fg-muted">
                Synthesized roadmap to eliminate high-impact skill bottlenecks.
              </p>
            </div>

            <div className="space-y-2">
              {actionPlan.plan.map((item, idx) => (
                <div key={idx} className="p-3 border border-border-hairline bg-bg-canvas space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2 font-label-mono text-xs">
                    <span className="font-bold text-fg-primary uppercase flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-accent-signal">flag</span>
                      {item.focus_area}
                    </span>
                    <span className="text-fg-muted">EST: <strong>{item.estimated_time_to_close}</strong></span>
                  </div>

                  <p className="text-xs font-mono text-fg-secondary font-semibold">
                    {item.milestone}
                  </p>

                  <ul className="list-disc list-inside text-xs font-sans text-fg-muted space-y-1 pt-1">
                    {item.recommended_actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Readiness Index Breakdown & Recommendations */}
        <div className="space-y-space-md">
          {/* Index Weight Formula Card */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-3">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
              ALGORITHMIC WEIGHT MATRIX
            </span>
            <div className="space-y-2 font-label-mono text-xs">
              <div className="flex justify-between border-b border-border-hairline pb-1">
                <span>SKILL OVERLAP (60%):</span>
                <span className="font-bold text-fg-primary">{readinessScore.skillReadiness}%</span>
              </div>
              <div className="flex justify-between border-b border-border-hairline pb-1">
                <span>TEST COVERAGE (25%):</span>
                <span className="font-bold text-fg-primary">{readinessScore.assessmentCoverage}%</span>
              </div>
              <div className="flex justify-between border-b border-border-hairline pb-1">
                <span>CONSISTENCY (15%):</span>
                <span className="font-bold text-fg-primary">{readinessScore.consistency}%</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold bg-bg-subtle p-2 border border-border-hairline">
                <span>COMPOSITE IRI:</span>
                <span className="text-status-success">{readinessScore.overallScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Quick Launch Recommendations */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-3">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
              RECOMMENDED ACTIONS
            </span>
            <div className="space-y-2">
              <Link
                href="/student/assessment"
                className="block p-3 border border-border-hairline bg-bg-canvas hover:border-border-strong transition-colors"
              >
                <div className="font-label-mono text-xs font-bold text-fg-primary flex items-center justify-between">
                  <span>SYSTEM DESIGN DIAGNOSTIC</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
                <p className="text-[11px] text-fg-muted mt-1">
                  Raise your System Architecture score (+2.5pt potential).
                </p>
              </Link>

              <Link
                href="/student/assistant"
                className="block p-3 border border-border-hairline bg-bg-canvas hover:border-border-strong transition-colors"
              >
                <div className="font-label-mono text-xs font-bold text-fg-primary flex items-center justify-between">
                  <span>CONSULT AI ADVISOR</span>
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
                <p className="text-[11px] text-fg-muted mt-1">
                  Get personalized study plans for Docker & Containerization.
                </p>
              </Link>

              <Link
                href="/student/opportunities"
                className="block p-3 border border-border-hairline bg-bg-canvas hover:border-border-strong transition-colors"
              >
                <div className="font-label-mono text-xs font-bold text-fg-primary flex items-center justify-between">
                  <span>MATCH OPPORTUNITIES</span>
                  <span className="material-symbols-outlined text-[16px]">work</span>
                </div>
                <p className="text-[11px] text-fg-muted mt-1">
                  View 14 internships matching your current 74% readiness tier.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </NodePageShell>
  );
}
