'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  getAcademicianDashboard,
  getFacultyImpactScore,
  AcademicianDashboardMetrics,
  FacultyImpactScore,
} from '@/features/academicians/api';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function AcademicianDashboardPage() {
  const [data, setData] = useState<AcademicianDashboardMetrics | null>(null);
  const [impact, setImpact] = useState<FacultyImpactScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, impactRes] = await Promise.all([
        getAcademicianDashboard(),
        getFacultyImpactScore().catch(() => null),
      ]);
      setData(dashRes);
      if (impactRes) setImpact(impactRes);
    } catch (err: any) {
      console.error('Failed to load academician dashboard data', err);
      setError(err?.message || 'Failed to synchronize academician dashboard. Please check network connectivity.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-fg-primary" />
        <span className="font-label-mono text-xs uppercase text-fg-muted">
          Synchronizing Academician Command Center...
        </span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-bg-surface border border-status-danger/40 p-space-lg space-y-4">
        <div className="flex items-center gap-3 text-status-danger">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <h2 className="font-headline-sm font-bold text-lg">Failed to Synchronize Faculty Node</h2>
        </div>
        <p className="text-body-sm text-fg-secondary font-mono text-xs">{error}</p>
        <Button variant="signal" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" /> Retry Synchronization
        </Button>
      </div>
    );
  }

  const { profile, scholastic_metrics: m, department_summary: dept } = data;

  const scholasticMetrics = [
    { label: 'Mentorship Requests', val: m.mentorship_requests.toString(), sub: `${m.active_mentees} Active Mentees`, border: 'border-border-hairline', icon: 'groups' },
    { label: 'Research Projects', val: m.active_research_projects.toString(), sub: `₹${(m.total_research_funding / 100000).toFixed(1)}L Total Funding`, border: 'border-border-hairline', icon: 'biotech' },
    { label: 'Publications & Citations', val: m.total_publications.toString(), sub: `${m.total_citations} Citations (H-${m.h_index})`, border: 'border-border-hairline', icon: 'menu_book' },
    { label: 'Industry Consultancies', val: m.active_consultancies.toString(), sub: `₹${(m.total_consultancy_value / 100000).toFixed(1)}L Contract Value`, border: 'border-portal-primary', icon: 'business_center' },
  ];

  return (
    <div className="space-y-space-lg">
      {/* Faculty Hero Banner */}
      <div className="bg-bg-surface border border-border-strong p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md shadow-[2px_2px_0px_0px_rgba(24,24,27,0.04)]">
        <div className="flex items-start gap-space-md">
          <div className="w-16 h-16 bg-fg-primary text-bg-surface flex items-center justify-center font-bold text-2xl border border-border-strong shrink-0">
            {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'AC'}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-mono text-[10px] px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold border border-border-strong">
                ACADEMICIAN NODE // #{profile.id.slice(0, 8).toUpperCase()}
              </span>
              <span className="font-label-mono text-[10px] px-2 py-0.5 bg-bg-subtle text-fg-muted border border-border-hairline">
                {profile.orcid ? `ORCID: ${profile.orcid}` : profile.is_verified ? 'STATUS: VERIFIED' : 'STATUS: TENURED'}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-fg-primary font-bold">
              {profile.name}
            </h1>
            <p className="text-body-sm text-fg-secondary font-mono text-xs">
              {profile.designation} // {profile.department}, {profile.institution_name}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/academician/research"
            className="px-space-md py-2.5 bg-portal-primary text-portal-on-primary font-label-mono text-xs uppercase font-bold hover:bg-portal-primary-hover transition-colors border border-border-strong shadow-[2px_2px_0px_0px_#18181B]"
          >
            Launch Lab Pod
          </Link>
          <Link
            href="/academician/opportunities"
            className="px-space-md py-2.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase hover:bg-neutral-800 transition-colors border border-border-strong"
          >
            Inspect Grants
          </Link>
        </div>
      </div>

      {/* 4 KPI Scholastic Output Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {scholasticMetrics.map((item) => (
          <div
            key={item.label}
            className={`bg-bg-surface border ${item.border} p-space-md flex flex-col justify-between h-32`}
          >
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-[11px] text-fg-muted uppercase">{item.label}</span>
              <Icon name={item.icon} size={16} className="text-fg-muted" />
            </div>
            <div>
              <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">{item.val}</span>
              <span className="font-label-mono text-[10px] text-fg-secondary block mt-0.5">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (5 cols): Institutional Records & Faculty Impact Breakdown */}
        <div className="lg:col-span-5 space-y-space-md">
          {/* Institutional Repository Info */}
          <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
            <div className="border-b border-border-hairline pb-space-xs flex justify-between items-center">
              <span className="font-label-mono text-xs text-fg-muted uppercase">
                01.1 // INSTITUTIONAL REPOSITORY
              </span>
              <span className="font-label-mono text-xs text-status-success font-semibold">
                {profile.is_verified ? 'STATUS: VERIFIED' : 'STATUS: TENURED'}
              </span>
            </div>

            <div className="space-y-space-sm text-body-sm font-mono text-xs">
              <div>
                <span className="text-fg-muted block text-[10px] uppercase">DEPARTMENT</span>
                <span className="text-fg-primary font-bold">{profile.department || 'Not Assigned'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-hairline">
                <div>
                  <span className="text-fg-muted block text-[10px] uppercase">EXPERIENCE</span>
                  <span className="text-fg-primary font-bold">{profile.experience_years} Years</span>
                </div>
                <div>
                  <span className="text-fg-muted block text-[10px] uppercase">PATENTS</span>
                  <span className="text-fg-primary font-bold">{m.total_patents} ({m.granted_patents} Granted)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border-hairline">
                <span className="text-fg-muted block text-[10px] uppercase mb-1">FACULTY DEVELOPMENT</span>
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-[11px]">
                  <span className="px-2 py-0.5 bg-bg-subtle border">FDPs: {m.fdp_registered}</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border">Workshops: {m.workshops_registered}</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border">Training: {m.training_registered}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence-Based Faculty Impact Breakdown */}
          {impact && (
            <div className="bg-bg-surface border border-border-strong p-space-lg space-y-3">
              <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                <span className="font-label-mono text-xs text-fg-muted uppercase">FACULTY IMPACT INDEX</span>
                <span className="font-metric-tabular text-xl font-bold text-fg-primary tnum">
                  {impact.total_impact_score} / 100
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                {Object.entries(impact.breakdown).map(([key, val]) => (
                  <div key={key} className="p-2 bg-bg-canvas border border-border-hairline space-y-1">
                    <div className="flex justify-between">
                      <span className="font-bold uppercase text-[10px] text-fg-muted">{key.replace('_', ' ')}</span>
                      <span className="font-bold text-fg-primary">{val.score}/{val.max}</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-200 overflow-hidden">
                      <div className="bg-fg-primary h-full" style={{ width: `${(val.score / val.max) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-fg-secondary block">{val.evidence}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Department Employability & Quick Actions */}
        <div className="lg:col-span-7 space-y-space-md">
          {/* Department Employability Telemetry */}
          <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm border-b border-border-hairline gap-2">
              <div>
                <span className="font-label-mono text-xs text-fg-muted uppercase">02.0 // COHORT READINESS</span>
                <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  Department Employability &amp; Readiness Matrix
                </h3>
              </div>
              <div className="p-2 bg-bg-canvas border border-border-hairline text-right">
                <span className="font-label-mono text-[10px] text-fg-muted block">DEPT AVG READINESS</span>
                <span className="font-metric-tabular text-2xl font-bold text-fg-primary tnum">
                  {dept.average_readiness_score}%
                </span>
                <span className="font-label-mono text-[9px] text-status-success font-bold block uppercase">
                  {dept.total_students} ENROLLED STUDENTS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-1">
                <span className="text-fg-muted text-[10px] uppercase block">TOTAL SCHOLARS</span>
                <span className="text-2xl font-bold text-fg-primary">{dept.total_students}</span>
                <span className="text-[10px] text-fg-secondary block">In Department</span>
              </div>
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-1">
                <span className="text-fg-muted text-[10px] uppercase block">ACTIVE RESEARCH PODS</span>
                <span className="text-2xl font-bold text-fg-primary">{m.active_research_projects}</span>
                <span className="text-[10px] text-fg-secondary block">Funded Labs</span>
              </div>
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-1">
                <span className="text-fg-muted text-[10px] uppercase block">ACTIVE MOUS</span>
                <span className="text-2xl font-bold text-fg-primary">{m.active_collaborations}</span>
                <span className="text-[10px] text-fg-secondary block">Industry Partners</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-hairline">
              <Link
                href="/academician/students"
                className="px-3 py-1.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase hover:bg-neutral-800 transition-colors"
              >
                Inspect Student Roster →
              </Link>
              <Link
                href="/academician/mentorship"
                className="px-3 py-1.5 bg-bg-subtle text-fg-primary font-label-mono text-xs uppercase hover:bg-bg-canvas border border-border-hairline transition-colors"
              >
                Mentorship Center ({m.active_mentees})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
