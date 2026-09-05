'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function HowItWorksPage() {
  const steps = [
    {
      num: 'STEP 01',
      title: 'Verifiable Credential Genesis',
      subtitle: 'Sovereign Student Identity & Academic Passport',
      desc: 'Students connect GitHub repositories, academic transcripts, and coding platform profiles. The system computes a cryptographic SHA-256 Merkle root binding verified work to the candidate sovereign DID.',
      tag: 'IDENTITY // W3C COMPLIANT',
      accent: true,
    },
    {
      num: 'STEP 02',
      title: 'Granular Skill Taxonomy Diagnostic',
      subtitle: 'Continuous Benchmarking Against Real Requisitions',
      desc: 'Our deterministic diagnostic engine compares candidate proficiency against live corporate job descriptions (JDs) parsed across top national enterprises, detecting exact percentage deficits.',
      tag: 'DIAGNOSTIC // AICTE 4.2',
      accent: false,
    },
    {
      num: 'STEP 03',
      title: 'Automated Curriculum Bridging',
      subtitle: 'Targeted Remediation Sprints & Lab Modules',
      desc: 'When deficits are identified (e.g. -30% in Container Orchestration), the platform auto-synthesizes targeted sprint modules with interactive terminals and verifiable code milestones.',
      tag: 'PEDAGOGY // ACCELERATION',
      accent: false,
    },
    {
      num: 'STEP 04',
      title: 'Algorithmic Reciprocity Match Engine',
      subtitle: 'Top 5% Candidate Matching Without Resume Inflation',
      desc: 'Enterprises receive mathematically verified candidate dossiers with direct repository proof of work. No inflated resumes, keyword stuffing, or unvetted claims.',
      tag: 'MATCH MATRIX // ATS 99%',
      accent: false,
    },
    {
      num: 'STEP 05',
      title: 'Proctored Assessment Chambers',
      subtitle: 'National Remote Proctoring & Live Interview Execution',
      desc: 'Integrated proctoring chambers with anti-cheat telemetry allow enterprise technical leads and academicians to conduct live systems design and code architecture reviews.',
      tag: 'EXECUTION // ZERO TAMPER',
      accent: false,
    },
    {
      num: 'STEP 06',
      title: 'Institutional Accreditation & National Lock',
      subtitle: 'Automated NAAC, NIRF, and AICTE Compliance Analytics',
      desc: 'Colleges and universities automatically receive cohort placement statistics, curriculum gap alerts, and ready-to-file NAAC Table 5.2 reports without manual paperwork.',
      tag: 'GOVERNANCE // NATIONAL MIS',
      accent: true,
    },
  ];

  return (
    <div className="w-full flex flex-col max-w-[1440px] mx-auto p-space-md lg:p-space-xl space-y-space-xl">
      {/* Header */}
      <div className="border-b border-border-strong pb-space-lg">
        <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-md">
          <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
          <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
            // SIH-8042 PROTOCOL ARCHITECTURE
          </span>
        </div>
        <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight font-extrabold leading-tight">
          How the SkillBridge Protocol Works
        </h1>
        <p className="text-body-lg font-body-lg text-fg-muted max-w-3xl mt-2">
          A six-stage deterministic execution pipeline connecting students, mentors, academia, and enterprise through mathematical skill verification and transparent dockets.
        </p>
      </div>

      {/* 6 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {steps.map((step) => (
          <Card
            key={step.num}
            variant={step.accent ? 'accent' : 'default'}
            className="flex flex-col justify-between h-full p-space-lg hover:shadow-[4px_4px_0px_0px_#18181B] transition-all"
          >
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                <span className="font-label-mono text-xs bg-bg-subtle text-fg-primary px-2 py-0.5 border border-border-hairline font-bold">
                  {step.num}
                </span>
                <span className="font-label-mono text-[10px] text-fg-muted uppercase">
                  {step.tag}
                </span>
              </div>

              <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                {step.title}
              </h2>
              <p className="font-label-mono text-xs text-status-success font-semibold">
                {step.subtitle}
              </p>
              <p className="text-body-sm text-fg-muted">
                {step.desc}
              </p>
            </div>

            <div className="pt-space-md border-t border-border-hairline mt-space-md font-mono text-[11px] text-fg-muted flex justify-between">
              <span>PROTOCOL VERIFIED</span>
              <span className="text-fg-primary font-bold">SHA-256 SEAL</span>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-bg-surface border-2 border-border-strong p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-fg-primary uppercase">
            Ready to Connect to the Sovereign Portal?
          </h2>
          <p className="text-body-md text-fg-muted mt-1">
            Access verified student dossiers, research grants, and accredited institutional analytics.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <Link href="/register">
            <Button variant="signal" size="md">
              Register Sovereign Node
            </Button>
          </Link>
          <Link href="/student/dashboard">
            <Button variant="outline" size="md">
              Explore Demo Ecosystem
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
