'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-space-md">
      <div className="w-full max-w-md bg-bg-surface border-2 border-border-strong p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
        {/* Header Ribbon */}
        <div className="border-b border-border-hairline pb-space-sm mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
              ACCESS KEY RECOVERY // PROTOCOL SIH-8042
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-fg-muted">NODE AUTH</span>
        </div>

        {!submitted ? (
          <>
            <h1 className="font-headline-md text-headline-sm uppercase tracking-tight text-fg-primary font-bold mb-1">
              Reset Your Access Key
            </h1>
            <p className="font-body-sm text-body-sm text-fg-muted mb-space-lg">
              Enter your registered institutional email. A cryptographic recovery token will be dispatched to verify node ownership.
            </p>

            <form onSubmit={handleSubmit} className="space-y-space-md">
              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="email">
                  Institutional / Official Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@institution.edu.in"
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2.5 text-xs font-mono text-fg-primary focus:outline-none focus:ring-1 focus:ring-fg-primary"
                />
              </div>

              <div className="p-3 bg-bg-subtle border border-border-hairline font-label-mono text-[11px] text-fg-secondary space-y-1">
                <span className="font-bold text-fg-primary block">SECURITY ADVISORY:</span>
                <span>Recovery tokens expire after 900 seconds. Ensure access to your academic inbox or DigiLocker ABC linkage.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-signal hover:bg-accent-signal-hover text-fg-primary font-headline-sm text-xs uppercase tracking-wider py-3 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                Dispatch Recovery Telemetry Link
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-space-md animate-fade-in">
            <div className="p-3 bg-green-50 border border-status-success text-status-success font-label-mono text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                DISPATCH COMMITTED
              </span>
              <p className="text-fg-secondary font-sans text-xs">
                A cryptographic recovery link has been dispatched to <strong>{email}</strong>. Check your institutional inbox to reset credentials.
              </p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-2 border border-border-hairline font-label-mono text-xs uppercase text-fg-muted hover:text-fg-primary bg-bg-subtle"
            >
              Re-enter Email Address
            </button>
          </div>
        )}

        <div className="pt-space-md border-t border-border-hairline mt-space-lg flex justify-between items-center text-xs font-label-mono">
          <Link href="/login" className="text-fg-primary hover:text-accent-signal-hover underline">
            ← Return to Node Login
          </Link>
          <span className="text-fg-muted">SHA-256 SECURED</span>
        </div>
      </div>
    </div>
  );
}
