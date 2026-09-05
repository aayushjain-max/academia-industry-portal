'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function IndustryJDAnalyzerPage() {
  const [jdText, setJdText] = useState(
    'Senior Distributed Backend Engineer - Golang/Python, Kubernetes, Redis, Microservices. Candidate must architect low-latency event pipelines (Apache Kafka) handling 50k RPS. Require experience in PostgreSQL query optimization, gRPC, and container orchestration. Preference for Smart India Hackathon finalists with proven open-source commits. Immediate joining preferred at Bengaluru campus.'
  );

  const [analyzed, setAnalyzed] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      <div className="border border-border-hairline bg-bg-surface p-space-md lg:p-space-lg">
        <div className="flex items-center gap-space-xs text-xs font-label-mono text-fg-muted mb-1">
          <span className="w-2 h-2 bg-[#FACC15]" />
          <span>IND-RECRUIT-2024 // AI SKILL EXTRACTION &amp; TAXONOMY ENGINE</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-fg-primary uppercase font-extrabold">
          AI Job Description &amp; Problem Statement Analyzer
        </h1>
        <p className="font-body-md text-body-md text-fg-muted mt-1">
          Syntactic semantic engine parsing enterprise job descriptions into structured competencies, SIH eligibility criteria, and academic curriculum matches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Input Column */}
        <div className="lg:col-span-6 bg-bg-surface border border-border-hairline p-space-lg space-y-4">
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
              Raw Requisition Input
            </span>
            <span className="font-label-mono text-xs text-fg-muted">MODEL: LLM-SYNTACTIC-v4</span>
          </div>

          <textarea
            rows={10}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full bg-bg-subtle border border-border-hairline p-3 font-label-mono text-xs text-fg-primary outline-none focus:border-border-strong resize-none"
            placeholder="Paste raw JD, internship brief, or hackathon problem statement..."
          />

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleAnalyze}
              className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Extract Criteria
            </button>
            <Link
              href="/industry/dashboard"
              className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-semibold"
            >
              Return to Talent Command →
            </Link>
          </div>
        </div>

        {/* Extracted Schema Column */}
        <div className="lg:col-span-6 bg-bg-surface border border-border-hairline p-space-lg space-y-4">
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
              Extracted Taxonomy Matrix
            </span>
            <button
              onClick={handleCopy}
              className="font-label-mono text-xs text-fg-muted hover:text-fg-primary uppercase"
            >
              {copied ? '✓ COPIED JSON' : 'COPY SCHEMA'}
            </button>
          </div>

          {analyzed && (
            <div className="space-y-4 font-body-sm text-sm">
              <div>
                <span className="font-label-mono text-[10px] uppercase text-fg-muted block">Extracted Title</span>
                <span className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  Senior Backend Systems Engineer (Distributed Infra)
                </span>
              </div>

              <div>
                <span className="font-label-mono text-[10px] uppercase text-fg-muted block mb-1">
                  Technical Core Skills (Required)
                </span>
                <div className="flex flex-wrap gap-1.5 font-label-mono text-xs">
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">Python (95%)</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">Golang (90%)</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">PostgreSQL (88%)</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">Kafka / gRPC (85%)</span>
                </div>
              </div>

              <div>
                <span className="font-label-mono text-[10px] uppercase text-fg-muted block mb-1">
                  Cloud &amp; DevOps Prerequisites
                </span>
                <div className="flex flex-wrap gap-1.5 font-label-mono text-xs">
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">Kubernetes &amp; Docker</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">AWS Cloud Infra</span>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">Redis Caching</span>
                </div>
              </div>

              <div className="p-3 bg-bg-canvas border border-border-hairline font-label-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-fg-muted">QUALIFYING CGPA:</span>
                  <span className="text-fg-primary font-bold">≥ 8.0 / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">SPECIAL TRACK:</span>
                  <span className="text-[#D97706] font-bold">Smart India Hackathon Finalist Priority</span>
                </div>
              </div>

              <Link
                href="/industry/dashboard"
                className="block w-full py-2.5 bg-[#FACC15] text-[#18181B] text-center font-label-mono text-xs uppercase font-bold"
              >
                Match Candidates Against Extracted Schema →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

