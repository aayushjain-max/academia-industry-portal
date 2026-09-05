'use client';

import React, { useState } from 'react';
import { Button, Card, Input } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full flex flex-col max-w-[1440px] mx-auto p-space-md lg:p-space-xl space-y-space-xl">
      <div className="border-b border-border-strong pb-space-lg">
        <div className="inline-flex items-center gap-2 border border-border-hairline bg-bg-surface px-2.5 py-1 mb-space-md">
          <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
          <span className="font-label-mono text-label-mono text-fg-secondary uppercase">
            // TERMINAL ACCESS : NATIONAL SUPPORT HELPDESK
          </span>
        </div>
        <h1 className="text-display-hero font-display-hero text-fg-primary uppercase tracking-tight font-extrabold leading-tight">
          Contact National Portal Bureau
        </h1>
        <p className="text-body-lg font-body-lg text-fg-muted max-w-3xl mt-2">
          Direct institutional arbitration, corporate partnership inquiries, and academician technical integration support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
          <h2 className="font-headline-sm text-headline-sm font-bold text-fg-primary uppercase">
            Transmit Official Inquiry Docket
          </h2>

          {submitted ? (
            <div className="p-space-lg bg-green-50 border border-status-success space-y-2">
              <span className="font-label-mono text-xs text-status-success font-bold uppercase block">
                ? DOCKET TRANSMITTED TO NATIONAL HELPDESK
              </span>
              <p className="text-body-md text-fg-primary">
                Your inquiry reference ID is <strong className="font-mono">#TKT-SIH-2024-9912</strong>. A nodal officer will respond within 4 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-space-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <Input label="Full Official Name" placeholder="e.g. Dr. Rajesh Sharma" required />
                <Input label="Official Institutional Email" type="email" placeholder="e.g. rajesh@iitb.ac.in" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <Input label="Institution / Enterprise Name" placeholder="e.g. TechNova Labs" required />
                <Input label="Nodal Category / Role" placeholder="e.g. Dean R&D / Corporate Lead" required />
              </div>

              <div className="space-y-1">
                <label className="block font-label-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  Docket Description &amp; Technical Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="State the nature of institutional onboarding, grant integration, or student credential verification..."
                  className="w-full rounded-none border border-border-strong bg-bg-surface p-3 text-sm font-body-md text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <Button variant="signal" size="md" type="submit">
                Transmit Sovereign Ticket Docket
              </Button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-space-md">
          <Card className="p-space-lg space-y-space-sm font-mono text-xs">
            <span className="font-label-mono text-xs text-fg-muted uppercase block">
              PHYSICAL REGISTRY PODS
            </span>
            <div className="space-y-3 pt-2">
              <div className="border-b border-border-hairline pb-2">
                <strong className="text-fg-primary block font-sans text-sm">AICTE National Headquarters</strong>
                <span className="text-fg-muted block">Nelson Mandela Marg, Vasant Kunj, New Delhi 110070</span>
                <span className="text-status-success text-[11px] block mt-1">Nodal Hub: ND-DEL-01</span>
              </div>
              <div className="border-b border-border-hairline pb-2">
                <strong className="text-fg-primary block font-sans text-sm">Western Zone Technology Node</strong>
                <span className="text-fg-muted block">IIT Bombay Tech Park, Powai, Mumbai 400076</span>
                <span className="text-status-success text-[11px] block mt-1">Nodal Hub: WZ-MUM-02</span>
              </div>
              <div>
                <strong className="text-fg-primary block font-sans text-sm">Southern Zone Innovation Hub</strong>
                <span className="text-fg-muted block">IISc Campus, CV Raman Rd, Bengaluru 560012</span>
                <span className="text-status-success text-[11px] block mt-1">Nodal Hub: SZ-BLR-03</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
