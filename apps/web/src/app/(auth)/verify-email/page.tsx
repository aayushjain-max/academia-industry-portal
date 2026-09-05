'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['8', '0', '4', '2', '', '']);
  const [verified, setVerified] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length >= 4) {
      setVerified(true);
      setTimeout(() => router.push('/student/dashboard'), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-space-md">
      <div className="w-full max-w-md bg-bg-surface border-2 border-border-strong p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
        <div className="border-b border-border-hairline pb-space-sm mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
              CRYPTOGRAPHIC EMAIL ATTESTATION
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-fg-muted">SIH-OTP</span>
        </div>

        {!verified ? (
          <>
            <h1 className="font-headline-md text-headline-sm uppercase tracking-tight text-fg-primary font-bold mb-1">
              Verify Institutional Email
            </h1>
            <p className="font-body-sm text-body-sm text-fg-muted mb-space-lg">
              We dispatched a 6-digit one-time cryptographic code to <strong>aarav.sharma@iitb.ac.in</strong>. Enter the tokens below.
            </p>

            <form onSubmit={handleVerify} className="space-y-space-lg">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-12 h-12 text-center text-lg font-mono font-bold bg-bg-canvas border-2 border-border-strong focus:outline-none focus:bg-yellow-50 focus:border-accent-signal text-fg-primary"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-label-mono">
                <span className="text-fg-muted">EXPIRATION: 08:42 REMAINING</span>
                <button
                  type="button"
                  className="text-fg-primary underline hover:text-accent-signal-hover"
                >
                  Resend Dispatch
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-signal hover:bg-accent-signal-hover text-fg-primary font-headline-sm text-xs uppercase tracking-wider py-3 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                Validate Token &amp; Stamp Identity
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-space-md text-center py-4 animate-fade-in">
            <span className="w-10 h-10 bg-status-success text-white mx-auto flex items-center justify-center font-bold text-lg border border-border-strong">
              ✓
            </span>
            <div>
              <h2 className="font-headline-sm font-bold uppercase text-fg-primary">Identity Attested</h2>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Your email has been cryptographically bound to Node STU-8042. Redirecting to Command Center...
              </p>
            </div>
          </div>
        )}

        <div className="pt-space-md border-t border-border-hairline mt-space-lg flex justify-between items-center text-xs font-label-mono">
          <Link href="/login" className="text-fg-primary hover:text-accent-signal-hover underline">
            ← Return to Login
          </Link>
          <span className="text-status-success font-semibold">SHA-256 VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
