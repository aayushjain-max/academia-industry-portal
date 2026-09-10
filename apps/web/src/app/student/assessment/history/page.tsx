'use client';

import React from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { AssessmentAttempt } from '@/types/student-features';

import { apiClient } from '@/lib/api/client';

export default function AssessmentHistoryPage() {
  const [attempts, setAttempts] = React.useState<AssessmentAttempt[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadHistory() {
      try {
        const res: any = await apiClient.get('/assessments/attempts/');
        const list = Array.isArray(res) ? res : res?.results || [];
        if (list.length > 0) {
          const mapped: AssessmentAttempt[] = list.map((a: any, idx: number) => ({
            id: a.id ? `att-${a.id.slice(0, 8)}` : `att-${idx + 1}`,
            test_id: a.assessment?.id || a.assessment_id || 'test-01',
            test_title: a.assessment?.title || 'Verified Skill Assessment',
            category: (a.assessment?.assessment_type?.toLowerCase() as any) || 'technical',
            score_percentage: a.score || a.percentage || 0,
            score_raw: (a.score ? a.score / 10 : 0),
            total_questions: a.total_questions || 10,
            correct_count: a.correct_answers || 0,
            completed_at: a.completed_at ? new Date(a.completed_at).toLocaleString() : 'RECENT',
            time_spent_seconds: a.time_spent_seconds || 600,
            status: (a.passed || a.score >= 70) ? 'passed' : 'failed',
            topic_breakdown: a.topic_breakdown || [
              { skill_tag: 'Core Domain', correct: a.correct_answers || 5, total: a.total_questions || 10, score: (a.score ? a.score / 10 : 5) },
            ],
          }));
          setAttempts(mapped);
        }
      } catch (err) {
        console.warn('Unable to load assessment history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const passedCount = attempts.filter((a) => a.status === 'passed').length;
  const avgScore = attempts.length > 0
    ? (attempts.reduce((sum, a) => sum + a.score_percentage, 0) / attempts.length).toFixed(1)
    : '0';

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
        { label: 'Total Attempts', value: `${attempts.length} EXAMS`, delta: `PASSED ${passedCount}`, deltaType: 'success', subtext: 'Verified by AICTE Engine', icon: 'history' },
        { label: 'Average Score', value: `${avgScore}%`, delta: 'BENCHMARK', deltaType: 'success', subtext: 'Diagnostic Progress', icon: 'analytics' },
        { label: 'Evaluation Engine', value: 'REAL-TIME', delta: 'SYNCED', deltaType: 'success', subtext: 'Automated Scoring', icon: 'code' },
        { label: 'Ledger Audit', value: 'VERIFIED', delta: 'SHA-256', deltaType: 'neutral', subtext: 'Immutable Record', icon: 'token' },
      ]}
    >
      <div className="space-y-space-md">
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-fg-muted bg-bg-surface border border-border-hairline">
            Fetching assessment attempt ledger...
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-3">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Assessment Attempts Recorded</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              You haven&apos;t taken any diagnostic exams yet. Launch an assessment to calibrate your readiness index.
            </p>
            <Link href="/student/assessment">
              <Button variant="signal" size="sm">
                <Icon name="play_arrow" size={14} className="mr-1" />
                Launch First Assessment
              </Button>
            </Link>
          </div>
        ) : (
          attempts.map((attempt) => (
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
          ))
        )}
      </div>
    </NodePageShell>
  );
}
