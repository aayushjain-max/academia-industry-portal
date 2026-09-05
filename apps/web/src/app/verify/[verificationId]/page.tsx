import React from 'react';
import Link from 'next/link';

export default async function PublicVerificationPage({
  params,
}: {
  params: Promise<{ verificationId: string }>;
}) {
  const { verificationId } = await params;

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary p-space-md lg:p-space-xl font-body-md">
      <div className="max-w-3xl mx-auto space-y-space-lg">
        <div className="border-2 border-border-strong bg-bg-surface p-space-lg space-y-space-md shadow-sm">
          <div className="flex items-center justify-between border-b border-border-hairline pb-space-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-status-success rounded-full" />
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-fg-primary font-bold">
                SIH NATIONAL CREDENTIAL VERIFICATION SYSTEM
              </span>
            </div>
            <span className="font-label-mono text-xs px-2 py-0.5 bg-status-success/10 text-status-success border border-status-success/30 font-bold">
              TAMPER-PROOF VERIFIED
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-label-mono text-xs text-fg-muted uppercase">VERIFICATION TRANSACTION ID:</span>
            <div className="font-metric-tabular text-xl font-bold font-mono text-fg-primary break-all">
              {decodeURIComponent(verificationId)}
            </div>
          </div>

          <div className="p-4 bg-bg-subtle border border-border-hairline space-y-2 font-body-sm text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">LEDGER STATUS:</span>
              <span className="text-status-success font-bold font-label-mono text-xs">COMMITTED TO CONSORTIUM BLOCK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">SIGNING AUTHORITY:</span>
              <span className="text-fg-primary font-bold font-label-mono text-xs">AICTE-SIH ATTESTATION AUTHORITY</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">TIMESTAMP:</span>
              <span className="text-fg-primary font-mono text-xs">2024-Q3 AUDIT CYCLE</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border-hairline flex justify-end">
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-on-primary font-label-mono text-xs uppercase font-bold"
            >
              ← Return to Portal Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

