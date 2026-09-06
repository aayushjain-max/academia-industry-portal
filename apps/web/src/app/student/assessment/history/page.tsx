'use client';

import React from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { AssessmentAttempt } from '@/types/student-features';

const SAMPLE_ATTEMPTS: AssessmentAttempt[] = [
  {
    id: 'att-01',
    test_id: 'test-tech-01',
    test_title: 'TypeScript & Next.js Architecture',
    category: 'technical',
    score_percentage: 90,
    score_raw: 9.0,
    total_questions: 10,
    correct_count: 9,
    completed_at: '2026-09-05 // 14:32 IST',
    time_spent_seconds: 680,
    status: 'passed',
    topic_breakdown: [
      { skill_tag: 'TypeScript', correct: 5, total: 5, score: 10.0 },
      { skill_tag: 'Next.js / React', correct: 3, total: 3, score: 10.0 },
      { skill_tag: 'Web Architecture', correct: 1, total: 2, score: 5.0 },
    ],
  },
  {
    id: 'att-02',
    test_id: 'test-tech-02',
    test_title: 'PostgreSQL & Database Optimization',
    category: 'technical',
    score_percentage: 80,
    score_raw: 8.0,
    total_questions: 10,
    correct_count: 8,
    completed_at: '2026-09-03 // 11:15 IST',
    time_spent_seconds: 740,
    status: 'passed',
    topic_breakdown: [
      { skill_tag: 'PostgreSQL', correct: 4, total: 5, score: 8.0 },
      { skill_tag: 'SQL Optimization', correct: 2, total: 3, score: 6.7 },
      { skill_tag: 'Database Design', correct: 2, total: 2, score: 10.0 },
    ],
  },
  {
    id: 'att-03',
    test_id: 'test-apt-01',
    test_title: 'Algorithmic Problem Solving & Quantitative Logic',
    category: 'aptitude',
    score_percentage: 85,
    score_raw: 8.5,
    total_questions: 10,
    correct_count: 8,
    completed_at: '2026-08-28 // 16:45 IST',
    time_spent_seconds: 820,
    status: 'passed',
    topic_breakdown: [
      { skill_tag: 'Analytical Thinking', correct: 3, total: 3, score: 10.0 },
      { skill_tag: 'Problem Solving', correct: 3, total: 4, score: 7.5 },
      { skill_tag: 'Data Interpretation', correct: 2, total: 3, score: 6.7 },
    ],
  },
  {
    id: 'att-04',
    test_id: 'test-tech-03',
    test_title: 'System Design & Distributed Scalability',
    category: 'technical',
    score_percentage: 60,
    score_raw: 6.0,
    total_questions: 10,
    correct_count: 6,
    completed_at: '2026-08-20 // 18:10 IST',
    time_spent_seconds: 1100,
    status: 'failed',
    topic_breakdown: [
      { skill_tag: 'System Architecture', correct: 4, total: 6, score: 6.7 },
      { skill_tag: 'Distributed Systems', correct: 2, total: 4, score: 5.0 },
    ],
  },
];

export default function AssessmentHistoryPage() {
  return (
    <NodePageShell
      nodeId="STU-8042 // ASSESS-HISTORY"
      nodeStatus="MERKLE TREE VALIDATED"
      category="VERIFIED ATTEMPT LEDGER"
      title="Assessment History"
      description="Immutable ledger of all verified diagnostic examinations, topic-level scores, and Skill Passport timestamps."
      actions={
        <div className="flex items-center gap-space-xs">
          <Link href="/student/assessment">
            <Button variant="signal" size="sm">
              <Icon name="quiz" size={14} className="mr-1" />
              Take New Assessment
            </Button>
          </Link>
          <Link href="/student/readiness">
            <Button variant="outline" size="sm">
              <Icon name="speed" size={14} className="mr-1" />
              Readiness Score
            </Button>
          </Link>
        </div>
      }
      kpis={[
        { label: 'Total Attempts', value: '04 EXAMS', delta: 'PASSED 03', deltaType: 'success', subtext: 'Verified by AICTE Engine', icon: 'history' },
        { label: 'Average Score', value: '78.75%', delta: '+5.2% MoM', deltaType: 'success', subtext: 'Top 12% Cohort', icon: 'analytics' },
        { label: 'Best Domain', value: 'TYPESCRIPT', delta: '9.0 / 10.0', deltaType: 'success', subtext: 'Industry Certified', icon: 'code' },
        { label: 'Retake Priority', value: 'SYSTEM DESIGN', delta: '6.0 / 10.0', deltaType: 'warning', subtext: 'Critical Gap', icon: 'warning' },
      ]}
    >
      <div className="space-y-space-md">
        {SAMPLE_ATTEMPTS.map((attempt) => (
          <Card key={attempt.id} className="hover:border-border-strong transition-colors bg-bg-surface">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={attempt.status === 'passed' ? 'success' : 'danger'}>
                    {attempt.status === 'passed' ? 'PASSED' : 'RETAKE RECOMMENDED'}
                  </Badge>
                  <span className="font-mono text-fg-muted">{attempt.id}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-primary font-bold uppercase">{attempt.category}</span>
                </div>

                <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                  {attempt.test_title}
                </h3>

                {/* Topic Breakdown Pills */}
                <div className="flex flex-wrap gap-2 pt-1 font-label-mono text-xs">
                  {attempt.topic_breakdown.map((t) => (
                    <span
                      key={t.skill_tag}
                      className="bg-bg-subtle border border-border-hairline px-2 py-1 text-fg-primary"
                    >
                      {t.skill_tag}: <strong>{t.score}/10</strong> ({t.correct}/{t.total})
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-2">
                  <span>COMPLETED: <strong className="text-fg-primary">{attempt.completed_at}</strong></span>
                  <span>DURATION: <strong className="text-fg-primary">{Math.round(attempt.time_spent_seconds / 60)} MINS</strong></span>
                  <span>SCORE: <strong className="text-status-success font-bold">{attempt.score_percentage}% ({attempt.score_raw}/10)</strong></span>
                </div>
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <Link href={`/student/assessment/${attempt.test_id}`}>
                  <Button variant="signal" size="sm">
                    <Icon name="replay" size={14} className="mr-1" />
                    Re-Attempt Exam
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Icon name="download" size={14} className="mr-1" />
                  Export Telemetry
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </NodePageShell>
  );
}
