'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function GuardianConfirmPage() {
  const params = useParams();
  const token = (params?.token as string) || 'tok-default';

  const [confirmed, setConfirmed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!agreed) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirmed(true);
    }, 1000);
  };

  return (
    <div className="space-y-space-md max-w-xl mx-auto">
      <Card className="border-border-strong p-space-lg space-y-space-md bg-bg-surface">
        <div className="flex items-center justify-between border-b border-border-hairline pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-status-success rounded-full" />
            <span className="font-label-mono text-xs uppercase tracking-wider text-fg-primary font-bold">
              AICTE GUARDIAN CONSENT VERIFICATION
            </span>
          </div>
          <Badge variant="signal">OFFICIAL NOTARY</Badge>
        </div>

        {confirmed ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto w-12 h-12 bg-status-success text-bg-surface flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <h2 className="font-headline-sm font-bold text-fg-primary uppercase">
                Parental Consent Granted
              </h2>
              <p className="font-body-sm text-fg-muted mt-1">
                Thank you. Aarav Sharma&apos;s student account has been unlocked for skill assessments and verified internship applications.
              </p>
            </div>
            <div className="p-3 border border-border-hairline bg-bg-canvas font-label-mono text-xs text-status-success font-semibold">
              ATTESTATION COMMIT: SHA-256-CONSENT-LOCKED
            </div>
          </div>
        ) : (
          <div className="space-y-space-md">
            <div className="space-y-1">
              <h1 className="font-headline-sm font-bold text-fg-primary uppercase">
                Consent Verification for Candidate: Aarav Sharma
              </h1>
              <p className="font-body-sm text-fg-muted">
                You have been designated as the legal parent/guardian for this student on the National Academia-Industry Skill Development Portal.
              </p>
            </div>

            <div className="p-3 border border-border-hairline bg-bg-canvas font-label-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-fg-muted">STUDENT:</span>
                <span className="text-fg-primary font-bold">Aarav Sharma (Age: 17)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">INSTITUTION:</span>
                <span className="text-fg-primary">IIT Bombay Pre-College Academy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">SECURITY TOKEN:</span>
                <span className="text-fg-primary font-mono">{token}</span>
              </div>
            </div>

            {/* Legal Toggle */}
            <label className="flex items-start gap-3 p-3 border border-border-strong bg-bg-subtle cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 border-border-strong rounded-none accent-accent-signal"
              />
              <span className="font-sans text-xs text-fg-primary leading-relaxed">
                I confirm that I am the parent/guardian of this student and hereby authorize their participation in skill assessments, project portfolio publishing, and verified industry mentorship tracks.
              </span>
            </label>

            <Button
              variant="signal"
              size="md"
              className="w-full"
              disabled={!agreed || submitting}
              onClick={handleConfirm}
            >
              {submitting ? 'Cryptographically Signing...' : 'Approve & Sign Consent'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
