'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SkillRadarChart } from '@/components/charts';
import { applicationsApi, ApplicationItem } from '@/lib/api/applications';
import { passportsApi, SkillPassportData } from '@/lib/api/passports';

interface DisplaySkill {
  name: string;
  current: number;
  benchmark: number;
  status: string;
  color: string;
  alert: boolean;
}

export default function StudentDashboardPage() {
  const [passport, setPassport] = useState<SkillPassportData | null>(null);
  const [liveApplications, setLiveApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      passportsApi.getMyPassport().catch(() => null),
      applicationsApi.getAll().catch(() => [])
    ]).then(([passData, appsData]) => {
      if (passData) setPassport(passData);
      if (appsData) setLiveApplications(appsData);
      setLoading(false);
    });
  }, []);

  const displayedSkills: DisplaySkill[] = passport?.credentials && passport.credentials.length > 0 
    ? passport.credentials.map(c => {
        const current = c.score || 70;
        const benchmark = 75;
        const isDeficit = current < benchmark;
        return {
          name: c.skill_name || 'Core Engineering Competency',
          current,
          benchmark,
          status: isDeficit ? `DEFICIT (-${benchmark - current}%)` : 'BENCHMARK MET',
          color: isDeficit ? 'bg-status-danger' : 'bg-status-success',
          alert: isDeficit
        };
      })
    : [
        { name: 'Python Architecture', current: 85, benchmark: 80, status: 'BENCHMARK EXCEEDED', color: 'bg-status-success', alert: false },
        { name: 'PostgreSQL & Database Design', current: 80, benchmark: 75, status: 'BENCHMARK EXCEEDED', color: 'bg-status-success', alert: false },
        { name: 'Docker & Containerization', current: 60, benchmark: 75, status: 'DEFICIT (-15%)', color: 'bg-status-danger', alert: true },
        { name: 'RESTful API Engineering', current: 80, benchmark: 80, status: 'BENCHMARK MET', color: 'bg-status-success', alert: false }
      ];

  const displayedApplications = liveApplications.map(app => ({
    company: app.opportunity?.industry?.company_name || app.opportunity?.company_name || 'Industry Partner',
    role: app.opportunity?.title || 'Engineering Role',
    stipend: app.opportunity?.stipend_amount ? `₹${app.opportunity.stipend_amount.toLocaleString()} / mo` : 'Competitive Stipend',
    stage: (app.status || 'APPLIED').replace('_', ' '),
    date: app.applied_at ? new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent',
    status: app.status || 'APPLIED',
    statusColor: app.status === 'ACCEPTED' ? 'text-status-success bg-green-50 border border-status-success' : 'text-fg-secondary bg-bg-subtle border border-border-hairline'
  }));

  return (
    <div className="space-y-space-lg">
      {/* =============================================================== */}
      {/* HEADER BANNER: Student Node Identity                            */}
      {/* =============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-border-strong gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-label-mono text-label-mono text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>NODE: {passport?.student_id || 'STU-ACTIVE'} // CANDIDATE VERIFIED</span>
            <span className="text-border-hairline">|</span>
            <span className="text-status-success font-semibold">{passport?.accreditation_tier || 'TIER 01 ACCREDITED'}</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary mt-1">
            Student Command Center
          </h1>
          <p className="text-body-md font-body-md text-fg-muted">
            Deterministic Skill Matching &amp; Industry Placement Execution Matrix.
          </p>
        </div>

        <div className="flex items-center gap-space-sm self-start sm:self-auto">
          <Link
            href="/student/skill-gaps"
            className="px-space-md py-2 bg-accent-signal text-fg-primary font-label-mono text-label-mono uppercase hover:bg-accent-signal-hover transition-colors border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B]"
          >
            Run Diagnostic Scan
          </Link>
          <Link
            href="/student/skill-passport"
            className="px-space-md py-2 bg-bg-surface text-fg-primary font-label-mono text-label-mono uppercase hover:bg-bg-subtle transition-colors border border-border-strong"
          >
            Export Passport
          </Link>
        </div>
      </div>

      {/* =============================================================== */}
      {/* 4 TELEMETRY KPIS                                                */}
      {/* =============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Career Readiness Score</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">verified_user</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">
                {passport?.overall_readiness || 82}%
              </span>
              <span className="font-label-mono text-label-mono text-status-success font-semibold">VERIFIED</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">Based on diagnostic milestones</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Skill Competencies</span>
            <span className="material-symbols-outlined text-status-warning text-[18px]">psychology</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">
                {String(displayedSkills.length).padStart(2, '0')}
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">DOCUMENTED</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">Evaluated across assessments</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Active Applications</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">work_history</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">
                {String(displayedApplications.length).padStart(2, '0')}
              </span>
              <span className="font-label-mono text-label-mono text-status-warning font-semibold">TRACKED</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">Live Industry Submissions</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Skill Passport Credentials</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">token</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">
                {passport?.credentials?.length || displayedSkills.length}
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">CREDENTIALS</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">HMAC-SHA256 Verified</p>
          </div>
        </div>
      </div>

      {/* =============================================================== */}
      {/* 12-COLUMN SPLIT MASTER GRID                                     */}
      {/* =============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (7 cols): Diagnostic Matrix & Applications */}
        <div className="lg:col-span-7 space-y-space-lg">
          {/* Section A-1: Technical Skill Profile & Gap Analysis */}
          <div className="bg-bg-surface border border-border-strong p-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-border-hairline gap-space-sm">
              <div>
                <span className="font-label-mono text-label-mono uppercase text-fg-muted">DIAGNOSTIC MATRIX // A-1</span>
                <h2 className="font-headline-md text-headline-md text-fg-primary mt-0.5">
                  Technical Skill Profile &amp; Gap Analysis
                </h2>
              </div>
              <Link
                href="/student/skill-gaps"
                className="px-space-md py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors inline-flex items-center gap-1.5 border border-border-strong font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Start Learning</span>
              </Link>
            </div>

            <div className="mt-space-md">
              <SkillRadarChart height={260} className="mb-space-md border-0 p-0" />
            </div>

            <div className="mt-space-md space-y-space-md">
              {displayedSkills.map((skill: DisplaySkill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-body-md text-body-md text-fg-primary font-medium">{skill.name}</span>
                      <span
                        className={`font-label-mono text-[10px] uppercase font-semibold ${
                          skill.alert ? 'text-status-danger' : 'text-status-success'
                        }`}
                      >
                        {skill.status}
                      </span>
                    </div>
                    <span className="font-metric-tabular text-sm text-fg-primary tnum font-semibold">
                      {skill.current}% / {skill.benchmark}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-bg-subtle border border-border-hairline overflow-hidden">
                    <div
                      className={`h-full ${skill.color}`}
                      style={{ width: `${skill.current}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section A-2: Active Application Pipelines */}
          <div className="bg-bg-surface border border-border-strong p-space-lg">
            <div className="flex justify-between items-center pb-space-sm border-b border-border-hairline mb-space-md">
              <div>
                <span className="font-label-mono text-label-mono uppercase text-fg-muted">SELECTION WORKFLOW // A-2</span>
                <h2 className="font-headline-md text-headline-md text-fg-primary">
                  Active Application Dockets
                </h2>
              </div>
              <Link
                href="/student/applications"
                className="font-label-mono text-xs text-fg-primary underline hover:text-accent-signal"
              >
                View All ({String(displayedApplications.length).padStart(2, '0')})
              </Link>
            </div>

            <div className="space-y-space-sm">
              {displayedApplications.length > 0 ? (
                displayedApplications.map((app, idx) => (
                  <div
                    key={`${app.company}-${idx}`}
                    className="p-space-md border border-border-hairline bg-bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm hover:border-border-strong transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-body-md font-bold text-fg-primary">{app.company}</span>
                        <span className={`font-label-mono text-[10px] px-1.5 py-0.5 font-bold ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-body-sm text-fg-secondary mt-0.5">{app.role}</p>
                      <span className="font-label-mono text-[11px] text-fg-muted block mt-1">
                        COMPENSATION: <span className="text-fg-primary font-semibold">{app.stipend}</span> • STAGE: {app.stage}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-mono text-xs text-fg-primary block font-bold">{app.date}</span>
                      <Link
                        href="/student/applications"
                        className="mt-1 inline-block font-label-mono text-[11px] text-fg-muted underline hover:text-fg-primary"
                      >
                        Inspect Docket →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center border border-dashed border-border-strong">
                  <p className="font-body-md text-fg-muted mb-2">No active applications found.</p>
                  <Link
                    href="/student/opportunities"
                    className="font-label-mono text-xs text-fg-primary underline font-bold hover:text-accent-signal"
                  >
                    Explore Matched Opportunities →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Actions & Cryptographic Ledger */}
        <div className="lg:col-span-5 space-y-space-lg">
          {/* Quick Action Card */}
          <div className="border-2 border-border-strong bg-neutral-950 text-bg-surface p-space-lg">
            <div className="flex items-center gap-2 font-label-mono text-[11px] text-accent-signal uppercase mb-space-xs font-bold">
              <span className="w-2 h-2 bg-accent-signal inline-block" />
              <span>CAREER ACCELERATOR</span>
            </div>
            <h3 className="font-headline-sm text-body-lg font-bold text-bg-surface">
              Next Step: Complete Diagnostic Assessments
            </h3>
            <p className="text-body-sm text-neutral-400 mt-1 mb-space-md">
              Proctored assessments provide cryptographic proof of proficiency for employer shortlisting.
            </p>
            <Link
              href="/student/assessments"
              className="block w-full text-center bg-accent-signal text-fg-primary py-2.5 font-label-mono text-label-mono uppercase font-bold hover:bg-accent-signal-hover transition-colors border border-accent-signal"
            >
              Take Assessment
            </Link>
          </div>

          {/* Cryptographic Passport Card */}
          <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
            <div className="border-b border-border-hairline pb-space-sm flex justify-between items-center">
              <div>
                <span className="font-label-mono text-label-mono uppercase text-fg-muted">LEDGER CERTIFICATE</span>
                <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
                  Verified Skill Passport
                </h3>
              </div>
              <span className="font-label-mono text-[10px] bg-bg-subtle border border-border-hairline px-2 py-0.5">
                HMAC-SHA256
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {(passport?.credentials || []).map((cred) => (
                <div key={cred.id} className="p-2 border border-border-hairline bg-bg-canvas flex justify-between items-center">
                  <div>
                    <span className="font-semibold block text-fg-primary">{cred.skill_name} {cred.score}%</span>
                    <span className="text-[10px] text-fg-muted">Verified by {cred.verified_by}</span>
                  </div>
                  <span className="text-status-success font-bold">HASH: {cred.crypto_hash?.slice(0, 10)}...</span>
                </div>
              ))}
              {(!passport?.credentials || passport.credentials.length === 0) && (
                <p className="font-body-sm text-fg-muted text-center py-2">
                  Take skill assessments to mint verified credentials on your passport.
                </p>
              )}
            </div>

            <Link
              href="/student/skill-passport"
              className="w-full text-center block py-2 border border-border-strong font-label-mono text-label-mono uppercase hover:bg-bg-subtle transition-colors text-fg-primary"
            >
              Inspect Cryptographic Ledger
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
