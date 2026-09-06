'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SkillGapsPage() {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="space-y-space-xl">
      {/* Top Protocol Header */}
      <div className="pb-space-md border-b border-border-strong flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-wider block">
            INDEX: CURR-BRIDGING-704 // SIH-AUTONOMOUS
          </span>
          <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight uppercase mt-1">
            Skill Bridging &amp; Learning Curriculum
          </h1>
          <p className="font-body-md text-fg-secondary mt-1">
            Automated pedagogical interventions dynamically mapped to close verified enterprise competence deficits.
          </p>
        </div>

        <div className="flex items-center gap-space-sm font-label-mono text-xs">
          <div className="p-2 border border-border-hairline bg-bg-surface">
            <span className="text-fg-muted block text-[10px]">CRITICAL GAPS</span>
            <span className="text-status-danger font-bold text-sm">03 DEFICITS</span>
          </div>
          <div className="p-2 border border-border-hairline bg-bg-surface">
            <span className="text-fg-muted block text-[10px]">TOTAL XP EARNED</span>
            <span className="text-status-success font-bold text-sm">+850 XP</span>
          </div>
        </div>
      </div>

      {/* Critical Deficit Alert Banner */}
      <section className="border-2 border-border-strong bg-neutral-950 text-white p-space-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong inline-block" />
              <span className="font-label-mono text-label-mono text-accent-signal uppercase font-bold tracking-wider">
                PRIMARY SYSTEMIC BOTTLENECK // CRITICAL DEFICIT #01
              </span>
            </div>
            <h2 className="font-headline-md text-white uppercase font-bold">
              Docker &amp; Container Orchestration (Current: 40% vs Target: 70%)
            </h2>
            <p className="text-body-sm text-neutral-400 max-w-2xl">
              Closing this gap directly unlocks <strong className="text-accent-signal">4 Tier-1 Enterprise Requisitions</strong> (Direct intake by NPCI, Bharat Electronics, and Cisco Research).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowEnrollModal(true)}
              className="px-space-md py-2.5 bg-accent-signal text-fg-primary font-label-mono text-label-mono uppercase font-bold hover:bg-accent-signal-hover transition-colors flex items-center justify-center gap-1.5 border border-border-strong shadow-[2px_2px_0px_0px_#FFFFFF]"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>EXPEDITE GAP RESOLUTION</span>
            </button>
            <span className="font-label-mono text-center text-neutral-400 text-[10px] uppercase">
              PROJECTED DELTA: +30% MATCH INDEX
            </span>
          </div>
        </div>
      </section>

      {/* 1-Click Gap Remediation Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-surface border-2 border-border-strong max-w-lg w-full p-space-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-accent-signal" />
                <h3 className="font-headline-sm uppercase font-bold text-fg-primary">
                  1-Click Gap Remediation Action Plan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEnrollModal(false)}
                className="font-mono text-fg-muted hover:text-fg-primary text-sm font-bold"
              >
                [ESC]
              </button>
            </div>

            <div className="space-y-3 text-body-sm font-body-sm text-fg-secondary">
              <p>
                Initiating automated pedagogical bridge for <strong className="text-fg-primary">Docker & Container Orchestration</strong>.
              </p>
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-fg-muted">STEP 01:</span>
                  <span className="text-status-success font-bold">Auto-Enroll in 3-Week Lab Pod</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">STEP 02:</span>
                  <span className="text-fg-primary">Reserve Hands-on Assessment Slot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">PROJECTED MATCH:</span>
                  <span className="text-status-success font-bold">78.4% → 92.0%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-hairline">
              <button
                type="button"
                onClick={() => setShowEnrollModal(false)}
                className="px-4 py-2 border border-border-strong text-fg-secondary font-label-mono text-xs uppercase hover:bg-bg-subtle"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setEnrolled(true);
                  setShowEnrollModal(false);
                }}
                className="px-4 py-2 bg-accent-signal text-fg-primary border border-border-strong font-label-mono text-xs uppercase font-bold hover:bg-accent-signal-hover shadow-[2px_2px_0px_0px_#18181B]"
              >
                Confirm &amp; Launch Pod
              </button>
            </div>
          </div>
        </div>
      )}

      {enrolled && (
        <div className="p-3 bg-status-success/10 border-2 border-status-success text-fg-primary font-mono text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-success" />
            Remediation track activated: Docker Pod schedule synchronized with your calendar.
          </span>
          <button
            type="button"
            onClick={() => setEnrolled(false)}
            className="text-fg-muted hover:text-fg-primary uppercase font-bold"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Active Curriculum Tracks: Bento Grid */}
      <section className="space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-fg-primary text-[20px]">account_tree</span>
            <h3 className="font-headline-sm uppercase tracking-tight text-fg-primary font-bold">
              Active Curriculum Remediation Tracks
            </h3>
          </div>
          <span className="font-label-mono text-label-mono text-fg-muted uppercase">
            4 TRACKS ACTIVE // 1 DIRECT GAP REMEDY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Track 1: Direct Gap Bridge */}
          <div className="lg:col-span-8 bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-accent-signal text-fg-primary font-label-mono text-[11px] px-2 py-0.5 font-bold uppercase border border-border-strong">
                    GAP BRIDGE // IN PROGRESS
                  </span>
                  <span className="bg-bg-subtle text-fg-muted font-label-mono text-[11px] px-2 py-0.5 uppercase border border-border-hairline">
                    TRACK-01
                  </span>
                </div>
                <span className="font-label-mono text-label-mono font-bold text-status-success">+200 XP REWARD</span>
              </div>

              <h4 className="font-headline-md text-fg-primary font-bold mb-1">
                Production Containerization &amp; Docker Orchestration
              </h4>
              <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted mb-space-md">
                <span>ISSUER: Cloud Native Computing Foundation (CNCF)</span>
                <span>•</span>
                <span>LEVEL: INTERMEDIATE</span>
              </div>

              {/* Progress Bar */}
              <div className="bg-bg-subtle border border-border-hairline p-space-md mb-space-md">
                <div className="flex justify-between items-center mb-1 font-label-mono text-xs">
                  <span className="text-fg-secondary uppercase">MODULE PROGRESSION (MODULE 4 OF 6)</span>
                  <span className="font-metric-tabular text-fg-primary font-bold tnum">65% COMPLETED</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 border border-neutral-300 overflow-hidden flex">
                  <div className="bg-fg-primary h-full" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Syllabus Checklist */}
              <span className="font-label-mono text-xs text-fg-muted uppercase block mb-space-xs">
                SYLLABUS VALIDATION LEDGER:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs mb-space-md">
                <div className="flex items-center gap-2 bg-bg-canvas border border-border-hairline p-2">
                  <span className="material-symbols-outlined text-status-success text-[18px]">check_box</span>
                  <span>01. Dockerfiles &amp; Layer Optimization</span>
                </div>
                <div className="flex items-center gap-2 bg-bg-canvas border border-border-hairline p-2">
                  <span className="material-symbols-outlined text-status-success text-[18px]">check_box</span>
                  <span>02. Multi-stage Production Builds</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 border border-accent-signal p-2">
                  <span className="material-symbols-outlined text-status-warning text-[18px]">indeterminate_check_box</span>
                  <span className="font-bold text-fg-primary">03. Docker Compose &amp; Microservice Mesh</span>
                </div>
                <div className="flex items-center gap-2 bg-bg-canvas border border-border-hairline p-2 opacity-50">
                  <span className="material-symbols-outlined text-fg-muted text-[18px]">check_box_outline_blank</span>
                  <span>04. Volume Persistence &amp; Subnet Isolation</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-md border-t border-border-hairline mt-space-md">
              <div className="flex items-center gap-1 font-label-mono text-xs text-fg-muted">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>EST. REMAINING: 4.5 HRS</span>
              </div>
              <button
                type="button"
                className="px-space-md py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors flex items-center gap-1 border border-border-strong font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>RESUME LEARNING (SANDBOX #04)</span>
              </button>
            </div>
          </div>

          {/* Track 2: Core Distributed Stream */}
          <div className="lg:col-span-4 bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="bg-bg-subtle text-fg-secondary font-label-mono text-[11px] px-2 py-0.5 uppercase border border-border-hairline">
                  BACKEND ARCHETYPE
                </span>
                <span className="font-label-mono text-label-mono text-status-success font-semibold">+250 XP</span>
              </div>
              <h4 className="font-headline-sm font-bold text-fg-primary mb-1">
                High-Throughput Distributed Systems &amp; Kafka Queues
              </h4>
              <span className="font-label-mono text-xs text-fg-muted block mb-space-sm">
                ISSUER: NPTEL &amp; IIT Madras Lab
              </span>
              <p className="text-body-sm text-fg-secondary mb-space-md">
                Architecting fault-tolerant pub/sub pipelines, partition scaling, and log retention for national-scale transaction backends.
              </p>

              <div className="bg-bg-canvas border border-border-hairline p-space-sm space-y-1 mb-space-md font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-fg-muted">STATUS:</span>
                  <span className="text-fg-primary font-bold">ENROLLED (20%)</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 overflow-hidden">
                  <div className="bg-fg-primary h-full" style={{ width: '20%' }} />
                </div>
                <div className="text-fg-muted text-[10px]">TARGET SKILL: Distributed Consensus &amp; Go</div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 bg-bg-subtle text-fg-primary font-label-mono text-label-mono uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1 border border-border-hairline"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>LAUNCH LAB CLUSTER</span>
            </button>
          </div>

          {/* Track 3: Technical Communication */}
          <div className="lg:col-span-6 bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="bg-bg-subtle text-fg-secondary font-label-mono text-[11px] px-2 py-0.5 uppercase border border-border-hairline">
                  PROFESSIONAL DEFENSE
                </span>
                <span className="font-label-mono text-label-mono text-fg-muted">OPTIONAL // +150 XP</span>
              </div>
              <h4 className="font-headline-sm font-bold text-fg-primary mb-1">
                Technical Communication &amp; Architecture Defense
              </h4>
              <span className="font-label-mono text-xs text-fg-muted block mb-space-sm">
                ISSUER: British Council / SkillBridge Industry Panel
              </span>
              <p className="text-body-sm text-fg-secondary mb-space-md">
                Preparation for structural technical panels, behavioral STAR metrics, and live architecture justification for SIH final placements.
              </p>
              <div className="flex items-center gap-space-md py-space-xs font-mono text-xs text-fg-muted">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                  <span>4 MOCK SESSIONS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">reviews</span>
                  <span>AI FEEDBACK REPORT</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-border-hairline flex items-center justify-between">
              <span className="font-label-mono text-xs text-status-warning font-semibold">NOT STARTED</span>
              <button
                type="button"
                className="px-space-md py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-neutral-800 transition-colors"
              >
                COMMENCE TRACK
              </button>
            </div>
          </div>

          {/* Track 4: Micro-Learning Sprint */}
          <div className="lg:col-span-6 bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="bg-yellow-50 text-status-danger font-label-mono text-[11px] px-2 py-0.5 font-bold uppercase border border-border-hairline">
                  MICRO-LEARNING SPRINT
                </span>
                <span className="font-label-mono text-label-mono text-status-success font-semibold">+100 XP</span>
              </div>
              <div className="flex items-baseline justify-between">
                <h4 className="font-headline-sm font-bold text-fg-primary mb-1">
                  Redis Caching Architectures for Low-Latency APIs
                </h4>
                <span className="font-label-mono text-xs text-fg-muted">3-HR SPRINT</span>
              </div>
              <span className="font-label-mono text-xs text-fg-muted block mb-space-sm">
                HANDS-ON SANDBOX // IN-MEMORY CACHING
              </span>
              <p className="text-body-sm text-fg-secondary mb-space-md">
                Implementation of Cache-Aside, Write-Through patterns, and distributed cache eviction policies in Redis v7 cluster.
              </p>
              <div className="bg-bg-canvas border border-border-hairline p-2 flex items-center gap-2 font-mono text-xs text-fg-secondary">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                <span>CLONEABLE REPO: redis-fastapi-template.git</span>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-border-hairline flex items-center justify-between">
              <span className="font-label-mono text-xs text-fg-muted">ESTIMATED EFFORT: 180 MINS</span>
              <button
                type="button"
                className="px-space-md py-2 bg-fg-primary text-bg-surface font-label-mono text-label-mono uppercase hover:bg-accent-signal hover:text-fg-primary transition-colors flex items-center gap-1 border border-border-strong font-bold"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                <span>START SPRINT SANDBOX</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

