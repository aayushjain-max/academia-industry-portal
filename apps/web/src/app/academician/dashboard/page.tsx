'use client';

import React from 'react';
import Link from 'next/link';

export default function AcademicianDashboardPage() {
  const scholasticMetrics = [
    { label: 'IEEE / ACM Papers', val: '42', sub: 'Q1 Journals: 29', border: 'border-border-hairline' },
    { label: 'Indian Patents', val: '04', sub: '2 Granted · 2 Published', border: 'border-border-hairline' },
    { label: 'Ph.D. Scholars Guided', val: '11', sub: '8 Graduated · 3 Ongoing', border: 'border-border-hairline' },
    { label: 'Total Grants Value', val: '₹1.85Cr', sub: 'Govt + Industry Funded', border: 'border-accent-signal' },
  ];

  const facultySkills = [
    {
      name: 'Distributed Systems Architecture',
      level: 96,
      badge: 'EXPERT',
      relevance: 'SURGE DEMAND',
      certs: 'CNCF Certified CKA/CKS Evaluator',
      partners: 'TechNova Labs, AWS Academic Node',
    },
    {
      name: 'Edge AI & Embedded Neural Inference',
      level: 91,
      badge: 'EXPERT',
      relevance: 'DEFENSE PRIORITY',
      certs: 'NVIDIA DLI University Ambassador',
      partners: 'ISRO SAC, DRDO Lab',
    },
    {
      name: 'Cryptographic Protocols & Consensus',
      level: 94,
      badge: 'EXPERT',
      relevance: 'AICTE CURRICULUM LEAD',
      certs: 'Hyperledger Foundation Certified',
      partners: 'NPCI National Blockchain Project',
    },
    {
      name: 'Silicon Acceleration & FPGA Telematics',
      level: 88,
      badge: 'ADVANCED',
      relevance: 'CORE HARDWARE',
      certs: 'Xilinx Vivado Certified Trainer',
      partners: 'Bharat Electronics Limited',
    },
  ];

  return (
    <div className="space-y-space-lg">
      {/* Faculty Hero Banner */}
      <div className="bg-bg-surface border border-border-strong p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex items-start gap-space-md">
          <div className="w-16 h-16 bg-fg-primary text-bg-surface flex items-center justify-center font-bold text-2xl border border-border-strong shrink-0">
            VR
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-mono text-[10px] px-2 py-0.5 bg-accent-signal text-fg-primary font-bold border border-border-strong">
                ACADEMICIAN NODE // #8042-FAC
              </span>
              <span className="font-label-mono text-[10px] px-2 py-0.5 bg-bg-subtle text-fg-muted border border-border-hairline">
                ORCID: 0000-0002-9811-402X
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-fg-primary font-bold">
              Dr. V. Ramanathan
            </h1>
            <p className="text-body-sm text-fg-secondary">
              Professor &amp; Research Director // Computer Science &amp; Advanced Telematics, IIT Bombay
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/academician/research"
            className="px-space-md py-2.5 bg-accent-signal text-fg-primary font-label-mono text-xs uppercase font-bold hover:bg-accent-signal-hover transition-colors border border-border-strong shadow-[2px_2px_0px_0px_#18181B]"
          >
            Launch Lab Pod
          </Link>
          <Link
            href="/academician/opportunities"
            className="px-space-md py-2.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase hover:bg-neutral-800 transition-colors border border-border-strong"
          >
            Inspect Grants (₹1.85Cr)
          </Link>
        </div>
      </div>

      {/* 4 KPI Scholastic Output Ledger */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {scholasticMetrics.map((item) => (
          <div
            key={item.label}
            className={`bg-bg-surface border ${item.border} p-space-md flex flex-col justify-between h-32`}
          >
            <span className="font-label-mono text-[11px] text-fg-muted uppercase">{item.label}</span>
            <div>
              <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">{item.val}</span>
              <span className="font-label-mono text-[10px] text-fg-secondary block mt-0.5">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (5 cols): Institutional Records & Lab Facility */}
        <div className="lg:col-span-5 space-y-space-md">
          <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
            <div className="border-b border-border-hairline pb-space-xs flex justify-between items-center">
              <span className="font-label-mono text-xs text-fg-muted uppercase">
                01.1 // INSTITUTIONAL REPOSITORY
              </span>
              <span className="font-label-mono text-xs text-status-success font-semibold">STATUS: TENURED</span>
            </div>

            <div className="space-y-space-sm text-body-sm font-mono text-xs">
              <div>
                <span className="text-fg-muted block text-[10px] uppercase">DEPARTMENT</span>
                <span className="text-fg-primary font-bold">Computer Science &amp; Telematics</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-hairline">
                <div>
                  <span className="text-fg-muted block text-[10px] uppercase">EXPERIENCE</span>
                  <span className="text-fg-primary font-bold">19 Years</span>
                </div>
                <div>
                  <span className="text-fg-muted block text-[10px] uppercase">H-INDEX</span>
                  <span className="text-fg-primary font-bold">28 (3,420+ Citations)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border-hairline">
                <span className="text-fg-muted block text-[10px] uppercase mb-1">ENTERPRISE PIPELINES</span>
                <p className="text-fg-secondary leading-relaxed font-sans text-xs">
                  Active co-investigation &amp; tech-transfer MoUs alongside <strong>TechNova Labs</strong>, <strong>ISRO SAC</strong>, and <strong>Cisco Networking Systems</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Lab Pod Facility Directive */}
          <div className="bg-bg-surface border border-border-strong p-space-lg">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase block mb-space-sm">
              FACILITY DIRECTIVE // ACTIVE POD
            </span>
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 bg-fg-primary text-bg-surface flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">memory</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-body-md font-bold text-fg-primary">
                  Telematics &amp; ASIC Prototyping Node
                </h4>
                <p className="text-body-sm text-xs text-fg-muted mt-0.5">
                  Equipped with FPGA acceleration racks &amp; Keysight Logic Analyzers for aerospace payload synthesis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Competency Index & Industry Relevance */}
        <div className="lg:col-span-7 bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm border-b border-border-hairline gap-2">
            <div>
              <span className="font-label-mono text-xs text-fg-muted uppercase">02.0 // BENCHMARK ENGINE</span>
              <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                Faculty Competency &amp; Industry Relevance Matrix
              </h3>
            </div>
            <div className="p-2 bg-bg-canvas border border-border-hairline text-right">
              <span className="font-label-mono text-[10px] text-fg-muted block">NATIONAL MATRIX SCORE</span>
              <span className="font-metric-tabular text-2xl font-bold text-fg-primary tnum">94/100</span>
              <span className="font-label-mono text-[9px] text-status-success font-bold block uppercase">
                TOP 1% NATIONWIDE
              </span>
            </div>
          </div>

          <div className="space-y-space-md">
            {facultySkills.map((skill) => (
              <div key={skill.name} className="p-space-sm border border-border-hairline bg-bg-canvas space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-fg-primary">hub</span>
                    <span className="font-body-md text-body-md font-bold text-fg-primary">{skill.name}</span>
                    <span className="font-label-mono text-[10px] px-1.5 py-0.5 bg-fg-primary text-bg-surface">
                      {skill.badge}
                    </span>
                  </div>
                  <span className="font-label-mono text-xs font-bold text-fg-primary tnum">{skill.level}%</span>
                </div>

                <div className="w-full h-1.5 bg-neutral-200 overflow-hidden">
                  <div className="h-full bg-fg-primary" style={{ width: `${skill.level}%` }} />
                </div>

                <div className="flex flex-wrap justify-between text-[11px] font-mono text-fg-muted pt-1">
                  <span>CERTS: {skill.certs}</span>
                  <span className="text-fg-secondary">PARTNERS: {skill.partners}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

