'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getDepartmentStudents,
  getSkillHeatmap,
  getCurriculumAlignment,
  DepartmentStudent,
  SkillHeatmapData,
  CurriculumAlignmentItem,
} from '@/features/academicians/api';
import { Loader2, Search, Filter, AlertCircle, ArrowRight } from 'lucide-react';

export default function StudentEmployabilityCommandCenter() {
  const [activeTab, setActiveTab] = useState<'roster' | 'heatmap' | 'curriculum'>('roster');
  const [students, setStudents] = useState<DepartmentStudent[]>([]);
  const [heatmap, setHeatmap] = useState<SkillHeatmapData | null>(null);
  const [curriculum, setCurriculum] = useState<{ department: string; alignments: CurriculumAlignmentItem[] } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [batchFilter, setBatchFilter] = useState<string>('all');
  const [readinessFilter, setReadinessFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<DepartmentStudent | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [studRes, heatRes, currRes] = await Promise.all([
        getDepartmentStudents({
          batch: batchFilter !== 'all' ? batchFilter : undefined,
          readiness: readinessFilter !== 'all' ? readinessFilter : undefined,
          search: searchQuery || undefined,
        }),
        getSkillHeatmap({ batch: batchFilter !== 'all' ? batchFilter : undefined }),
        getCurriculumAlignment().catch(() => null),
      ]);
      setStudents(studRes || []);
      setHeatmap(heatRes);
      if (currRes) setCurriculum(currRes);
    } catch (err: any) {
      console.error('Failed to load student command center data', err);
      setError(err?.message || 'Failed to fetch student employability data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [batchFilter, readinessFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const industryReadyCount = students.filter((s) => s.readiness_category === 'INDUSTRY_READY').length;
  const almostReadyCount = students.filter((s) => s.readiness_category === 'ALMOST_READY').length;
  const needsInterventionCount = students.filter((s) => s.readiness_category === 'NEEDS_INTERVENTION' || s.readiness_category === 'AT_RISK').length;

  return (
    <NodePageShell
      nodeId="DEPT-EMPLOYABILITY-01"
      nodeStatus="ACTIVE TELEMETRY"
      category="STUDENT EMPLOYABILITY COMMAND CENTER & SKILL HEATMAP"
      title="Student Employability & Curricular Matrix"
      description="Supervisory command center for tracking cohort readiness, skill gaps, at-risk student interventions, and curriculum-to-industry alignment."
      kpis={[
        { label: 'Total Department Scholars', value: students.length.toString(), delta: 'SYNCHRONIZED', deltaType: 'neutral', subtext: 'Enrolled in Department', icon: 'school' },
        { label: 'Industry Ready', value: industryReadyCount.toString(), delta: `${Math.round((industryReadyCount / Math.max(students.length, 1)) * 100)}%`, deltaType: 'success', subtext: 'Score ≥ 80%', icon: 'check_circle' },
        { label: 'Almost Ready', value: almostReadyCount.toString(), delta: `${Math.round((almostReadyCount / Math.max(students.length, 1)) * 100)}%`, deltaType: 'warning', subtext: 'Score 65-79%', icon: 'schedule' },
        { label: 'Needs Intervention', value: needsInterventionCount.toString(), delta: 'PRIORITY', deltaType: 'danger', subtext: 'Action Plan Required', icon: 'error' },
      ]}
    >
      {/* Navigation Tabs */}
      <div className="bg-bg-surface border border-border-strong flex items-center overflow-x-auto font-mono text-xs">
        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-3 uppercase whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'roster'
              ? 'bg-fg-primary text-bg-surface font-bold border-b-2 border-portal-primary'
              : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle'
          }`}
        >
          <Icon name="groups" size={16} />
          <span>Student Directory ({students.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`px-4 py-3 uppercase whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'heatmap'
              ? 'bg-fg-primary text-bg-surface font-bold border-b-2 border-portal-primary'
              : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle'
          }`}
        >
          <Icon name="grid_view" size={16} />
          <span>Skill Heatmap Matrix</span>
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-3 uppercase whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'curriculum'
              ? 'bg-fg-primary text-bg-surface font-bold border-b-2 border-portal-primary'
              : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle'
          }`}
        >
          <Icon name="sync_alt" size={16} />
          <span>Curriculum ↔ Industry Alignment</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-fg-primary" />
          <span className="font-label-mono text-xs uppercase text-fg-muted">
            Aggregating department telemetry...
          </span>
        </div>
      ) : error ? (
        <div className="p-space-lg bg-bg-surface border border-status-danger/40 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-status-danger mx-auto" />
          <p className="font-mono text-xs text-status-danger">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : activeTab === 'roster' ? (
        <div className="space-y-space-md">
          {/* Controls Filter Ribbon */}
          <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="bg-bg-canvas border border-border-strong p-2 font-mono text-xs uppercase text-fg-primary outline-none"
              >
                <option value="all">All Batches</option>
                <option value="4">Year 4 (Final Year)</option>
                <option value="3">Year 3 (Pre-Final)</option>
                <option value="2">Year 2 (Sophomore)</option>
                <option value="1">Year 1 (Freshman)</option>
              </select>

              <select
                value={readinessFilter}
                onChange={(e) => setReadinessFilter(e.target.value)}
                className="bg-bg-canvas border border-border-strong p-2 font-mono text-xs uppercase text-fg-primary outline-none"
              >
                <option value="all">All Readiness</option>
                <option value="INDUSTRY_READY">Industry Ready (≥ 80%)</option>
                <option value="ALMOST_READY">Almost Ready (65-79%)</option>
                <option value="NEEDS_INTERVENTION">Needs Intervention (50-64%)</option>
                <option value="AT_RISK">At Risk (&lt; 50%)</option>
              </select>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search scholar name, roll no, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary text-xs outline-none"
              />
              <button type="submit" className="absolute right-2.5 top-2.5 text-fg-muted">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Student Records Grid */}
          <div className="space-y-space-sm">
            {students.length === 0 ? (
              <div className="p-space-lg bg-bg-surface border border-dashed text-center text-xs font-mono text-fg-muted">
                No students match the selected department filters.
              </div>
            ) : (
              students.map((student) => (
                <Card key={student.id} className="hover:border-border-strong transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                        <Badge variant={student.badge_color}>{student.readiness_category.replace('_', ' ')}</Badge>
                        <span className="font-mono text-fg-primary font-bold">
                          READINESS: {student.readiness_score}%
                        </span>
                        {student.roll_number && (
                          <>
                            <span className="text-border-hairline">|</span>
                            <span className="text-fg-muted font-mono">{student.roll_number}</span>
                          </>
                        )}
                        <span className="text-border-hairline">|</span>
                        <span className="text-fg-secondary">Year {student.year_of_study} // {student.degree}</span>
                      </div>

                      <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                        {student.name}
                      </h3>
                      <p className="font-mono text-xs text-fg-muted">{student.email}</p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {student.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-bg-subtle text-fg-primary font-label-mono text-[10px] border border-border-hairline"
                          >
                            {s.name} ({s.proficiency})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 shrink-0">
                      <Button
                        variant="signal"
                        size="sm"
                        onClick={() => setSelectedStudent(student)}
                      >
                        Inspect Dossier &amp; Intervene
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : activeTab === 'heatmap' ? (
        <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <span className="font-label-mono text-xs text-fg-muted uppercase">2D PROFICIENCY LEDGER</span>
              <h3 className="font-headline-sm text-lg font-bold text-fg-primary">
                Live Cohort Skill Heatmap Matrix
              </h3>
            </div>
            <span className="font-label-mono text-xs text-status-success font-bold">
              ✓ REAL-TIME DEMAND BENCHMARK
            </span>
          </div>

          {heatmap && (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-bg-canvas">
                    <th className="p-3 text-left uppercase text-fg-muted">Cohort Batch</th>
                    <th className="p-3 text-center uppercase text-fg-muted">Scholars</th>
                    {heatmap.skill_columns.map((col) => (
                      <th key={col} className="p-3 text-center uppercase text-fg-primary font-bold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {heatmap.cohorts.map((row) => (
                    <tr key={row.cohort} className="hover:bg-bg-subtle/40">
                      <td className="p-3 font-bold text-fg-primary">{row.cohort}</td>
                      <td className="p-3 text-center text-fg-muted">{row.student_count}</td>
                      {heatmap.skill_columns.map((col) => {
                        const score = row.skills[col] ?? 0;
                        const bgIntensity =
                          score >= 75
                            ? 'bg-status-success/20 text-status-success font-bold'
                            : score >= 50
                            ? 'bg-status-warning/20 text-status-warning font-bold'
                            : 'bg-status-danger/20 text-status-danger font-bold';

                        return (
                          <td key={col} className="p-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs ${bgIntensity}`}>
                              {score}%
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
          <div className="border-b pb-2">
            <span className="font-label-mono text-xs text-fg-muted uppercase">SYLLABUS ↔ HIRING DEMAND</span>
            <h3 className="font-headline-sm text-lg font-bold text-fg-primary">
              Curriculum Alignment &amp; Industry Deficit Analysis
            </h3>
          </div>

          <div className="space-y-3">
            {curriculum?.alignments.map((item) => (
              <div
                key={item.skill_name}
                className="p-space-md bg-bg-canvas border border-border-hairline space-y-2 font-mono text-xs"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-fg-primary">{item.skill_name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-bg-subtle text-fg-muted border">
                      {item.category}
                    </span>
                  </div>
                  <Badge variant={item.status_tag === 'CRITICAL GAP' ? 'danger' : item.status_tag === 'MODERATE GAP' ? 'warning' : 'success'}>
                    {item.status_tag} (-{item.gap}% GAP)
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-fg-muted">
                    <span>Curriculum Supply: {item.curriculum_supply_score}%</span>
                    <span>Industry Demand: {item.demand_score}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 overflow-hidden flex">
                    <div className="bg-fg-primary h-full" style={{ width: `${item.curriculum_supply_score}%` }} />
                    <div className="bg-portal-primary h-full" style={{ width: `${item.gap}%` }} />
                  </div>
                </div>

                <p className="text-[11px] text-fg-secondary pt-1 border-t font-sans">
                  <strong>Prescription:</strong> {item.prescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-lg p-space-lg space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="font-bold text-lg text-fg-primary">{selectedStudent.name}</h3>
                <span className="text-fg-muted text-[10px]">{selectedStudent.email}</span>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="font-bold text-sm">✕</button>
            </div>

            <div className="space-y-2 p-3 bg-bg-canvas border">
              <div className="flex justify-between">
                <span className="text-fg-muted">Readiness Score:</span>
                <span className="font-bold text-fg-primary">{selectedStudent.readiness_score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">Degree &amp; Batch:</span>
                <span className="font-bold">{selectedStudent.degree} (Year {selectedStudent.year_of_study})</span>
              </div>
              {selectedStudent.cgpa && (
                <div className="flex justify-between">
                  <span className="text-fg-muted">CGPA:</span>
                  <span className="font-bold">{selectedStudent.cgpa}</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase text-fg-muted block">Verified Skills</span>
              <div className="flex flex-wrap gap-1">
                {selectedStudent.skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-bg-subtle border text-[10px]">
                    {s.name} — {s.proficiency}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>Close</Button>
              <Link
                href={`/academician/mentorship?studentId=${selectedStudent.id}`}
                className="px-3 py-1.5 bg-portal-primary text-portal-on-primary font-bold uppercase text-xs hover:bg-portal-primary-hover"
              >
                Initiate Advisory Intervention
              </Link>
            </div>
          </div>
        </div>
      )}
    </NodePageShell>
  );
}
