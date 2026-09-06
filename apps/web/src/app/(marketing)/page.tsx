'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [showSimulator, setShowSimulator] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['FastAPI', 'Docker', 'PostgreSQL']);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const calculatedMatch = Math.min(96, 50 + selectedSkills.length * 8.5).toFixed(1);
  const calculatedDockets = Math.min(24, 6 + selectedSkills.length * 3);
  const calculatedStipend = Math.min(65, 30 + selectedSkills.length * 5);

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
    {
      id: 'DK-DRDO-4109',
      org: 'DRDO Cyber Defense Pod',
      role: 'Quantum Key Distribution Network Protocol',
      type: 'Defense Fellowship',
      stipend: '₹48,000 / mo',
      tags: ['Rust', 'QKD', 'Cryptography'],
      status: 'ACTIVE SELECTION',
    },
    {
      id: 'DK-INF-5520',
      org: 'Infosys AI Research Labs',
      role: 'Multimodal LLM Fine-Tuning for Indian Dialects',
      type: 'Industry Research Docket',
      stipend: '₹50,000 / mo',
      tags: ['PyTorch', 'NLP', 'Transformers'],
      status: 'LAB FORMATION',
    },
    {
      id: 'DK-IITD-9214',
      org: 'IIT Delhi x Siemens Energy',
      role: 'Smart Grid Telemetry & Power Load Forecasting',
      type: 'Joint Industrial Grant',
      stipend: '₹2.20 Cr Grant',
      tags: ['TimescaleDB', 'IoT', 'SCADA'],
      status: 'VERIFICATION PENDING',
    },
  ];

  return (
    <main className="w-full flex flex-col relative">
      {/* =============================================================== */}
      {/* LEFT SIDE SLIDE-OUT SIMULATOR DRAWER                            */}
      {/* =============================================================== */}
      {/* Backdrop overlay */}
      {showSimulator && (
        <div
          onClick={() => setShowSimulator(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        />
      )}

      {/* Left Drawer Container */}
      <aside
        aria-label="Skill Match Simulator Drawer"
        className={`fixed top-0 left-0 h-full w-[90vw] max-w-[420px] bg-bg-surface border-r-2 border-border-strong shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between ${
          showSimulator ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-space-lg overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b-2 border-border-strong pb-3 mb-space-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-signal inline-block" />
              <div>
                <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary block leading-none">
                  SKILL MATCH SIMULATOR
                </span>
                <span className="text-[10px] font-mono text-status-success font-bold">
                  LIVE TELEMETRY v4.2
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSimulator(false)}
              className="font-mono text-xs uppercase font-bold border border-border-strong px-2 py-1 bg-bg-subtle hover:bg-bg-canvas"
            >
              [✕]
            </button>
          </div>

          {/* Body instructions */}
          <p className="text-body-sm text-fg-secondary mb-space-md">
            Select your technical stack to calculate real-time compatibility across 2,400+ requisitions:
          </p>

          {/* Skill Tag Toggles */}
          <div className="flex flex-wrap gap-1.5 mb-space-lg">
            {['FastAPI', 'Docker', 'PostgreSQL', 'Kubernetes', 'PyTorch', 'Rust', 'Golang', 'TypeScript', 'Redis', 'Next.js'].map(
              (skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 text-xs font-label-mono uppercase border transition-all font-bold ${
                      isSelected
                        ? 'bg-accent-signal text-fg-primary border-border-strong shadow-[2px_2px_0px_0px_#18181B]'
                        : 'bg-bg-subtle text-fg-secondary border-border-hairline hover:text-fg-primary hover:bg-bg-canvas'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              }
            )}
          </div>

          {/* Live Telemetry Score Cards */}
          <div className="space-y-2 border-2 border-border-strong bg-bg-canvas p-space-md font-mono mb-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <span className="text-xs text-fg-muted uppercase">ESTIMATED COMPATIBILITY</span>
              <span className="text-lg font-bold text-status-success">{calculatedMatch}%</span>
            </div>
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <span className="text-xs text-fg-muted uppercase">MATCHING REQUISITIONS</span>
              <span className="text-sm font-bold text-fg-primary">{calculatedDockets} ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted uppercase">EST. STIPEND RANGE</span>
              <span className="text-sm font-bold text-fg-primary">₹{calculatedStipend}K / mo</span>
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-space-md border-t-2 border-border-strong bg-bg-subtle">
          <Link
            href="/register"
            className="w-full block text-center py-3 bg-accent-signal text-fg-primary font-label-mono text-xs uppercase font-bold border-2 border-border-strong hover:bg-accent-signal-hover transition-colors shadow-[2px_2px_0px_0px_#18181B]"
          >
            Create Docket with These Skills →
          </Link>
        </div>
      </aside>

      {/* Dynamic Trapezium Arrow Tab Toggle (Left-Center -> Top-Left Corner under Nav on Scroll) */}
      <div
        className={`fixed z-50 flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'top-[56px] left-2 -translate-y-0'
            : 'top-1/2 -translate-y-1/2'
        } ${
          showSimulator
            ? isScrolled
              ? 'top-[56px] left-[90vw] max-w-[420px]:left-[420px] sm:left-[420px]'
              : 'left-[90vw] max-w-[420px]:left-[420px] sm:left-[420px]'
            : isScrolled
            ? 'left-2'
            : 'left-0'
        }`}
      >
        <button
          type="button"
          onClick={() => setShowSimulator((prev) => !prev)}
          title={showSimulator ? 'Close Skill Simulator' : 'Open Skill Match Simulator'}
          aria-label={showSimulator ? 'Close Skill Simulator' : 'Open Skill Match Simulator'}
          style={{
            clipPath: isScrolled
              ? 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)' // Sleek compact hanging trapezium from top corner
              : 'polygon(0% 0%, 100% 12%, 100% 88%, 0% 100%)', // Side trapezium
          }}
          className={`bg-accent-signal text-fg-primary transition-all duration-300 shadow-[1px_1px_0px_0px_#18181B] hover:bg-accent-signal-hover flex items-center justify-center group ${
            isScrolled
              ? 'px-3 py-1.5 border-b border-x border-border-strong'
              : 'pl-1 pr-2.5 py-8 border-r-2 border-border-strong w-6 hover:w-7 hover:pr-3.5'
          } ${showSimulator ? 'bg-fg-primary text-bg-surface' : ''}`}
        >
          <span
            className={`material-symbols-outlined font-black transition-transform duration-300 ${
              isScrolled
                ? `text-[14px] ${showSimulator ? 'rotate-180' : 'group-hover:translate-y-0.5'}`
                : `text-[16px] -ml-1 ${showSimulator ? 'rotate-180' : 'group-hover:translate-x-0.5'}`
            }`}
          >
            {isScrolled ? 'expand_more' : 'chevron_right'}
          </span>
        </button>
      </div>

      {/* =============================================================== */}
      {/* HERO SECTION (Swiss Typographic Grid)                           */}
      {/* =============================================================== */}
      <section className="border-b border-border-strong bg-bg-surface" aria-label="Hero Introduction">
        <div className="max-w-[1440px] mx-auto px-space-lg lg:px-space-2xl py-space-lg md:py-space-xl grid grid-cols-1 md:grid-cols-12 gap-space-lg items-start">
          <div className="md:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-space-xs border border-border-strong px-2.5 py-1 mb-space-sm bg-bg-subtle">
              <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
              <span className="font-label-mono text-label-mono uppercase tracking-wider text-fg-secondary font-semibold">
                SMART INDIA HACKATHON 2024 PROTOCOL // SIH-8042
              </span>
            </div>

            <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight mb-space-sm font-extrabold leading-none">
              BRIDGE THE GAP BETWEEN<br className="hidden sm:inline" /> SKILLS &amp; INDUSTRY.
            </h1>

            <p className="text-body-lg font-body-lg text-fg-secondary max-w-2xl mb-space-lg">
              One unified cryptographic platform connecting students, academicians, institutions, and industry through mathematically verified skills, transparent research dockets, and industrial collaboration opportunities.
            </p>

            <div className="flex flex-wrap gap-space-md items-center mb-space-xl">
              <Link
                href="/register"
                className="bg-accent-signal text-fg-primary border border-border-strong px-space-xl py-3 font-headline-sm text-body-md hover:bg-accent-signal-hover transition-all uppercase tracking-wide font-bold shadow-[2px_2px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="/search"
                className="bg-bg-surface text-fg-primary border border-border-strong hover:bg-bg-subtle px-space-lg py-3 font-headline-sm text-body-md transition-colors uppercase tracking-wide font-semibold"
              >
                Universal Discovery
              </Link>
            </div>
          </div>

          {/* Direct Role Selector Column */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-border-strong pt-space-lg md:pt-0 md:pl-space-xl flex flex-col justify-between h-full">
            <div>
              <span className="font-label-mono text-label-mono uppercase text-fg-secondary font-semibold block mb-space-xs">
                // DIRECT ROLE SELECTOR
              </span>
              <p className="text-body-sm font-body-sm text-fg-secondary mb-space-md">
                Select an institutional node to inspect specialized state machines and operational tools:
              </p>

              <div className="grid grid-cols-1 gap-space-xs">
                {roleNodes.map((item) => (
                  <Link
                    key={item.node}
                    href={item.href}
                    className="w-full text-left p-space-md border border-border-strong hover:bg-bg-subtle hover:border-fg-primary transition-all flex items-center justify-between group bg-bg-surface shadow-[1px_1px_0px_0px_#18181B]"
                  >
                    <div>
                      <span
                        className={`font-label-mono text-label-mono px-1.5 py-0.5 border border-border-strong block w-fit font-bold ${
                          item.accent ? 'bg-accent-signal text-fg-primary' : 'bg-bg-subtle text-fg-secondary'
                        }`}
                      >
                        {item.node}
                      </span>
                      <span className="font-headline-sm text-body-md text-fg-primary font-bold mt-1 block">
                        {item.title}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-fg-secondary group-hover:text-fg-primary group-hover:translate-x-0.5 transition-all">
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
      <section className="border-b border-border-strong bg-bg-surface" aria-label="National Metrics">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-lg grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-secondary font-semibold uppercase block">STUDENTS VERIFIED</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum font-bold">140,000+</span>
            <span className="text-body-sm font-body-sm text-fg-secondary block mt-0.5">Across 28 Indian States</span>
          </div>
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-secondary font-semibold uppercase block">ACTIVE ENTERPRISES</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum font-bold">2,400+</span>
            <span className="text-body-sm font-body-sm text-fg-secondary block mt-0.5">R&amp;D, Core, IT, Hardware</span>
          </div>
          <div className="border-l-2 border-border-strong pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-secondary font-semibold uppercase block">ACCREDITED INSTITUTIONS</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum font-bold">850+</span>
            <span className="text-body-sm font-body-sm text-fg-secondary block mt-0.5">AICTE / UGC Compliant</span>
          </div>
          <div className="border-l-2 border-accent-signal pl-space-md bg-yellow-50/30">
            <span className="font-label-mono text-label-mono text-fg-primary font-bold uppercase block">COLLABORATION VELOCITY</span>
            <span className="font-metric-tabular text-metric-tabular text-fg-primary tnum font-bold">98.4%</span>
            <span className="text-body-sm font-body-sm text-fg-secondary font-medium block mt-0.5">Docket Validation Rate</span>
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* ECOSYSTEM FLOW ARCHITECTURE (Swiss Typographic Vector)          */}
      {/* =============================================================== */}
      <section className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl md:py-space-2xl w-full" aria-label="Ecosystem Flow">
        <div className="mb-space-lg">
          <span className="font-label-mono text-label-mono uppercase text-fg-secondary font-semibold">// SECTION 02: STRUCTURAL SCHEMA</span>
          <h2 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary font-bold">
            Ecosystem Flow Architecture
          </h2>
          <p className="text-body-md font-body-md text-fg-secondary">
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
                        : 'text-fg-primary bg-white'
                    }`}
                  >
                    {step.step}
                  </span>
                  <h3
                    className={`font-headline-sm text-headline-sm uppercase mt-2 font-bold ${
                      step.dark ? 'text-bg-surface' : 'text-fg-primary'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-body-sm font-body-sm mt-2 ${
                      step.dark ? 'text-neutral-300' : 'text-fg-secondary'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
                <span
                  className={`font-label-mono text-label-mono mt-4 font-bold ${
                    step.dark ? 'text-accent-signal' : 'text-fg-secondary'
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
      <section className="border-t border-border-strong bg-bg-subtle/30 py-space-xl md:py-space-2xl overflow-hidden" aria-label="Live Telemetry Dockets">
        <div className="max-w-[1440px] mx-auto px-space-md lg:px-space-lg mb-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-mono text-label-mono uppercase text-fg-secondary font-semibold">// SECTION 03: LIVE LEDGER</span>
              <h2 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary font-bold">
                Active Industrial &amp; Research Dockets
              </h2>
              <p className="text-body-md font-body-md text-fg-secondary">
                Algorithmic talent requisitions and national institutional collaboration dockets.
              </p>
            </div>
            <Link
              href="/search"
              className="font-label-mono text-label-mono uppercase text-fg-primary border border-border-strong px-space-md py-2 bg-bg-surface hover:bg-bg-subtle transition-colors flex items-center gap-1 w-fit font-bold"
            >
              <span>View Universal Explorer</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Continuous Horizontal Right-to-Left Ticker Ribbon */}
        <div className="w-full overflow-hidden relative">
          <div className="animate-marquee-continuous flex items-stretch gap-space-lg py-2 px-space-md">
            {[...recentDockets, ...recentDockets].map((docket, index) => (
              <article
                key={`${docket.id}-${index}`}
                className="w-[340px] md:w-[380px] shrink-0 bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between hover:border-fg-primary transition-all shadow-[2px_2px_0px_0px_#18181B] group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-sm font-label-mono text-label-mono">
                    <span className="text-fg-secondary font-mono">{docket.id}</span>
                    <span className="text-status-success font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-status-success inline-block rounded-full" />
                      {docket.status}
                    </span>
                  </div>

                  <span className="text-fg-secondary text-xs font-mono block mb-1 font-semibold">{docket.org}</span>
                  <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary mb-2 group-hover:text-accent-signal transition-colors line-clamp-2 min-h-[48px]">
                    {docket.role}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-space-md">
                    <span className="font-metric-tabular text-headline-sm text-fg-primary tnum font-bold">
                      {docket.stipend}
                    </span>
                    <span className="font-label-mono text-[10px] text-fg-secondary uppercase font-semibold">({docket.type})</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-space-lg">
                    {docket.tags.map((t) => (
                      <span
                        key={t}
                        className="font-label-mono text-[10px] uppercase px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/login"
                  className="w-full text-center py-2.5 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors border border-border-strong font-bold"
                >
                  Inspect Docket &amp; Apply
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
