import React from 'react';
import { Navbar } from '@/components/navigation/navbar';
import Link from 'next/link';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas text-fg-primary">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="border-t border-border-strong bg-bg-surface py-space-xl px-space-lg">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-space-lg text-body-sm">
          <div>
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="w-3 h-3 bg-accent-signal border border-border-strong inline-block" />
              <span className="font-headline-sm font-bold tracking-tight uppercase">SKILLBRIDGE // SIH-2024</span>
            </div>
            <p className="text-fg-muted font-body-sm">
              Smart India Hackathon 2024 National Protocol for Sovereign Skills Verification &amp; Industry-Academia R&amp;D Matching.
            </p>
            <span className="inline-block mt-space-sm font-label-mono text-[10px] text-fg-muted uppercase">
              SPEC: AICTE-UGC COMPLIANT 4.2
            </span>
          </div>
          <div>
            <h4 className="font-label-mono uppercase text-fg-muted mb-space-sm">// NETWORK NODES</h4>
            <ul className="space-y-1.5 font-mono text-xs">
              <li><Link href="/student/dashboard" className="hover:text-accent-signal transition-colors">NODE 01: Student Command Center</Link></li>
              <li><Link href="/academician/dashboard" className="hover:text-accent-signal transition-colors">NODE 02: Academician Portfolio Hub</Link></li>
              <li><Link href="/industry/dashboard" className="hover:text-accent-signal transition-colors">NODE 03: Industry Requisition Hub</Link></li>
              <li><Link href="/institution/dashboard" className="hover:text-accent-signal transition-colors">NODE 04: Institutional Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-mono uppercase text-fg-muted mb-space-sm">// STATUTORY &amp; DOCS</h4>
            <ul className="space-y-1.5 font-mono text-xs">
              <li><Link href="/how-it-works" className="hover:text-accent-signal transition-colors">System Architecture</Link></li>
              <li><Link href="/about" className="hover:text-accent-signal transition-colors">National Skill Ledger</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-signal transition-colors">Cryptographic Verification Policy</Link></li>
              <li><Link href="/contact" className="hover:text-accent-signal transition-colors">Node Operational Dispatch</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-mono uppercase text-fg-muted mb-space-sm">// TELEMETRY PROTOCOL</h4>
            <div className="p-3 border border-border-strong bg-bg-canvas space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-fg-muted">STATUS:</span>
                <span className="text-status-success font-semibold">ALL NODES ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">LATENCY:</span>
                <span className="text-fg-primary">1.24 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">ENCRYPTION:</span>
                <span className="text-fg-primary">SHA-256</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-space-lg pt-space-md border-t border-border-hairline flex flex-col md:flex-row justify-between items-center text-fg-muted font-label-mono text-[11px]">
          <span>© 2024–2026 MINISTRY OF EDUCATION &amp; AICTE // SIH-8042. ALL RIGHTS RESERVED.</span>
          <span>SWISS TYPOGRAPHIC ARCHITECTURE // CADMIUM GRAPHITE</span>
        </div>
      </footer>
    </div>
  );
}
