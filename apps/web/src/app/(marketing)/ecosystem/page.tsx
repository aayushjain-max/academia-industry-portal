'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EcosystemPage() {
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <div className="flex-1 w-full bg-bg-canvas flex flex-col">
      {/* HERO SECTION: TYPOGRAPHIC SWISS POSTER */}
      <section className="border-b border-border-strong bg-bg-surface relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-md md:py-space-lg relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-bg-subtle border border-border-strong mb-space-xs">
              <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
              <span className="font-label-mono text-label-mono uppercase text-fg-primary font-bold tracking-wider">
                [ ECOSYSTEM // 01 ] NATIONAL PROTOCOL
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero text-fg-primary uppercase tracking-tight leading-none mb-space-sm font-extrabold">
              ONE PLATFORM.<br />
              FOUR SIDES.<br />
              <span className="bg-accent-signal text-fg-primary px-2 border border-border-strong inline-block mt-1">
                ONE CONNECTED
              </span>{' '}
              ECOSYSTEM.
            </h1>
            <p className="font-headline-sm text-headline-sm text-fg-secondary max-w-2xl mb-space-xs font-semibold">
              Connecting verified student skills, live industrial requirements, curriculum modernization, and institutional accreditation into a singular algorithmic loop.
            </p>
            <p className="font-body-md text-body-md text-fg-muted max-w-3xl mb-space-md">
              Students discover and develop industry-relevant competencies. Enterprises access unforgeable talent dockets. Academicians bridge research with direct corporate funding. Institutions quantify employability benchmarks under national regulatory frameworks.
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              <Link
                href="/register"
                className="px-space-xl py-3 bg-accent-signal text-fg-primary font-headline-sm text-body-md uppercase border border-border-strong hover:bg-accent-signal-hover transition-colors font-bold tracking-wide shadow-[2px_2px_0px_0px_#18181B]"
              >
                Get Started →
              </Link>
              <a
                href="#pipeline"
                className="px-space-lg py-3 bg-bg-surface text-fg-primary font-headline-sm text-body-md uppercase border border-border-strong hover:bg-bg-subtle transition-colors tracking-wide font-medium"
              >
                Explore Schematic
              </a>
            </div>
          </div>

          {/* TICKER METRICS */}
          <div className="mt-space-lg pt-space-md border-t border-border-strong grid grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="border-l-2 border-border-strong pl-3">
              <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Verified Students</span>
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">142,890+</span>
              <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">Across 28 Indian States</span>
            </div>
            <div className="border-l-2 border-border-strong pl-3">
              <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Active Enterprises</span>
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">2,410+</span>
              <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">R&amp;D, Core, IT, Hardware</span>
            </div>
            <div className="border-l-2 border-border-strong pl-3">
              <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Accredited Campuses</span>
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">856</span>
              <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">AICTE / UGC Compliant</span>
            </div>
            <div className="border-l-2 border-accent-signal pl-3 bg-yellow-50/30">
              <span className="font-label-mono text-label-mono uppercase text-fg-primary font-bold block">Validation Velocity</span>
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">98.4%</span>
              <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">Docket Validation Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01: ARCHITECTURAL ECOSYSTEM DIAGRAM */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-lg w-full" id="architecture">
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono text-label-mono uppercase text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
              [01] ARCHITECTURE
            </span>
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold tracking-tight">
              Interconnected Compass Schematic
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted hidden sm:inline">DATA BUS // LATENCY 14MS</span>
        </div>
        <div className="border border-border-strong bg-bg-surface p-space-md md:p-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md items-center">
            {/* WEST: INDUSTRY */}
            <div className="border border-border-strong p-space-md bg-bg-canvas hover:bg-yellow-50/20 transition-colors">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-mono text-label-mono uppercase bg-fg-primary text-bg-surface px-1.5 py-0.5 border border-border-strong font-bold">
                  WEST NODE
                </span>
                <span className="font-label-mono text-label-mono text-fg-muted">REQ_BUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold">Industry / Corporate</h3>
              <p className="font-body-sm text-body-sm text-fg-muted my-2">
                Live Requisition Streams, Problem Statements, Micro-internships, Capstone Grant Allocation.
              </p>
              <div className="font-label-mono text-label-mono text-fg-primary font-bold bg-yellow-100 px-1 border border-border-strong inline-block">
                → Outbound: 18,400 Monthly Slots
              </div>
            </div>

            {/* NORTH / SOUTH / CORE STACK */}
            <div className="flex flex-col gap-space-md">
              {/* NORTH: STUDENTS */}
              <div className="border border-border-strong p-space-md bg-bg-canvas hover:bg-yellow-50/20 transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-mono text-label-mono uppercase bg-accent-signal text-fg-primary px-1.5 py-0.5 font-bold border border-border-strong">
                    NORTH NODE
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">TALENT_INGEST</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold">Students / Talent</h3>
                <p className="font-body-sm text-body-sm text-fg-muted my-2">
                  Diagnostic Assessments, Skill Verification Dockets, Verifiable Credential Badges.
                </p>
                <div className="font-label-mono text-label-mono text-fg-primary font-bold bg-bg-subtle px-1 border border-border-strong inline-block">
                  ↓ Ingestion: 94,200 Verified Passports
                </div>
              </div>

              {/* CORE ENGINE */}
              <div className="border-2 border-border-strong bg-bg-surface p-space-lg text-center relative shadow-[2px_2px_0px_0px_#18181B]">
                <div className="inline-block px-2 py-0.5 bg-accent-signal border border-border-strong font-label-mono text-label-mono uppercase font-bold text-fg-primary mb-2">
                  PLATFORM NEXUS CORE
                </div>
                <h4 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold">SKILLBRIDGE // SIH MATRIX</h4>
                <p className="font-body-sm text-body-sm text-fg-muted mt-1">
                  Multi-vector Algorithmic Brokerage · Cryptographic Docket Verification · NIRF/NAAC Compliant Audits
                </p>
                <div className="grid grid-cols-3 gap-1 mt-space-md text-center font-label-mono text-label-mono text-fg-primary">
                  <span className="bg-bg-subtle p-1 border border-border-strong font-medium">API: 9ms</span>
                  <span className="bg-bg-subtle p-1 border border-border-strong font-medium">MATCH: 94%</span>
                  <span className="bg-bg-subtle p-1 border border-border-strong font-medium">MOUS: 1,480</span>
                </div>
              </div>

              {/* SOUTH: INSTITUTIONS */}
              <div className="border border-border-strong p-space-md bg-bg-canvas hover:bg-yellow-50/20 transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-mono text-label-mono uppercase bg-fg-primary text-bg-surface px-1.5 py-0.5 border border-border-strong font-bold">
                    SOUTH NODE
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">AUDIT_LEDGER</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold">Institutions / Campuses</h3>
                <p className="font-body-sm text-body-sm text-fg-muted my-2">
                  Outcome Governance, NAAC/NBA Metric Export, Curriculum Delta Reports, Placement Telemetry.
                </p>
                <div className="font-label-mono text-label-mono text-fg-primary font-bold bg-bg-subtle px-1 border border-border-strong inline-block">
                  ↑ Telemetry: 856 Accredited Hubs
                </div>
              </div>
            </div>

            {/* EAST: ACADEMIA */}
            <div className="border border-border-strong p-space-md bg-bg-canvas hover:bg-yellow-50/20 transition-colors">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-mono text-label-mono uppercase bg-fg-primary text-bg-surface px-1.5 py-0.5 border border-border-strong font-bold">
                  EAST NODE
                </span>
                <span className="font-label-mono text-label-mono text-fg-muted">RESEARCH_NEXUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold">Faculty &amp; Academia</h3>
              <p className="font-body-sm text-body-sm text-fg-muted my-2">
                Industrial Immersion Dockets, Sponsored Bilateral R&amp;D, Guest Lectorship Registry, Faculty FDP Modules.
              </p>
              <div className="font-label-mono text-label-mono text-fg-primary font-bold bg-yellow-100 px-1 border border-border-strong inline-block">
                ← Collaboration: $12.4M Active Grants
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: THE FOUR STAKEHOLDERS (EDITORIAL GRID) */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl w-full" id="stakeholders">
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono text-label-mono uppercase text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
              [02] STAKEHOLDERS
            </span>
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold tracking-tight">
              Specialized User Archetypes
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted">SYNCHRONIZED PARTICIPANTS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* CARD 01: STUDENTS */}
          <div className="border border-border-strong bg-bg-surface p-space-md flex flex-col justify-between hover:bg-yellow-50/20 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-sm">
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[01 / STUDENTS]</span>
                <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold mb-space-xs">
                Build Skills. Match Careers.
              </h3>
              <p className="font-body-sm text-body-sm text-fg-muted mb-space-md">
                Diagnose real-world capability gaps against industry requirements in real-time.
              </p>
              <ul className="space-y-1.5 font-label-mono text-label-mono text-fg-secondary border-t border-border-strong pt-space-sm mb-space-md">
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Diagnostic AI Skill Assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Real-Time Curriculum Gap Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Cryptographic Digital Passport
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> One-Click Verified Requisitions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Capstone Mentorship Dockets
                </li>
              </ul>
            </div>
            <Link
              href="/student/dashboard"
              className="w-full py-2 bg-bg-subtle hover:bg-accent-signal hover:text-fg-primary text-fg-primary text-center font-label-mono text-label-mono uppercase border border-border-strong transition-colors font-bold block"
            >
              Explore Student Path →
            </Link>
          </div>

          {/* CARD 02: INDUSTRY */}
          <div className="border border-border-strong bg-bg-surface p-space-md flex flex-col justify-between hover:bg-yellow-50/20 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-sm">
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[02 / INDUSTRY]</span>
                <span className="w-2.5 h-2.5 bg-fg-primary border border-border-strong" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold mb-space-xs">
                Find Talent. Outsource R&amp;D.
              </h3>
              <p className="font-body-sm text-body-sm text-fg-muted mb-space-md">
                Bypass traditional recruiter overhead through algorithmically pre-verified candidate proof-of-work.
              </p>
              <ul className="space-y-1.5 font-label-mono text-label-mono text-fg-secondary border-t border-border-strong pt-space-sm mb-space-md">
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Precision Skills-Match Ingestion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> SIH Problem Statement Dockets
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Faculty Advisory &amp; Consulting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Internship Cohort Governance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Recruitment Pipeline Analytics
                </li>
              </ul>
            </div>
            <Link
              href="/industry/dashboard"
              className="w-full py-2 bg-bg-subtle hover:bg-accent-signal hover:text-fg-primary text-fg-primary text-center font-label-mono text-label-mono uppercase border border-border-strong transition-colors font-bold block"
            >
              Explore Industry Path →
            </Link>
          </div>

          {/* CARD 03: ACADEMIA */}
          <div className="border border-border-strong bg-bg-surface p-space-md flex flex-col justify-between hover:bg-yellow-50/20 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-sm">
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[03 / ACADEMIA]</span>
                <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold mb-space-xs">
                Bridge Theory. Anchor Practice.
              </h3>
              <p className="font-body-sm text-body-sm text-fg-muted mb-space-md">
                Enable educators to secure corporate research grants and co-design accredited syllabi.
              </p>
              <ul className="space-y-1.5 font-label-mono text-label-mono text-fg-secondary border-t border-border-strong pt-space-sm mb-space-md">
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Faculty Industrial Fellowships
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Bilateral R&amp;D Grant Tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Corporate Guest Speaker Pool
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Joint Patent Docket Management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Continuous FDP Certification
                </li>
              </ul>
            </div>
            <Link
              href="/academician/dashboard"
              className="w-full py-2 bg-bg-subtle hover:bg-accent-signal hover:text-fg-primary text-fg-primary text-center font-label-mono text-label-mono uppercase border border-border-strong transition-colors font-bold block"
            >
              Explore Academia Path →
            </Link>
          </div>

          {/* CARD 04: INSTITUTIONS */}
          <div className="border border-border-strong bg-bg-surface p-space-md flex flex-col justify-between hover:bg-yellow-50/20 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-sm">
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[04 / INSTITUTIONS]</span>
                <span className="w-2.5 h-2.5 bg-fg-primary border border-border-strong" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-fg-primary uppercase font-bold mb-space-xs">
                Audit Metrics. Boost Placement.
              </h3>
              <p className="font-body-sm text-body-sm text-fg-muted mb-space-md">
                Real-time outcome measurement and NAAC/NIRF employability accreditation data synthesis.
              </p>
              <ul className="space-y-1.5 font-label-mono text-label-mono text-fg-secondary border-t border-border-strong pt-space-sm mb-space-md">
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Cohort Employability Index
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Real-Time Curriculum Delta
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> MOU Execution Telemetry
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Direct Placement Audit Ledger
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-status-success font-bold">✓</span> Regulatory Compliance Export
                </li>
              </ul>
            </div>
            <Link
              href="/institution/dashboard"
              className="w-full py-2 bg-bg-subtle hover:bg-accent-signal hover:text-fg-primary text-fg-primary text-center font-label-mono text-label-mono uppercase border border-border-strong transition-colors font-bold block"
            >
              Explore Institutions →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 03: 8-STEP PIPELINE */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl w-full" id="pipeline">
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono text-label-mono uppercase text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
              [03] PIPELINE
            </span>
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold tracking-tight">
              From Skills to Verified Outcomes
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted">END-TO-END EXECUTION</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-primary bg-accent-signal px-1 border border-border-strong font-bold">
              STAGE 01
            </span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">ASSESS</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Student initiates comprehensive algorithmic benchmark testing core and applied problem solving.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-muted font-bold">STAGE 02</span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">PROFILE</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Platform compiles an immutable digital profile mapped against the National Skills Qualifications Framework.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-primary bg-accent-signal px-1 border border-border-strong font-bold">
              STAGE 03
            </span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">IDENTIFY</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Engine identifies exact syllabus-to-corporate gaps (e.g., Missing Redis, gRPC, Distributed Sharding).
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-muted font-bold">STAGE 04</span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">DEVELOP</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Micro-credentials and sprint projects recommended directly by partner corporate engineering teams.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-muted font-bold">STAGE 05</span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">MATCH</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              AI engine routes vetted profiles into enterprise hiring dashboards with high-confidence readiness scores.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-primary bg-accent-signal px-1 border border-border-strong font-bold">
              STAGE 06
            </span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">EXPERIENCE</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Student executes live project or industrial internship with formal faculty and manager co-signatures.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-fg-muted font-bold">STAGE 07</span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">VERIFY</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Credentials and repository contributions minted into immutable Digital Skill Passports with SHA hashes.
            </p>
          </div>
          <div className="border border-border-strong bg-bg-surface p-space-md relative">
            <span className="font-label-mono text-label-mono text-status-success font-bold">STAGE 08</span>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-1 tnum">OUTCOME</div>
            <p className="font-body-sm text-body-sm text-fg-muted">
              National institutional audits update instantly, fulfilling NAAC/NIRF employability requirements automatically.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 04: OPPORTUNITIES CATALOG & MATCH ENGINE */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-space-md" id="matching">
        {/* LEFT: OPPORTUNITY CATALOG (5 COLS) */}
        <div className="lg:col-span-5 border border-border-strong bg-bg-surface p-space-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-md">
              <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[04] CATALOG</span>
              <span className="font-label-mono text-label-mono text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
                7,420 ACTIVE SLOTS
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold mb-space-sm">
              One Search. Every Opportunity.
            </h3>
            <p className="font-body-sm text-body-sm text-fg-muted mb-space-md">
              Bilateral opportunities indexed directly from Fortune 500 partners, national laboratories, and academic bodies.
            </p>
            <div className="grid grid-cols-2 gap-space-xs mb-space-md">
              <div className="border border-border-strong p-space-xs bg-bg-subtle hover:bg-bg-surface transition-colors">
                <span className="font-label-mono text-label-mono text-fg-muted block">INTERNSHIPS</span>
                <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">3,840</span>
              </div>
              <div className="border border-border-strong p-space-xs bg-bg-subtle hover:bg-bg-surface transition-colors">
                <span className="font-label-mono text-label-mono text-fg-muted block">LIVE PROJECTS</span>
                <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">1,215</span>
              </div>
              <div className="border border-border-strong p-space-xs bg-bg-subtle hover:bg-bg-surface transition-colors">
                <span className="font-label-mono text-label-mono text-fg-muted block">RESEARCH DOCKETS</span>
                <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">428</span>
              </div>
              <div className="border border-border-strong p-space-xs bg-bg-subtle hover:bg-bg-surface transition-colors">
                <span className="font-label-mono text-label-mono text-fg-muted block">FACULTY FELLOWSHIPS</span>
                <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold tnum">312</span>
              </div>
            </div>
          </div>
          <Link
            href="/student/internships"
            className="w-full py-space-sm bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase text-center hover:bg-accent-signal hover:text-fg-primary hover:border-border-strong border border-border-strong transition-colors font-medium block"
          >
            Access Catalog Database →
          </Link>
        </div>

        {/* RIGHT: MATCHING ENGINE INTERACTIVE CONSOLE (7 COLS) */}
        <div className="lg:col-span-7 border border-border-strong bg-bg-surface p-space-md">
          <div className="flex items-center justify-between pb-space-sm border-b border-border-strong mb-space-md">
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">[05] MATCH ENGINE</span>
            <span className="font-label-mono text-label-mono text-status-success font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-status-success inline-block" />
              ALGORITHMIC RESOLUTION • ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm items-start">
            {/* CANDIDATE PROFILE */}
            <div className="border border-border-strong p-space-sm bg-bg-canvas">
              <span className="font-label-mono text-label-mono text-fg-muted block mb-1">CANDIDATE DOSSIER</span>
              <div className="font-headline-sm text-headline-sm text-fg-primary font-bold mb-2">A. Sharma</div>
              <div className="space-y-1 font-label-mono text-label-mono text-fg-secondary">
                <div className="bg-bg-subtle px-1.5 py-0.5 border border-border-strong">Python 3.12 (98%)</div>
                <div className="bg-bg-subtle px-1.5 py-0.5 border border-border-strong">PostgreSQL (92%)</div>
                <div className="bg-bg-subtle px-1.5 py-0.5 border border-border-strong">FastAPI (86%)</div>
                <div className="bg-bg-subtle px-1.5 py-0.5 border border-border-strong">Distributed Systems (74%)</div>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-border-strong text-label-mono font-label-mono text-fg-muted">
                READINESS SCORE: <span className="text-fg-primary font-bold">87 / 100</span>
              </div>
            </div>

            {/* ENGINE MIDDLEWARE */}
            <div className="p-space-sm flex flex-col items-center justify-center text-center">
              <div className="w-full border-t border-dashed border-border-strong my-4 hidden md:block" />
              <span className="font-label-mono text-label-mono uppercase px-2 py-1 bg-accent-signal text-fg-primary font-bold border border-border-strong shadow-[2px_2px_0px_0px_#18181B]">
                92% FIT
              </span>
              <p className="font-body-sm text-body-sm text-fg-muted mt-2">
                Cosine Distance: 0.084<br />Taxonomy Alignment: OK
              </p>
              <div className="w-full border-t border-dashed border-border-strong my-4 hidden md:block" />
            </div>

            {/* REQUISITION */}
            <div className="border border-border-strong p-space-sm bg-bg-canvas">
              <span className="font-label-mono text-label-mono text-fg-muted block mb-1">REQUISITION REQ-802</span>
              <div className="font-headline-sm text-headline-sm text-fg-primary font-bold mb-2">Backend Engineer</div>
              <div className="space-y-1 font-label-mono text-label-mono">
                <div className="text-status-success bg-bg-surface px-1.5 py-0.5 border border-border-strong">✓ Python/FastAPI</div>
                <div className="text-status-success bg-bg-surface px-1.5 py-0.5 border border-border-strong">✓ Relational SQL</div>
                <div className="text-status-danger bg-yellow-50 px-1.5 py-0.5 border border-border-strong font-bold">⚠ Docker Orchestration</div>
              </div>
              <div className="mt-space-md pt-space-xs border-t border-border-strong text-label-mono font-label-mono text-fg-muted">
                DELTA: <span className="text-status-danger font-bold">Docker Gap (4-day sprint)</span>
              </div>
            </div>
          </div>

          <div className="mt-space-md p-space-sm bg-bg-subtle border border-border-strong flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="font-body-sm text-body-sm text-fg-secondary">
              Automated sprint path generated to bridge the Docker containerization deficit in 96 hours.
            </span>
            <button
              onClick={() => setSprintModalOpen(true)}
              className="font-label-mono text-label-mono px-2 py-1 bg-fg-primary text-bg-surface uppercase hover:bg-accent-signal hover:text-fg-primary border border-border-strong transition-colors font-medium whitespace-nowrap"
            >
              View Auto-Bridge
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 05: DIGITAL SKILL PASSPORT PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl w-full" id="passport">
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono text-label-mono uppercase text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
              [06] VERIFICATION
            </span>
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold tracking-tight">
              Digital Skill Passport Docket
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted">W3C VERIFIABLE CREDENTIAL</span>
        </div>
        <div className="border border-border-strong bg-bg-surface p-space-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-strong pb-space-md mb-space-md gap-space-sm">
            <div>
              <div className="font-label-mono text-label-mono uppercase text-fg-muted">// CANDIDATE CREDENTIAL LEDGER</div>
              <h3 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">PASSPORT ID: IN-2024-SIH-9921</h3>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-mono text-label-mono px-2 py-1 bg-accent-signal text-fg-primary border border-border-strong font-bold uppercase">
                CRYPTOGRAPHICALLY SIGNED
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">VALIDATED: 2024-Q3</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-space-md">
            <div className="border border-border-strong p-space-sm bg-bg-canvas">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase block">Core Composite Score</span>
              <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-2 tnum">
                87.4<span className="font-body-sm text-body-sm text-fg-muted">/100</span>
              </div>
              <p className="font-body-sm text-body-sm text-fg-secondary">Placed in top 4.2% percentile of national computer engineering test cohorts.</p>
            </div>
            <div className="border border-border-strong p-space-sm bg-bg-canvas">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase block">Verified Modules</span>
              <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-2 tnum">14 Units</div>
              <p className="font-body-sm text-body-sm text-fg-secondary">Co-validated by Tata Consultancy, Infosys R&amp;D, and IIT Bombay faculty.</p>
            </div>
            <div className="border border-border-strong p-space-sm bg-bg-canvas">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase block">Micro-Projects</span>
              <div className="font-metric-tabular text-metric-tabular text-fg-primary font-bold my-2 tnum">06 Finished</div>
              <p className="font-body-sm text-body-sm text-fg-secondary">All production git commits cryptographically hashed and verified.</p>
            </div>
            <div className="border border-border-strong p-space-sm bg-bg-canvas flex flex-col justify-between">
              <div>
                <span className="font-label-mono text-label-mono text-fg-muted uppercase block">Audit Verification</span>
                <div className="font-label-mono text-label-mono text-fg-primary break-all my-2 font-bold">
                  HASH: 0x9f8b2a...3e17c
                </div>
              </div>
              <button
                onClick={() => setQrModalOpen(true)}
                className="w-full py-1 bg-bg-subtle border border-border-strong font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors font-semibold"
              >
                Scan Proof QR →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: INSTITUTIONAL GAP AUDIT PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl w-full" id="gap-audit">
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono text-label-mono uppercase text-fg-primary bg-accent-signal px-1.5 py-0.5 border border-border-strong font-bold">
              [07] INSTITUTIONAL AUDIT
            </span>
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold tracking-tight">
              Curriculum vs Industry Benchmark
            </h2>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted">NIRF METRIC MATRIX 4.2</span>
        </div>
        <div className="border border-border-strong bg-bg-surface p-space-lg">
          <p className="font-body-md text-body-md text-fg-muted mb-space-md max-w-3xl">
            Aggregated institutional analytics surface latent curriculum obsolescence prior to campus placement cycles, allowing universities to adapt coursework to industry reality.
          </p>
          <div className="space-y-space-md">
            <div>
              <div className="flex justify-between font-label-mono text-label-mono mb-1">
                <span className="text-fg-primary font-bold uppercase">Cloud Architecture &amp; DevOps (Kubernetes/Terraform)</span>
                <span className="text-status-danger font-bold">42% Syllabus Delta</span>
              </div>
              <div className="w-full bg-bg-subtle h-2.5 border border-border-strong relative">
                <div className="bg-fg-primary h-full" style={{ width: '38%' }} />
              </div>
              <div className="flex justify-between font-label-mono text-label-mono text-fg-muted mt-1">
                <span>Syllabus Coverage: 38%</span>
                <span>Current Industry Requisition Demand: 80%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-mono text-label-mono mb-1">
                <span className="text-fg-primary font-bold uppercase">Modern Data Engineering &amp; Vector Databases</span>
                <span className="bg-accent-signal text-fg-primary px-1 border border-border-strong font-bold">28% Syllabus Delta</span>
              </div>
              <div className="w-full bg-bg-subtle h-2.5 border border-border-strong relative">
                <div className="bg-fg-primary h-full" style={{ width: '58%' }} />
              </div>
              <div className="flex justify-between font-label-mono text-label-mono text-fg-muted mt-1">
                <span>Syllabus Coverage: 58%</span>
                <span>Current Industry Requisition Demand: 86%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-mono text-label-mono mb-1">
                <span className="text-fg-primary font-bold uppercase">Relational Database Fundamentals &amp; SQL</span>
                <span className="text-status-success font-bold">04% Syllabus Delta (Optimal)</span>
              </div>
              <div className="w-full bg-bg-subtle h-2.5 border border-border-strong relative">
                <div className="bg-status-success h-full" style={{ width: '92%' }} />
              </div>
              <div className="flex justify-between font-label-mono text-label-mono text-fg-muted mt-1">
                <span>Syllabus Coverage: 92%</span>
                <span>Current Industry Requisition Demand: 96%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: CTA POSTER */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-lg w-full mb-space-lg">
        <div className="border border-border-strong bg-fg-primary text-bg-surface p-space-lg lg:p-space-2xl">
          <div className="max-w-3xl">
            <span className="font-label-mono text-label-mono uppercase text-accent-signal block mb-space-xs font-bold">
              [ ENROLLMENT PORTAL // LIVE ]
            </span>
            <h2 className="font-headline-lg text-headline-lg uppercase mb-space-sm leading-tight text-bg-surface font-extrabold">
              Bridge the Gap.<br />Start Building Today.
            </h2>
            <p className="font-body-md text-body-md text-neutral-400 mb-space-lg">
              Whether you are validating student talent, hiring top 1% engineers, funding research projects, or calibrating university outcomes — the unified platform is online.
            </p>
            <div className="flex flex-wrap gap-space-sm">
              <Link
                href="/register"
                className="px-space-lg py-space-sm bg-accent-signal text-fg-primary font-label-mono text-label-mono uppercase font-bold border border-border-strong hover:bg-accent-signal-hover transition-colors shadow-[2px_2px_0px_0px_#18181B]"
              >
                Create Account →
              </Link>
              <a
                href="#pipeline"
                className="px-space-lg py-space-sm bg-transparent text-bg-surface border border-neutral-600 font-label-mono text-label-mono uppercase hover:bg-neutral-800 transition-colors"
              >
                Download Platform Whitepaper
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL: SPRINT AUTO-BRIDGE */}
      {sprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-none p-4">
          <div className="bg-bg-surface border-2 border-border-strong max-w-lg w-full p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
            <div className="flex justify-between items-center border-b border-border-strong pb-space-sm mb-space-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-accent-signal border border-border-strong" />
                <h3 className="font-headline-sm font-bold uppercase">Docker Accelerated Sprint Docket</h3>
              </div>
              <button
                onClick={() => setSprintModalOpen(false)}
                className="font-label-mono text-label-mono uppercase text-fg-muted hover:text-fg-primary"
              >
                [ESC]
              </button>
            </div>
            <div className="space-y-space-sm text-body-sm text-fg-secondary">
              <p className="font-semibold text-fg-primary">
                Generated 96-Hour Accelerated Bridge Program:
              </p>
              <ul className="list-disc list-inside space-y-1 font-label-mono text-label-mono">
                <li>Module 01: Dockerfile Optimization &amp; Multi-stage Builds</li>
                <li>Module 02: Container Networking &amp; Volume Bindings</li>
                <li>Module 03: Docker Compose Microservices Topology</li>
                <li>Module 04: Interactive Production Sandbox Assessment</li>
              </ul>
              <div className="p-3 bg-bg-subtle border border-border-strong text-fg-muted font-label-mono text-xs">
                Estimated Readiness Post-Sprint: <span className="text-status-success font-bold">98% Match Fit</span>
              </div>
            </div>
            <div className="mt-space-md flex justify-end gap-2">
              <button
                onClick={() => setSprintModalOpen(false)}
                className="px-4 py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary border border-border-strong transition-colors"
              >
                Close Docket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QR PROOF */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-none p-4">
          <div className="bg-bg-surface border-2 border-border-strong max-w-md w-full p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
            <div className="flex justify-between items-center border-b border-border-strong pb-space-sm mb-space-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-accent-signal border border-border-strong" />
                <h3 className="font-headline-sm font-bold uppercase">W3C Credential Verification</h3>
              </div>
              <button
                onClick={() => setQrModalOpen(false)}
                className="font-label-mono text-label-mono uppercase text-fg-muted hover:text-fg-primary"
              >
                [ESC]
              </button>
            </div>
            <div className="text-center py-4 space-y-3">
              <div className="w-36 h-36 bg-bg-subtle border-2 border-border-strong mx-auto flex items-center justify-center p-2">
                <div className="w-full h-full bg-fg-primary flex items-center justify-center text-bg-surface font-label-mono text-[10px] p-2 text-center">
                  [SHA-256 QR VERIFIED: 0x9f8b2a...3e17c]
                </div>
              </div>
              <div className="font-label-mono text-label-mono text-fg-primary font-bold">
                PASSPORT: IN-2024-SIH-9921
              </div>
              <p className="text-body-sm text-fg-muted">
                Status: <span className="text-status-success font-bold">VALID &amp; REGISTERED</span> on National Talent Ledger.
              </p>
            </div>
            <div className="mt-space-md flex justify-end">
              <button
                onClick={() => setQrModalOpen(false)}
                className="w-full py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary border border-border-strong transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
