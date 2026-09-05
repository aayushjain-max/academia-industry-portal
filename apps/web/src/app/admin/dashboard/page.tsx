'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@portal/ui';
import { ShieldAlert, CheckCircle2, AlertTriangle, Building2, Users, FileCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const institutions = [
    {
      code: 'INST-IITB-01',
      name: 'Indian Institute of Technology Bombay',
      students: 4250,
      compliance: '99.2%',
      status: 'TIER-1 ACCREDITED',
      auditBand: 'A++',
      deviation: 'None (Clean)',
    },
    {
      code: 'INST-IIITH-04',
      name: 'IIIT Hyderabad Autonomous Node',
      students: 2100,
      compliance: '96.8%',
      status: 'TIER-1 ACCREDITED',
      auditBand: 'A++',
      deviation: 'Minor (-4h DevOps lab)',
    },
    {
      code: 'INST-NITK-12',
      name: 'National Institute of Technology Karnataka',
      students: 3800,
      compliance: '94.1%',
      status: 'TIER-1 ACCREDITED',
      auditBand: 'A+',
      deviation: 'Curriculum deficit in K8s',
    },
    {
      code: 'INST-COEP-09',
      name: 'COEP Technological University',
      students: 2900,
      compliance: '88.5%',
      status: 'AUDIT PENDING',
      auditBand: 'A',
      deviation: 'AICTE Lab Audit due',
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl space-y-space-lg">
      {/* Toast Alert */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-bold text-accent-signal">ADMIN DISPATCH:</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-border-strong pb-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted uppercase">
            <span className="w-2 h-2 bg-status-danger border border-border-strong" />
            <span>APEX GOVERNANCE COMMAND // MINISTRY OF EDUCATION &amp; AICTE</span>
            <span>•</span>
            <span className="text-status-success font-semibold">ALL SOVEREIGN NODES ONLINE</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg uppercase font-extrabold text-fg-primary tracking-tight mt-1">
            National Administrative Oversight &amp; Audit Command
          </h1>
          <p className="font-body-md text-fg-muted mt-1 max-w-3xl">
            Sovereign verification telemetry monitoring 140,000+ student credentials, 2,400+ corporate hiring dockets, and 850+ accredited institutions across India.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => triggerNotice('Automated national compliance audit dispatched across all 850 accredited nodes.')}
            className="font-label-mono text-xs"
          >
            Run National Audit Scan
          </Button>
          <Button
            variant="signal"
            size="sm"
            onClick={() => triggerNotice('Consolidated AICTE / UGC statutory report exported (PDF/CSV).')}
            className="font-label-mono text-xs font-bold"
          >
            Export Statutory Docket
          </Button>
        </div>
      </div>

      {/* 4 Telemetry KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md font-mono">
        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <div className="flex items-center justify-between text-xs text-fg-muted uppercase">
            <span>Verified Students</span>
            <Users size={16} />
          </div>
          <div>
            <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">142,850</span>
            <span className="font-label-mono text-[10px] text-status-success block mt-0.5">28 Indian States</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <div className="flex items-center justify-between text-xs text-fg-muted uppercase">
            <span>Corporate Partners</span>
            <Building2 size={16} />
          </div>
          <div>
            <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">2,410</span>
            <span className="font-label-mono text-[10px] text-fg-secondary block mt-0.5">Active MoUs &amp; Grants</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <div className="flex items-center justify-between text-xs text-fg-muted uppercase">
            <span>Accredited Institutions</span>
            <FileCheck size={16} />
          </div>
          <div>
            <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">854</span>
            <span className="font-label-mono text-[10px] text-status-success block mt-0.5">AICTE Standard 4.2</span>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col justify-between h-32">
          <div className="flex items-center justify-between text-xs text-fg-muted uppercase">
            <span>National Verification Rate</span>
            <CheckCircle2 size={16} className="text-status-success" />
          </div>
          <div>
            <span className="font-metric-tabular text-3xl font-bold text-status-success tnum">98.4%</span>
            <span className="font-label-mono text-[10px] text-fg-muted block mt-0.5">Merkle Root Validated</span>
          </div>
        </div>
      </div>

      {/* Anomaly & Threat Detection Alert */}
      <div className="bg-bg-surface border-2 border-status-danger p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 bg-red-100 text-status-danger flex items-center justify-center font-bold border border-status-danger shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-0.5">
            <span className="font-label-mono text-[10px] text-status-danger font-bold uppercase tracking-wider block">
              SECURITY HEURISTIC ANOMALY DETECTED // HIGH PRIORITY
            </span>
            <h2 className="font-headline-sm text-sm font-bold text-fg-primary">
              Suspicious Credential Velocity on Unaffiliated Sub-Node (IP: 103.22.81.4)
            </h2>
            <p className="font-body-sm text-xs text-fg-muted">
              42 candidate credentials claimed in under 90 seconds without verified proctor video telemetry. Node quarantined pending AICTE review.
            </p>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => triggerNotice('Node #UNAF-4028 frozen. Investigation docket dispatched to statutory cyber cell.')}
          className="font-label-mono text-xs font-bold shrink-0"
        >
          Freeze Node &amp; Invalidate
        </Button>
      </div>

      {/* Institutional Compliance Table */}
      <div className="bg-bg-surface border border-border-strong p-space-md space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <div>
            <span className="font-label-mono text-xs font-bold uppercase text-fg-primary block">
              Accredited Institution Compliance Ledger
            </span>
            <span className="font-body-sm text-xs text-fg-muted">
              Real-time audit status, AICTE model curriculum compliance, and NAAC accreditation tier
            </span>
          </div>
          <span className="font-label-mono text-xs text-fg-muted">CYCLE: 2024-Q4</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-border-hairline text-left text-fg-muted text-[10px] uppercase">
                <th className="py-2.5 px-3">Institution Name</th>
                <th className="py-2.5 px-3">Enrolled Scholars</th>
                <th className="py-2.5 px-3 text-right">Compliance Rate</th>
                <th className="py-2.5 px-3 text-center">NAAC Grade</th>
                <th className="py-2.5 px-3">Curriculum Deviation</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline font-body-sm text-xs">
              {institutions.map((inst) => (
                <tr key={inst.code} className="hover:bg-bg-subtle transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-fg-primary">{inst.name}</div>
                    <div className="font-mono text-[10px] text-fg-muted">{inst.code}</div>
                  </td>
                  <td className="py-3 px-3 font-mono">{inst.students.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-fg-primary">{inst.compliance}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-1.5 py-0.5 bg-bg-subtle border border-border-hairline font-mono font-bold">
                      {inst.auditBand}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-fg-secondary text-xs">{inst.deviation}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge variant={inst.status.includes('ACCREDITED') ? 'success' : 'warning'}>
                      {inst.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
