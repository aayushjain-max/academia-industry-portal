'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function StudentPortfolioManagementPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyPublicUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portfolio/aarav-sharma`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodePageShell
      nodeId="STU-8042 // PORTFOLIO-LEDGER"
      nodeStatus="PUBLIC SHARING ENABLED"
      category="STUDENT CREDENTIAL PORTFOLIO"
      title="Portfolio Ledger & Builder"
      description="Manage your verified project showcases, verified credentials, and recruiter-facing public URL."
      actions={
        <div className="flex items-center gap-space-xs">
          <Link href="/portfolio/aarav-sharma" target="_blank">
            <Button variant="signal" size="sm">
              <Icon name="open_in_new" size={14} className="mr-1" />
              View Live Public Portfolio
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleCopyPublicUrl}>
            <Icon name={copied ? 'check' : 'content_copy'} size={14} className="mr-1" />
            {copied ? 'Copied to Clipboard!' : 'Copy Shareable URL'}
          </Button>
        </div>
      }
      kpis={[
        { label: 'Public Portfolio', value: 'ACTIVE', delta: 'PUBLIC', deltaType: 'success', subtext: 'Slug: aarav-sharma', icon: 'link' },
        { label: 'Featured Projects', value: '03 WORK', delta: 'VERIFIED', deltaType: 'success', subtext: 'GitHub & Live URLs', icon: 'code' },
        { label: 'Attested Certs', value: '02 BADGES', delta: 'TIER-1', deltaType: 'neutral', subtext: 'Cryptographically Sealed', icon: 'military_tech' },
        { label: 'Profile Views', value: '48 VIEWS', delta: '+18 WK', deltaType: 'success', subtext: 'Recruiter Telemetry', icon: 'visibility' },
      ]}
    >
      {/* Public URL Live Banner */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="space-y-1">
          <span className="font-label-mono text-[10px] text-fg-muted uppercase block">
            PUBLIC RECRUITER DOSSIER URL
          </span>
          <div className="font-mono text-xs font-bold text-fg-primary bg-bg-canvas px-3 py-1.5 border border-border-hairline flex items-center gap-2">
            <span className="material-symbols-outlined text-portal-primary text-[16px]">public</span>
            <span>/portfolio/aarav-sharma</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={handleCopyPublicUrl}>
            <Icon name={copied ? 'check' : 'share'} size={14} className="mr-1" />
            {copied ? 'Copied!' : 'Share With Recruiters'}
          </Button>
          <Link href="/portfolio/aarav-sharma" target="_blank">
            <Button variant="outline" size="sm">
              <Icon name="visibility" size={14} className="mr-1" />
              Preview
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {/* Left 2 Cols: Project Showcases */}
        <div className="lg:col-span-2 space-y-space-md">
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                  Featured Capstone Projects (03)
                </h3>
                <p className="font-body-sm text-fg-muted">
                  Projects showcased on your public dossier with verified GitHub telemetry.
                </p>
              </div>

              <Button variant="signal" size="sm">
                <Icon name="add" size={14} className="mr-1" />
                Add Project
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-headline-sm text-sm font-bold text-fg-primary">
                    Real-time Academia-Industry Telemetry Engine
                  </h4>
                  <Badge variant="signal">FEATURED CAPSTONE</Badge>
                </div>
                <p className="font-sans text-xs text-fg-muted">
                  Distributed synchronization engine connecting university talent dossiers with real-time enterprise job matrices using Next.js App Router and Groq AI.
                </p>
                <div className="flex flex-wrap gap-1 font-label-mono text-[10px] text-fg-secondary">
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#Next.js 15</span>
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#TypeScript</span>
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#PostgreSQL</span>
                </div>
                <div className="pt-2 flex items-center gap-2 font-label-mono text-xs text-fg-muted">
                  <span>GITHUB: <strong className="text-fg-primary">github.com/aarav/telemetry</strong></span>
                  <span>•</span>
                  <span>LIVE: <strong className="text-status-success">telemetry-engine.app</strong></span>
                </div>
              </div>

              <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-headline-sm text-sm font-bold text-fg-primary">
                    High-Throughput Asynchronous Stream Filter
                  </h4>
                  <Badge variant="default">BACKEND SPECIALIZATION</Badge>
                </div>
                <p className="font-sans text-xs text-fg-muted">
                  Zero-copy telemetry ingestion pipeline processing 50,000 sensor frames/second with automated checksum verification.
                </p>
                <div className="flex flex-wrap gap-1 font-label-mono text-[10px] text-fg-secondary">
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#Python</span>
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#AsyncIO</span>
                  <span className="bg-bg-subtle border border-border-hairline px-1.5 py-0.5">#Redis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Verified Accreditations */}
        <div className="space-y-space-md">
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-3">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
              VERIFIED ATTESTATIONS (02)
            </span>

            <div className="space-y-2">
              <div className="p-3 border border-border-hairline bg-bg-canvas space-y-1 font-label-mono text-xs">
                <div className="font-bold text-fg-primary">AICTE Tier-01 Industry Readiness</div>
                <div className="text-[11px] text-fg-muted">Apex Verification Bureau // AUG 2024</div>
                <div className="text-[10px] text-status-success font-semibold flex items-center gap-1 pt-1">
                  <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                  SEALED IN PASSPORT
                </div>
              </div>

              <div className="p-3 border border-border-hairline bg-bg-canvas space-y-1 font-label-mono text-xs">
                <div className="font-bold text-fg-primary">Full-Stack Architect Specialist</div>
                <div className="text-[11px] text-fg-muted">NSDC Verification Council // JUL 2024</div>
                <div className="text-[10px] text-status-success font-semibold flex items-center gap-1 pt-1">
                  <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                  SEALED IN PASSPORT
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-2">
              <Icon name="upload_file" size={14} className="mr-1" />
              Upload New Credential Proof
            </Button>
          </div>
        </div>
      </div>
    </NodePageShell>
  );
}
