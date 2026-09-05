'use client';

import React, { useState } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function InstitutionStudentsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const students = [
    {
      id: 'STU-IITB-2021-0842',
      name: 'Aarav Sharma',
      department: 'Computer Science & Engineering',
      batch: '2021-2025 (Final Year)',
      cgpa: 8.92,
      passportStatus: 'SHA-256 VERIFIED',
      passportVariant: 'success' as const,
      placementStatus: 'ROUND 02 INTERVIEW (TECHNOVA)',
      skills: 'Python (90%), SQL (80%), FastAPI (65%)',
      deficit: 'Docker / K8s (-30%)',
    },
    {
      id: 'STU-IITB-2021-0914',
      name: 'Riya Kulkarni',
      department: 'Information Technology',
      batch: '2021-2025 (Final Year)',
      cgpa: 9.15,
      passportStatus: 'SHA-256 VERIFIED',
      passportVariant: 'success' as const,
      placementStatus: 'OFFER ACCEPTED (BARCLAYS - ?18 LPA)',
      skills: 'Golang (88%), Cloud Infra (84%), SQL (85%)',
      deficit: 'None (Full Benchmark)',
    },
    {
      id: 'STU-IITB-2021-1002',
      name: 'Vikramaditya Sen',
      department: 'Electronics & Communication',
      batch: '2021-2025 (Final Year)',
      cgpa: 8.44,
      passportStatus: 'PENDING LAB STAMP',
      passportVariant: 'warning' as const,
      placementStatus: 'APPLICATION IN REVIEW (ISRO)',
      skills: 'C++ (86%), DSP (78%), Embedded (74%)',
      deficit: 'RTOS Concurrency (-20%)',
    },
    {
      id: 'STU-IITB-2021-1189',
      name: 'Ananya Nair',
      department: 'Computer Science & Engineering',
      batch: '2021-2025 (Final Year)',
      cgpa: 9.40,
      passportStatus: 'SHA-256 VERIFIED',
      passportVariant: 'success' as const,
      placementStatus: 'OFFER ACCEPTED (MICROSOFT - ?24 LPA)',
      skills: 'Distributed Systems (94%), C++ (92%), Algorithms (96%)',
      deficit: 'None (Top 1% Benchmark)',
    },
  ];

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchSearch;
    if (filter === 'verified') return matchSearch && s.passportStatus.includes('VERIFIED');
    if (filter === 'placed') return matchSearch && s.placementStatus.includes('OFFER');
    return matchSearch;
  });

  return (
    <NodePageShell
      nodeId="INST-DEL-0842 // INSTITUTION"
      nodeStatus="AUTONOMOUS ACCREDITED"
      category="COHORT ROSTER & VERIFIED CREDENTIAL DIRECTORY"
      title="Cohort Students &amp; Skill Passports"
      description="Administrative directory of student cohorts, real-time cryptographic passport verification statuses, placement pipeline conversions, and departmental curriculum deficit telemetry."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="upload" size={14} className="mr-1" />
            Batch Mint Verified Passports
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="download" size={14} className="mr-1" />
            Export NAAC Accreditation Table 5.2
          </Button>
        </>
      }
      kpis={[
        { label: 'Active Cohort', value: '12,480', delta: 'B.TECH / M.TECH', deltaType: 'neutral', subtext: 'Enrolled Academic Year 2024', icon: 'school' },
        { label: 'Passports Verified', value: '89.4%', delta: 'SHA-256 SEAL', deltaType: 'success', subtext: '11,157 Passports Active', icon: 'verified_user' },
        { label: 'Cohort Placement Rate', value: '84.2%', delta: '+6.1% YoY', deltaType: 'success', subtext: 'Avg CTC: ?14.8 LPA', icon: 'work_history' },
        { label: 'Critical Gap Rate', value: '11.8%', delta: 'IN REMEDIATION', deltaType: 'warning', subtext: 'Containerization / Cloud', icon: 'warning' },
      ]}
    >
      {/* Search and Filters */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'verified', 'placed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={
                'px-3 py-1 font-label-mono text-xs uppercase border transition-colors ' +
                (filter === tab
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary')
              }
            >
              {tab === 'all' ? 'All Students (12,480)' : tab === 'verified' ? 'Sealed Passports' : 'Placed Candidates'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter by student name or branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Icon name="search" size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-bg-surface border border-border-strong overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-strong bg-bg-subtle font-label-mono text-xs text-fg-muted uppercase">
              <th className="p-3">Candidate &amp; ID</th>
              <th className="p-3">Department &amp; Batch</th>
              <th className="p-3">CGPA</th>
              <th className="p-3">Passport Status</th>
              <th className="p-3">Placement Pipeline</th>
              <th className="p-3">Deficit Gap</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-hairline font-body-sm text-sm">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-bg-subtle/50 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-fg-primary block">{s.name}</span>
                  <span className="font-mono text-[11px] text-fg-muted">{s.id}</span>
                </td>
                <td className="p-3">
                  <span className="text-fg-primary block">{s.department}</span>
                  <span className="font-label-mono text-[11px] text-fg-muted">{s.batch}</span>
                </td>
                <td className="p-3 font-metric-tabular font-bold text-fg-primary">
                  {s.cgpa.toFixed(2)}
                </td>
                <td className="p-3">
                  <Badge variant={s.passportVariant}>{s.passportStatus}</Badge>
                </td>
                <td className="p-3 font-label-mono text-xs text-fg-secondary">
                  {s.placementStatus}
                </td>
                <td className="p-3 font-label-mono text-xs text-status-danger font-semibold">
                  {s.deficit}
                </td>
                <td className="p-3 text-right">
                  <Button variant="outline" size="sm">
                    Inspect Passport
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NodePageShell>
  );
}
