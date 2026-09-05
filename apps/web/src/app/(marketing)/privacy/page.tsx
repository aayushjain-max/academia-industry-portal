'use client';

import React from 'react';
import { Card } from '@portal/ui';

export default function PrivacyPage() {
  return (
    <div className="w-full flex flex-col max-w-[1440px] mx-auto p-space-md lg:p-space-xl space-y-space-xl">
      <div className="border-b border-border-strong pb-space-lg">
        <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-md">
          <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
          <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
            // DATA SOVEREIGNTY &amp; CRYPTOGRAPHIC INTEGRITY CHARTER
          </span>
        </div>
        <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight font-extrabold leading-tight">
          Privacy Policy &amp; Sovereign Data Charter
        </h1>
        <p className="text-body-lg font-body-lg text-fg-muted max-w-3xl mt-2">
          Under the Digital Personal Data Protection (DPDP) Act 2023 and W3C Verifiable Credential standard, all student credentials belong exclusively to the sovereign candidate node.
        </p>
      </div>

      <div className="space-y-space-md max-w-4xl font-body-md text-fg-secondary">
        <Card className="p-space-lg space-y-2">
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary uppercase">
            1. Zero-Knowledge Skill Verification
          </h2>
          <p className="text-body-sm text-fg-muted">
            SkillBridge uses SHA-256 hashes and cryptographic commitments to prove student proficiency and project completion without exposing private repositories, unreleased research drafts, or sensitive personal identifiers without explicit candidate sign-off.
          </p>
        </Card>

        <Card className="p-space-lg space-y-2">
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary uppercase">
            2. Sovereign Institutional Custody
          </h2>
          <p className="text-body-sm text-fg-muted">
            Universities and colleges maintain cryptographic custody of their grading ledgers. No proprietary syllabus or internal committee deliberations are shared beyond accredited NAAC/NIRF reporting parameters.
          </p>
        </Card>

        <Card className="p-space-lg space-y-2">
          <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary uppercase">
            3. Enterprise Data Protection &amp; Anti-Scraping
          </h2>
          <p className="text-body-sm text-fg-muted">
            Job descriptions and proprietary engineering requisitions uploaded by corporate partners are processed exclusively within isolated AI parsing sandboxes. No corporate JD data is used to train third-party public foundation models.
          </p>
        </Card>
      </div>
    </div>
  );
}
