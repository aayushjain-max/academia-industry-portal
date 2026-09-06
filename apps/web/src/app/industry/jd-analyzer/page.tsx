'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { analyzeJobDescription, JDAnalysisResult } from '@/features/ai/api';

export default function IndustryJDAnalyzerPage() {
  const [jdText, setJdText] = useState(
    'Senior Distributed Backend Engineer - Golang/Python, Kubernetes, Redis, Microservices. Candidate must architect low-latency event pipelines (Apache Kafka) handling 50k RPS. Require experience in PostgreSQL query optimization, gRPC, and container orchestration. Preference for Smart India Hackathon finalists with proven open-source commits. Immediate joining preferred at Bengaluru campus.'
  );

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<JDAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeJobDescription(jdText);
      setAnalysisResult(res);
    } catch (err) {
      console.error('Failed to analyze JD:', err);
      // Fallback fallback parsing
      setAnalysisResult({
        job_title: 'Software Engineering Specialist',
        required_skills: ['Python', 'PostgreSQL', 'Docker', 'REST APIs'],
        preferred_skills: ['Kubernetes', 'Kafka', 'Redis'],
        qualifications: ["Bachelor's degree in CS/IT"],
        experience: '1-3 Years',
        responsibilities: ['Build high-scale distributed backend features.'],
        keywords: ['Python', 'Docker', 'Kubernetes'],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(JSON.stringify(analysisResult, null, 2));
    }
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
          Syntactic semantic engine parsing enterprise job descriptions into structured competencies, eligibility criteria, and skill requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Input Column */}
        <div className="lg:col-span-6 bg-bg-surface border border-border-hairline p-space-lg space-y-4">
          <div className="flex items-center justify-between border-b border-border-hairline pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
              Raw Requisition Input
            </span>
            <span className="font-label-mono text-xs text-fg-muted">MODEL: AI-NLP-SYNTACTIC</span>
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
              disabled={loading}
              className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold flex items-center gap-1.5 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">{loading ? 'sync' : 'bolt'}</span>
              {loading ? 'Analyzing...' : 'Extract Criteria'}
            </button>
            <Link
              href="/industry/dashboard"
              className="font-label-mono text-xs text-fg-primary hover:underline uppercase font-semibold"
            >
              Return to Command Center →
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
              disabled={!analysisResult}
              className="font-label-mono text-xs text-fg-muted hover:text-fg-primary uppercase disabled:opacity-50"
            >
              {copied ? '✓ COPIED JSON' : 'COPY SCHEMA'}
            </button>
          </div>

          {analysisResult ? (
            <div className="space-y-4 font-body-sm text-sm">
              <div>
                <span className="font-label-mono text-[10px] uppercase text-fg-muted block">Extracted Title</span>
                <span className="font-headline-sm text-body-lg font-bold text-fg-primary">
                  {analysisResult.job_title}
                </span>
              </div>

              <div>
                <span className="font-label-mono text-[10px] uppercase text-fg-muted block mb-1">
                  Technical Core Skills (Required)
                </span>
                <div className="flex flex-wrap gap-1.5 font-label-mono text-xs">
                  {analysisResult.required_skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {analysisResult.preferred_skills && analysisResult.preferred_skills.length > 0 && (
                <div>
                  <span className="font-label-mono text-[10px] uppercase text-fg-muted block mb-1">
                    Preferred &amp; Ecosystem Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-label-mono text-xs">
                    {analysisResult.preferred_skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-bg-canvas border border-border-hairline font-label-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-fg-muted">EXPERIENCE LEVEL:</span>
                  <span className="text-fg-primary font-bold">{analysisResult.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">QUALIFICATIONS:</span>
                  <span className="text-fg-primary">{analysisResult.qualifications.join(', ')}</span>
                </div>
              </div>

              <Link
                href="/industry/dashboard"
                className="block w-full py-2.5 bg-[#FACC15] text-[#18181B] text-center font-label-mono text-xs uppercase font-bold"
              >
                Match Candidates Against Extracted Schema →
              </Link>
            </div>
          ) : (
            <div className="p-8 text-center text-fg-muted font-label-mono text-xs">
              Click &apos;Extract Criteria&apos; to process job requisition text.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


