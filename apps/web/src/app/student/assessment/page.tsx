'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { AssessmentTest, AssessmentCategory } from '@/types/student-features';

import { listAssessments } from '@/features/assessments/api';

export default function StudentAssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AssessmentCategory>('all');
  const [search, setSearch] = useState('');
  const [tests, setTests] = useState<AssessmentTest[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await listAssessments();
        if (Array.isArray(res) && res.length > 0) {
          const mapped: AssessmentTest[] = res.map((item: any, idx: number) => ({
            id: item.id || `test-${idx}`,
            title: item.title,
            slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            category: (item.assessment_type?.toLowerCase() === 'soft_skill' ? 'soft' : item.assessment_type?.toLowerCase() as any) || 'technical',
            description: item.description || 'Proctored competency evaluation.',
            duration_minutes: item.duration_minutes || 15,
            total_questions: item.total_questions || 10,
            passing_score: item.passing_score || 70,
            skill_tags: item.skills_assessed?.map((s: any) => (typeof s === 'string' ? s : s.name)) || ['Technical Competency'],
          }));
          setTests(mapped);
        }
      } catch (err) {
        console.warn('Unable to load assessments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredTests = tests.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.skill_tags.some((st) => st.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <NodePageShell
      nodeId="STU-8042 // ASSESS-HUB"
      nodeStatus="AICTE PROCTORED ENGINE"
      category="VERIFIED SKILL ASSESSMENTS"
      title="Skill Assessments"
      description="Standardized technical, soft-skill, and aptitude examinations to benchmark your Industry Readiness Index."
      actions={
        <div className="flex items-center gap-space-xs">
          <Link href="/student/assessment/history">
            <Button variant="outline" size="sm">
              <Icon name="history" size={14} className="mr-1" />
              Assessment History
            </Button>
          </Link>
          <Link href="/student/readiness">
            <Button variant="signal" size="sm">
              <Icon name="speed" size={14} className="mr-1" />
              View Readiness Score
            </Button>
          </Link>
        </div>
      }
      kpis={[
        { label: 'Available Exams', value: `${tests.length} TESTS`, delta: 'PROCTORED', deltaType: 'success', subtext: 'Verified on Ledger', icon: 'task_alt' },
        { label: 'Benchmark Standard', value: '70% PASS', delta: 'AICTE', deltaType: 'success', subtext: 'National Percentile', icon: 'military_tech' },
        { label: 'Evaluation Speed', value: 'INSTANT', delta: 'REALTIME', deltaType: 'neutral', subtext: 'Automated Scoring', icon: 'sync' },
        { label: 'Ledger Signature', value: 'SHA-256', delta: 'SYNCED', deltaType: 'success', subtext: 'Immutable Credential', icon: 'token' },
      ]}
    >
      {/* Category Filter & Search Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Domains' },
            { key: 'technical', label: 'Technical' },
            { key: 'soft', label: 'Soft Skills' },
            { key: 'aptitude', label: 'Aptitude & Logic' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key as any)}
              className={`px-3 py-1 font-label-mono text-xs uppercase border transition-colors ${
                selectedCategory === tab.key
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search test or skill tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-mono text-xs text-fg-primary focus:outline-none focus:ring-2 focus:ring-portal-primary"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-fg-muted text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* Tests Catalog Grid */}
      <div className="space-y-space-md">
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-fg-muted bg-bg-surface border border-border-hairline">
            Fetching proctored assessment catalog...
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-2">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Assessments Found</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              No tests match your selected domain or search query. Adjust your filters to explore available diagnostics.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:border-border-strong transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 font-label-mono text-xs">
                    <Badge
                      variant={
                        test.category === 'technical'
                          ? 'signal'
                          : test.category === 'soft'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {test.category.toUpperCase()}
                    </Badge>
                    <span className="text-fg-muted flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-[14px]">timer</span>
                      {test.duration_minutes} MINS
                    </span>
                    <span className="text-fg-muted font-mono">
                      {test.total_questions} QUESTIONS
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                      {test.title}
                    </h3>
                    <p className="font-body-sm text-fg-muted mt-1">
                      {test.description}
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {test.skill_tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label-mono text-[10px] bg-bg-subtle border border-border-hairline px-1.5 py-0.5 text-fg-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border-hairline flex items-center justify-between">
                  <div className="font-label-mono text-xs text-fg-muted">
                    PASSING: <strong className="text-fg-primary">{test.passing_score}%</strong>
                  </div>

                  <Link href={`/student/assessment/${test.id}`}>
                    <Button variant="signal" size="sm">
                      <Icon name="play_arrow" size={14} className="mr-1" />
                      Launch Assessment
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </NodePageShell>
  );
}
