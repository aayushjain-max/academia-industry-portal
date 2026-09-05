'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [entropyPercent, setEntropyPercent] = useState(0);
  const [entropyLabel, setEntropyLabel] = useState('UNSET');
  const [committed, setCommitted] = useState(false);

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (!val) {
      setEntropyPercent(0);
      setEntropyLabel('UNSET');
    } else if (val.length < 6) {
      setEntropyPercent(25);
      setEntropyLabel('WEAK (32-BIT)');
    } else if (val.length < 10) {
      setEntropyPercent(65);
      setEntropyLabel('STANDARD (128-BIT)');
    } else {
      setEntropyPercent(95);
      setEntropyLabel('CRYPTOGRAPHIC (256-BIT)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setCommitted(true);
      setTimeout(() => router.push('/login'), 2500);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-space-md">
      <div className="w-full max-w-md bg-bg-surface border-2 border-border-strong p-space-lg shadow-[6px_6px_0px_0px_#18181B]">
        <div className="border-b border-border-hairline pb-space-sm mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
              ACCESS KEY ROTATION // SET NEW KEY
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-fg-muted">AUTH-ROTATE</span>
        </div>

        {!committed ? (
          <>
            <h1 className="font-headline-md text-headline-sm uppercase tracking-tight text-fg-primary font-bold mb-1">
              Create New Access Key
            </h1>
            <p className="font-body-sm text-body-sm text-fg-muted mb-space-lg">
              Set a cryptographic key for your sovereign identity node. All existing active sessions will be terminated.
            </p>

            <form onSubmit={handleSubmit} className="space-y-space-md">
              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="password">
                  New Access Key
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2.5 text-xs font-mono text-fg-primary focus:outline-none focus:ring-1 focus:ring-fg-primary"
                />
              </div>

              <div>
                <div className="flex justify-between items-center font-label-mono text-[10px] text-fg-muted mb-1">
                  <span>ENTROPY: <strong className="text-fg-primary">{entropyLabel}</strong></span>
                  <span>{entropyPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-bg-subtle border border-border-hairline overflow-hidden">
                  <div
                    className="h-full bg-accent-signal transition-all duration-300"
                    style={{ width: `${entropyPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-mono text-label-mono text-fg-muted uppercase mb-1" htmlFor="confirmPassword">
                  Confirm Access Key
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2.5 text-xs font-mono text-fg-primary focus:outline-none focus:ring-1 focus:ring-fg-primary"
                />
                {confirmPassword && password !== confirmPassword && (
                  <span className="font-label-mono text-[10px] text-status-danger mt-1 block">
                    ⚠ Keys do not match
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={!password || password !== confirmPassword}
                className="w-full bg-accent-signal hover:bg-accent-signal-hover text-fg-primary font-headline-sm text-xs uppercase tracking-wider py-3 border border-border-strong font-bold shadow-[2px_2px_0px_0px_#18181B] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                Commit New Access Key
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-space-md animate-fade-in text-center py-4">
            <span className="w-10 h-10 bg-status-success text-white mx-auto flex items-center justify-center font-bold text-lg border border-border-strong">
              ✓
            </span>
            <div>
              <h2 className="font-headline-sm font-bold uppercase text-fg-primary">Access Key Updated</h2>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Your sovereign node has been rotated with the new cryptographic credentials. Redirecting to login terminal...
              </p>
            </div>
          </div>
        )}

        <div className="pt-space-md border-t border-border-hairline mt-space-lg flex justify-between items-center text-xs font-label-mono">
          <Link href="/login" className="text-fg-primary hover:text-accent-signal-hover underline">
            ← Return to Login
          </Link>
          <span className="text-fg-muted">STATUS: VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
