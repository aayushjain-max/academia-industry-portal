'use client';

import React, { useState } from 'react';

export default function IndustryCollaborationsPage() {
  const [activeTab, setActiveTab] = useState<'programs' | 'chronos' | 'analytics' | 'mous'>('programs');
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [filterModality, setFilterModality] = useState('ALL');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping" />
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-[#FACC15]">
            PROGRAM TELEMETRY:
          </span>
          <span className="font-body-sm text-body-sm text-surface-container-high">{actionNotice}</span>
        </div>
      )}

      {/* System Ledger Status Strip */}
      <div className="w-full bg-primary-container px-space-md py-2 flex flex-wrap items-center justify-between gap-space-sm text-on-primary border border-border-hairline">
        <div className="flex items-center gap-space-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-status-success" />
          <span className="font-label-mono text-label-mono text-inverse-primary tracking-wider">
            CORP-NODE // TECHNOVA LABS INDUSTRIAL CORE [R&amp;D PARTNERSHIPS]
          </span>
          <span className="hidden sm:inline-block font-label-mono text-label-mono text-on-primary-container bg-surface-container-highest px-1.5 py-0.5">
            SYS-VER: 4.8.1-BETA
          </span>
        </div>
        <div className="flex items-center gap-space-md font-label-mono text-label-mono text-inverse-primary">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span> AES-256 ENCRYPTED
          </span>
          <span className="text-on-primary-container">|</span>
          <span>NAAC/NIRF COMPLIANCE ENGINE ACTIVE</span>
        </div>
      </div>

      {/* Main Hero Block */}
      <div className="w-full bg-bg-surface p-space-md lg:p-space-xl border border-border-hairline">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono bg-bg-subtle text-fg-muted px-2 py-0.5 border border-border-hairline uppercase">
                Ecosystem Tier-01 Industry Console
              </span>
              <span className="font-label-mono text-label-mono text-status-warning bg-surface-container-high px-2 py-0.5 font-semibold">
                CADMIUM MATRIX ONLINE
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight font-extrabold uppercase">
              Industry Programs, Co-Innovation Labs &amp; Strategic Analytics
            </h1>
            <p className="font-body-md text-body-md text-fg-muted">
              Unified command bureau managing corporate-sponsored R&amp;D dockets, dual-faculty mentorship nodes, and industrial engineering sprints across affiliated higher education partner institutions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={() => setShowLaunchModal(true)}
              className="px-space-md py-2.5 bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 hover:bg-fg-secondary transition-colors font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">add_box</span>
              + Launch Program
            </button>
            <button
              onClick={() => triggerNotice('Bilateral MoU Registration Gateway initialized for academic term 2024-25.')}
              className="px-space-md py-2.5 bg-bg-surface text-fg-primary border border-border-hairline font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 hover:bg-bg-subtle transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              + Register MoU / Event
            </button>
            <button
              onClick={() => triggerNotice('NAAC Compliance Audit Dossier export compiling in background thread.')}
              className="px-space-md py-2.5 bg-bg-subtle text-fg-secondary border border-border-hairline font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 hover:text-fg-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Audit Dossier
            </button>
          </div>
        </div>

        {/* Core Telemetry Metric Band */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-sm mt-space-lg pt-space-lg border-t border-border-hairline">
          <div className="p-space-sm bg-bg-canvas border border-border-hairline">
            <div className="font-label-mono text-label-mono uppercase text-fg-muted flex items-center justify-between">
              Active Programs
              <span className="material-symbols-outlined text-[14px]">workspaces</span>
            </div>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary mt-1 font-bold">06</div>
            <div className="font-label-mono text-label-mono text-status-success mt-1">● 100% Capacity</div>
          </div>
          <div className="p-space-sm bg-bg-canvas border border-border-hairline">
            <div className="font-label-mono text-label-mono uppercase text-fg-muted flex items-center justify-between">
              Institutional MoUs
              <span className="material-symbols-outlined text-[14px]">policy</span>
            </div>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary mt-1 font-bold">14</div>
            <div className="font-label-mono text-label-mono text-fg-muted mt-1">Tier-1 IITs / IIITs</div>
          </div>
          <div className="p-space-sm bg-bg-canvas border border-border-hairline">
            <div className="font-label-mono text-label-mono uppercase text-fg-muted flex items-center justify-between">
              R&amp;D Capital Committed
              <span className="material-symbols-outlined text-[14px]">account_balance</span>
            </div>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary mt-1 font-bold">₹1.85 Cr</div>
            <div className="font-label-mono text-label-mono text-status-warning mt-1">▲ 82% Disbursed</div>
          </div>
          <div className="p-space-sm bg-bg-canvas border border-border-hairline">
            <div className="font-label-mono text-label-mono uppercase text-fg-muted flex items-center justify-between">
              Students Trained
              <span className="material-symbols-outlined text-[14px]">school</span>
            </div>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary mt-1 font-bold">920</div>
            <div className="font-label-mono text-label-mono text-status-success mt-1">▲ +38% YoY</div>
          </div>
          <div className="p-space-sm bg-bg-canvas border border-border-hairline col-span-2 md:col-span-1">
            <div className="font-label-mono text-label-mono uppercase text-fg-muted flex items-center justify-between">
              Mentorship Pods
              <span className="material-symbols-outlined text-[14px]">hub</span>
            </div>
            <div className="font-metric-tabular text-metric-tabular text-fg-primary mt-1 font-bold">42</div>
            <div className="font-label-mono text-label-mono text-fg-secondary mt-1">1:4 Ratio</div>
          </div>
        </div>
      </div>

      {/* Segmented Navigation Tab Bar */}
      <div className="w-full bg-bg-subtle border border-border-hairline px-space-md lg:px-space-xl flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('programs')}
          className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'programs'
              ? 'text-fg-primary bg-bg-surface border-t-2 border-border-strong font-bold'
              : 'text-fg-muted hover:text-fg-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">layers</span>
          Industry Programs (06)
        </button>
        <button
          onClick={() => setActiveTab('chronos')}
          className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'chronos'
              ? 'text-fg-primary bg-bg-surface border-t-2 border-border-strong font-bold'
              : 'text-fg-muted hover:text-fg-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">biotech</span>
          Co-Innovation Lab &amp; Chronos
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'analytics'
              ? 'text-fg-primary bg-bg-surface border-t-2 border-border-strong font-bold'
              : 'text-fg-muted hover:text-fg-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">query_stats</span>
          Enterprise Analytics Bureau
        </button>
        <button
          onClick={() => setActiveTab('mous')}
          className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'mous'
              ? 'text-fg-primary bg-bg-surface border-t-2 border-border-strong font-bold'
              : 'text-fg-muted hover:text-fg-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">gavel</span>
          Research &amp; MoUs (14)
        </button>
      </div>

      {/* TAB 1: INDUSTRY PROGRAMS */}
      {activeTab === 'programs' && (
        <div className="space-y-space-md">
          {/* Modality Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm bg-bg-surface p-space-sm border border-border-hairline">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-mono text-label-mono uppercase text-fg-muted px-2 py-1">
                FILTER MODALITY:
              </span>
              {['ALL', 'INDUSTRIAL TRAINING', 'INNOVATION CHALLENGES', 'FACULTY DEV (FDP)', 'GUEST SESSIONS'].map(
                (mod) => (
                  <button
                    key={mod}
                    onClick={() => setFilterModality(mod)}
                    className={`px-2 py-1 font-label-mono text-label-mono transition-colors ${
                      filterModality === mod
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-bg-subtle text-fg-secondary hover:bg-surface-container'
                    }`}
                  >
                    {mod}
                  </button>
                )
              )}
            </div>
            <div className="flex items-center gap-space-xs font-label-mono text-label-mono text-fg-muted">
              <span>SORT:</span>
              <span className="text-fg-primary font-bold">NEXT DELIVERABLE (ASC)</span>
            </div>
          </div>

          {/* Active Featured Program Matrix */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg">
            {/* Program 1 */}
            <div className="bg-bg-surface border border-border-hairline hover:border-border-strong transition-colors flex flex-col justify-between">
              <div>
                <div className="p-space-md border-b border-border-hairline flex items-center justify-between bg-bg-canvas">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-status-success" />
                    <span className="font-label-mono text-label-mono uppercase text-fg-primary font-semibold">
                      PROGRAM PROTOCOL // TRN-CN-884
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono bg-bg-surface border border-border-hairline px-2 py-0.5 text-fg-muted">
                    CNCF INDUSTRIAL CURRICULUM
                  </span>
                </div>

                <div className="p-space-md lg:p-space-lg space-y-space-md">
                  <div>
                    <span className="font-label-mono text-label-mono text-status-warning uppercase font-bold">
                      8-WEEK INTENSIVE ACCELERATOR
                    </span>
                    <h3 className="font-headline-md text-headline-md text-fg-primary mt-1 font-bold">
                      Cloud-Native Microservices Accelerator
                    </h3>
                    <p className="font-body-md text-body-md text-fg-muted mt-2">
                      Industry-grade distributed orchestration pipeline. Ingests 120 vetted undergraduate fellows into production-grade Golang, eBPF telemetry, and multi-tenant Kubernetes operator deployments.
                    </p>
                  </div>

                  {/* Program Metrics */}
                  <div className="grid grid-cols-3 gap-space-sm bg-bg-canvas p-space-sm border border-border-hairline">
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">CAPACITY SEATS</span>
                      <span className="font-metric-tabular text-headline-sm text-fg-primary mt-0.5 block font-bold">
                        120 / 120
                      </span>
                      <span className="font-label-mono text-label-mono text-status-warning font-semibold">
                        Allocation Full
                      </span>
                    </div>
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">ACTIVE SPRINT</span>
                      <span className="font-metric-tabular text-headline-sm text-fg-primary mt-0.5 block font-bold">
                        W-05 / W-08
                      </span>
                      <span className="font-label-mono text-label-mono text-fg-muted">Service Mesh</span>
                    </div>
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">BENCH READINESS</span>
                      <span className="font-metric-tabular text-headline-sm text-status-success mt-0.5 block font-bold">
                        91.4%
                      </span>
                      <span className="font-label-mono text-label-mono text-status-success font-semibold">
                        Top Percentile
                      </span>
                    </div>
                  </div>

                  {/* Progression */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-label-mono text-label-mono">
                      <span className="text-fg-muted">CURRICULAR MILESTONE PROGRESSION</span>
                      <span className="text-fg-primary font-bold">62.5% COMPLETE</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-subtle border border-border-hairline">
                      <div className="h-full bg-border-strong" style={{ width: '62.5%' }} />
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      GOLANG 1.22
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      KUBERNETES CRDS
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      EBPF
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      PROMETHEUS
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      IIT-BOMBAY NODE
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-space-md border-t border-border-hairline bg-bg-canvas flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-fg-muted">verified_user</span>
                  <span className="font-label-mono text-label-mono text-fg-secondary">
                    Industry Credential: CNCF Certified Associate
                  </span>
                </div>
                <button
                  onClick={() => triggerNotice('Opening Cohort Matrix for Cloud-Native Microservices Accelerator...')}
                  className="px-space-sm py-1.5 bg-bg-surface border border-border-hairline hover:border-border-strong font-label-mono text-label-mono uppercase tracking-wider text-fg-primary flex items-center gap-1 font-bold"
                >
                  Cohort Matrix
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Program 2 */}
            <div className="bg-bg-surface border border-border-hairline hover:border-border-strong transition-colors flex flex-col justify-between">
              <div>
                <div className="p-space-md border-b border-border-hairline flex items-center justify-between bg-bg-canvas">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-status-warning" />
                    <span className="font-label-mono text-label-mono uppercase text-fg-primary font-semibold">
                      PROGRAM PROTOCOL // TRN-EA-902
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono bg-bg-surface border border-border-hairline px-2 py-0.5 text-fg-muted">
                    ISRO-TECHNOVA JOINT VENTURE
                  </span>
                </div>

                <div className="p-space-md lg:p-space-lg space-y-space-md">
                  <div>
                    <span className="font-label-mono text-label-mono text-[#D97706] uppercase font-bold">
                      6-WEEK HARDWARE SPRINT
                    </span>
                    <h3 className="font-headline-md text-headline-md text-fg-primary mt-1 font-bold">
                      Edge AI &amp; Embedded Telemetry Sprint
                    </h3>
                    <p className="font-body-md text-body-md text-fg-muted mt-2">
                      Hands-on firmware development for satellite sensor telemetry. Mentored by ISRO Space Applications Centre scientists and Technova embedded systems architects.
                    </p>
                  </div>

                  {/* Program Metrics */}
                  <div className="grid grid-cols-3 gap-space-sm bg-bg-canvas p-space-sm border border-border-hairline">
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">CAPACITY SEATS</span>
                      <span className="font-metric-tabular text-headline-sm text-fg-primary mt-0.5 block font-bold">
                        60 / 60
                      </span>
                      <span className="font-label-mono text-label-mono text-status-warning font-semibold">
                        Allocation Full
                      </span>
                    </div>
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">ACTIVE SPRINT</span>
                      <span className="font-metric-tabular text-headline-sm text-fg-primary mt-0.5 block font-bold">
                        W-03 / W-06
                      </span>
                      <span className="font-label-mono text-label-mono text-fg-muted">FPGA Pipeline</span>
                    </div>
                    <div>
                      <span className="font-label-mono text-label-mono uppercase text-fg-muted block">BENCH READINESS</span>
                      <span className="font-metric-tabular text-headline-sm text-status-success mt-0.5 block font-bold">
                        94.8%
                      </span>
                      <span className="font-label-mono text-label-mono text-status-success font-semibold">
                        Top Percentile
                      </span>
                    </div>
                  </div>

                  {/* Progression */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-label-mono text-label-mono">
                      <span className="text-fg-muted">CURRICULAR MILESTONE PROGRESSION</span>
                      <span className="text-fg-primary font-bold">50.0% COMPLETE</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-subtle border border-border-hairline">
                      <div className="h-full bg-border-strong" style={{ width: '50%' }} />
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      C++20
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      RUST EMBEDDED
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      VERILOG
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      ROS2
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                      IIIT-HYD NODE
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-space-md border-t border-border-hairline bg-bg-canvas flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-fg-muted">verified_user</span>
                  <span className="font-label-mono text-label-mono text-fg-secondary">
                    Industry Credential: ISRO SAC Fellow Attestation
                  </span>
                </div>
                <button
                  onClick={() => triggerNotice('Opening Cohort Matrix for Edge AI & Embedded Telemetry Sprint...')}
                  className="px-space-sm py-1.5 bg-bg-surface border border-border-hairline hover:border-border-strong font-label-mono text-label-mono uppercase tracking-wider text-fg-primary flex items-center gap-1 font-bold"
                >
                  Cohort Matrix
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CO-INNOVATION LAB & CHRONOS */}
      {activeTab === 'chronos' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <div>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
                Project Chronos: Bilateral Co-Innovation Lab Pods
              </h2>
              <p className="font-body-sm text-body-sm text-fg-muted">
                Joint academia-industry R&amp;D workspaces connecting Technova engineers with faculty principal investigators.
              </p>
            </div>
            <span className="font-label-mono text-xs px-2 py-1 bg-status-success/10 text-status-success border border-status-success/30 font-bold">
              3 ACTIVE PODS
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-bg-subtle border border-border-hairline space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-label-mono text-xs text-fg-muted">POD #01 // IIT BOMBAY // CHRONOS-CORE</span>
                <span className="font-label-mono text-xs font-bold text-fg-primary">GRANT: ₹45L</span>
              </div>
              <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                Multi-Tenant eBPF Kernel Observability for Autonomous Robotics
              </h3>
              <p className="font-body-sm text-xs text-fg-muted">
                Principal Investigator: Dr. V. Ramanathan // Technova Lead: Sarah Jenkins, Principal Architect
              </p>
              <div className="flex items-center justify-between pt-2 text-xs font-label-mono">
                <span className="text-status-success font-semibold">Sprint 4/6 Completed</span>
                <button
                  onClick={() => triggerNotice('Accessing Chronos Pod Telemetry and Git Ledger...')}
                  className="text-fg-primary underline font-bold"
                >
                  Enter Pod Workspace →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ENTERPRISE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="border-b border-border-hairline pb-2">
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
              Enterprise ROI &amp; Talent Acquisition Analytics
            </h2>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Telemetry on hiring conversion, MoU cost-per-hire savings, and hackathon talent pipeline yields.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-bg-canvas border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">Cost-Per-Hire Reduction</span>
              <div className="font-metric-tabular text-3xl font-bold text-status-success mt-1">-58%</div>
              <span className="text-xs text-fg-muted">vs Third-Party Agencies</span>
            </div>
            <div className="p-4 bg-bg-canvas border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">Day-1 Productivity Yield</span>
              <div className="font-metric-tabular text-3xl font-bold text-fg-primary mt-1">94.2%</div>
              <span className="text-xs text-fg-muted">Zero retraining required</span>
            </div>
            <div className="p-4 bg-bg-canvas border border-border-hairline">
              <span className="font-label-mono text-xs text-fg-muted uppercase">Retention at 18 Months</span>
              <div className="font-metric-tabular text-3xl font-bold text-fg-primary mt-1">92.6%</div>
              <span className="text-xs text-fg-muted">Affiliated MoU scholars</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RESEARCH & MOUS */}
      {activeTab === 'mous' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="border-b border-border-hairline pb-2">
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
              Institutional MoUs &amp; Bilateral Research Covenants
            </h2>
            <p className="font-body-sm text-body-sm text-fg-muted">
              14 Validated enterprise MoUs certified with AICTE and Ministry of Education.
            </p>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-hairline text-left font-label-mono text-xs text-fg-muted uppercase">
                <th className="py-2.5 px-3">University Node</th>
                <th className="py-2.5 px-3">Domain Focus</th>
                <th className="py-2.5 px-3">Tenure</th>
                <th className="py-2.5 px-3 text-right">Commitment</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline font-body-sm text-body-sm">
              <tr className="hover:bg-bg-subtle transition-colors">
                <td className="py-3 px-3 font-semibold text-fg-primary">IIT Bombay</td>
                <td className="py-3 px-3 text-fg-secondary">Distributed Systems &amp; eBPF</td>
                <td className="py-3 px-3 font-mono text-xs">2023 - 2026</td>
                <td className="py-3 px-3 text-right font-mono font-bold">₹45L</td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 bg-status-success/10 text-status-success font-bold font-label-mono text-[10px]">
                    ACTIVE
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-bg-subtle transition-colors">
                <td className="py-3 px-3 font-semibold text-fg-primary">IIIT Hyderabad</td>
                <td className="py-3 px-3 text-fg-secondary">FPGA Satellite Telemetry</td>
                <td className="py-3 px-3 font-mono text-xs">2024 - 2027</td>
                <td className="py-3 px-3 text-right font-mono font-bold">₹35L</td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 bg-status-success/10 text-status-success font-bold font-label-mono text-[10px]">
                    ACTIVE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* LAUNCH PROGRAM MODAL */}
      {showLaunchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
                LAUNCH NEW INDUSTRY ACADEMIC PROGRAM
              </span>
              <button
                onClick={() => setShowLaunchModal(false)}
                className="font-label-mono text-xs text-fg-muted hover:text-fg-primary"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="space-y-3 font-body-sm text-body-sm">
              <div>
                <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Program Title</label>
                <input
                  type="text"
                  placeholder="e.g., Generative AI & LLMOps Research Sprint"
                  className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Duration</label>
                  <select className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none">
                    <option>6-Week Sprint</option>
                    <option>8-Week Intensive</option>
                    <option>12-Week Fellowship</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Fellowship Seats</label>
                  <input
                    type="number"
                    defaultValue={40}
                    className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-border-hairline">
              <button
                onClick={() => setShowLaunchModal(false)}
                className="px-4 py-2 border border-border-hairline font-label-mono text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLaunchModal(false);
                  triggerNotice('Program launched and registered into National Academic Credit Bank.');
                }}
                className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
              >
                Deploy Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

