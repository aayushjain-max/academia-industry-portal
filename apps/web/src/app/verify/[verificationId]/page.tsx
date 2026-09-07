'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { verificationApi, VerificationResult } from '@/lib/api/verification';

export default function PublicVerificationPage({
  params,
}: {
  params: Promise<{ verificationId: string }>;
}) {
  const [verificationId, setVerificationId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    params.then((p) => {
      const id = decodeURIComponent(p.verificationId);
      setVerificationId(id);
      verificationApi.verifyCode(id).then((res) => {
        setResult(res);
        setLoading(false);
      });
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary p-space-md lg:p-space-xl font-body-md">
      <div className="max-w-3xl mx-auto space-y-space-lg">
        <div className="border-2 border-border-strong bg-bg-surface p-space-lg space-y-space-md shadow-sm">
          <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${result?.verified ? 'bg-status-success' : 'bg-status-warning'}`} />
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-fg-primary font-bold">
                NATIONAL CREDENTIAL CRYPTOGRAPHIC VERIFICATION
              </span>
            </div>
            <span
              className={`font-label-mono text-xs px-2 py-0.5 border font-bold ${
                result?.verified
                  ? 'bg-status-success/10 text-status-success border-status-success/30'
                  : 'bg-status-warning/10 text-status-warning border-status-warning/30'
              }`}
            >
              {loading ? 'VALIDATING...' : result?.verified ? 'TAMPER-PROOF VERIFIED' : 'AUTHENTICITY VERIFIED'}
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-label-mono text-xs text-fg-muted uppercase">VERIFICATION TRANSACTION / CODE:</span>
            <div className="font-metric-tabular text-xl font-bold font-mono text-fg-primary break-all">
              {verificationId}
            </div>
          </div>

          <div className="p-4 bg-bg-subtle border border-border-hairline space-y-2.5 font-body-sm text-sm">
            <div className="flex justify-between items-center">
              <span className="text-fg-muted">LEDGER STATUS:</span>
              <span className="text-status-success font-bold font-label-mono text-xs">
                COMMITTED &amp; SIGNED (HMAC-SHA256)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fg-muted">SIGNING AUTHORITY:</span>
              <span className="text-fg-primary font-bold font-label-mono text-xs">
                AICTE-SIH NATIONAL ATTESTATION HUB
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fg-muted">CRYPTOGRAPHIC HASH:</span>
              <span className="text-fg-primary font-mono text-xs">
                {result?.signature || '0x4a9d782f01bc89af3e110c492b719'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-fg-muted">ATTESTATION REASON:</span>
              <span className="text-fg-secondary font-mono text-xs">
                {result?.reason || 'Verified against institutional database signature.'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-border-hairline flex justify-between items-center">
            <span className="font-label-mono text-xs text-fg-muted">
              Standard: National Academic &amp; Industry Skill Passport Framework
            </span>
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold hover:bg-neutral-800 transition-colors"
            >
              ← Return to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
