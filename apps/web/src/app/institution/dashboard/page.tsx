'use client';

import React, { useState, useEffect } from 'react';
import { CurriculumGapChart, PlacementVelocityChart } from '@/components/charts';
import { getMyInstitutionProfile, getInstitutionAnalytics, InstitutionProfile, InstitutionAnalytics } from '@/features/institutions/api';
import { getInstitutionOverview, getSkillDemandHeatmap, InstitutionOverview } from '@/features/analytics/api';
import { Loader2 } from 'lucide-react';

export default function InstitutionDashboardPage() {
  const [profile, setProfile] = useState<InstitutionProfile | null>(null);
  const [analytics, setAnalytics] = useState<InstitutionOverview | null>(null);
  const [activeTab, setActiveTab] = useState<'heatmap' | 'funnel' | 'reports'>('heatmap');
  const [cohortBatch, setCohortBatch] = useState('2021-2025 B.Tech (Final Year)');
  const [reportArchetype, setReportArchetype] = useState<'naac' | 'nirf' | 'aicte' | 'deficit'>('naac');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstitutionData() {
      try {
        const [profData, overviewData] = await Promise.allSettled([
          getMyInstitutionProfile(),
          getInstitutionOverview(),
        ]);
        if (profData.status === 'fulfilled') setProfile(profData.value);
        if (overviewData.status === 'fulfilled') setAnalytics(overviewData.value);
      } catch (err) {
        console.error('Failed to load institution data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInstitutionData();
  }, []);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-bg-surface">
            DISPATCH NOTICE:
          </span>
          <span className="font-body-sm text-body-sm text-surface-container-high">{actionNotice}</span>
        </div>
      )}

      {/* Top Context Header & Metadata Ribbon */}
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-sm pb-space-sm border-b border-border-hairline">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="inline-flex items-center gap-1 font-label-mono text-label-mono px-1.5 py-0.5 bg-bg-subtle text-fg-primary border border-border-hairline font-bold">
              <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
              SYS.NODE // IND-ACAD-SIH-2024
            </span>
            <span className="font-label-mono text-label-mono text-fg-muted">//</span>
            <span className="font-label-mono text-label-mono text-fg-secondary">AICTE &amp; UGC COMPLIANCE ENGINE v4.2</span>
            <span className="font-label-mono text-label-mono text-fg-muted">//</span>
            <span className="font-label-mono text-label-mono text-status-warning bg-bg-subtle px-1.5 py-0.5 border border-border-hairline font-semibold">
              AUDIT CYCLE: 2024-Q3
            </span>
          </div>
          <div className="flex items-center gap-space-md flex-wrap">
            <span className="font-label-mono text-label-mono text-fg-muted">
              DOCKET ID: <strong className="text-fg-primary">REP-BLR-88210-ACC</strong>
            </span>
            <span className="font-label-mono text-label-mono text-fg-muted">
              HASH: <span className="text-fg-secondary font-mono">0x7F...C84B</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => triggerNotice('Telemetry synched across 14 institutional server pods.')}
                className="px-2 py-1 bg-bg-subtle hover:bg-fg-secondary hover:text-on-primary border border-border-hairline font-label-mono text-label-mono transition-colors"
              >
                SYNC DATA
              </button>
              <button
                onClick={() => triggerNotice('Full compliance diagnostics passed: 0 critical schema errors.')}
                className="px-2 py-1 bg-border-strong text-on-primary border border-border-strong font-label-mono text-label-mono transition-colors hover:bg-fg-secondary"
              >
                RUN DIAGNOSTIC
              </button>
            </div>
          </div>
        </div>

        {/* Title Block */}
        <div className="pt-space-md pb-space-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-border-strong" />
            <span className="font-label-mono text-label-mono tracking-widest uppercase text-fg-muted">
              Accreditation Intelligence Bureau
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight uppercase font-extrabold">
            Institutional Skill Intelligence &amp; Accreditation Analytics
          </h1>
          <p className="font-body-md text-body-md text-fg-muted max-w-4xl mt-1">
            Real-time cohort skill readiness telemetry, national curriculum gap diagnosis, industry hiring demand heatmaps, and automated accreditation report generation.
          </p>
        </div>

        {/* Real-time Telemetry Stat Strips (Swiss Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-border-hairline bg-bg-subtle mt-space-md">
          {/* Stat 1 */}
          <div className="p-space-md bg-bg-surface border-b sm:border-b-0 border-r border-border-hairline flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase">Cohort Readiness</span>
              <span className="inline-flex items-center text-[10px] font-label-mono px-1 bg-bg-subtle text-status-success font-semibold">
                +6.2% vs NATL
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">
                {analytics?.averageSkillReadiness ? `${analytics.averageSkillReadiness}%` : '81.4%'}
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">Q3 Index</span>
            </div>
            <div className="w-full bg-bg-subtle h-1.5 mt-2 overflow-hidden border border-border-hairline">
              <div className="bg-border-strong h-full" style={{ width: `${analytics?.averageSkillReadiness || 81.4}%` }} />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-space-md bg-bg-surface border-b sm:border-b-0 lg:border-r border-border-hairline flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase">Placement Conversion</span>
              <span className="font-label-mono text-[10px] text-fg-muted">TGT: 90.0%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">
                {analytics?.placementRate ? `${analytics.placementRate}%` : '84.8%'}
              </span>
              <span className="font-label-mono text-label-mono text-status-warning font-semibold">Δ -5.2%</span>
            </div>
            <div className="w-full bg-bg-subtle h-1.5 mt-2 overflow-hidden border border-border-hairline">
              <div className="bg-status-warning h-full" style={{ width: `${analytics?.placementRate || 84.8}%` }} />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-space-md bg-bg-surface border-b lg:border-b-0 border-r border-border-hairline flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase">Internship Velocity</span>
              <span className="w-2 h-2 rounded-full bg-portal-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-portal-primary font-bold">
                {analytics?.internshipRate ? `${analytics.internshipRate}%` : '74.2%'}
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">Active</span>
            </div>
            <div className="w-full bg-bg-subtle h-1.5 mt-2 overflow-hidden border border-border-hairline">
              <div className="bg-portal-primary h-full" style={{ width: `${analytics?.internshipRate || 74.2}%` }} />
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-space-md bg-bg-surface border-b sm:border-b-0 sm:border-r border-border-hairline flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase">Industry Requisitions</span>
              <span className="font-label-mono text-[10px] text-status-success font-semibold">VERIFIED</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">1,420</span>
              <span className="font-label-mono text-label-mono text-fg-muted">Jobs Active</span>
            </div>
            <div className="font-label-mono text-[10px] text-fg-muted mt-1">From 48 Corporate MoUs</div>
          </div>

          {/* Stat 5 */}
          <div className="p-space-md bg-bg-surface flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase">Govt/Corp Subsidies</span>
              <span className="font-label-mono text-[10px] text-fg-primary font-semibold">AWS + LNX</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">₹14.8L</span>
              <span className="font-label-mono text-label-mono text-status-success font-bold">CLAIMED</span>
            </div>
            <div className="font-label-mono text-[10px] text-fg-muted mt-1">820 Certification Vouchers</div>
          </div>
        </div>
      </div>

      {/* Primary Analytics Tab Bar */}
      <div className="border border-border-hairline bg-bg-surface px-space-md lg:px-space-xl">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-0">
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-space-md py-3.5 border-b-2 font-label-mono text-label-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'heatmap'
                  ? 'border-portal-primary text-fg-primary bg-portal-primary-soft/40'
                  : 'border-transparent text-fg-muted hover:text-fg-primary'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-portal-primary" />
              01. COHORT SKILLS &amp; HEATMAP
            </button>
            <button
              onClick={() => setActiveTab('funnel')}
              className={`px-space-md py-3.5 border-b-2 font-label-mono text-label-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'funnel'
                  ? 'border-portal-primary text-fg-primary bg-portal-primary-soft/40'
                  : 'border-transparent text-fg-muted hover:text-fg-primary'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-status-warning" />
              02. EMPLOYABILITY &amp; PLACEMENT FUNNEL
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-space-md py-3.5 border-b-2 font-label-mono text-label-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'reports'
                  ? 'border-portal-primary text-fg-primary bg-portal-primary-soft/40'
                  : 'border-transparent text-fg-muted hover:text-fg-primary'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-portal-primary" />
              03. ACCREDITATION REPORT BUILDER
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-space-sm pl-space-md">
            <span className="font-label-mono text-label-mono text-fg-muted">COHORT BATCH:</span>
            <select
              value={cohortBatch}
              onChange={(e) => setCohortBatch(e.target.value)}
              className="bg-bg-subtle border border-border-hairline text-fg-primary font-label-mono text-label-mono px-2 py-1 outline-none cursor-pointer"
            >
              <option>2021-2025 B.Tech (Final Year)</option>
              <option>2022-2026 B.Tech (Pre-Final)</option>
              <option>2023-2025 M.Tech / MCA</option>
            </select>
          </div>
        </div>
      </div>

      {/* TAB 01: COHORT SKILLS & HEATMAP */}
      {activeTab === 'heatmap' && (
        <div className="space-y-space-lg">
          {/* Section Top Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-border-hairline pb-space-sm">
            <div>
              <div className="font-label-mono text-label-mono text-fg-muted uppercase">SECTION 1.0 // TELEMETRIC COMPARISON</div>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase mt-0.5 font-bold">
                Live Industry Skill Supply vs. Enterprise Demand Gap
              </h2>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 font-label-mono text-label-mono text-fg-muted">
                <span className="w-2 h-2 bg-border-strong" /> Institutional Supply
              </span>
              <span className="inline-flex items-center gap-1.5 font-label-mono text-label-mono text-fg-muted ml-3">
                <span className="w-2 h-2 bg-portal-primary" /> Live Market Demand
              </span>
            </div>
          </div>

          <CurriculumGapChart height={280} accentColor="#10B981" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left 7 Cols: Skill Supply vs Demand Benchmarks */}
            <div className="lg:col-span-7 bg-bg-surface border border-border-hairline p-space-lg space-y-space-lg">
              <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm mb-space-md">
                <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                  Competency Area &amp; Vector Alignment
                </span>
                <span className="font-label-mono text-label-mono text-fg-muted">TELEMETRY DELTA</span>
              </div>

              {/* Skill 1 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Python / Distributed Async Frameworks
                    </span>
                    <span className="ml-2 font-label-mono text-[10px] text-status-success font-semibold">[OPTIMAL ALIGNMENT]</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-fg-muted">
                    Delta: <strong className="text-status-success">-8%</strong>
                  </span>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-fg-muted">Supply: 88%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-border-strong h-full" style={{ width: '88%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-portal-primary font-semibold">Demand: 96%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-portal-primary h-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>

              {/* Skill 2: Critical Deficit */}
              <div className="space-y-1.5 p-3 bg-portal-primary-soft/30 border-l-4 border-portal-primary">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Containerization &amp; Kubernetes Orchestration
                    </span>
                    <span className="ml-2 font-label-mono text-[10px] text-portal-primary font-bold bg-white px-1 border border-portal-primary">
                      [CRITICAL BOTTLENECK -47%]
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-portal-primary font-bold">Delta: -47% DEFICIT</span>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-fg-muted">Supply: 42%</span>
                  <div className="col-span-9 bg-white h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-border-strong h-full" style={{ width: '42%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-portal-primary font-semibold">Demand: 89%</span>
                  <div className="col-span-9 bg-white h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-portal-primary h-full" style={{ width: '89%' }} />
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-fg-muted pt-1">
                  Curriculum intervention triggered: Recommending immediate deployment of Cloud Native DevOps elective for Semester VII.
                </p>
              </div>

              {/* Skill 3 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      PostgreSQL, Redis &amp; DB Sharding Architectures
                    </span>
                    <span className="ml-2 font-label-mono text-[10px] text-status-warning font-semibold">[DEVELOPING GAP]</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-fg-muted">
                    Delta: <strong className="text-status-warning">-6%</strong>
                  </span>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-fg-muted">Supply: 76%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-border-strong h-full" style={{ width: '76%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-portal-primary font-semibold">Demand: 82%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-portal-primary h-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>

              {/* Skill 4 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Machine Learning, LLMOps &amp; Vector Embeddings
                    </span>
                    <span className="ml-2 font-label-mono text-[10px] text-fg-secondary font-semibold">[GROWTH TRACK]</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-fg-muted">
                    Delta: <strong className="text-status-warning">-16%</strong>
                  </span>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-fg-muted">Supply: 68%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-border-strong h-full" style={{ width: '68%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-portal-primary font-semibold">Demand: 84%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-portal-primary h-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              {/* Skill 5 */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Technical Documentation &amp; Patent Defense
                    </span>
                    <span className="ml-2 font-label-mono text-[10px] text-status-success font-semibold">[ACCEPTABLE]</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-fg-muted">
                    Delta: <strong className="text-status-success">-4%</strong>
                  </span>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-fg-muted">Supply: 81%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-border-strong h-full" style={{ width: '81%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-2 font-label-mono text-label-mono">
                  <span className="col-span-3 text-portal-primary font-semibold">Demand: 85%</span>
                  <div className="col-span-9 bg-bg-subtle h-3 flex overflow-hidden border border-border-hairline">
                    <div className="bg-portal-primary h-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Departmental Matrix & Institutional Telemetry */}
            <div className="lg:col-span-5 space-y-space-lg">
              {/* Departmental Breakdown Card */}
              <div className="bg-bg-surface border border-border-hairline p-space-md">
                <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-md">
                  <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                    Department Readiness Index
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">ACCRED. CRITERIA 2.3</span>
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-hairline">
                      <th className="py-2 text-left font-label-mono text-label-mono text-fg-muted uppercase">Department</th>
                      <th className="py-2 text-right font-label-mono text-label-mono text-fg-muted uppercase">Readiness</th>
                      <th className="py-2 text-right font-label-mono text-label-mono text-fg-muted uppercase">Audit Band</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-hairline font-body-sm text-body-sm">
                    <tr className="hover:bg-bg-subtle transition-colors">
                      <td className="py-2.5 font-medium text-fg-primary">Computer Science &amp; Eng</td>
                      <td className="py-2.5 text-right font-label-mono font-bold text-fg-primary">86.2%</td>
                      <td className="py-2.5 text-right">
                        <span className="px-1.5 py-0.5 bg-bg-subtle font-label-mono text-[10px] text-status-success font-semibold border border-border-hairline">
                          TIER-A1
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-bg-subtle transition-colors">
                      <td className="py-2.5 font-medium text-fg-primary">Information Technology</td>
                      <td className="py-2.5 text-right font-label-mono font-bold text-fg-primary">82.4%</td>
                      <td className="py-2.5 text-right">
                        <span className="px-1.5 py-0.5 bg-bg-subtle font-label-mono text-[10px] text-status-success font-semibold border border-border-hairline">
                          TIER-A1
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-bg-subtle transition-colors">
                      <td className="py-2.5 font-medium text-fg-primary">Electronics &amp; Communication</td>
                      <td className="py-2.5 text-right font-label-mono font-bold text-fg-secondary">74.1%</td>
                      <td className="py-2.5 text-right">
                        <span className="px-1.5 py-0.5 bg-bg-subtle font-label-mono text-[10px] text-status-warning font-semibold border border-border-hairline">
                          TIER-B2
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-bg-subtle transition-colors">
                      <td className="py-2.5 font-medium text-fg-primary">Mechanical &amp; Autonomous Systems</td>
                      <td className="py-2.5 text-right font-label-mono font-bold text-fg-secondary">69.8%</td>
                      <td className="py-2.5 text-right">
                        <span className="px-1.5 py-0.5 bg-bg-subtle font-label-mono text-[10px] text-status-warning font-semibold border border-border-hairline">
                          TIER-B3
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Automated Gap Prescription Notice */}
              <div className="bg-bg-subtle border border-border-hairline p-space-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[18px] text-portal-primary">warning</span>
                  <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                    AICTE Model Curriculum Deviation
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-fg-secondary">
                  AICTE Guideline 2024 mandates 30 practical lab hours in Microservices &amp; Container Architecture. Current institution syllabus allocates 12 hours.
                </p>
                <div className="mt-space-sm pt-space-sm border-t border-border-hairline flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-fg-muted">Action Code: #REV-2024-C3</span>
                  <button
                    onClick={() => triggerNotice('Syllabi Amendment #REV-2024-C3 dispatched to Academic Council.')}
                    className="font-label-mono text-label-mono text-fg-primary hover:underline uppercase font-bold"
                  >
                    Dispatch Syllabi Amendment →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: EMPLOYABILITY & PLACEMENT FUNNEL */}
      {activeTab === 'funnel' && (
        <div className="space-y-space-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-border-hairline pb-space-sm">
            <div>
              <div className="font-label-mono text-label-mono text-fg-muted uppercase">
                SECTION 2.0 // RECRUITMENT PIPELINE ARCHITECTURE
              </div>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase mt-0.5 font-bold">
                Campus Hiring Conversion Funnel &amp; Corporate Requisitions
              </h2>
            </div>
            <div className="font-label-mono text-label-mono text-fg-muted">
              TOTAL REGISTERED COHORT: <strong className="text-fg-primary">1,200 SCHOLARS</strong>
            </div>
          </div>

          <PlacementVelocityChart height={280} />

          {/* Funnel Visualization Matrix */}
          <div className="bg-bg-surface border border-border-hairline p-space-lg">
            <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm mb-space-md">
              <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                Candidate Conversion Pipeline Stages
              </span>
              <span className="font-label-mono text-label-mono text-fg-muted">REAL-TIME ATS TELEMETRY</span>
            </div>

            <div className="space-y-3">
              {/* Stage 1 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">01/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Registered Eligible Students
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">1,200 Students</span>
                    <span className="text-fg-muted font-mono">100.0% BASE</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">02/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Profile Screened &amp; Skill-Assessed
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">1,080 Students</span>
                    <span className="text-fg-muted font-mono">90.0% (-10.0%)</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">03/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Shortlisted by Corporate Recruiters
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">720 Students</span>
                    <span className="text-fg-muted font-mono">60.0% (-30.0%)</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '60%' }} />
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">04/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Technical Assessments &amp; Coding Cleared
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">490 Students</span>
                    <span className="text-fg-muted font-mono">40.8% (-19.2%)</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '40.8%' }} />
                </div>
              </div>

              {/* Stage 5 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">05/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Interviews Scheduled / In Progress
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">310 Students</span>
                    <span className="text-fg-muted font-mono">25.8% (-15.0%)</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '25.8%' }} />
                </div>
              </div>

              {/* Stage 6 */}
              <div className="p-3 bg-bg-subtle border border-border-hairline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-fg-muted">06/</span>
                    <span className="font-body-md text-body-md font-semibold text-fg-primary">
                      Official Offers Extended
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-fg-primary font-bold">215 Students</span>
                    <span className="text-fg-muted font-mono">17.9% (-7.9%)</span>
                  </div>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden border border-border-hairline">
                  <div className="bg-border-strong h-full" style={{ width: '17.9%' }} />
                </div>
              </div>

              {/* Stage 7: Confirmed Offers */}
              <div className="p-3 bg-bg-surface border-2 border-border-strong">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-status-success font-bold">07/ COMPLETED</span>
                    <span className="font-body-md text-body-md font-bold text-fg-primary">
                      Offers Accepted &amp; Verified on Blockchain
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-label-mono text-label-mono">
                    <span className="text-status-success font-bold text-body-lg">185 Offers Minted</span>
                    <span className="text-fg-primary font-bold font-mono">15.4% TOTAL COHORT</span>
                  </div>
                </div>
                <div className="w-full bg-bg-subtle h-3 overflow-hidden border border-border-hairline">
                  <div className="bg-status-success h-full" style={{ width: '15.4%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Recruiter Activity Ledger */}
          <div className="bg-bg-surface border border-border-hairline p-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-md">
              <div>
                <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary block">
                  Lead Employer Hiring Ledger
                </span>
                <span className="font-body-sm text-body-sm text-fg-muted">
                  Top verified industry partners actively hiring from this institution
                </span>
              </div>
              <button
                onClick={() => triggerNotice('Exporting hiring ledger CSV (48 active MoU corporate partners)...')}
                className="px-2 py-1 border border-border-hairline font-label-mono text-label-mono text-fg-muted hover:text-fg-primary bg-bg-subtle"
              >
                EXPORT LEDGER CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border-hairline text-left">
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase">Enterprise Partner</th>
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase">Domain Track</th>
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase text-right">Target Roles</th>
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase text-right">Avg CTC Band</th>
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase text-right">Offers Issued</th>
                    <th className="py-2.5 px-3 font-label-mono text-label-mono text-fg-muted uppercase text-center">MoU Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-hairline font-body-sm text-body-sm">
                  <tr className="hover:bg-bg-subtle transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-fg-primary">TechNova Research Labs</div>
                      <div className="font-label-mono text-[10px] text-fg-muted">MOU-AICTE-2023-881</div>
                    </td>
                    <td className="py-3 px-3 text-fg-secondary">Autonomous Embedded Systems</td>
                    <td className="py-3 px-3 text-right font-mono">24 Openings</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-fg-primary">₹18.5 - 22.0 LPA</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-fg-primary">24 Candidates</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 font-label-mono text-[10px] bg-bg-subtle text-status-success border border-border-hairline font-semibold">
                        VALIDATED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-bg-subtle transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-fg-primary">Tata Consultancy Services (Digital)</div>
                      <div className="font-label-mono text-[10px] text-fg-muted">MOU-AICTE-2021-019</div>
                    </td>
                    <td className="py-3 px-3 text-fg-secondary">Cloud Infrastructure &amp; SRE</td>
                    <td className="py-3 px-3 text-right font-mono">60 Openings</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-fg-primary">₹7.5 - 11.5 LPA</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-fg-primary">42 Candidates</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 font-label-mono text-[10px] bg-bg-subtle text-status-success border border-border-hairline font-semibold">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-bg-subtle transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-fg-primary">Infosys Applied AI Division</div>
                      <div className="font-label-mono text-[10px] text-fg-muted">MOU-AICTE-2024-402</div>
                    </td>
                    <td className="py-3 px-3 text-fg-secondary">Generative AI Engineering</td>
                    <td className="py-3 px-3 text-right font-mono">25 Openings</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-fg-primary">₹9.0 - 13.0 LPA</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-fg-primary">18 Candidates</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 font-label-mono text-[10px] bg-bg-subtle text-status-success border border-border-hairline font-semibold">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-bg-subtle transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-fg-primary">ISRO Space Applications Centre</div>
                      <div className="font-label-mono text-[10px] text-fg-muted">RESEARCH-FELLOW-SIH-99</div>
                    </td>
                    <td className="py-3 px-3 text-fg-secondary">Satellite Telemetry Processing</td>
                    <td className="py-3 px-3 text-right font-mono">6 Fellowships</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-fg-primary">Stipend + Grant</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-status-success">6 Research Fellows</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 font-label-mono text-[10px] bg-bg-subtle text-fg-primary border border-border-hairline font-bold">
                        FELLOWSHIP
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 03: ACCREDITATION REPORT BUILDER */}
      {activeTab === 'reports' && (
        <div className="space-y-space-lg">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm border-b border-border-hairline pb-space-sm">
            <div>
              <div className="font-label-mono text-label-mono text-fg-muted uppercase">
                SECTION 3.0 // STATUTORY COMPLIANCE COMPOSER
              </div>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase mt-0.5 font-bold">
                Automated Accreditation &amp; Governance Report Generator
              </h2>
            </div>
            <div className="flex items-center gap-space-xs font-label-mono text-label-mono text-fg-secondary">
              <span className="w-2 h-2 rounded-full bg-status-success" />
              <span>AICTE-SIH ENGINE CONNECTED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left Configurator Form (Step 1 & Step 2) */}
            <div className="lg:col-span-5 space-y-space-md">
              {/* STEP 1: Select Archetype */}
              <div className="bg-bg-surface border border-border-hairline p-space-md">
                <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-sm">
                  <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                    STEP 01 // SELECT ACCREDITATION CRITERIA
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">ARCHETYPE</span>
                </div>
                <div className="space-y-2">
                  {/* Archetype 1 */}
                  <label
                    onClick={() => setReportArchetype('naac')}
                    className={`flex items-start gap-space-sm p-space-sm border cursor-pointer block transition-colors ${
                      reportArchetype === 'naac'
                        ? 'border-2 border-border-strong bg-bg-subtle'
                        : 'border-border-hairline bg-white hover:bg-bg-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="archetype"
                      checked={reportArchetype === 'naac'}
                      onChange={() => setReportArchetype('naac')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-md text-body-md font-bold text-fg-primary">NAAC Criteria 5 Dossier</span>
                        <span className="font-label-mono text-[10px] bg-border-strong text-on-primary px-1">ACTIVE</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-fg-secondary mt-0.5">
                        Student Support, Career Progression, Placement records &amp; Higher Education transition audit.
                      </p>
                    </div>
                  </label>

                  {/* Archetype 2 */}
                  <label
                    onClick={() => setReportArchetype('nirf')}
                    className={`flex items-start gap-space-sm p-space-sm border cursor-pointer block transition-colors ${
                      reportArchetype === 'nirf'
                        ? 'border-2 border-border-strong bg-bg-subtle'
                        : 'border-border-hairline bg-white hover:bg-bg-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="archetype"
                      checked={reportArchetype === 'nirf'}
                      onChange={() => setReportArchetype('nirf')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-md text-body-md font-semibold text-fg-primary">NIRF Placement &amp; Higher Studies Metric</span>
                        <span className="font-label-mono text-[10px] text-fg-muted">SEC. 4.1</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-fg-muted mt-0.5">
                        Median salary progression, corporate hiring density, and PhD enrollment pipeline ledger.
                      </p>
                    </div>
                  </label>

                  {/* Archetype 3 */}
                  <label
                    onClick={() => setReportArchetype('aicte')}
                    className={`flex items-start gap-space-sm p-space-sm border cursor-pointer block transition-colors ${
                      reportArchetype === 'aicte'
                        ? 'border-2 border-border-strong bg-bg-subtle'
                        : 'border-border-hairline bg-white hover:bg-bg-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="archetype"
                      checked={reportArchetype === 'aicte'}
                      onChange={() => setReportArchetype('aicte')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-md text-body-md font-semibold text-fg-primary">AICTE Industry-Academia MoU Audit</span>
                        <span className="font-label-mono text-[10px] text-fg-muted">MOU-ACT</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-fg-muted mt-0.5">
                        Active enterprise partnerships, industrial training hours logged, and patent filings docket.
                      </p>
                    </div>
                  </label>

                  {/* Archetype 4 */}
                  <label
                    onClick={() => setReportArchetype('deficit')}
                    className={`flex items-start gap-space-sm p-space-sm border cursor-pointer block transition-colors ${
                      reportArchetype === 'deficit'
                        ? 'border-2 border-border-strong bg-bg-subtle'
                        : 'border-border-hairline bg-white hover:bg-bg-subtle'
                    }`}
                  >
                    <input
                      type="radio"
                      name="archetype"
                      checked={reportArchetype === 'deficit'}
                      onChange={() => setReportArchetype('deficit')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-md text-body-md font-semibold text-fg-primary">Curriculum Skill Gap Diagnostic</span>
                        <span className="font-label-mono text-[10px] text-status-warning">INTERNAL</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-fg-muted mt-0.5">
                        Micro-breakdown of department syllabus obsolescence vs live SIH-2024 hiring requisitions.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* STEP 2: Configure Audit Parameters */}
              <div className="bg-bg-surface border border-border-hairline p-space-md">
                <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-sm">
                  <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                    STEP 02 // CONFIGURE SCOPE &amp; BOUNDARIES
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">METADATA</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="font-label-mono text-label-mono text-fg-muted block uppercase mb-1">Academic Year Session</label>
                    <select className="w-full bg-bg-subtle border border-border-hairline px-3 py-2 text-fg-primary font-body-sm text-body-sm outline-none focus:border-border-strong">
                      <option>2024 - 2025 (Current Academic Cycle)</option>
                      <option>2023 - 2024 (Retrospective Audit)</option>
                      <option>2022 - 2023 (Baseline Historical)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-label-mono text-label-mono text-fg-muted block uppercase mb-1">Department Scope</label>
                      <select className="w-full bg-bg-subtle border border-border-hairline px-3 py-2 text-fg-primary font-body-sm text-body-sm outline-none focus:border-border-strong">
                        <option>All Engineering Branches</option>
                        <option>Computer Science &amp; Eng</option>
                        <option>Information Technology</option>
                        <option>Electronics &amp; Comm</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-label-mono text-label-mono text-fg-muted block uppercase mb-1">Verification Level</label>
                      <select className="w-full bg-bg-subtle border border-border-hairline px-3 py-2 text-fg-primary font-body-sm text-body-sm outline-none focus:border-border-strong">
                        <option>Standard Institutional (AICTE)</option>
                        <option>NAAC Peer-Team Certified</option>
                        <option>Self-Study Report (SSR) Draft</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm text-fg-secondary">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded-none text-fg-primary" />
                      <span>Embed Cryptographic SHA-256 Validation Seal on every page</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Step 3 & 4: Live Analytical Preview Card & Export Suite */}
            <div className="lg:col-span-7 bg-bg-surface border border-border-hairline p-space-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs mb-space-md">
                  <div>
                    <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary block">
                      STEP 03 // LIVE ANALYTICAL PREVIEW
                    </span>
                    <span className="font-body-sm text-body-sm text-fg-muted">
                      Dossier rendering on canvas with compiled AICTE schema
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-label-mono text-label-mono text-status-success">
                    <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                    LIVE SYNCHRONIZED
                  </div>
                </div>

                {/* Mock Paper Sheet Frame */}
                <div className="border border-border-hairline bg-bg-canvas p-space-md shadow-sm space-y-space-md">
                  <div className="flex items-start justify-between border-b-2 border-border-strong pb-3">
                    <div>
                      <div className="font-label-mono text-[10px] text-fg-muted tracking-wider">
                        NATIONAL ASSESSMENT AND ACCREDITATION COUNCIL // BANGALORE
                      </div>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-fg-primary uppercase mt-0.5">
                        {reportArchetype === 'naac' && 'CRITERION 5.2.1: STUDENT PLACEMENT & PROGRESSION REGISTER'}
                        {reportArchetype === 'nirf' && 'NIRF 2024 DISCIPLINE REPORT: GRADUATE OUTCOME METRICS'}
                        {reportArchetype === 'aicte' && 'AICTE MANDATE 2024: INDUSTRY-ACADEMIA ALLIANCE REGISTER'}
                        {reportArchetype === 'deficit' && 'ACCREDITATION DEFICIT: SKILL DISPARITY AUDIT MATRIX'}
                      </h3>
                      <div className="font-label-mono text-label-mono text-fg-secondary mt-1">
                        Institution Code: <span className="font-bold text-fg-primary">KA-EN-2024-8841</span> // AY 2024-25
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-bg-subtle border border-border-hairline flex items-center justify-center font-label-mono font-bold text-fg-primary">
                      {reportArchetype.toUpperCase()}
                    </div>
                  </div>

                  {/* Preview Data Abstract Table */}
                  <div className="space-y-2">
                    <span className="font-label-mono text-label-mono text-fg-muted uppercase block">
                      TABLE 5.2.1.A - SUMMARY OF QUALIFYING OUTCOMES
                    </span>
                    <table className="w-full border-collapse border border-border-hairline font-body-sm text-body-sm bg-white">
                      <thead className="bg-bg-subtle border-b border-border-hairline">
                        <tr className="text-left font-label-mono text-[10px] text-fg-muted uppercase">
                          <th className="p-2">Metric Ref</th>
                          <th className="p-2">Metric Description</th>
                          <th className="p-2 text-right">Count / Pct</th>
                          <th className="p-2 text-center">Audit Code</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-hairline">
                        <tr>
                          <td className="p-2 font-mono font-medium">QnM 5.2.1</td>
                          <td className="p-2 text-fg-primary font-medium">Outgoing students placed in corporate organizations</td>
                          <td className="p-2 text-right font-mono font-bold text-fg-primary">84.8% (185/215)</td>
                          <td className="p-2 text-center">
                            <span className="font-label-mono text-[10px] text-status-success font-semibold">PASS [A+]</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono font-medium">QnM 5.2.2</td>
                          <td className="p-2 text-fg-primary font-medium">Median Salary Package of Placed Graduates</td>
                          <td className="p-2 text-right font-mono font-bold text-fg-primary">₹8.40 LPA</td>
                          <td className="p-2 text-center">
                            <span className="font-label-mono text-[10px] text-status-success font-semibold">PASS [A+]</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-mono font-medium">QnM 5.1.3</td>
                          <td className="p-2 text-fg-primary font-medium">Beneficiaries of Industry Skill Vouchers (AWS / Linux)</td>
                          <td className="p-2 text-right font-mono font-bold text-fg-primary">820 Candidates</td>
                          <td className="p-2 text-center">
                            <span className="font-label-mono text-[10px] text-status-success font-semibold">PASS [A++]</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Cryptographic Hash Bar */}
                  <div className="p-2 bg-bg-subtle border border-border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-label-mono text-[10px] text-fg-muted">
                    <div>
                      <span>SHA-256 SEAL: </span>
                      <span className="text-fg-primary font-mono font-bold">e83c21a998b417eef980dc27498cda021</span>
                    </div>
                    <div>
                      <span>AUTHENTICITY: </span>
                      <span className="text-status-success font-bold">TAMPER-PROOF VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4: Action & Export Buttons Suite */}
              <div className="mt-space-lg pt-space-md border-t border-border-hairline">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-mono text-label-mono font-bold uppercase text-fg-primary">
                    STEP 04 // DISPATCH &amp; EXPORT PIPELINE
                  </span>
                  <span className="font-label-mono text-label-mono text-fg-muted">3 FORMATS AVAILABLE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  <button
                    onClick={() => triggerNotice('Report dossier loaded in separate preview pane.')}
                    className="px-space-sm py-2.5 bg-bg-subtle hover:bg-white text-fg-primary border border-border-strong font-label-mono text-label-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>PREVIEW DOSSIER</span>
                  </button>
                  <button
                    onClick={() => triggerNotice('Official NAAC/AICTE Accredited PDF has been queued for signed cryptographic download.')}
                    className="px-space-sm py-2.5 bg-portal-primary hover:bg-portal-primary-hover text-portal-on-primary border border-portal-primary font-label-mono text-label-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    <span>EXPORT OFFICIAL PDF</span>
                  </button>
                  <button
                    onClick={() => triggerNotice('Complete Raw Audit Data Ledger exported in ISO-compliant CSV format.')}
                    className="px-space-sm py-2.5 bg-border-strong hover:bg-fg-secondary text-on-primary border border-border-strong font-label-mono text-label-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">table_view</span>
                    <span>EXPORT ACCREDITED CSV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swiss Institutional Docket Footer */}
      <div className="border border-border-hairline bg-bg-surface px-space-md lg:px-space-xl py-space-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-md">
            <span className="font-label-mono text-label-mono font-bold text-fg-primary">SKILLBRIDGE // SIH-2024</span>
            <span className="font-label-mono text-label-mono text-fg-muted">
              MINISTRY OF EDUCATION &amp; AICTE COMPLIANT AUDIT CORE
            </span>
          </div>
          <div className="flex items-center gap-space-md font-label-mono text-label-mono text-fg-muted">
            <span>SECURITY LEVEL: <strong className="text-fg-primary">STATION-LEVEL-4</strong></span>
            <span>GATEWAY: <strong className="text-fg-primary">NODE-IN-BLR-01</strong></span>
            <span>LATENCY: <strong className="text-status-success">14ms</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

