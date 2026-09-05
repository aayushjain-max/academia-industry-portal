'use client';

import React from 'react';
import Link from 'next/link';

export default function ResearchPage() {
  const team = [
    { role: 'PI', name: 'Dr. Arisudan Sengupta', desc: 'Faculty Principal Investigator • High-Performance Computing', tag: 'IIT-B / H-Index 28', bg: 'bg-[#18181B] text-[#FACC15]' },
    { role: 'CI', name: 'Dr. Nandita Ramanathan', desc: 'Faculty Co-Investigator • Embedded Cryptography', tag: 'Faculty // ECE Dept', bg: 'bg-neutral-200 text-fg-primary' },
    { role: 'IND', name: 'Vikram Malhotra & K. Srivastav', desc: 'Industry R&D Leads • TechNova Embedded Avionics Division', tag: 'Corporate Partner', bg: 'bg-accent-signal text-fg-primary' },
    { role: 'JRF', name: 'Graduate Research Scholars (4 Fellows)', desc: 'T. Sen, P. Joshi, M. Al-Farooq, R. Sundaram • JRF Stipends Active', tag: 'DRDO Fellowships Active', bg: 'bg-neutral-200 text-fg-primary' },
  ];

  const milestones = [
    { id: 'M-01', title: 'Formal Verification of Fault-Tolerant Consensus State Machine', status: 'COMPLETED', progress: 100, date: 'APR 2024' },
    { id: 'M-02', title: 'Xilinx Zynq UltraScale+ FPGA RTL Hardware Synthesis', status: 'COMPLETED', progress: 100, date: 'AUG 2024' },
    { id: 'M-03', title: 'Radiation Hardening Simulation & Hardware-in-Loop Testbed', status: 'IN PROGRESS', progress: 65, date: 'NOV 2024', active: true },
    { id: 'M-04', title: 'Avionics Bus In-Flight Telemetry Validation at DRDO Range', status: 'SCHEDULED', progress: 0, date: 'MAY 2025' },
  ];

  const budget = [
    { head: 'Hardware Capital & FPGA Racks', allocated: '₹24,50,000', spent: '₹21,80,000', percent: 89 },
    { head: 'Junior Research Fellowships (4 JRFs)', allocated: '₹14,40,000', spent: '₹8,20,000', percent: 57 },
    { head: 'Field Testing & Range Telemetry', allocated: '₹6,00,000', spent: '₹2,10,000', percent: 35 },
    { head: 'Institutional Overheads (IIT-B)', allocated: '₹3,60,000', spent: '₹3,60,000', percent: 100 },
  ];

  return (
    <div className="space-y-space-lg">
      {/* Project Chronos Docket Hero Panel */}
      <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs mb-1">
              <span className="bg-fg-primary text-accent-signal px-2 py-0.5 font-label-mono text-[10px] uppercase font-bold">
                ACTIVE GRANT // R&amp;D
              </span>
              <span className="bg-bg-subtle text-fg-secondary px-2 py-0.5 font-label-mono text-[10px] border border-border-hairline">
                DEF-AERO-2023-882
              </span>
              <span className="font-label-mono text-xs text-status-success flex items-center gap-1 ml-2 font-semibold">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                LIVE LAB TELEMETRY
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md font-bold text-fg-primary">
              Project Chronos: Distributed Fault-Tolerant Consensus for Aerospace Edge Computing
            </h1>
            <p className="text-body-sm text-fg-muted">
              Joint Initiative: <strong className="text-fg-primary font-semibold">DRDO Aerospace Systems Division</strong> &amp; <strong className="text-fg-primary font-semibold">TechNova Avionics Labs</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="px-space-md py-2.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase hover:bg-neutral-800 transition-colors flex items-center gap-1.5 border border-border-strong font-bold">
              <span className="material-symbols-outlined text-[16px] text-accent-signal">lock</span>
              <span>Access Sandbox Node</span>
            </button>
          </div>
        </div>

        {/* Tabular Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md p-space-md bg-bg-subtle border border-border-hairline font-mono text-xs">
          <div>
            <span className="text-fg-muted uppercase block text-[10px]">APPROVED GRANT</span>
            <span className="font-metric-tabular text-xl font-bold text-fg-primary block mt-0.5 tnum">₹48,50,000</span>
            <span className="text-status-success text-[10px] block font-bold">Tranche 2 Disbursed (68%)</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase block text-[10px]">ACTIVE PERIOD</span>
            <span className="font-metric-tabular text-xl font-bold text-fg-primary block mt-0.5 tnum">M-07 / 18</span>
            <span className="text-fg-muted text-[10px] block">Expiry: Nov 30, 2025</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase block text-[10px]">LEAD INVESTIGATOR</span>
            <span className="font-bold text-fg-primary block mt-1">Dr. Arisudan Sengupta</span>
            <span className="text-fg-muted text-[10px] block">Dept. of Computer Science</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase block text-[10px]">INDUSTRY CO-PI</span>
            <span className="font-bold text-fg-primary block mt-1">Vikram Malhotra</span>
            <span className="text-fg-muted text-[10px] block">VP Autonomous Systems, TechNova</span>
          </div>
        </div>
      </div>

      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (7 cols): Investigation Team & Milestones */}
        <div className="lg:col-span-7 space-y-space-lg">
          {/* Investigation Team */}
          <div className="bg-bg-surface border border-border-strong p-space-lg">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-hairline mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-fg-primary">group</span>
                <h3 className="font-headline-sm font-bold text-fg-primary">Investigation Team &amp; Lab Pods</h3>
              </div>
              <span className="font-label-mono text-xs text-fg-muted">09 APPOINTED RESEARCHERS</span>
            </div>

            <div className="space-y-2">
              {team.map((m) => (
                <div key={m.role} className="p-space-sm border border-border-hairline bg-bg-canvas flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center font-mono font-bold text-xs shrink-0 ${m.bg}`}>
                      {m.role}
                    </div>
                    <div>
                      <span className="font-bold text-fg-primary block text-sm">{m.name}</span>
                      <span className="font-mono text-xs text-fg-muted block">{m.desc}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary shrink-0">
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones & Statutory Deliverables */}
          <div className="bg-bg-surface border border-border-strong p-space-lg">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-hairline mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-fg-primary">flag</span>
                <h3 className="font-headline-sm font-bold text-fg-primary">Milestones &amp; Statutory Deliverables</h3>
              </div>
              <span className="font-label-mono text-xs text-status-success font-semibold">TRL-4 PROTOTYPE VERIFIED</span>
            </div>

            <div className="space-y-space-md">
              {milestones.map((ms) => (
                <div
                  key={ms.id}
                  className={`p-space-sm border ${
                    ms.active ? 'border-accent-signal bg-yellow-50/20' : 'border-border-hairline bg-bg-canvas'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-fg-primary bg-bg-subtle border px-1.5 py-0.5">{ms.id}</span>
                      <span className="font-bold text-fg-primary text-sm">{ms.title}</span>
                    </div>
                    <span className="font-bold">{ms.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-fg-muted">{ms.status}</span>
                    <span className="font-bold text-fg-primary">{ms.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 overflow-hidden">
                    <div className="bg-fg-primary h-full" style={{ width: `${ms.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Telemetry & Budget Ledger */}
        <div className="lg:col-span-5 space-y-space-lg">
          {/* Real-Time Hardware Telemetry */}
          <div className="bg-bg-surface border-2 border-border-strong p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
              <span className="font-label-mono text-xs text-fg-muted uppercase">HARDWARE TESTBED TELEMETRY</span>
              <span className="font-mono text-xs text-status-success font-bold">FPGA NODE ONLINE</span>
            </div>

            <div className="p-space-md bg-bg-subtle border border-border-hairline space-y-2 font-mono text-xs">
              <div className="flex items-baseline justify-between">
                <span className="text-fg-muted uppercase">CONSENSUS LATENCY</span>
                <span className="font-metric-tabular text-2xl font-bold text-fg-primary tnum">1.24 ms</span>
              </div>
              <span className="text-status-success text-xs font-bold block">-38% REDUCTION VS RAFT STANDARD</span>
              <p className="text-[11px] text-fg-muted pt-1 border-t border-border-hairline">
                Benchmarked on Xilinx Zynq UltraScale+ ZCU102 FPGA board executing Byzantine Fault Tolerant protocol over redundant CAN-FD bus.
              </p>
            </div>
          </div>

          {/* Grant Utilization & Budget Ledger */}
          <div className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
              <div>
                <span className="font-label-mono text-xs text-fg-muted uppercase">FINANCIAL AUDIT</span>
                <h4 className="font-headline-sm font-bold text-fg-primary">Grant Budget Ledger</h4>
              </div>
              <span className="font-label-mono text-xs bg-bg-subtle border px-2 py-0.5">₹48.5L TOTAL</span>
            </div>

            <div className="space-y-space-sm font-mono text-xs">
              {budget.map((b) => (
                <div key={b.head} className="p-2 border border-border-hairline bg-bg-canvas space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-fg-primary">{b.head}</span>
                    <span className="text-fg-muted">{b.percent}%</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-200 overflow-hidden">
                    <div className="bg-fg-primary h-full" style={{ width: `${b.percent}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-fg-muted">
                    <span>SPENT: {b.spent}</span>
                    <span>ALLOCATED: {b.allocated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

