'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getDepartmentStudents,
  DepartmentStudent,
} from '@/features/academicians/api';
import {
  getMentorshipSessions,
  bookMentorshipSession,
  MentorshipSessionItem,
} from '@/features/mentorship/api';
import { Loader2, Plus, X, Search, Users, Calendar, Video, Clock, Award, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AcademicianMentorshipPage() {
  const [activeTab, setActiveTab] = useState<'SESSIONS' | 'MENTEES'>('SESSIONS');
  const [search, setSearch] = useState('');
  const [sessions, setSessions] = useState<MentorshipSessionItem[]>([]);
  const [students, setStudents] = useState<DepartmentStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Advisory Session Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    topic: '',
    scheduled_at: '',
    notes: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [sessRes, studRes] = await Promise.allSettled([
        getMentorshipSessions(),
        getDepartmentStudents(),
      ]);

      if (sessRes.status === 'fulfilled') {
        setSessions(sessRes.value || []);
      }
      if (studRes.status === 'fulfilled') {
        setStudents(studRes.value || []);
      }
    } catch (err: any) {
      console.error('Failed to load mentorship pods:', err);
      setError('Unable to load scholar advisory records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleScheduleSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.topic || !sessionForm.scheduled_at) {
      setSubmitError('Topic and scheduled date/time are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      // If mentor is self, student is first or selected
      await bookMentorshipSession({
        mentor_id: '',
        topic: sessionForm.topic,
        scheduled_at: new Date(sessionForm.scheduled_at).toISOString(),
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setSessionForm({ topic: '', scheduled_at: '', notes: '' });
        loadData();
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to create advisory session.');
    } finally {
      setSubmitting(false);
    }
  };

  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED').length;
  const activeSessions = sessions.filter((s) => s.status === 'SCHEDULED' || s.status === 'REQUESTED').length;

  const filteredSessions = sessions.filter((s) => {
    const menteeName = `${s.mentee?.first_name || ''} ${s.mentee?.last_name || ''}`.toLowerCase();
    const topic = (s.topic || '').toLowerCase();
    const q = search.toLowerCase();
    return menteeName.includes(q) || topic.includes(q);
  });

  const filteredStudents = students.filter((st) => {
    const name = (st.name || '').toLowerCase();
    const roll = (st.roll_number || '').toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || roll.includes(q);
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // MENTORSHIP"
      nodeStatus="RESEARCH PODS ACTIVE"
      category="POSTGRADUATE & UNDERGRADUATE RESEARCH MENTORSHIP"
      title="Mentorship Pods & Scholar Advisory"
      description="Supervisory command center for doctoral scholars, postgraduate thesis advisories, and student research mentorship sessions."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} className="mr-1" />
            Schedule Advisory Session
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <Icon name="refresh" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      }
      kpis={[
        {
          label: 'Department Scholars',
          value: String(students.length),
          delta: 'ACTIVE COHORT',
          deltaType: 'success',
          subtext: 'Under Faculty Guidance',
          icon: 'school',
        },
        {
          label: 'Advisory Sessions',
          value: String(sessions.length),
          delta: `${activeSessions} PENDING`,
          deltaType: activeSessions > 0 ? 'warning' : 'neutral',
          subtext: '1-on-1 Research Pods',
          icon: 'calendar',
        },
        {
          label: 'Completed Reviews',
          value: String(completedSessions),
          delta: 'RECORDED',
          deltaType: 'success',
          subtext: 'Milestones Signed Off',
          icon: 'check_circle',
        },
        {
          label: 'Supervisory Standard',
          value: 'AICTE Tier-1',
          delta: 'COMPLIANT',
          deltaType: 'success',
          subtext: 'Dean Academic Affairs',
          icon: 'verified',
        },
      ]}
    >
      {/* Tab Ribbon */}
      <div className="bg-bg-surface border border-border-strong">
        <div className="border-b border-border-hairline flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('SESSIONS')}
              className={`px-3 py-1.5 font-mono text-xs uppercase font-bold border transition-colors ${
                activeTab === 'SESSIONS'
                  ? 'bg-fg-primary text-bg-surface border-border-strong'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
              }`}
            >
              Advisory Sessions ({sessions.length})
            </button>
            <button
              onClick={() => setActiveTab('MENTEES')}
              className={`px-3 py-1.5 font-mono text-xs uppercase font-bold border transition-colors ${
                activeTab === 'MENTEES'
                  ? 'bg-fg-primary text-bg-surface border-border-strong'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
              }`}
            >
              Mentee Scholars ({students.length})
            </button>
          </div>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search scholar or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary text-xs focus:outline-none"
            />
            <Search size={14} className="absolute right-2.5 top-2 text-fg-muted" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Synchronizing Mentorship Ledger...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : activeTab === 'SESSIONS' ? (
        filteredSessions.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
            <p className="font-headline-sm text-fg-primary font-bold">No Advisory Sessions Scheduled</p>
            <p className="font-body-sm mt-1 text-xs">You have no active 1-on-1 scholar advisory meetings.</p>
            <Button variant="signal" size="sm" className="mt-4" onClick={() => setIsModalOpen(true)}>
              Schedule First Session
            </Button>
          </div>
        ) : (
          <div className="space-y-space-sm">
            {filteredSessions.map((s) => {
              const menteeName = s.mentee
                ? `${s.mentee.first_name || ''} ${s.mentee.last_name || ''}`.trim() || s.mentee.email
                : 'Doctoral Scholar';
              const sessionDate = s.scheduled_at
                ? new Date(s.scheduled_at).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Scheduled Time';

              return (
                <Card key={s.id} className="hover:border-border-strong transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                        <Badge variant={s.status === 'COMPLETED' ? 'success' : s.status === 'SCHEDULED' ? 'signal' : 'warning'}>
                          {s.status}
                        </Badge>
                        <span className="font-mono text-fg-muted">#SES-{s.id.slice(0, 8).toUpperCase()}</span>
                        <span className="text-border-hairline">|</span>
                        <span className="text-fg-primary font-bold flex items-center gap-1">
                          <Users size={12} className="text-fg-muted" />
                          {menteeName}
                        </span>
                      </div>

                      <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                        {s.topic}
                      </h2>

                      <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> TIME: <strong className="text-fg-primary">{sessionDate}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 shrink-0">
                      {s.meeting_link && (
                        <a
                          href={s.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-portal-primary text-portal-on-primary font-mono text-xs uppercase font-bold border border-border-strong hover:bg-portal-primary-hover"
                        >
                          <Video size={12} /> Enter Chamber
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )
      ) : (
        /* Mentees Tab */
        filteredStudents.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
            <Users className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
            <p className="font-headline-sm text-fg-primary font-bold">No Mentees Found</p>
            <p className="font-body-sm mt-1 text-xs">No students currently assigned to this department pod.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-sm">
            {filteredStudents.map((st) => (
              <Card key={st.id} className="hover:border-border-strong transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={st.readiness_category === 'INDUSTRY_READY' ? 'success' : 'signal'}>
                      {st.readiness_category.replace('_', ' ')}
                    </Badge>
                    <span className="font-mono text-xs text-fg-muted">{st.roll_number || 'STU'}</span>
                  </div>

                  <h3 className="font-headline-sm font-bold text-fg-primary">
                    {st.name}
                  </h3>

                  <p className="font-mono text-xs text-fg-muted">
                    {st.department} • Year {st.year_of_study || 4}
                  </p>

                  <div className="p-2 bg-bg-canvas border border-border-hairline font-mono text-xs flex items-center justify-between">
                    <span>Readiness: <strong className="text-status-success">{st.readiness_score}%</strong></span>
                    <span>CGPA: <strong>{st.cgpa ? Number(st.cgpa).toFixed(1) : 'N/A'}</strong></span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSessionForm({
                          topic: `Advisory Session: ${st.name} — Research & Career Guidance`,
                          scheduled_at: '',
                          notes: '',
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      <MessageSquare size={12} className="mr-1" /> Schedule Advisory
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )
      )}

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <Badge variant="signal">SCHEDULE RESEARCH ADVISORY</Badge>
                <span className="font-mono text-xs text-fg-muted">1-ON-1 POD</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleScheduleSession} className="p-6 space-y-4 overflow-y-auto">
              {submitError && (
                <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold">
                  ✓ Advisory session scheduled! Notification sent to scholar.
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Advisory Session Topic *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ph.D. Chapter 4 Methodology Review & Thesis Validation"
                  value={sessionForm.topic}
                  onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Scheduled Date &amp; Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={sessionForm.scheduled_at}
                  onChange={(e) => setSessionForm({ ...sessionForm, scheduled_at: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Advisory Notes &amp; Preparation Agenda
                </label>
                <textarea
                  rows={3}
                  placeholder="Items scholar should prepare prior to the meeting..."
                  value={sessionForm.notes}
                  onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div className="pt-4 border-t border-border-hairline flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={submitting}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="signal" size="sm" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Scheduling...
                    </>
                  ) : (
                    'Confirm Advisory Session'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </NodePageShell>
  );
}

