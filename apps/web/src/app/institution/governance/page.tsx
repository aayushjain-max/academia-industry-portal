'use client';

import React, { useState } from 'react';

interface VerificationClaim {
  id: string;
  name: string;
  studentId: string;
  dept: string;
  semester: string;
  gpa: string;
  docketId: string;
  ingestedTime: string;
  credentialTitle: string;
  issuer: string;
  verificationUrl?: string;
  fileName?: string;
  hash: string;
  consensus: string;
  status: 'pending' | 'approved' | 'rejected';
  tag: string;
  tagType: 'urgent' | 'research' | 'patent' | 'mou';
  confidence: string;
}

export default function InstitutionGovernancePage() {
  const [activeTab, setActiveTab] = useState<'verification' | 'users' | 'opportunities' | 'archive'>('verification');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [inspectDrawerClaim, setInspectDrawerClaim] = useState<VerificationClaim | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const [claims, setClaims] = useState<VerificationClaim[]>([
    {
      id: 'claim-1',
      name: 'Aarav Sharma',
      studentId: 'STU-8821',
      dept: 'B.Tech Computer Science',
      semester: 'Semester VI',
      gpa: 'GPA: 9.32 // CGPA Ledger #48209',
      docketId: 'DOC-AWS-99214',
      ingestedTime: '14 MINS AGO',
      credentialTitle: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services Training & Certification',
      verificationUrl: 'aws.amazon.com/verification',
      hash: '98c39e0cf558832a893457a126788e9942a',
      consensus: '1 DEAN SIGNATURE',
      status: 'pending',
      tag: 'URGENT AUDIT',
      tagType: 'urgent',
      confidence: '99.4% (CRYPTOGRAPHIC WEB PROOF ATTESTED)',
    },
    {
      id: 'claim-2',
      name: 'Priya Venkatesh',
      studentId: 'STU-9042',
      dept: 'B.Tech Aerospace & Embedded Systems',
      semester: 'Sem VIII',
      gpa: 'SIH Problem Statement Finalist #PS-094',
      docketId: 'DOC-ISRO-SAC-8812',
      ingestedTime: '2 HOURS AGO',
      credentialTitle: 'ISRO Space Applications Centre — 10-Day Micro-Internship Sprint',
      issuer: 'ISRO Space Applications Centre',
      fileName: 'Signed_Log_ISRO_SAC_Signed.pdf (4.8 MB)',
      hash: 'd847fe109c044bcfa8b919321',
      consensus: 'DR. K. ANANTH (ISRO SAC)',
      status: 'pending',
      tag: 'RESEARCH LOG AUDIT',
      tagType: 'research',
      confidence: '98.1% (MENTOR COUNTERSIGNED)',
    },
    {
      id: 'claim-3',
      name: 'Prof. Manas Banerjee',
      studentId: 'FAC-0192',
      dept: 'Electrical Engineering & Power Systems',
      semester: 'Associate Professor',
      gpa: 'Tenure Code: TEN-EE-2016',
      docketId: 'DOC-PAT-2024-099',
      ingestedTime: '5 HOURS AGO',
      credentialTitle: 'Patent Filing: Solid-State Battery Thermal Management Controller',
      issuer: 'Indian Patent Office // Application #202421008892',
      fileName: 'IPO_First_Examination_Report_Signed.pdf',
      hash: '3f7710c841bbce82937a1a01948d',
      consensus: 'HOD + DEAN R&D DUAL SIGNATURE',
      status: 'pending',
      tag: 'PATENT AUDIT',
      tagType: 'patent',
      confidence: '100% (IPO GAZETTE NOTIFICATION MATCH)',
    },
    {
      id: 'claim-4',
      name: 'Tata Motors Electric Mobility',
      studentId: 'CORP-MOU-048',
      dept: 'Corporate Alliance',
      semester: 'Automotive R&D Division',
      gpa: '₹40L CapEx Equipment Grant',
      docketId: 'DOC-MOU-TM-2024',
      ingestedTime: '1 DAY AGO',
      credentialTitle: 'Industrial Co-Innovation Lab: Battery Management Systems (BMS)',
      issuer: 'Tata Motors Ltd. & Dean Academic Affairs',
      fileName: 'Bilateral_MoU_TM_IITB_Final_Signed.pdf',
      hash: 'ba7229ef40291a0c88b77123',
      consensus: 'DIRECTOR + LEGAL COUNSEL',
      status: 'pending',
      tag: 'CORPORATE MOU',
      tagType: 'mou',
      confidence: 'LEGAL COUNSEL APPROVED',
    },
  ]);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleApprove = (id: string, name: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
    setInspectDrawerClaim(null);
    triggerNotice(`Credential for ${name} has been cryptographically accredited and minted into Student Passport.`);
  };

  const handleReject = (id: string, name: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c))
    );
    setInspectDrawerClaim(null);
    triggerNotice(`Claim for ${name} rejected. Rejection notice dispatched with statutory citation.`);
  };

  const pendingCount = claims.filter((c) => c.status === 'pending').length;

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-bg-surface">
            EVENT DISPATCHED:
          </span>
          <span className="font-body-sm text-body-sm text-surface-container-high">{actionNotice}</span>
        </div>
      )}

      {/* Header Block */}
      <div className="w-full bg-bg-surface border border-border-hairline p-space-md lg:p-space-lg">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md border-b border-border-hairline pb-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 bg-accent-signal" />
              <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-widest">
                // INST-DEL-0842 // SIH ACCREDITATION COUNCIL
              </span>
              <span className="font-label-mono text-label-mono px-1.5 py-0.5 bg-bg-subtle border border-border-hairline text-fg-secondary">
                TIER-1 AUTONOMOUS
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight font-extrabold uppercase">
              Governance, Verification &amp; Access Directory
            </h1>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Central institutional docket clearinghouse. Cryptographic credential notarization, academic-industry compliance, and student access orchestration.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={() => triggerNotice('Running complete institutional compliance checksum across 13,312 active dockets...')}
              className="px-space-md py-2 border border-border-strong bg-bg-surface text-fg-primary font-label-mono text-label-mono uppercase hover:bg-bg-subtle transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">rule</span>Run Institutional Audit
            </button>
            <button
              onClick={() => triggerNotice('Compiling cryptographic SHA-256 ledger export for AICTE/SIH review...')}
              className="px-space-md py-2 border border-border-hairline bg-bg-surface text-fg-primary font-label-mono text-label-mono uppercase hover:bg-bg-subtle transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>Export Accredited Ledger
            </button>
            <button
              onClick={() => triggerNotice('Initiating batch consensus verification for all pending credential claims...')}
              className="px-space-md py-2 bg-primary text-on-primary border border-primary font-label-mono text-label-mono uppercase hover:bg-fg-secondary transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>Bulk Verify Documents
            </button>
          </div>
        </div>

        {/* STAT METRIC GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border-hairline mt-space-md">
          <div className="bg-bg-surface p-space-md">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Students Enrolled</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">12,480</span>
              <span className="font-label-mono text-label-mono text-status-success font-semibold">98.4% ACT</span>
            </div>
            <div className="w-full bg-bg-subtle h-1 mt-2 border border-border-hairline">
              <div className="bg-primary h-1" style={{ width: '98%' }} />
            </div>
          </div>
          <div className="bg-bg-surface p-space-md">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Faculty Verified</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">480</span>
              <span className="font-label-mono text-label-mono text-fg-muted font-semibold">100% SEC</span>
            </div>
            <div className="w-full bg-bg-subtle h-1 mt-2 border border-border-hairline">
              <div className="bg-primary h-1" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="bg-bg-surface p-space-md">
            <span className="font-label-mono text-label-mono uppercase text-fg-muted block">Enterprise Partners</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-metric-tabular text-metric-tabular text-fg-primary font-bold">340</span>
              <span className="font-label-mono text-label-mono text-status-success font-semibold">+14 MoM</span>
            </div>
            <div className="w-full bg-bg-subtle h-1 mt-2 border border-border-hairline">
              <div className="bg-primary h-1" style={{ width: '74%' }} />
            </div>
          </div>
          <div className="bg-bg-surface p-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-label-mono uppercase text-accent-signal font-semibold">Pending Audits</span>
              <span className="w-2 h-2 rounded-full bg-accent-signal animate-pulse" />
            </div>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-metric-tabular text-metric-tabular text-accent-signal font-bold">{pendingCount}</span>
              <span className="font-label-mono text-label-mono text-accent-signal font-semibold">CRITICAL</span>
            </div>
            <div className="w-full bg-bg-subtle h-1 mt-2 border border-border-hairline">
              <div className="bg-accent-signal h-1" style={{ width: `${(pendingCount / 4) * 100}%` }} />
            </div>
          </div>
          <div className="bg-bg-surface p-space-md col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-label-mono uppercase text-status-warning font-semibold">Clearances</span>
              <span className="w-2 h-2 rounded-full bg-status-warning" />
            </div>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-metric-tabular text-metric-tabular text-status-warning font-bold">07</span>
              <span className="font-label-mono text-label-mono text-fg-muted">IN QUEUE</span>
            </div>
            <div className="w-full bg-bg-subtle h-1 mt-2 border border-border-hairline">
              <div className="bg-status-warning h-1" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border border-border-hairline bg-bg-surface">
        <nav className="flex flex-wrap gap-px bg-border-hairline">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'verification'
                ? 'bg-bg-surface text-fg-primary border-b-2 border-border-strong font-bold'
                : 'bg-bg-canvas text-fg-muted hover:text-fg-primary hover:bg-bg-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-accent-signal" />
            01. Verification &amp; Credential Audit
            <span className="ml-1 px-1.5 py-0.5 bg-bg-subtle border border-border-hairline text-[10px]">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-bg-surface text-fg-primary border-b-2 border-border-strong font-bold'
                : 'bg-bg-canvas text-fg-muted hover:text-fg-primary hover:bg-bg-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-fg-muted opacity-40" />
            02. User Management &amp; Access
            <span className="ml-1 px-1.5 py-0.5 bg-bg-subtle border border-border-hairline text-[10px]">13,312</span>
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'opportunities'
                ? 'bg-bg-surface text-fg-primary border-b-2 border-border-strong font-bold'
                : 'bg-bg-canvas text-fg-muted hover:text-fg-primary hover:bg-bg-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-status-warning" />
            03. Opportunity Governance
            <span className="ml-1 px-1.5 py-0.5 bg-bg-subtle border border-border-hairline text-[10px]">07 PEND</span>
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-space-md py-3 font-label-mono text-label-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'archive'
                ? 'bg-bg-surface text-fg-primary border-b-2 border-border-strong font-bold'
                : 'bg-bg-canvas text-fg-muted hover:text-fg-primary hover:bg-bg-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-fg-muted" />
            04. Repository &amp; Document Archive
          </button>
        </nav>
      </div>

      {/* TAB 01: VERIFICATION & CREDENTIAL AUDIT */}
      {activeTab === 'verification' && (
        <div className="space-y-space-md">
          {/* Sub-bar and Filters */}
          <div className="bg-bg-surface border border-border-hairline p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label-mono text-label-mono text-fg-muted uppercase mr-2">Docket Stream:</span>
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 font-label-mono text-label-mono uppercase ${
                  filterCategory === 'all'
                    ? 'bg-primary text-on-primary'
                    : 'bg-bg-subtle text-fg-secondary hover:bg-border-hairline'
                }`}
              >
                All Claims ({claims.length})
              </button>
              <button
                onClick={() => setFilterCategory('certificates')}
                className={`px-2.5 py-1 font-label-mono text-label-mono uppercase ${
                  filterCategory === 'certificates'
                    ? 'bg-primary text-on-primary'
                    : 'bg-bg-subtle text-fg-secondary hover:bg-border-hairline'
                }`}
              >
                Certificates (01)
              </button>
              <button
                onClick={() => setFilterCategory('internships')}
                className={`px-2.5 py-1 font-label-mono text-label-mono uppercase ${
                  filterCategory === 'internships'
                    ? 'bg-primary text-on-primary'
                    : 'bg-bg-subtle text-fg-secondary hover:bg-border-hairline'
                }`}
              >
                Internships (01)
              </button>
              <button
                onClick={() => setFilterCategory('faculty')}
                className={`px-2.5 py-1 font-label-mono text-label-mono uppercase ${
                  filterCategory === 'faculty'
                    ? 'bg-primary text-on-primary'
                    : 'bg-bg-subtle text-fg-secondary hover:bg-border-hairline'
                }`}
              >
                Faculty Pubs (01)
              </button>
              <button
                onClick={() => setFilterCategory('mou')}
                className={`px-2.5 py-1 font-label-mono text-label-mono uppercase ${
                  filterCategory === 'mou'
                    ? 'bg-primary text-on-primary'
                    : 'bg-bg-subtle text-fg-secondary hover:bg-border-hairline'
                }`}
              >
                Corporate MoUs (01)
              </button>
            </div>

            <div className="flex items-center gap-space-xs">
              <div className="flex items-center bg-bg-subtle border border-border-hairline px-2 py-1">
                <span className="material-symbols-outlined text-[16px] text-fg-muted mr-1">filter_list</span>
                <select className="bg-transparent font-label-mono text-label-mono text-fg-primary outline-none cursor-pointer">
                  <option>Priority: Critical Verification First</option>
                  <option>Timestamp: Newest Inbound</option>
                  <option>Department: Computer Science</option>
                  <option>Department: Aerospace &amp; Robotics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Verification Cards */}
          <div className="grid grid-cols-1 gap-space-md">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className={`bg-bg-surface border p-space-md lg:p-space-lg transition-all ${
                  claim.status === 'approved'
                    ? 'border-status-success/50 bg-status-success/5'
                    : claim.status === 'rejected'
                    ? 'border-status-danger/40 opacity-60'
                    : 'border-border-hairline hover:border-border-strong'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-border-hairline pb-space-sm gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span
                      className={`font-label-mono text-label-mono px-2 py-0.5 border font-semibold ${
                        claim.tagType === 'urgent'
                          ? 'bg-accent-signal/10 text-accent-signal border-accent-signal/30'
                          : claim.tagType === 'research'
                          ? 'bg-status-warning/10 text-status-warning border-status-warning/30'
                          : claim.tagType === 'patent'
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-bg-subtle text-fg-primary border-border-hairline font-bold'
                      }`}
                    >
                      {claim.tag}
                    </span>
                    <span className="font-label-mono text-label-mono text-fg-muted">DOCKET // {claim.docketId}</span>
                    <span className="font-label-mono text-label-mono text-fg-muted">INGESTED: {claim.ingestedTime}</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-fg-muted">
                    CONSENSUS REQUIREMENT: {claim.consensus}
                  </span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md py-space-md items-start">
                  <div className="xl:col-span-4 flex items-start gap-space-sm">
                    <div className="w-10 h-10 bg-bg-subtle border border-border-hairline flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-fg-secondary">school</span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-sm text-headline-sm text-fg-primary font-bold">{claim.name}</span>
                        <span className="font-label-mono text-label-mono text-fg-muted">{claim.studentId}</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-fg-muted block">
                        {claim.dept} // {claim.semester}
                      </span>
                      <span className="font-label-mono text-label-mono text-fg-secondary">{claim.gpa}</span>
                    </div>
                  </div>

                  <div className="xl:col-span-5 space-y-1">
                    <span className="font-label-mono text-label-mono text-fg-muted uppercase">Claimed Credential</span>
                    <div className="font-body-lg text-body-lg text-fg-primary font-semibold">
                      {claim.credentialTitle}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 pt-1">
                      {claim.verificationUrl && (
                        <div className="flex items-center gap-1 font-label-mono text-label-mono text-fg-muted">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span className="underline">{claim.verificationUrl}</span>
                        </div>
                      )}
                      {claim.fileName && (
                        <div className="flex items-center gap-1 font-label-mono text-label-mono text-fg-muted">
                          <span className="material-symbols-outlined text-[14px]">attach_file</span>
                          <span>{claim.fileName}</span>
                        </div>
                      )}
                      <span className="font-label-mono text-label-mono text-status-success flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                        SHA-256 VALIDATED
                      </span>
                    </div>
                  </div>

                  <div className="xl:col-span-3 flex flex-col justify-end space-y-2">
                    {claim.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => setInspectDrawerClaim(claim)}
                          className="w-full py-2 px-space-sm bg-primary text-on-primary font-label-mono text-label-mono uppercase hover:bg-fg-secondary transition-colors text-center font-semibold"
                        >
                          Inspect &amp; Mint Passport
                        </button>
                        <div className="flex items-center gap-space-xs">
                          <button
                            onClick={() => handleApprove(claim.id, claim.name)}
                            className="w-1/2 py-1.5 border border-border-strong text-fg-primary hover:bg-bg-subtle font-label-mono text-label-mono uppercase text-center font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(claim.id, claim.name)}
                            className="w-1/2 py-1.5 border border-status-danger/30 text-status-danger hover:bg-status-danger/10 font-label-mono text-label-mono uppercase text-center font-semibold"
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    ) : claim.status === 'approved' ? (
                      <div className="p-2 border border-status-success bg-status-success/10 text-center font-label-mono text-label-mono text-status-success font-bold">
                        ✓ ACCREDITED &amp; SEALED
                      </div>
                    ) : (
                      <div className="p-2 border border-status-danger bg-status-danger/10 text-center font-label-mono text-label-mono text-status-danger font-bold">
                        ✕ REJECTED &amp; FILED
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-border-hairline pt-space-xs flex flex-wrap items-center justify-between text-fg-muted font-label-mono text-label-mono">
                  <span>AI VALIDATION CONFIDENCE: {claim.confidence}</span>
                  <span>SUBMITTED VIA STUDENT PASSPORT CLIENT v2.4</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 02: USER MANAGEMENT & ACCESS */}
      {activeTab === 'users' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-border-hairline pb-space-sm">
            <div>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
                Institutional User Directory &amp; Role Governance
              </h2>
              <p className="font-body-sm text-body-sm text-fg-muted">
                13,312 Verified Scholars, 480 Tenured Faculty, and 340 Enterprise Partner Accounts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by Roll No, UID, Email..."
                className="bg-bg-subtle border border-border-hairline px-3 py-1.5 text-sm outline-none"
              />
              <button
                onClick={() => triggerNotice('Exporting complete institutional user matrix...')}
                className="px-3 py-1.5 bg-primary text-on-primary font-label-mono text-label-mono uppercase font-bold"
              >
                Export Matrix
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border-hairline text-left font-label-mono text-label-mono text-fg-muted uppercase">
                <th className="py-2.5 px-3">Identity / Scholar</th>
                <th className="py-2.5 px-3">Role Node</th>
                <th className="py-2.5 px-3">Department / Org</th>
                <th className="py-2.5 px-3">Passports Minted</th>
                <th className="py-2.5 px-3 text-center">KYC Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline font-body-sm text-body-sm">
              <tr className="hover:bg-bg-subtle transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-fg-primary">Aarav Sharma</div>
                  <div className="font-label-mono text-[10px] text-fg-muted">STU-8821 // aarav.s@iitb.ac.in</div>
                </td>
                <td className="py-3 px-3">
                  <span className="font-label-mono text-xs px-2 py-0.5 bg-bg-subtle border border-border-hairline">
                    STUDENT [NODE 01]
                  </span>
                </td>
                <td className="py-3 px-3 text-fg-secondary">Computer Science &amp; Eng</td>
                <td className="py-3 px-3 font-mono font-bold">14 Credentials</td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 font-label-mono text-[10px] bg-status-success/10 text-status-success border border-status-success/30 font-bold">
                    VERIFIED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-bg-subtle transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-fg-primary">Dr. V. Ramanathan</div>
                  <div className="font-label-mono text-[10px] text-fg-muted">FAC-0012 // ramanathan@iitb.ac.in</div>
                </td>
                <td className="py-3 px-3">
                  <span className="font-label-mono text-xs px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">
                    FACULTY HOD [NODE 02]
                  </span>
                </td>
                <td className="py-3 px-3 text-fg-secondary">Distributed Systems Lab</td>
                <td className="py-3 px-3 font-mono font-bold">28 Publications</td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 font-label-mono text-[10px] bg-status-success/10 text-status-success border border-status-success/30 font-bold">
                    TENURED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-bg-subtle transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-fg-primary">TechNova Labs Recruiter Core</div>
                  <div className="font-label-mono text-[10px] text-fg-muted">CORP-REC-088 // partner@technova.io</div>
                </td>
                <td className="py-3 px-3">
                  <span className="font-label-mono text-xs px-2 py-0.5 bg-bg-subtle border border-border-hairline">
                    INDUSTRY PARTNER [NODE 03]
                  </span>
                </td>
                <td className="py-3 px-3 text-fg-secondary">Technova Engineering Div</td>
                <td className="py-3 px-3 font-mono font-bold">24 Open Requisitions</td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 font-label-mono text-[10px] bg-bg-subtle text-fg-primary border border-border-hairline font-bold">
                    MOU ACTIVE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 03: OPPORTUNITY GOVERNANCE */}
      {activeTab === 'opportunities' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="border-b border-border-hairline pb-space-sm">
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
              Campus Placement Clearances &amp; Employer Vetting
            </h2>
            <p className="font-body-sm text-body-sm text-fg-muted">
              07 Corporate Job Requisitions &amp; Sabbatical Grants pending Dean review
            </p>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-bg-subtle border border-border-hairline flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-label-mono text-xs px-2 py-0.5 bg-accent-signal text-fg-primary font-bold">
                  URGENT REVIEW
                </span>
                <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary mt-1">
                  Google DeepMind // Research Fellowship (RL Systems)
                </h3>
                <p className="font-body-sm text-body-sm text-fg-muted">
                  Stipend: ₹1.2L/month // 6 Fellows // AICTE National Internship Scheme Code: AIS-2024-GM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerNotice('Google DeepMind requisition approved for student visibility.')}
                  className="px-4 py-2 bg-primary text-on-primary font-label-mono text-label-mono uppercase font-bold"
                >
                  Approve Posting
                </button>
                <button
                  onClick={() => triggerNotice('Clarification requested from employer.')}
                  className="px-4 py-2 bg-bg-surface border border-border-hairline font-label-mono text-label-mono uppercase"
                >
                  Request Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 04: REPOSITORY & DOCUMENT ARCHIVE */}
      {activeTab === 'archive' && (
        <div className="bg-bg-surface border border-border-hairline p-space-lg space-y-space-md">
          <div className="border-b border-border-hairline pb-space-sm">
            <h2 className="font-headline-md text-headline-md text-fg-primary uppercase font-bold">
              Cryptographic Archive &amp; Statutory Repository
            </h2>
            <p className="font-body-sm text-body-sm text-fg-muted">
              Immutable ledger of NAAC, NIRF, and AICTE compliance dockets with SHA-256 verification hashes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">ARCHIVE DOCKET #2024-Q2</span>
              <div className="font-headline-sm text-body-md font-bold text-fg-primary">
                NAAC Self-Study Report (SSR) — Cycle 4 Accreditation
              </div>
              <div className="font-label-mono text-xs text-fg-secondary font-mono">
                HASH: 8fbc102948ca9810efab7721
              </div>
              <button
                onClick={() => triggerNotice('Downloading signed SSR archive...')}
                className="mt-2 px-3 py-1.5 bg-bg-subtle border border-border-hairline font-label-mono text-label-mono uppercase"
              >
                Download Sealed PDF (42 MB)
              </button>
            </div>
            <div className="p-4 border border-border-hairline bg-bg-canvas space-y-2">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase">ARCHIVE DOCKET #2024-Q1</span>
              <div className="font-headline-sm text-body-md font-bold text-fg-primary">
                AICTE Mandatory Disclosure &amp; Industry Partnership Ledger
              </div>
              <div className="font-label-mono text-xs text-fg-secondary font-mono">
                HASH: ba74001928ecaf0019234882
              </div>
              <button
                onClick={() => triggerNotice('Downloading AICTE disclosure docket...')}
                className="mt-2 px-3 py-1.5 bg-bg-subtle border border-border-hairline font-label-mono text-label-mono uppercase"
              >
                Download Sealed PDF (18 MB)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTION DRAWER MODAL */}
      {inspectDrawerClaim && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-2xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-border-hairline pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-accent-signal" />
                <span className="font-label-mono text-label-mono uppercase tracking-wider font-bold">
                  CRYPTOGRAPHIC CREDENTIAL INSPECTION // {inspectDrawerClaim.docketId}
                </span>
              </div>
              <button
                onClick={() => setInspectDrawerClaim(null)}
                className="font-label-mono text-label-mono text-fg-muted hover:text-fg-primary"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm">
              <div className="grid grid-cols-2 gap-2 bg-bg-subtle p-3 border border-border-hairline">
                <div>
                  <span className="font-label-mono text-[10px] text-fg-muted block">STUDENT / APPLICANT:</span>
                  <span className="font-bold text-fg-primary">{inspectDrawerClaim.name} ({inspectDrawerClaim.studentId})</span>
                </div>
                <div>
                  <span className="font-label-mono text-[10px] text-fg-muted block">DEPARTMENT:</span>
                  <span className="font-bold text-fg-primary">{inspectDrawerClaim.dept}</span>
                </div>
              </div>

              <div>
                <span className="font-label-mono text-[10px] text-fg-muted block uppercase">CREDENTIAL CLAIMED:</span>
                <div className="font-headline-sm text-headline-sm font-bold text-fg-primary mt-0.5">
                  {inspectDrawerClaim.credentialTitle}
                </div>
                <div className="font-label-mono text-xs text-fg-secondary mt-1">
                  ISSUER: {inspectDrawerClaim.issuer}
                </div>
              </div>

              <div className="p-3 bg-bg-canvas border border-border-hairline font-label-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-fg-muted">SHA-256 HASH:</span>
                  <span className="text-fg-primary font-mono font-bold">{inspectDrawerClaim.hash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">AI PARSER ATTESTATION:</span>
                  <span className="text-status-success font-bold">CONFIRMED (VALID PUBLIC KEY)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-hairline">
              <button
                onClick={() => setInspectDrawerClaim(null)}
                className="px-4 py-2 border border-border-hairline font-label-mono text-label-mono uppercase"
              >
                Dismiss
              </button>
              <button
                onClick={() => handleReject(inspectDrawerClaim.id, inspectDrawerClaim.name)}
                className="px-4 py-2 border border-status-danger/30 text-status-danger hover:bg-status-danger/10 font-label-mono text-label-mono uppercase font-semibold"
              >
                Reject Claim
              </button>
              <button
                onClick={() => handleApprove(inspectDrawerClaim.id, inspectDrawerClaim.name)}
                className="px-4 py-2 bg-primary text-on-primary hover:bg-fg-secondary font-label-mono text-label-mono uppercase font-bold"
              >
                ✓ Notarize &amp; Mint Passport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

