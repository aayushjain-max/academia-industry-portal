'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { AssessmentTest, AssessmentCategory } from '@/types/student-features';

const SAMPLE_TESTS: AssessmentTest[] = [
  {
    id: 'test-tech-01',
    title: 'TypeScript & Next.js Architecture',
    slug: 'typescript-nextjs',
    category: 'technical',
    description: 'Comprehensive evaluation of static typing, generics, React Server Components, server actions, and caching strategies.',
    duration_minutes: 15,
    total_questions: 10,
    passing_score: 70,
    skill_tags: ['TypeScript', 'Next.js / React', 'Web Architecture'],
  },
  {
    id: 'test-tech-02',
    title: 'PostgreSQL & Database Optimization',
    slug: 'postgresql-optimization',
    category: 'technical',
    description: 'Relational data modeling, indexing strategies (B-Tree, GIN), RLS security policies, and query optimization.',
    duration_minutes: 15,
    total_questions: 10,
    passing_score: 70,
    skill_tags: ['PostgreSQL', 'SQL Optimization', 'Database Design'],
  },
  {
    id: 'test-tech-03',
    title: 'System Design & Distributed Scalability',
    slug: 'system-design',
    category: 'technical',
    description: 'Microservices, message broker pipelines (Kafka/Redis), load balancing, and high-availability patterns.',
    duration_minutes: 20,
    total_questions: 10,
    passing_score: 75,
    skill_tags: ['System Architecture', 'Distributed Systems'],
  },
  {
    id: 'test-soft-01',
    title: 'Workplace Communication & Cross-Functional Sync',
    slug: 'workplace-communication',
    category: 'soft',
    description: 'Asynchronous team collaboration, client negotiations, conflict resolution, and technical documentation.',
    duration_minutes: 10,
    total_questions: 8,
    passing_score: 75,
    skill_tags: ['Communication', 'Teamwork', 'Leadership'],
  },
  {
    id: 'test-apt-01',
    title: 'Algorithmic Problem Solving & Quantitative Logic',
    slug: 'quantitative-logic',
    category: 'aptitude',
    description: 'Analytical reasoning, probability, data interpretation, and algorithmic complexity tradeoffs.',
    duration_minutes: 15,
    total_questions: 10,
    passing_score: 80,
    skill_tags: ['Analytical Thinking', 'Problem Solving', 'Data Interpretation'],
  },
];

export default function StudentAssessmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AssessmentCategory>('all');
  const [search, setSearch] = useState('');

  const filteredTests = SAMPLE_TESTS.filter((t) => {
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
              Assessment History (08)
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
        { label: 'Completed Tests', value: '14 TESTS', delta: '13 PASSED', deltaType: 'success', subtext: 'Verified on Ledger', icon: 'task_alt' },
        { label: 'Average Score', value: '8.4 / 10', delta: 'TOP 10%', deltaType: 'success', subtext: 'National Percentile', icon: 'military_tech' },
        { label: 'Pending Retakes', value: '01 EXAM', delta: 'OPTIONAL', deltaType: 'neutral', subtext: 'System Design', icon: 'sync' },
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
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-mono text-xs text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-signal"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-fg-muted text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* Tests Catalog Grid */}
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
    </NodePageShell>
  );
}
