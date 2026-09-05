'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Academician' | 'Industry' | 'Institution'>('Student');
  const [email, setEmail] = useState('aarav.sharma@iitb.ac.in');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [entropyPercent, setEntropyPercent] = useState(64);
  const [entropyLabel, setEntropyLabel] = useState('STANDARD (128-BIT)');

  const roleMap: Record<string, { label: string; route: string; port: string }> = {
    Student: { label: 'STUDENT NODE', route: '/student/dashboard', port: '8042' },
    Academician: { label: 'ACADEMICIAN NODE', route: '/academician/dashboard', port: '8043' },
    Industry: { label: 'ENTERPRISE NODE', route: '/industry/dashboard', port: '8044' },
    Institution: { label: 'GOVERNANCE NODE', route: '/institution/dashboard', port: '8045' },
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (val.length < 6) {
      setEntropyPercent(25);
      setEntropyLabel('WEAK (32-BIT)');
    } else if (val.length < 10) {
      setEntropyPercent(64);
      setEntropyLabel('STANDARD (128-BIT)');
    } else {
      setEntropyPercent(95);
      setEntropyLabel('CRYPTOGRAPHIC (256-BIT)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const destination = roleMap[selectedRole]?.route || '/student/dashboard';
    router.push(destination);
  };

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-56px)]">
      {/* =============================================================== */}
      {/* LEFT PANE: Editorial & Brand Manifesto (Cols 1-6)               */}
      {/* =============================================================== */}
      <section className="lg:col-span-6 bg-bg-canvas p-space-lg md:p-space-xl lg:p-space-2xl flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-hairline">
        <div>
          <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-xl">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
            <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
              // ACCESS LEVEL 01 : UNIFIED CREDENTIALS
            </span>
          </div>

          <h1 className="hidden lg:block font-display-hero text-display-hero text-fg-primary uppercase tracking-tight mb-space-xl leading-none">
            YOUR SKILLS<br />
            SHOULD OPEN<br />
            <span className="bg-accent-signal text-fg-primary px-2 inline-block border border-border-strong">
              DOORS.
            </span>
          </h1>
          <h1 className="block lg:hidden font-display-hero-mobile text-display-hero-mobile text-fg-primary uppercase tracking-tight mb-space-lg leading-tight">
            YOUR SKILLS<br />
            SHOULD OPEN<br />
            <span className="bg-accent-signal text-fg-primary px-1.5 inline-block border border-border-strong">
              DOORS.
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-fg-secondary max-w-xl mb-space-2xl">
            One sovereign cryptographic identity connecting students, academicians, accredited institutions, and national enterprise partners across 28 Indian states.
          </p>

          {/* Institutional Verification Badges */}
          <div className="border-t border-b border-border-hairline py-space-md space-y-space-sm max-w-lg">
            <div className="flex items-center justify-between font-label-mono text-label-mono">
              <span className="text-fg-muted uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-status-success">check_circle</span>
                SIH-8042 VERIFIED PROTOCOL
              </span>
              <span className="text-fg-primary font-semibold tabular-nums">SHA-256</span>
            </div>
            <div className="flex items-center justify-between font-label-mono text-label-mono border-t border-border-hairline pt-space-xs">
              <span className="text-fg-muted uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-status-success">check_circle</span>
                AICTE &amp; UGC ACCREDITATION COMPLIANT
              </span>
              <span className="text-fg-primary font-semibold">STANDARD 4.2</span>
            </div>
            <div className="flex items-center justify-between font-label-mono text-label-mono border-t border-border-hairline pt-space-xs">
              <span className="text-fg-muted uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-status-success">check_circle</span>
                MULTI-ROLE ARBITRATION MATRIX
              </span>
              <span className="text-fg-primary font-semibold">SYNCHRONIZED</span>
            </div>
          </div>
        </div>

        {/* Bottom Role Nodes Preview */}
        <div className="mt-space-2xl pt-space-xl border-t border-border-hairline">
          <div className="font-label-mono text-label-mono text-fg-muted uppercase mb-space-sm">
            // ACCREDITED NETWORK NODES
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-xs">
            <div className="p-space-sm border border-border-hairline bg-bg-surface">
              <div className="font-label-mono text-[10px] text-fg-muted tabular-nums">[01]</div>
              <div className="font-headline-sm text-[13px] text-fg-primary mt-1">Student Node</div>
            </div>
            <div className="p-space-sm border border-border-hairline bg-bg-surface">
              <div className="font-label-mono text-[10px] text-fg-muted tabular-nums">[02]</div>
              <div className="font-headline-sm text-[13px] text-fg-primary mt-1">Academician</div>
            </div>
            <div className="p-space-sm border border-border-hairline bg-bg-surface">
              <div className="font-label-mono text-[10px] text-fg-muted tabular-nums">[03]</div>
              <div className="font-headline-sm text-[13px] text-fg-primary mt-1">Industry Node</div>
            </div>
            <div className="p-space-sm border border-border-hairline bg-bg-surface">
              <div className="font-label-mono text-[10px] text-fg-muted tabular-nums">[04]</div>
              <div className="font-headline-sm text-[13px] text-fg-primary mt-1">Institution</div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* RIGHT PANE: Swiss Authentication Panel (Cols 7-12)              */}
      {/* =============================================================== */}
      <section className="lg:col-span-6 bg-bg-surface p-space-md md:p-space-xl lg:p-space-2xl flex flex-col justify-center items-center">
        <div className="w-full max-w-[480px]">
          {/* Header Monogram & Sub-header */}
          <div className="border-b border-border-hairline pb-space-md mb-space-lg flex justify-between items-end">
            <div>
              <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-wider block mb-1">
                IDENTITY ARBITRATION DOCKET
              </span>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase tracking-tight">
                {activeTab === 'login' ? 'SECURE NODE LOGIN' : 'NODE REGISTRATION'}
              </h2>
            </div>
            <span className="font-label-mono text-label-mono text-fg-muted border border-border-hairline px-2 py-0.5 bg-bg-subtle">
              PORT: {roleMap[selectedRole]?.port}
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 border border-border-hairline mb-space-lg">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-2.5 text-center font-headline-sm text-[14px] uppercase transition-colors duration-150 ${
                activeTab === 'login'
                  ? 'bg-fg-primary text-bg-surface border-b-2 border-accent-signal font-bold'
                  : 'text-fg-muted bg-bg-canvas hover:text-fg-primary hover:bg-bg-subtle'
              }`}
            >
              [ SECURE LOGIN ]
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`py-2.5 text-center font-headline-sm text-[14px] uppercase transition-colors duration-150 ${
                activeTab === 'register'
                  ? 'bg-fg-primary text-bg-surface border-b-2 border-accent-signal font-bold'
                  : 'text-fg-muted bg-bg-canvas hover:text-fg-primary hover:bg-bg-subtle'
              }`}
            >
              [ REGISTER NODE ]
            </button>
          </div>

          {/* Role Archetype Selector */}
          <div className="mb-space-lg">
            <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1.5">
              SELECT COLLABORATION ROLE ARCHETYPE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 border border-border-hairline p-1 bg-bg-subtle">
              {(['Student', 'Academician', 'Industry', 'Institution'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`py-2 px-1.5 text-center font-label-mono text-label-mono border transition-colors ${
                    selectedRole === role
                      ? 'border-border-strong bg-fg-primary text-bg-surface font-bold'
                      : 'border-transparent bg-transparent text-fg-secondary hover:bg-bg-surface hover:text-fg-primary'
                  }`}
                >
                  {role === 'Academician' ? 'Academic' : role}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1 px-0.5 font-label-mono text-[10px] text-fg-muted">
              <span>CURRENT ROLE: [ {roleMap[selectedRole]?.label} ]</span>
              <span>VERIFICATION: AUTOMATED</span>
            </div>
          </div>

          {/* Dynamic Form */}
          <form className="space-y-space-md" onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="name">
                  Full Legal Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  required
                  className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="email">
                Institutional / Official Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav.sharma@iitb.ac.in"
                required
                className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-label-mono text-label-mono text-fg-muted uppercase" htmlFor="password">
                  Access Key (Password)
                </label>
                {activeTab === 'login' && (
                  <Link
                    href="/forgot-password"
                    className="font-label-mono text-label-mono text-fg-primary hover:text-accent-signal-hover underline"
                  >
                    Forgot Key?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Cryptographic Entropy Indicator */}
            <div>
              <div className="flex justify-between items-center font-label-mono text-[10px] text-fg-muted mb-1">
                <span>
                  ENTROPY METRIC: <span className="text-fg-primary font-bold">{entropyLabel}</span>
                </span>
                <span className="tabular-nums">{entropyPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-bg-subtle border border-border-hairline overflow-hidden flex">
                <div
                  className="h-full bg-accent-signal transition-all duration-300"
                  style={{ width: `${entropyPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 w-4 h-4 rounded-none border-border-strong text-fg-primary focus:ring-0 bg-bg-surface"
                />
                <span className="font-body-sm text-body-sm text-fg-secondary">
                  Maintain session on secure terminal &amp; comply with SIH-2024 Data Protocol.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-accent-signal hover:bg-accent-signal-hover text-zinc-950 font-headline-sm text-[14px] uppercase tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B] active:opacity-90 transition-all duration-150"
            >
              <span>{activeTab === 'login' ? 'ENTER AUTHENTICATED NODE' : 'REGISTER VERIFIED LEDGER NODE'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => router.push(roleMap[selectedRole]?.route || '/student/dashboard')}
              className="w-full border border-border-strong text-fg-primary py-2.5 font-label-mono text-label-mono hover:bg-bg-subtle transition-colors uppercase flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">fingerprint</span>
              <span>Direct Fast-Track Node Demo</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

