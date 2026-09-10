'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getTrainingPrograms,
  registerForTraining,
  getMyTrainingRegistrations,
  TrainingProgram,
  TrainingRegistration,
} from '@/features/academicians/api';
import { Loader2, Search, Building2, Award, CheckCircle, Clock, Briefcase, Calendar } from 'lucide-react';

export default function AcademicianIndustrialTrainingPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<TrainingRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [progRes, regRes] = await Promise.allSettled([
        getTrainingPrograms(),
        getMyTrainingRegistrations(),
      ]);

      if (progRes.status === 'fulfilled') {
        setPrograms(progRes.value.results || []);
      }
      if (regRes.status === 'fulfilled') {
        setMyRegistrations(regRes.value.results || []);
      }
    } catch (err: any) {
      console.error('Failed to load industrial training programs:', err);
      setError('Unable to load industrial training programs.');
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
      await registerForTraining(programId);
      setRegSuccessMessage('Registered successfully for Industrial Training Cohort!');
      setTimeout(() => setRegSuccessMessage(null), 4000);
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to register for this training program.');
    } finally {
      setRegisteringId(null);
    }
  };

  const registeredProgramIds = new Set(myRegistrations.map((r) => r.program));
  const companies = Array.from(new Set(programs.map((p) => p.provider).filter(Boolean)));

  const filtered = programs.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

    if (filter === 'all') return matchSearch;
    if (filter === 'MY_ENROLMENTS') return matchSearch && registeredProgramIds.has(p.id);
    return matchSearch && p.mode === filter;
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // INDUSTRIAL-TRAINING"
      nodeStatus="CORPORATE ACCREDITED"
      category="FACULTY CORPORATE UPSKILLING & HANDS-ON PRACTICUM"
      title="Certified Industrial Training Programs"
      description="Hands-on training cohorts led by enterprise tech leaders (NVIDIA, AWS, Intel, Tata) designed to align university faculty with current industrial toolchains."
      actions={
        <Button variant="outline" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" />
          Refresh Cohorts
        </Button>
      }
      kpis={[
        {
          label: 'Active Cohorts',
          value: String(programs.length),
          delta: 'CORPORATE LED',
          deltaType: 'success',
          subtext: 'Current Quarter',
          icon: 'briefcase',
        },
        {
          label: 'My Enrolments',
          value: String(myRegistrations.length),
          delta: 'REGISTERED',
          deltaType: 'neutral',
          subtext: 'Training Ledger',
          icon: 'token',
        },
        {
          label: 'Corporate Partners',
          value: String(companies.length),
          delta: 'TIER-1 ENTERPRISE',
          deltaType: 'neutral',
          subtext: 'Industry Mentors',
          icon: 'building',
        },
        {
          label: 'Certificate Standard',
          value: 'Industry Pro',
          delta: 'VERIFIED CREDENTIAL',
          deltaType: 'success',
          subtext: 'Directly Shareable',
          icon: 'award',
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
          {['all', 'ONLINE', 'IN_PERSON', 'HYBRID', 'MY_ENROLMENTS'].map((tab) => (
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
                ? `All Cohorts (${programs.length})`
                : tab === 'MY_ENROLMENTS'
                ? `My Enrolments (${myRegistrations.length})`
                : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by cohort title or provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Cohorts List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Industrial Training Programs...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <Briefcase className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Industrial Training Cohorts Found</p>
          <p className="font-body-sm mt-1 text-xs">No active programs match your selected criteria.</p>
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
              : 'Flexible / Continuous';
            const endDate = item.end_date
              ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'TBD';

            return (
              <Card key={item.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      <Badge variant={isRegistered ? 'success' : 'signal'}>
                        {isRegistered ? 'REGISTERED' : item.mode}
                      </Badge>
                      <span className="font-mono text-fg-muted">#TRN-{item.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {item.provider}
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
                        TIMELINE: <strong className="text-fg-primary">{startDate} — {endDate}</strong>
                      </span>
                      {item.industry_partner && (
                        <span>
                          PARTNER: <strong className="text-fg-primary">{item.industry_partner}</strong>
                        </span>
                      )}
                    </div>

                    {userReg && (
                      <div className="p-2 bg-bg-canvas border border-border-hairline text-xs font-mono flex items-center justify-between">
                        <span>Registration Status: <strong>{userReg.status}</strong></span>
                        {userReg.status === 'COMPLETED' ? (
                          <span className="text-status-success font-bold flex items-center gap-1">
                            <Award size={12} /> Training Certified
                          </span>
                        ) : (
                          <span className="text-fg-muted">In Progress</span>
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
                          'Register for Training'
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

