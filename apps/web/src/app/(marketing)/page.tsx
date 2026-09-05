import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const roleNodes = [
    {
      node: 'NODE 01',
      title: 'Student Portal',
      desc: 'Cryptographic skill passport, progression radar, gap remediation & live application lifecycle tracking.',
      href: '/student/dashboard',
      accent: true,
      badge: 'CANDIDATE NODE',
    },
    {
      node: 'NODE 02',
      title: 'Academician Portal',
      desc: 'Faculty portfolio hub, H-Index & patent ledgers, joint R&D lab pods & sponsored industry dockets.',
      href: '/academician/dashboard',
      accent: false,
      badge: 'RESEARCH NODE',
    },
    {
      node: 'NODE 03',
      title: 'Industry Portal',
      desc: 'AI job description parser, automated skill extraction engine, top 5% candidate matching & corporate MoUs.',
      href: '/industry/dashboard',
      accent: false,
      badge: 'ENTERPRISE NODE',
    },
    {
      node: 'NODE 04',
      title: 'Institution Portal',
      desc: 'Institutional skill intelligence, AICTE model curriculum deviation analytics, and multi-entity verification directory.',
      href: '/institution/dashboard',
      accent: false,
      badge: 'GOVERNANCE NODE',
    },
  ];

  const pipelineSteps = [
    {
      step: 'STEP 01',
      title: 'Students',
      desc: 'Authentic student dockets with cryptographic repository proof.',
      tag: 'INPUT NODE',
      accent: true,
    },
    {
      step: 'STEP 02',
      title: 'Skills',
      desc: 'Granular skill taxonomy benchmarked against live industrial demand.',
      tag: 'AUDIT MATRIX',
      accent: false,
    },
    {
      step: 'STEP 03',
      title: 'Learning',
      desc: 'Automated curriculum bridging based on detected percentage gaps.',
      tag: 'ACCELERATION',
      accent: false,
    },
    {
      step: 'STEP 04',
      title: 'Opportunities',
      desc: 'Algorithmic matching of dockets, internships and core placements.',
      tag: 'MATCH ENGINE',
      accent: false,
    },
    {
      step: 'STEP 05',
      title: 'Industry',
      desc: 'Enterprise talent pipelines, live requisitions & research funding.',
      tag: 'RECIPROCITY',
      accent: false,
    },
    {
      step: 'STEP 06',
      title: 'Academia',
      desc: 'Faculty joint research, industrial consultancy & accreditation audits.',
      tag: 'NATIONAL LOCK',
      accent: false,
      dark: true,
    },
  ];

  const recentDockets = [
    {
      id: 'DK-TCS-0984',
      org: 'Tata Consultancy Services',
      role: 'Distributed Systems & Cloud Engineer',
      type: 'Industrial Placement',
      stipend: '₹45,000 / mo',
      tags: ['FastAPI', 'Kubernetes', 'Golang'],
      status: 'ACTIVE SELECTION',
    },
    {
      id: 'DK-RND-8042',
      org: 'IISc Bangalore x Tata Motors',
      role: 'EV Battery Management Thermal Algorithms',
      type: 'Joint R&D Project',
      stipend: '₹1.85 Cr Grant',
      tags: ['Simulink', 'C++', 'Battery Telemetry'],
      status: 'LAB FORMATION',
    },
    {
      id: 'DK-INT-7712',
      org: 'ISRO Telemetry Node',
      role: 'Satellite Payload Signal Processing',
      type: 'Research Fellowship',
      stipend: '₹35,000 / mo',
      tags: ['DSP', 'Python', 'Radar'],
      status: 'VERIFICATION PENDING',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* =============================================================== */}
      {/* HERO SECTION (Swiss Typographic Grid)                           */}
      {/* =============================================================== */}
      <section className="border-b border-border-strong bg-bg-surface">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-2xl md:py-space-4xl grid grid-cols-1 md:grid-cols-12 gap-space-lg items-start">
          <div className="md:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-space-xs border border-border-strong px-2.5 py-1 mb-space-md bg-bg-subtle">
              <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
              <span className="font-label-mono text-label-mono uppercase tracking-wider text-fg-secondary">
                SMART INDIA HACKATHON 2024 PROTOCOL // SIH-8042
              </span>
            </div>

            <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight mb-space-md font-extrabold leading-none">
              BRIDGE THE GAP BETWEEN<br className="hidden sm:inline" /> SKILLS &amp; INDUSTRY.
            </h1>

            <p className="text-body-lg font-body-lg text-fg-muted max-w-2xl mb-space-xl">
              One unified typographic platform connecting students, academicians, institutions, and industry through mathematically verified skills, transparent research dockets, and industrial collaboration opportunities.
            </p>

            <div className="flex flex-wrap gap-space-md items-center">
              <Link
                href="/register"
                className="bg-accent-signal text-fg-primary border border-border-strong px-space-xl py-3 font-headline-sm text-body-md hover:bg-accent-signal-hover transition-colors uppercase tracking-wide font-bold shadow-[2px_2px_0px_0px_#18181B]"
              >
                Get Started
              </Link>
              <Link
                href="/student/dashboard"
                className="bg-bg-surface text-fg-primary border border-border-strong hover:bg-bg-subtle px-space-lg py-3 font-headline-sm text-body-md transition-colors uppercase tracking-wide"
              >
                Explore Ecosystem
              </Link>
            </div>
          </div>

          {/* Direct Role Selector Column */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-border-strong pt-space-lg md:pt-0 md:pl-space-xl flex flex-col justify-between h-full">
            <div>
              <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-space-xs">
                // DIRECT ROLE SELECTOR
              </span>
              <p className="text-body-sm font-body-sm text-fg-secondary mb-space-md">
                Select an institutional node to inspect specialized state machine and operational tools:
              </p>

              <div className="grid grid-cols-1 gap-space-xs">
                {roleNodes.map((item) => (
                  <Link
                    key={item.node}
                    href={item.href}
                    className="w-full text-left p-space-md border border-border-strong hover:bg-bg-subtle transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span
                        className={`font-label-mono text-label-mono px-1.5 py-0.5 border border-border-strong block w-fit font-bold ${
                          item.accent ? 'bg-accent-signal text-fg-primary' : 'bg-bg-subtle text-fg-muted'
                        }`}
                      >
                        {item.node}
                      </span>
                      <span className="font-headline-sm text-body-md text-fg-primary font-semibold mt-1 block">
                        {item.title}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-fg-muted group-hover:text-fg-primary group-hover:translate-x-0.5 transition-all">
                      arrow_forward
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* METRICS & TICKER GRID                                           */}
      {/* =============================================================== */}
      <section className="border-b border-border-strong bg-bg-surface">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-lg grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-muted uppercase block">STUDENTS VERIFIED</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">140,000+</span>
            <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">Across 28 Indian States</span>
          </div>
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-muted uppercase block">ACTIVE ENTERPRISES</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">2,400+</span>
            <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">R&amp;D, Core, IT, Hardware</span>
          </div>
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-muted uppercase block">ACCREDITED INSTITUTIONS</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">850+</span>
            <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">AICTE / UGC Compliant</span>
          </div>
          <div className="border-l-2 border-accent-signal pl-space-md bg-yellow-50/30">
            <span className="font-label-mono text-label-mono text-fg-primary font-bold uppercase block">COLLABORATION VELOCITY</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum">98.4%</span>
            <span className="text-body-sm font-body-sm text-fg-muted block mt-0.5">Docket Validation Rate</span>
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* ECOSYSTEM FLOW ARCHITECTURE (Swiss Typographic Vector)          */}
      {/* =============================================================== */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-3xl w-full">
        <div className="mb-space-lg">
          <span className="font-label-mono text-label-mono uppercase text-fg-muted">// SECTION 02: STRUCTURAL SCHEMA</span>
          <h2 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary">
            Ecosystem Flow Architecture
          </h2>
          <p className="text-body-md font-body-md text-fg-muted">
            Mathematical synchronization pipeline connecting students, mentors, academia, and enterprise.
          </p>
        </div>

        <div className="border border-border-strong bg-bg-surface p-space-md md:p-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-0 border border-border-strong">
            {pipelineSteps.map((step) => (
              <div
                key={step.step}
                className={`p-space-lg border-b md:border-b-0 md:border-r border-border-strong last:border-r-0 flex flex-col justify-between ${
                  step.dark
                    ? 'bg-fg-primary text-bg-surface'
                    : step.accent
                    ? 'bg-bg-surface'
                    : 'bg-bg-subtle/40'
                }`}
              >
                <div>
                  <span
                    className={`font-label-mono text-label-mono px-1 py-0.5 border border-border-strong font-bold ${
                      step.dark
                        ? 'text-accent-signal border-neutral-700 bg-neutral-900'
                        : step.accent
                        ? 'text-fg-primary bg-accent-signal'
                        : 'text-fg-secondary bg-white'
                    }`}
                  >
                    {step.step}
                  </span>
                  <h3
                    className={`font-headline-sm text-headline-sm uppercase mt-2 ${
                      step.dark ? 'text-bg-surface' : 'text-fg-primary'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-body-sm font-body-sm mt-2 ${
                      step.dark ? 'text-neutral-400' : 'text-fg-muted'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
                <span
                  className={`font-label-mono text-label-mono mt-4 font-bold ${
                    step.dark ? 'text-accent-signal' : 'text-fg-muted'
                  }`}
                >
                  ↓ {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* ACTIVE INDUSTRIAL REQUISITIONS & R&D DOCKETS                    */}
      {/* =============================================================== */}
      <section className="border-t border-border-strong bg-bg-subtle/30 py-space-3xl">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
            <div>
              <span className="font-label-mono text-label-mono uppercase text-fg-muted">// SECTION 03: LIVE LEDGER</span>
              <h2 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary">
                Active Industrial &amp; Research Dockets
              </h2>
              <p className="text-body-md font-body-md text-fg-muted">
                Algorithmic talent requisitions and national institutional collaboration dockets.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="font-label-mono text-label-mono uppercase text-fg-primary border border-border-strong px-space-md py-2 bg-bg-surface hover:bg-bg-subtle transition-colors flex items-center gap-1 w-fit"
            >
              <span>View All Dockets (142)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {recentDockets.map((docket) => (
              <div
                key={docket.id}
                className="bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between hover:border-fg-primary transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-sm font-label-mono text-label-mono">
                    <span className="text-fg-muted">{docket.id}</span>
                    <span className="text-status-success font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-status-success inline-block" />
                      {docket.status}
                    </span>
                  </div>

                  <span className="text-fg-muted text-xs font-mono block mb-1">{docket.org}</span>
                  <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary mb-2 group-hover:text-accent-signal transition-colors">
                    {docket.role}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-space-md">
                    <span className="font-metric-tabular text-headline-sm text-fg-primary tnum">
                      {docket.stipend}
                    </span>
                    <span className="font-label-mono text-[10px] text-fg-muted uppercase">({docket.type})</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-space-lg">
                    {docket.tags.map((t) => (
                      <span
                        key={t}
                        className="font-label-mono text-[10px] uppercase px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/login"
                  className="w-full text-center py-2.5 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors border border-border-strong"
                >
                  Inspect Docket &amp; Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

