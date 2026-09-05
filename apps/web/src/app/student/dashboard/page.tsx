'use client';

import React from 'react';
import Link from 'next/link';
import { SkillRadarChart } from '@/components/charts';

export default function StudentDashboardPage() {
  const skills = [
    { name: 'Python (Core, Asyncio, Metaprogramming)', current: 90, benchmark: 80, status: 'BENCHMARK EXCEEDED', color: 'bg-status-success' },
    { name: 'PostgreSQL & Query Optimization', current: 80, benchmark: 75, status: 'BENCHMARK EXCEEDED', color: 'bg-status-success' },
    { name: 'Docker / Container Orchestration', current: 40, benchmark: 70, status: 'CRITICAL DEFICIT (-30%)', color: 'bg-status-danger', alert: true },
    { name: 'FastAPI Microservice Architecture', current: 65, benchmark: 80, status: 'MODERATE DEFICIT (-15%)', color: 'bg-status-warning' },
    { name: 'Kubernetes Cluster Deployment', current: 35, benchmark: 65, status: 'BLOCKING DEFICIT (-30%)', color: 'bg-status-danger', alert: true },
  ];

  const applications = [
    {
      company: 'TechNova Labs',
      role: 'Backend Distributed Systems Engineer',
      stipend: '₹45,000 / mo',
      stage: 'ROUND 02 INTERVIEW',
      date: 'OCT 24 // 14:00',
      status: 'INTERVIEW SCHEDULED',
      statusColor: 'text-accent-signal bg-neutral-900 border border-border-strong',
    },
    {
      company: 'Tata Consultancy Services',
      role: 'Cloud Infrastructure Associate',
      stipend: '₹38,000 / mo',
      stage: 'SCREENING EVALUATION',
      date: 'OCT 26',
      status: 'UNDER REVIEW',
      statusColor: 'text-fg-secondary bg-bg-subtle border border-border-hairline',
    },
    {
      company: 'Barclays Global Service',
      role: 'FinTech Microservices Intern',
      stipend: '₹50,000 / mo',
      stage: 'OFFER LETTER ISSUED',
      date: 'NOV 01',
      status: 'OFFER PENDING',
      statusColor: 'text-status-success bg-green-50 border border-status-success',
    },
  ];

  return (
    <div className="space-y-space-lg">
      {/* =============================================================== */}
      {/* HEADER BANNER: Student Node Identity                            */}
      {/* =============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-border-strong gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-label-mono text-label-mono text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>NODE: STU-8042 // CANDIDATE ACTIVE</span>
            <span className="text-border-hairline">|</span>
            <span className="text-status-success font-semibold">TIER 01 ACCREDITED</span>
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
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Compatibility Score</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">verified_user</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">78.4%</span>
              <span className="font-label-mono text-label-mono text-status-success font-semibold">TOP 12%</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">+4.2% from recent assessment</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Critical Bottlenecks</span>
            <span className="material-symbols-outlined text-status-danger text-[18px]">warning</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-status-danger tnum">02</span>
              <span className="font-label-mono text-label-mono text-status-danger font-semibold">BLOCKING TIER 1</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">Docker / Kubernetes &amp; Microservices</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Selection Pipeline</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">work_history</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">08</span>
              <span className="font-label-mono text-label-mono text-status-warning font-semibold">1 INTERVIEW LIVE</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">2 In Review • 1 Offer Pending</p>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-36">
          <div className="flex items-start justify-between">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted">Cryptographic Passport</span>
            <span className="material-symbols-outlined text-fg-muted text-[18px]">token</span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">12</span>
              <span className="font-label-mono text-label-mono text-fg-muted">CREDENTIALS</span>
            </div>
            <p className="font-body-sm text-body-sm text-fg-muted mt-1">SHA256 Ledger Synchronized</p>
          </div>
        </div>
      </div>

      {/* =============================================================== */}
      {/* CONNECTED ECOSYSTEM PROGRESSION TOPOLOGY                        */}
      {/* =============================================================== */}
      <div className="w-full bg-bg-surface border border-border-strong p-space-lg">
        <div className="flex items-center justify-between mb-space-md border-b border-border-hairline pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="w-2.5 h-2.5 bg-primary inline-block" />
            <span className="font-label-mono text-label-mono uppercase text-fg-primary font-bold">
              ECOSYSTEM PROGRESSION TOPOLOGY
            </span>
            <span className="font-label-mono text-label-mono text-fg-muted">// DETERMINISTIC PIPELINE</span>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted hidden sm:inline">STATE: MATCH ENGAGED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-sm">
          {/* Node 1 */}
          <div className="border border-border-hairline bg-bg-canvas p-space-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">01. Profile</span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
            </div>
            <span className="font-headline-sm text-[13px] text-fg-primary block font-semibold">Python/SQL</span>
            <span className="font-body-sm text-[11px] text-fg-muted block">91% &amp; 84% Certified</span>
            <div className="mt-2 text-[9px] font-label-mono text-status-success font-medium">BENCHMARK EXCEEDED</div>
          </div>

          {/* Node 2 */}
          <div className="border border-accent-signal bg-[#FEF2F2] p-space-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-status-danger uppercase font-bold">02. Deficit Gap</span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-danger" />
            </div>
            <span className="font-headline-sm text-[13px] text-status-danger block font-semibold">Docker / K8s</span>
            <span className="font-body-sm text-[11px] text-status-danger block">40% vs 70% Target</span>
            <div className="mt-2 text-[9px] font-label-mono text-status-danger font-bold uppercase">BLOCKING TIER 1</div>
          </div>

          {/* Node 3 */}
          <div className="border border-border-hairline bg-bg-canvas p-space-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">03. Remediation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-warning" />
            </div>
            <span className="font-headline-sm text-[13px] text-fg-primary block font-semibold">FastAPI &amp; Containers</span>
            <span className="font-body-sm text-[11px] text-fg-muted block">12 Module Sprint</span>
            <div className="mt-2 text-[9px] font-label-mono text-fg-secondary uppercase">IN PROGRESS (45%)</div>
          </div>

          {/* Node 4 */}
          <div className="border border-border-hairline bg-bg-canvas p-space-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">04. Matched Node</span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
            </div>
            <span className="font-headline-sm text-[13px] text-fg-primary block font-semibold">TechNova Labs</span>
            <span className="font-body-sm text-[11px] text-fg-muted block">92% Compatibility</span>
            <div className="mt-2 text-[9px] font-label-mono text-status-success uppercase font-medium">MATCH CONFIRMED</div>
          </div>

          {/* Node 5 */}
          <div className="border-2 border-border-strong bg-bg-surface p-space-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-primary uppercase font-bold">05. Active Phase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-signal" />
            </div>
            <span className="font-headline-sm text-[13px] text-fg-primary block font-semibold">Round 02 Interview</span>
            <span className="font-body-sm text-[11px] text-fg-muted block">Systems Architecture</span>
            <div className="mt-2 text-[9px] font-label-mono text-primary font-bold uppercase bg-accent-signal inline-block px-1">
              OCT 24 // 14:00
            </div>
          </div>

          {/* Node 6 */}
          <div className="border border-border-hairline bg-bg-canvas p-space-sm space-y-1 opacity-75">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">06. Verification</span>
              <span className="w-1.5 h-1.5 rounded-full bg-fg-muted" />
            </div>
            <span className="font-headline-sm text-[13px] text-fg-primary block font-semibold">Passport Mint</span>
            <span className="font-body-sm text-[11px] text-fg-muted block">Verifiable Credential</span>
            <div className="mt-2 text-[9px] font-label-mono text-fg-muted uppercase">AWAITING STAMP</div>
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
                <span>Start Learning (+14% Boost)</span>
              </Link>
            </div>

            <div className="mt-space-md">
              <SkillRadarChart height={260} className="mb-space-md border-0 p-0" />
            </div>

            <div className="mt-space-md space-y-space-md">
              {skills.map((skill) => (
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
                View All (08)
              </Link>
            </div>

            <div className="space-y-space-sm">
              {applications.map((app) => (
                <div
                  key={app.company}
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
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Actions & Cryptographic Ledger */}
        <div className="lg:col-span-5 space-y-space-lg">
          {/* Urgent Action Card */}
          <div className="border-2 border-border-strong bg-neutral-950 text-bg-surface p-space-lg">
            <div className="flex items-center gap-2 font-label-mono text-[11px] text-accent-signal uppercase mb-space-xs font-bold">
              <span className="w-2 h-2 bg-accent-signal inline-block" />
              <span>NEXT OPERATIONAL DELIVERABLE</span>
            </div>
            <h3 className="font-headline-sm text-body-lg font-bold text-bg-surface">
              Round 02 Architecture Interview with TechNova
            </h3>
            <p className="text-body-sm text-neutral-400 mt-1 mb-space-md">
              Proctored Technical Interview focusing on Microservice Orchestration and PostgreSQL indexing.
            </p>
            <div className="p-3 bg-neutral-900 border border-neutral-800 font-mono text-xs mb-space-md space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">INTERVIEW SCHEDULE:</span>
                <span className="text-accent-signal font-bold">OCT 24 // 14:00 IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PROCTOR MODE:</span>
                <span className="text-white">NATIONAL SECURE TERMINAL</span>
              </div>
            </div>
            <button className="w-full bg-accent-signal text-fg-primary py-2.5 font-label-mono text-label-mono uppercase font-bold hover:bg-accent-signal-hover transition-colors border border-accent-signal">
              Join Proctored Chamber
            </button>
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
                SHA-256
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 border border-border-hairline bg-bg-canvas flex justify-between items-center">
                <div>
                  <span className="font-semibold block text-fg-primary">Python Metaprogramming 91%</span>
                  <span className="text-[10px] text-fg-muted">Verified by HackerRank Enterprise</span>
                </div>
                <span className="text-status-success font-bold">HASH: 0x4a9...f2</span>
              </div>
              <div className="p-2 border border-border-hairline bg-bg-canvas flex justify-between items-center">
                <div>
                  <span className="font-semibold block text-fg-primary">PostgreSQL Query Planning 84%</span>
                  <span className="text-[10px] text-fg-muted">Verified by IIT Bombay Lab Hub</span>
                </div>
                <span className="text-status-success font-bold">HASH: 0x9b1...c4</span>
              </div>
              <div className="p-2 border border-border-hairline bg-bg-canvas flex justify-between items-center">
                <div>
                  <span className="font-semibold block text-fg-primary">SIH-2024 Finalist Badge</span>
                  <span className="text-[10px] text-fg-muted">Govt of India AICTE Standard</span>
                </div>
                <span className="text-status-success font-bold">HASH: 0x804...20</span>
              </div>
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

