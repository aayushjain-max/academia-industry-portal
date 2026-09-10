'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getFDPPrograms,
  registerForFDP,
  getMyFDPRegistrations,
  FDPProgram,
  FDPRegistration,
} from '@/features/academicians/api';
import { Loader2, Search, Calendar, Award, GraduationCap, CheckCircle, Clock, Building2, BookOpen } from 'lucide-react';

export default function AcademicianFDPPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [programs, setPrograms] = useState<FDPProgram[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<FDPRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [progRes, regRes] = await Promise.allSettled([
        getFDPPrograms(),
        getMyFDPRegistrations(),
      ]);

      if (progRes.status === 'fulfilled') {
        setPrograms(progRes.value.results || []);
      }
      if (regRes.status === 'fulfilled') {
        setMyRegistrations(regRes.value.results || []);
      }
    } catch (err: any) {
      console.error('Failed to load FDP programs:', err);
      setError('Unable to load Faculty Development Programs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (programId: string) => {
    try {
      setRegisteringId(programId);
      setRegSuccessMessage(null);
      await registerForFDP(programId);
      setRegSuccessMessage('Registered successfully for Faculty Development Program!');
      setTimeout(() => setRegSuccessMessage(null), 4000);
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to register for this FDP program.');
    } finally {
      setRegisteringId(null);
    }
  };

  const registeredProgramIds = new Set(myRegistrations.map((r) => r.program));
  const completedCount = myRegistrations.filter((r) => Boolean(r.certificate_url)).length;

  const filtered = programs.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.organizer.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

    if (filter === 'all') return matchSearch;
    if (filter === 'MY_REGISTRATIONS') return matchSearch && registeredProgramIds.has(p.id);
    return matchSearch && p.mode === filter;
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // FDP"
      nodeStatus="AICTE / ATAL ACCREDITED"
      category="FACULTY CONTINUING EDUCATION & PEDAGOGICAL CERTIFICATION"
      title="Faculty Development Programs (FDPs)"
      description="National directory of AICTE, ATAL, DST, and corporate-sponsored Faculty Development Programs for advanced engineering pedagogy and domain upskilling."
      actions={
        <Button variant="outline" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" />
          Refresh Registry
        </Button>
      }
      kpis={[
        {
          label: 'Available FDPs',
          value: String(programs.length),
          delta: 'ACCREDITED',
          deltaType: 'success',
          subtext: 'Across Engineering Disciplines',
          icon: 'graduation_cap',
        },
        {
          label: 'My Enrolments',
          value: String(myRegistrations.length),
          delta: 'ACTIVE',
          deltaType: 'neutral',
          subtext: 'Current Semester',
          icon: 'book_open',
        },
        {
          label: 'Certified Credits',
          value: String(completedCount * 3 || myRegistrations.length * 3),
          delta: 'UGC NORMS',
          deltaType: 'neutral',
          subtext: 'Academic API Points',
          icon: 'award',
        },
        {
          label: 'Accreditation Body',
          value: 'AICTE / ATAL',
          delta: 'TIER-1 VALID',
          deltaType: 'success',
          subtext: '100% Recognized',
          icon: 'shield',
        },
      ]}
    >
      {regSuccessMessage && (
        <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold flex items-center gap-2">
          <CheckCircle size={16} />
          {regSuccessMessage}
        </div>
      )}

      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'ONLINE', 'IN_PERSON', 'HYBRID', 'MY_REGISTRATIONS'].map((tab) => (
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
              {tab === 'all'
                ? `All FDPs (${programs.length})`
                : tab === 'MY_REGISTRATIONS'
                ? `My Enrolments (${myRegistrations.length})`
                : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by FDP title or organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* FDPs List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Faculty Development Programs...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <GraduationCap className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No FDP Programs Found</p>
          <p className="font-body-sm mt-1 text-xs">No programs matched the selected filters.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilter('all'); setSearch(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((item) => {
            const isRegistered = registeredProgramIds.has(item.id);
            const userReg = myRegistrations.find((r) => r.program === item.id);
            const startDate = item.start_date
              ? new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'Flexible';
            const endDate = item.end_date
              ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'TBD';

            return (
              <Card key={item.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      <Badge variant={isRegistered ? 'success' : 'signal'}>
                        {isRegistered ? 'ENROLLED' : item.mode}
                      </Badge>
                      <span className="font-mono text-fg-muted">#FDP-{item.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {item.organizer}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="text-body-sm text-fg-muted font-sans line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span>
                        DURATION: <strong className="text-fg-primary">{item.duration_days} Days</strong>
                      </span>
                      <span>
                        TIMELINE: <strong className="text-fg-primary">{startDate} — {endDate}</strong>
                      </span>
                      {item.total_seats && (
                        <span>
                          CAPACITY: <strong className="text-fg-primary">{item.total_seats} Seats</strong>
                        </span>
                      )}
                    </div>

                    {userReg && (
                      <div className="p-2 bg-bg-canvas border border-border-hairline text-xs font-mono flex items-center justify-between">
                        <span>Registration Status: <strong>{userReg.status}</strong></span>
                        {userReg.certificate_url ? (
                          <span className="text-status-success font-bold flex items-center gap-1">
                            <Award size={12} /> Certificate Issued
                          </span>
                        ) : (
                          <span className="text-fg-muted">Certificate pending completion</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    {isRegistered ? (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle size={14} className="mr-1 text-status-success" />
                        Enrolled
                      </Button>
                    ) : (
                      <Button
                        variant="signal"
                        size="sm"
                        disabled={registeringId === item.id}
                        onClick={() => handleRegister(item.id)}
                      >
                        {registeringId === item.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Enrolling...
                          </>
                        ) : (
                          'Register for FDP'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </NodePageShell>
  );
}

