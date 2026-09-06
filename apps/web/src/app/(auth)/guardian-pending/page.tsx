'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function GuardianPendingPage() {
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendStatus('Verification link re-transmitted to guardian email.');
    }, 1000);
  };

  const steps = [
    { num: '01', title: 'Token Dispatched', status: 'COMPLETED', date: 'TODAY // 14:00' },
    { num: '02', title: 'Parent/Guardian Signature', status: 'IN PROGRESS', date: 'PENDING ACTION' },
    { num: '03', title: 'Passport Ledger Unlock', status: 'LOCKED', date: 'AWAITING STEP 2' },
  ];

  return (
    <div className="space-y-space-md max-w-xl mx-auto py-space-md">
      <Card className="border-border-strong p-space-lg space-y-space-md bg-bg-surface text-center">
        <div className="mx-auto w-12 h-12 bg-accent-signal border border-border-strong flex items-center justify-center font-bold text-fg-primary">
          <span className="material-symbols-outlined text-[24px]">family_restroom</span>
        </div>

        <div className="space-y-1">
          <Badge variant="warning">CONSENT PENDING</Badge>
          <h1 className="font-headline-sm font-bold text-fg-primary uppercase">
            Parent / Guardian Consent Required
          </h1>
          <p className="font-body-sm text-fg-secondary">
            In compliance with student data governance and safety protocols for pre-college students, parental approval is required before activating your candidate node.
          </p>
        </div>

        {/* 3-Step Compliance Visual Tracker */}
        <div className="border border-border-hairline bg-bg-canvas p-space-md space-y-2 text-left">
          <span className="font-label-mono text-[10px] text-fg-secondary uppercase font-semibold block border-b border-border-hairline pb-1">
            COMPLIANCE ATTESTATION PIPELINE
          </span>
          <div className="space-y-2 pt-1">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center justify-between font-label-mono text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      step.status === 'COMPLETED'
                        ? 'bg-status-success text-bg-surface border-status-success'
                        : step.status === 'IN PROGRESS'
                        ? 'bg-accent-signal text-fg-primary border-border-strong'
                        : 'bg-bg-subtle text-fg-muted border-border-hairline'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="font-semibold text-fg-primary">{step.title}</span>
                </div>
                <span
                  className={
                    step.status === 'COMPLETED'
                      ? 'text-status-success font-bold'
                      : step.status === 'IN PROGRESS'
                      ? 'text-accent-signal font-bold bg-neutral-900 px-1.5 py-0.5'
                      : 'text-fg-muted'
                  }
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border border-border-hairline bg-bg-canvas font-label-mono text-xs space-y-1 text-left">
          <div className="flex justify-between">
            <span className="text-fg-secondary">STUDENT:</span>
            <span className="text-fg-primary font-bold">Aarav Sharma</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-secondary">GUARDIAN EMAIL:</span>
            <span className="text-fg-primary font-bold">guardian.sharma@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg-secondary">TOKEN STATUS:</span>
            <span className="text-status-warning font-semibold">DISPATCHED (VALID 48H)</span>
          </div>
        </div>

        {resendStatus && (
          <div className="p-2 bg-status-success/10 border border-status-success font-label-mono text-xs text-status-success">
            {resendStatus}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Button
            variant="signal"
            size="md"
            className="w-full"
            disabled={resending}
            onClick={handleResend}
          >
            {resending ? 'Transmitting...' : 'Resend Verification Token'}
          </Button>

          <Link href="/login" className="block">
            <Button variant="outline" size="sm" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
