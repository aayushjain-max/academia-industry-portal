'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState('+91 98765 43210');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [verified, setVerified] = useState(false);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verify');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => router.push('/student/dashboard'), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-space-md">
      <div className="w-full max-w-md bg-bg-surface border-2 border-border-strong p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
        <div className="border-b border-border-hairline pb-space-sm mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
              MOBILE // AADHAAR ABC BINDING
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-fg-muted">TELECOM-AUTH</span>
        </div>

        {!verified ? (
          <>
            <h1 className="font-headline-md text-headline-sm uppercase tracking-tight text-fg-primary font-bold mb-1">
              Mobile Node Authentication
            </h1>
            <p className="font-body-sm text-body-sm text-fg-muted mb-space-lg">
              Synchronize your official contact number to enable real-time interview dispatch alerts and national hackathon communications.
            </p>

            {step === 'request' ? (
              <form onSubmit={handleRequest} className="space-y-space-md">
                <div>
                  <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1">
                    Mobile Number (India +91)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2.5 text-xs font-mono text-fg-primary focus:outline-none focus:ring-1 focus:ring-fg-primary"
                  />
                </div>

                <div className="p-3 bg-bg-subtle border border-border-hairline font-label-mono text-[11px] text-fg-secondary">
                  Govt of India AICTE Standard requires a 2-factor verified channel for proctored online interview rooms.
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-signal hover:bg-accent-signal-hover text-fg-primary font-headline-sm text-xs uppercase tracking-wider py-3 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B]"
                >
                  Send OTP Dispatch
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-space-md animate-fade-in">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label-mono text-label-mono text-fg-muted uppercase">
                      One-Time SMS Token
                    </label>
                    <span className="font-label-mono text-[10px] text-fg-muted">TO: {phone}</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 984021"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2.5 text-center text-sm font-mono tracking-widest font-bold text-fg-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-signal hover:bg-accent-signal-hover text-fg-primary font-headline-sm text-xs uppercase tracking-wider py-3 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B]"
                >
                  Confirm &amp; Link Mobile Device
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="space-y-space-md text-center py-4 animate-fade-in">
            <span className="w-10 h-10 bg-status-success text-white mx-auto flex items-center justify-center font-bold text-lg border border-border-strong">
              ✓
            </span>
            <div>
              <h2 className="font-headline-sm font-bold uppercase text-fg-primary">Device Linked</h2>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Two-factor notification telemetry is active. Redirecting...
              </p>
            </div>
          </div>
        )}

        <div className="pt-space-md border-t border-border-hairline mt-space-lg flex justify-between items-center text-xs font-label-mono">
          <Link href="/login" className="text-fg-primary hover:text-accent-signal-hover underline">
            ← Return to Login
          </Link>
          <span className="text-fg-muted">DOT-COMPLIANT</span>
        </div>
      </div>
    </div>
  );
}
