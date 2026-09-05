'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AcademicianApplicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const dockets = [
    {
      id: '#DK-FAC-992',
      title: 'Edge AI ASIC Design & Low-Power Inference Sabbatical',
      org: 'TechNova Semiconductor Research Center // Bengaluru',
      type: 'FACULTY SABBATICAL',
      stipend: '₹1,20,000 / mo',
      duration: '6 Months (Deputation)',
      stage: 'DEAN NOC COUNTERSIGN PENDING',
      stageColor: 'bg-status-warning text-fg-primary font-bold',
      actionNeeded: true,
      pi: 'Dr. V. Ramanathan (EmpID: F-4081)',
      domain: 'VLSI & Edge Neural Systems',
      mouStatus: 'INSTITUTIONAL MOU SIGNED',
    },
    {
      id: '#DK-FAC-844',
      title: 'ISRO Micro-Satellite Payload Signal Processing Consultancy',
      org: 'ISRO Telemetry & Tracking Network (ISTRAC) // Ahmedabad',
      type: 'FUNDED CONSULTANCY',
      stipend: '₹18,50,000 Grant',
      duration: '1 Year Retainer',
      stage: 'APPROVED & FUNDED',
      stageColor: 'bg-status-success text-white font-bold',
      actionNeeded: false,
      pi: 'Dr. V. Ramanathan & Dr. N. Ramanathan',
      domain: 'DSP & Space Telematics',
      mouStatus: 'STATUTORY CLEARANCE GRANTED',
    },
    {
      id: '#DK-FAC-710',
      title: 'AICTE National Faculty Development Program on Quantum Computing',
      org: 'AICTE Training & Learning (ATAL) Academy // New Delhi',
      type: 'AICTE FDP LEAD',
      stipend: '₹3,50,000 Honorarium',
      duration: '2 Weeks (Intensive)',
      stage: 'SHORTLISTED FOR DISPATCH',
      stageColor: 'bg-neutral-900 text-accent-signal font-bold',
      actionNeeded: false,
      pi: 'Dr. V. Ramanathan (Course Director)',
      domain: 'Quantum Algorithms & Qiskit',
      mouStatus: 'CENTRAL ALLOCATION CONFIRMED',
    },
  ];

  return (
    <div className="space-y-space-lg">
      {/* Header Docket Title */}
      <div className="pb-space-md border-b border-border-strong flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted uppercase">
            <span>PORTAL CORE // NODE: FAC-8042</span>
            <span className="text-border-hairline">|</span>
            <span className="text-status-success font-semibold">NEXUS-SOUTH-4</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase tracking-tight mt-1">
            Faculty Opportunities &amp; Application Tracking
          </h1>
          <p className="text-body-md text-fg-muted">
            Institutional governance and tracking docket for faculty sabbaticals, industrial consultancies, and AICTE programs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="px-space-md py-2 bg-accent-signal text-fg-primary font-label-mono text-xs uppercase font-bold hover:bg-accent-signal-hover transition-colors border border-border-strong shadow-[2px_2px_0px_0px_#18181B]">
            Propose New Docket
          </button>
        </div>
      </div>

      {/* 4 Stat Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase">01 // TOTAL OPPORTUNITIES</span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">28</span>
              <span className="font-label-mono text-xs text-status-success font-bold">+03 NEW</span>
            </div>
            <span className="font-body-sm text-[11px] text-fg-muted block mt-0.5">Vetted by National Board</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase">02 // ACTIVE APPLICATIONS</span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-3xl font-bold text-status-warning tnum">04</span>
              <span className="font-label-mono text-xs text-status-warning font-bold">1 ACTION REQ</span>
            </div>
            <span className="font-body-sm text-[11px] text-fg-muted block mt-0.5">Dean NOC countersign required</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase">03 // APPROVED MOUS</span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">06</span>
              <span className="font-label-mono text-xs text-status-success font-bold">ACTIVE</span>
            </div>
            <span className="font-body-sm text-[11px] text-fg-muted block mt-0.5">Tier-1 PSUs &amp; Global AI</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-accent-signal p-space-md flex flex-col justify-between h-32">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase">04 // CUMULATIVE GRANTS</span>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">₹1.85 Cr</span>
              <span className="font-label-mono text-xs text-fg-muted">39% USED</span>
            </div>
            <span className="font-body-sm text-[11px] text-fg-muted block mt-0.5">Ongoing research dockets</span>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-bg-surface border border-border-strong">
        <div className="border-b border-border-hairline flex items-center overflow-x-auto font-mono text-xs">
          {['All', 'Faculty Sabbaticals', 'Industrial Training', 'AICTE FDPs', 'Funded Consultancy', 'Joint Research'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedCategory(tab)}
              className={`px-space-md py-3 uppercase whitespace-nowrap transition-colors ${
                selectedCategory === tab
                  ? 'bg-fg-primary text-bg-surface font-bold border-b-2 border-accent-signal'
                  : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-space-md flex flex-col md:flex-row gap-space-sm items-center">
          <div className="flex-1 w-full flex items-center bg-bg-canvas border border-border-hairline px-3 py-2">
            <span className="material-symbols-outlined text-fg-muted text-[18px] mr-2">search</span>
            <input
              type="text"
              placeholder="Search by docket code, discipline, or corporate partner..."
              className="w-full bg-transparent border-0 outline-none text-xs font-mono text-fg-primary placeholder:text-fg-muted"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="bg-bg-surface border border-border-hairline px-3 py-2 font-mono text-xs uppercase text-fg-primary">
              <option>Domain: All Engineering Disciplines</option>
              <option>Computer Science &amp; VLSI</option>
              <option>Aerospace &amp; Defense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Docket Records List */}
      <div className="space-y-space-md">
        {dockets.map((docket) => (
          <div
            key={docket.id}
            className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md hover:shadow-[3px_3px_0px_0px_#18181B] transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-sm">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">
                    {docket.id}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 bg-accent-signal text-fg-primary font-bold border border-border-strong">
                    {docket.type}
                  </span>
                  <span className={`font-mono text-xs px-2 py-0.5 ${docket.stageColor}`}>
                    {docket.stage}
                  </span>
                </div>
                <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {docket.title}
                </h3>
                <p className="font-mono text-xs text-fg-secondary mt-0.5">{docket.org}</p>
              </div>

              <div className="lg:text-right shrink-0">
                <span className="font-label-mono text-[10px] text-fg-muted uppercase block">HONORARIUM / GRANT</span>
                <span className="font-metric-tabular text-xl font-bold text-fg-primary tnum">{docket.stipend}</span>
                <span className="font-mono text-xs text-fg-muted block">{docket.duration}</span>
              </div>
            </div>

            <div className="p-3 bg-bg-canvas border border-border-hairline font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-fg-muted text-[10px] uppercase block">PRINCIPAL INVESTIGATOR</span>
                <span className="text-fg-primary font-bold">{docket.pi}</span>
              </div>
              <div>
                <span className="text-fg-muted text-[10px] uppercase block">CORE DISCIPLINE</span>
                <span className="text-fg-primary">{docket.domain}</span>
              </div>
              <div>
                <span className="text-fg-muted text-[10px] uppercase block">STATUTORY GOVERNANCE</span>
                <span className="text-status-success font-semibold">{docket.mouStatus}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="font-mono text-xs text-fg-muted">
                INSTITUTION: IIT BOMBAY // DEAN ACADEMIC CLEARANCE PROTOCOL
              </span>

              <div className="flex gap-2">
                {docket.actionNeeded && (
                  <button className="px-space-md py-1.5 bg-status-warning text-fg-primary font-mono text-xs uppercase font-bold border border-border-strong">
                    Sign Dean NOC (Awaiting)
                  </button>
                )}
                <button className="px-space-md py-1.5 bg-fg-primary text-bg-surface font-mono text-xs uppercase hover:bg-neutral-800 transition-colors border border-border-strong">
                  View Full Dossier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

