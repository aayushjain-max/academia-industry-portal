'use client';

import React, { useState } from 'react';

export default function IndustryDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'talent' | 'pipeline' | 'interviews' | 'offers'>('overview');
  const [showJDAnalyzer, setShowJDAnalyzer] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const [jdText, setJdText] = useState(
    'Senior Distributed Backend Engineer - Golang/Python, Kubernetes, Redis, Microservices. Candidate must architect low-latency event pipelines (Apache Kafka) handling 50k RPS. Require experience in PostgreSQL query optimization, gRPC, and container orchestration. Preference for Smart India Hackathon finalists with proven open-source commits. Immediate joining preferred at Bengaluru campus.'
  );

  const [analyzedRole, setAnalyzedRole] = useState({
    title: 'Senior Backend Systems Engineer (Distributed Infra)',
    highPriority: [
      { name: 'Python', match: '95%' },
      { name: 'Golang', match: '90%' },
      { name: 'PostgreSQL', match: '88%' },
      { name: 'Apache Kafka / gRPC', match: '85%' },
    ],
    preferred: ['Kubernetes & Docker (80%)', 'AWS Cloud Infra (75%)', 'Redis Cache Clustering (70%)'],
    academic: 'B.Tech CS / ECE (CGPA ≥ 8.0)',
    credential: 'SIH Finalist / 0-2 Yrs Experience',
  });

  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRunAnalysis = () => {
    triggerNotice('AI parsing engine executed syntactic extraction on custom JD text.');
  };

  const handleLoadSample = () => {
    setJdText(
      'Autonomous Robotics & Embedded Telemetry Engineer - C++20, Rust, RTOS, CAN bus, FPGA acceleration. Experience with ROS2, sensor fusion (LiDAR/IMU), and edge compute. Candidates with SIH hardware track achievements prioritized.'
    );
    setAnalyzedRole({
      title: 'Autonomous Robotics & Embedded Telemetry Engineer',
      highPriority: [
        { name: 'C++20 / Modern C++', match: '98%' },
        { name: 'Rust & RTOS', match: '92%' },
        { name: 'FPGA / Verilog', match: '87%' },
        { name: 'ROS2 / Sensor Fusion', match: '84%' },
      ],
      preferred: ['CAN Bus Protocol (85%)', 'LiDAR SLAM (80%)', 'Edge AI Acceleration (75%)'],
      academic: 'B.Tech Aerospace / Electronics (CGPA ≥ 8.2)',
      credential: 'SIH Hardware Track Finalist',
    });
    triggerNotice('Loaded SIH Hardware Track Requisition Profile.');
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-ping" />
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-[#FACC15]">
            SYSTEM ACTION:
          </span>
          <span className="font-body-sm text-body-sm text-surface-container-high">{actionNotice}</span>
        </div>
      )}

      {/* Top Telemetry Strip */}
      <div className="border border-border-hairline bg-bg-surface px-space-md py-space-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-sm text-xs font-label-mono text-fg-muted">
          <div className="flex items-center gap-space-sm">
            <span className="w-2 h-2 bg-primary" />
            <span className="uppercase tracking-widest">
              DOCKET ID: IND-RECRUIT-2024-Q4 // TECHNOVA LABS REQUISITION ENGINE
            </span>
            <span className="px-1.5 py-0.5 bg-bg-subtle text-fg-primary uppercase font-bold border border-border-hairline">
              SECURITY TIER-3
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <span>LATENCY: <strong className="text-fg-primary">14ms</strong></span>
            <span>AI ENGINE: <strong className="text-status-success">STABLE v4.2</strong></span>
            <span>REGISTRY NODE: <strong className="text-fg-primary">IN-MUM-01</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Title & Command Action Bar */}
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-4xl">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-mono text-label-mono px-2 py-0.5 bg-[#FACC15] text-[#18181B] font-bold uppercase">
                TALENT REQUISITION
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">
                CLUSTER: AUTONOMOUS INFRASTRUCTURE
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight font-extrabold uppercase">
              Enterprise Talent Requisition, AI JD Analyzer &amp; Pipeline Hub
            </h1>
            <p className="font-body-md text-body-md text-fg-muted">
              Precision matching matrix aligning university innovators, SIH finalists, and vetted collegiate talent with Technova Labs research problem statements.
            </p>
          </div>

          {/* Quick Action CTA Cluster */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={() => setShowJDAnalyzer(!showJDAnalyzer)}
              className="px-space-md py-2.5 bg-bg-subtle text-fg-primary hover:bg-[#FACC15] hover:text-[#18181B] font-label-mono text-label-mono uppercase transition-colors flex items-center gap-2 border border-border-hairline font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>{showJDAnalyzer ? 'Hide AI Analyzer' : 'Open AI Analyzer'}</span>
            </button>
            <button
              onClick={() => triggerNotice('Exporting candidate ledger CSV (284 dossiers across 14 institutions)...')}
              className="px-space-md py-2.5 bg-bg-surface text-fg-primary hover:bg-bg-subtle font-label-mono text-label-mono uppercase transition-colors flex items-center gap-2 border border-border-hairline"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export Ledger</span>
            </button>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-space-md py-2.5 bg-primary text-on-primary hover:bg-fg-secondary font-label-mono text-label-mono uppercase tracking-wider flex items-center gap-2 border border-primary font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Create Requisition</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-0 border border-border-hairline mt-space-lg bg-bg-surface">
          <div className="p-space-md border-r border-b xl:border-b-0 border-border-hairline">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">Active Roles</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">18</span>
              <span className="font-label-mono text-label-mono text-status-success font-semibold">Live</span>
            </div>
            <span className="font-body-sm text-body-sm text-fg-muted mt-1 block">4 Urgency Priority</span>
          </div>
          <div className="p-space-md border-r border-b xl:border-b-0 border-border-hairline">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">Verified Applicants</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">284</span>
              <span className="font-label-mono text-label-mono text-fg-muted">Dossiers</span>
            </div>
            <span className="font-body-sm text-body-sm text-status-success font-medium mt-1 block">84.6% Avg Skill Fit</span>
          </div>
          <div className="p-space-md border-r border-b xl:border-b-0 border-border-hairline">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">Talent Velocity</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">+18%</span>
              <span className="font-label-mono text-label-mono text-status-success">▲ Q4</span>
            </div>
            <span className="font-body-sm text-body-sm text-fg-muted mt-1 block">Median 6.2d time-to-offer</span>
          </div>
          <div className="p-space-md border-r border-b xl:border-b-0 border-border-hairline">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">Scheduled Interviews</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">14</span>
              <span className="font-label-mono text-label-mono text-[#D97706] font-semibold">Active</span>
            </div>
            <span className="font-body-sm text-body-sm text-fg-muted mt-1 block">4 panels today</span>
          </div>
          <div className="p-space-md border-r border-b xl:border-b-0 border-border-hairline">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">Extended Offers</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">06</span>
              <span className="font-label-mono text-label-mono text-status-success">₹45k-80k</span>
            </div>
            <span className="font-body-sm text-body-sm text-fg-muted mt-1 block">100% acceptance yield</span>
          </div>
          <div className="p-space-md bg-bg-subtle">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">SIH Vetted Ratio</span>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">72.4%</span>
              <span className="font-label-mono text-label-mono px-1 py-0.5 bg-[#FACC15] text-[#18181B] font-bold">TOP 5%</span>
            </div>
            <span className="font-body-sm text-body-sm text-fg-muted mt-1 block">Nationwide Hackathon Pool</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE NAVIGATION TABS */}
      <div className="border border-border-hairline bg-bg-surface">
        <div className="flex items-center overflow-x-auto px-space-md lg:px-space-lg gap-space-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            01 // Overview
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'opportunities'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            02 // Opportunities (18)
          </button>
          <button
            onClick={() => setActiveTab('talent')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'talent'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            03 // Candidates / Talent (284)
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'pipeline'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            04 // Pipeline Stepper (7 Stages)
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'interviews'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            05 // Interviews (14)
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'offers'
                ? 'border-primary text-fg-primary'
                : 'border-transparent text-fg-muted hover:text-fg-primary'
            }`}
          >
            06 // Offers (06)
          </button>
        </div>
      </div>

      {/* AI JD ANALYZER INTEGRATED BENCH */}
      {showJDAnalyzer && (
        <div className="border border-border-strong bg-bg-surface p-space-lg relative space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border-hairline pb-space-md gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-7 h-7 bg-[#FACC15] flex items-center justify-center text-[#18181B] font-bold text-xs">
                AI
              </div>
              <div>
                <span className="font-headline-sm text-headline-sm text-fg-primary font-bold block">
                  AI Job Description Analyzer &amp; Skill Extraction Engine
                </span>
                <span className="font-label-mono text-label-mono text-fg-muted">
                  MODULE: aiService.analyzeJobDescription() // SEMANTIC EMBEDDING MODEL
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-mono text-label-mono px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                CONFIDENCE: 98.4%
              </span>
              <button
                onClick={() => setShowJDAnalyzer(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Input JD Side */}
            <div className="lg:col-span-6 space-y-space-md">
              <div>
                <label className="font-label-mono text-label-mono uppercase text-fg-muted block mb-1">
                  PASTE RAW JD / PROBLEM STATEMENT DOCKET
                </label>
                <textarea
                  rows={7}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  className="w-full bg-bg-subtle border border-border-hairline p-space-sm font-label-mono text-body-sm text-fg-primary outline-none focus:border-border-strong resize-none"
                  placeholder="Paste unformatted job requisition or industrial problem statement..."
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={handleRunAnalysis}
                    className="px-space-md py-2 bg-primary text-on-primary hover:bg-fg-secondary font-label-mono text-label-mono uppercase flex items-center gap-1.5 font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    <span>Re-Analyze Description</span>
                  </button>
                  <button
                    onClick={handleLoadSample}
                    className="px-space-sm py-2 bg-bg-subtle text-fg-muted hover:text-fg-primary border border-border-hairline font-label-mono text-label-mono uppercase"
                  >
                    Load SIH Track Sample
                  </button>
                </div>
                <span className="font-label-mono text-label-mono text-status-success flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-status-success" /> SYNTACTIC PARSING COMPLETE
                </span>
              </div>
            </div>

            {/* Extraction Preview Output */}
            <div className="lg:col-span-6 border-l lg:border-border-hairline lg:pl-space-lg space-y-space-md">
              <div className="border border-border-hairline bg-bg-canvas p-space-md space-y-3">
                <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                  <span className="font-label-mono text-label-mono uppercase text-fg-muted">
                    EXTRACTED SCHEMA COMPONENT MATRIX
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 bg-[#FACC15] text-[#18181B] font-semibold">
                    SYNTHESIZED
                  </span>
                </div>
                <div>
                  <span className="font-label-mono text-label-mono uppercase text-fg-muted block text-[10px]">
                    Identified Role
                  </span>
                  <span className="font-headline-sm text-body-lg text-fg-primary font-bold">
                    {analyzedRole.title}
                  </span>
                </div>

                {/* Hard Requirements */}
                <div>
                  <span className="font-label-mono text-label-mono uppercase text-fg-muted block text-[10px] mb-1">
                    High-Priority Technical Hard Requirements
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analyzedRole.highPriority.map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-1 bg-bg-surface border border-border-hairline font-label-mono text-label-mono text-fg-primary flex items-center gap-1"
                      >
                        {s.name} <span className="text-status-danger font-bold">{s.match}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary */}
                <div>
                  <span className="font-label-mono text-label-mono uppercase text-fg-muted block text-[10px] mb-1">
                    Preferred &amp; Operational Tooling
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analyzedRole.preferred.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 bg-bg-surface border border-border-hairline font-label-mono text-label-mono text-fg-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Academic */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-hairline text-body-sm">
                  <div>
                    <span className="font-label-mono text-label-mono uppercase text-fg-muted block text-[10px]">
                      Academic Vector
                    </span>
                    <span className="font-label-mono text-body-sm text-fg-primary font-semibold">
                      {analyzedRole.academic}
                    </span>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono uppercase text-fg-muted block text-[10px]">
                      Credential Marker
                    </span>
                    <span className="font-label-mono text-body-sm text-fg-primary font-semibold">
                      {analyzedRole.credential}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowCreateForm(true);
                  triggerNotice('Requisition form pre-populated with extracted technical criteria.');
                }}
                className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] font-label-mono text-label-mono uppercase font-bold tracking-wider border border-[#EAB308] flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">input</span>
                <span>Use Extracted Requirements to Populate Requisition Form</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE REQUISITION FORM DRAWER */}
      {showCreateForm && (
        <div className="border-2 border-border-strong bg-bg-surface p-space-lg space-y-space-md">
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
              NEW REQUISITION COMPOSER // AUTONOMOUS SYNC
            </span>
            <button
              onClick={() => setShowCreateForm(false)}
              className="font-label-mono text-xs text-fg-muted hover:text-fg-primary"
            >
              ✕ DISMISS
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Position Title</label>
              <input
                type="text"
                defaultValue={analyzedRole.title}
                className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Stipend / CTC Band</label>
              <input
                type="text"
                defaultValue="₹18.0 - 22.0 LPA (or ₹60k/month Internship)"
                className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Target Institutions</label>
              <input
                type="text"
                defaultValue="All Tier-1 IITs, IIITs, NITs, and Autonomous Affiliates"
                className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">Allocated Openings</label>
              <input
                type="number"
                defaultValue={12}
                className="w-full bg-bg-subtle border border-border-hairline p-2 text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border-hairline">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-border-hairline font-label-mono text-xs uppercase"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                triggerNotice('Requisition published and dispatched to affiliated university placement cells.');
              }}
              className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
            >
              Publish Requisition
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FACC15]" />
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-fg-primary font-bold">
              TOP VETTED CANDIDATE DOSSIERS (MATCHED VIA SEMANTIC AI)
            </span>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted">SORT: HIGHEST SKILL FIT (DESC)</span>
        </div>

        {/* Candidate Dossier Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-md">
          {/* Candidate 1: Aarav Sharma */}
          <div className="bg-bg-surface border border-border-hairline p-space-md lg:p-space-lg hover:border-border-strong transition-all space-y-3">
            <div className="flex items-start justify-between border-b border-border-hairline pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg-subtle border border-border-hairline flex items-center justify-center font-bold text-fg-primary">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-body-lg font-bold text-fg-primary">Aarav Sharma</span>
                    <span className="font-label-mono text-[10px] bg-[#FACC15] text-[#18181B] px-1.5 py-0.5 font-bold">
                      98.4% FIT
                    </span>
                  </div>
                  <span className="font-label-mono text-xs text-fg-muted block">
                    IIT BOMBAY // B.TECH CS (CGPA: 9.32)
                  </span>
                </div>
              </div>
              <span className="font-label-mono text-[10px] text-status-success font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                PASSPORT VERIFIED
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1 font-label-mono text-xs">
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  PYTHON (96%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  GOLANG (90%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  KUBERNETES (88%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  KAFKA (84%)
                </span>
              </div>
              <p className="font-body-sm text-xs text-fg-secondary">
                SIH 2024 Finalist (1st Runner Up, Problem #PS-094). Built distributed microservice broker handling 35k RPS on bare-metal Kubernetes.
              </p>
            </div>

            <div className="pt-2 border-t border-border-hairline flex items-center justify-between">
              <span className="font-label-mono text-xs text-fg-muted">STATUS: TECHNICAL ROUND CLEARED</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerNotice('Interview scheduled with Aarav Sharma for Friday 10:00 AM IST.')}
                  className="px-3 py-1.5 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
                >
                  Schedule Panel
                </button>
                <button
                  onClick={() =>
                    setSelectedCandidate({
                      name: 'Aarav Sharma',
                      inst: 'IIT Bombay',
                      match: '98.4%',
                      cgpa: '9.32',
                      skills: 'Python, Golang, Kafka, Kubernetes, PostgreSQL',
                      sihRole: 'Smart India Hackathon 2024 Track Lead',
                    })
                  }
                  className="px-3 py-1.5 border border-border-hairline font-label-mono text-xs uppercase"
                >
                  View Dossier
                </button>
              </div>
            </div>
          </div>

          {/* Candidate 2: Priya Venkatesh */}
          <div className="bg-bg-surface border border-border-hairline p-space-md lg:p-space-lg hover:border-border-strong transition-all space-y-3">
            <div className="flex items-start justify-between border-b border-border-hairline pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bg-subtle border border-border-hairline flex items-center justify-center font-bold text-fg-primary">
                  PV
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-body-lg font-bold text-fg-primary">Priya Venkatesh</span>
                    <span className="font-label-mono text-[10px] bg-[#FACC15] text-[#18181B] px-1.5 py-0.5 font-bold">
                      94.2% FIT
                    </span>
                  </div>
                  <span className="font-label-mono text-xs text-fg-muted block">
                    IIIT HYDERABAD // AEROSPACE &amp; EMBEDDED (CGPA: 9.18)
                  </span>
                </div>
              </div>
              <span className="font-label-mono text-[10px] text-status-success font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                ISRO LOG SIGNED
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1 font-label-mono text-xs">
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  C++20 (98%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  RUST (91%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  FPGA VERILOG (89%)
                </span>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-primary font-semibold">
                  RTOS (85%)
                </span>
              </div>
              <p className="font-body-sm text-xs text-fg-secondary">
                10-day Micro-Internship fellow at ISRO SAC. Optimized FPGA telemetry demodulation pipeline for L-band sat communications.
              </p>
            </div>

            <div className="pt-2 border-t border-border-hairline flex items-center justify-between">
              <span className="font-label-mono text-xs text-fg-muted">STATUS: FINAL OFFER STAGE</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerNotice('Official Letter of Intent (LOI) minted for Priya Venkatesh: ₹20.5 LPA.')}
                  className="px-3 py-1.5 bg-accent-signal text-on-primary font-label-mono text-xs uppercase font-bold"
                >
                  Extend Offer
                </button>
                <button
                  onClick={() =>
                    setSelectedCandidate({
                      name: 'Priya Venkatesh',
                      inst: 'IIIT Hyderabad',
                      match: '94.2%',
                      cgpa: '9.18',
                      skills: 'C++20, Rust, RTOS, FPGA, Verilog, Satellite Comms',
                      sihRole: 'ISRO SAC Fellow & Embedded Systems Lead',
                    })
                  }
                  className="px-3 py-1.5 border border-border-hairline font-label-mono text-xs uppercase"
                >
                  View Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CANDIDATE DOSSIER DRAWER */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
                CANDIDATE TALENT DOSSIER // SIH-2024
              </span>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="font-label-mono text-xs text-fg-muted hover:text-fg-primary"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="space-y-3 font-body-sm text-body-sm">
              <div className="flex items-center justify-between bg-bg-subtle p-3 border border-border-hairline">
                <div>
                  <div className="font-headline-sm text-body-lg font-bold text-fg-primary">
                    {selectedCandidate.name}
                  </div>
                  <div className="font-label-mono text-xs text-fg-muted">
                    {selectedCandidate.inst} // CGPA: {selectedCandidate.cgpa}
                  </div>
                </div>
                <span className="font-label-mono text-xs px-2 py-1 bg-[#FACC15] text-[#18181B] font-bold">
                  MATCH: {selectedCandidate.match}
                </span>
              </div>
              <div>
                <span className="font-label-mono text-xs text-fg-muted uppercase block">Competencies Verified</span>
                <p className="font-label-mono text-xs text-fg-primary mt-1 font-semibold">{selectedCandidate.skills}</p>
              </div>
              <div>
                <span className="font-label-mono text-xs text-fg-muted uppercase block">Hackathon / Honors</span>
                <p className="font-body-sm text-xs text-fg-secondary mt-1">{selectedCandidate.sihRole}</p>
              </div>
              <div className="p-2 bg-bg-canvas border border-border-hairline font-label-mono text-[10px] text-fg-muted">
                IMMUTABLE IDENTITY: SHA-256 SEAL VALIDATED ON ACADEMIC CONSORTIUM BLOCKCHAIN
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-border-hairline">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 border border-border-hairline font-label-mono text-xs uppercase"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCandidate(null);
                  triggerNotice(`Fast-track interview scheduled with ${selectedCandidate.name}.`);
                }}
                className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
              >
                Fast-Track Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

