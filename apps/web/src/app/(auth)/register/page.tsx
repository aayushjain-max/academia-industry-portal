'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/features/auth/api';

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Academician' | 'Industry' | 'Institution'>('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [entropyPercent, setEntropyPercent] = useState(72);
  const [entropyLabel, setEntropyLabel] = useState('STANDARD (128-BIT)');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const roleMapping: Record<string, 'STUDENT' | 'INDUSTRY' | 'INSTITUTION_ADMIN' | 'ACADEMICIAN'> = {
      Student: 'STUDENT',
      Academician: 'ACADEMICIAN',
      Industry: 'INDUSTRY',
      Institution: 'INSTITUTION_ADMIN',
    };
    const mappedRole = roleMapping[selectedRole] || 'STUDENT';
    const destination = roleMap[selectedRole]?.route || '/student/dashboard';

    try {
      await registerUser({
        email,
        password,
        first_name: name.split(' ')[0] || 'User',
        last_name: name.split(' ').slice(1).join(' ') || '',
        role: mappedRole,
      });
      router.push(destination);
    } catch (err: any) {
      const msg = err?.message || 'Registration failed. Please check your information.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-56px)]">
      {/* LEFT PANE: Editorial & Brand Manifesto */}
      <section className="lg:col-span-6 bg-bg-canvas p-space-lg md:p-space-xl lg:p-space-2xl flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-hairline">
        <div>
          <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-xl">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
            <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
              // ACCESS LEVEL 01 : UNIFIED CREDENTIALS
            </span>
          </div>

          <h1 className="font-display-hero text-display-hero text-fg-primary uppercase tracking-tight mb-space-xl leading-none">
            YOUR SKILLS<br />
            SHOULD OPEN<br />
            <span className="bg-accent-signal text-fg-primary px-2 inline-block border border-border-strong">
              DOORS.
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-fg-secondary max-w-xl mb-space-2xl">
            One sovereign cryptographic identity connecting students, academicians, accredited institutions, and national enterprise partners across 28 Indian states.
          </p>

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
          </div>
        </div>

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

      {/* RIGHT PANE: Registration Panel */}
      <section className="lg:col-span-6 bg-bg-surface p-space-md md:p-space-xl lg:p-space-2xl flex flex-col justify-center items-center">
        <div className="w-full max-w-[480px]">
          <div className="border-b border-border-hairline pb-space-md mb-space-lg flex justify-between items-end">
            <div>
              <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-wider block mb-1">
                IDENTITY ARBITRATION DOCKET
              </span>
              <h2 className="font-headline-md text-headline-md text-fg-primary uppercase tracking-tight">
                NODE REGISTRATION
              </h2>
            </div>
            <span className="font-label-mono text-label-mono text-fg-muted border border-border-hairline px-2 py-0.5 bg-bg-subtle">
              PORT: {roleMap[selectedRole]?.port}
            </span>
          </div>

          <div className="grid grid-cols-2 border border-border-hairline mb-space-lg">
            <Link
              href="/login"
              className="py-2.5 text-center font-headline-sm text-[14px] uppercase text-fg-muted bg-bg-canvas hover:text-fg-primary hover:bg-bg-subtle transition-colors duration-150"
            >
              [ SECURE LOGIN ]
            </Link>
            <div className="py-2.5 text-center font-headline-sm text-[14px] uppercase bg-fg-primary text-bg-surface border-b-2 border-accent-signal font-bold">
              [ REGISTER NODE ]
            </div>
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

          <form className="space-y-space-md" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="reg-name">
                Full Legal Name
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. / Er. / Prof. Legal Name"
                required
                className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="reg-email">
                Institutional / Official Email
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@institution.ac.in"
                required
                className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="reg-password">
                  Master Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="reg-confirm">
                  Confirm Password
                </label>
                <input
                  id="reg-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-bg-surface border border-border-hairline rounded-none px-3.5 py-2.5 text-fg-primary font-body-md focus:border-border-strong focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
            </div>

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
                  I agree to the National Academic Data Governance &amp; SIH-2024 protocol mandates.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-label-mono uppercase">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-signal hover:bg-accent-signal-hover disabled:opacity-50 text-zinc-950 font-headline-sm text-[14px] uppercase tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B] active:opacity-90 transition-all duration-150"
            >
              <span>{isLoading ? 'REGISTERING...' : 'REGISTER VERIFIED LEDGER NODE'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-hairline" />
              </div>
              <div className="relative flex justify-center font-label-mono text-[10px] uppercase">
                <span className="bg-bg-surface px-2 text-fg-muted font-bold">FAST-TRACK ONBOARDING</span>
              </div>
            </div>

            {/* Google Sign-in Button */}
            <button
              type="button"
              onClick={() => router.push(roleMap[selectedRole]?.route || '/student/dashboard')}
              className="w-full border-2 border-border-strong bg-bg-surface text-fg-primary py-2.5 px-4 font-label-mono text-label-mono hover:bg-bg-subtle transition-all uppercase flex items-center justify-center gap-2.5 font-bold shadow-[2px_2px_0px_0px_#18181B]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>REGISTER WITH GOOGLE</span>
            </button>

            {/* DigiLocker Button */}
            <button
              type="button"
              onClick={() => router.push(roleMap[selectedRole]?.route || '/student/dashboard')}
              className="w-full border-2 border-border-strong bg-bg-surface text-fg-primary py-2.5 px-4 font-label-mono text-label-mono hover:bg-bg-subtle transition-all uppercase flex items-center justify-center gap-2 font-bold shadow-[2px_2px_0px_0px_#18181B]"
            >
              <span className="material-symbols-outlined text-status-success text-[18px]">verified</span>
              <span>REGISTER WITH DIGILOCKER / ABC ID</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

