'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@portal/ui';

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col max-w-[1440px] mx-auto p-space-md lg:p-space-xl space-y-space-xl">
      <div className="border-b border-border-strong pb-space-lg">
        <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-md">
          <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
          <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
            // MISSION MANIFESTO : SIH-2024
          </span>
        </div>
        <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight font-extrabold leading-tight">
          Bridging the 80% National Engineering Skill Gap
        </h1>
        <p className="text-body-lg font-body-lg text-fg-muted max-w-3xl mt-2">
          SkillBridge is India’s sovereign typographic platform built to replace unverified resume claims with mathematically certified cryptographic skill passports, live industry curriculum calibration, and transparent joint academic-industrial R&amp;D dockets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <Card className="p-space-lg space-y-space-sm">
          <span className="font-label-mono text-xs text-status-danger uppercase font-bold block">01. THE CRITICAL DEFICIT</span>
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
            Curriculum vs Enterprise Reality
          </h2>
          <p className="text-body-sm text-fg-muted">
            Over 1.5 million engineers graduate every year in India, yet only 18% meet tier-1 corporate standards in container orchestration, microservices, and high-concurrency systems due to delayed university syllabus updates.
          </p>
        </Card>

        <Card className="p-space-lg space-y-space-sm">
          <span className="font-label-mono text-xs text-accent-signal uppercase font-bold block">02. DETERMINISTIC ENGINE</span>
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
            Real-Time Syntactic JD Parsing
          </h2>
          <p className="text-body-sm text-fg-muted">
            Instead of subjective resumes, our engine continuously parses corporate job descriptions, identifies exact percentage deficits across cohorts, and synthesizes 2-to-6 week remediation sprints.
          </p>
        </Card>

        <Card className="p-space-lg space-y-space-sm">
          <span className="font-label-mono text-xs text-status-success uppercase font-bold block">03. MULTI-STAKEHOLDER LOCK</span>
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
            Sovereign Academic-Industry Lock
          </h2>
          <p className="text-body-sm text-fg-muted">
            Students receive cryptographically verified passports; faculty gain funded corporate R&amp;D grants; institutions generate automated NAAC/NIRF compliance tables; enterprises hire with 92%+ retention.
          </p>
        </Card>
      </div>

      <div className="border border-border-strong bg-bg-surface p-space-lg space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm">
          <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
            National Standard Compliance Ledger
          </span>
          <span className="font-label-mono text-xs text-status-success font-semibold">ALL PROTOCOLS VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md font-mono text-xs">
          <div className="p-3 border border-border-hairline bg-bg-subtle">
            <span className="text-fg-muted block uppercase text-[10px]">STANDARD 01</span>
            <span className="font-bold text-fg-primary block text-sm">AICTE 4.2 COMPLIANCE</span>
            <span className="text-status-success text-[11px]">Model Syllabus Aligned</span>
          </div>
          <div className="p-3 border border-border-hairline bg-bg-subtle">
            <span className="text-fg-muted block uppercase text-[10px]">STANDARD 02</span>
            <span className="font-bold text-fg-primary block text-sm">W3C DID SPEC v2.0</span>
            <span className="text-status-success text-[11px]">Verifiable Credentials</span>
          </div>
          <div className="p-3 border border-border-hairline bg-bg-subtle">
            <span className="text-fg-muted block uppercase text-[10px]">STANDARD 03</span>
            <span className="font-bold text-fg-primary block text-sm">NAAC TABLE 5.2</span>
            <span className="text-status-success text-[11px]">Automated Telemetry</span>
          </div>
          <div className="p-3 border border-border-hairline bg-bg-subtle">
            <span className="text-fg-muted block uppercase text-[10px]">STANDARD 04</span>
            <span className="font-bold text-fg-primary block text-sm">SIH-2024 PROTOCOL</span>
            <span className="text-status-success text-[11px]">Smart India Hackathon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
