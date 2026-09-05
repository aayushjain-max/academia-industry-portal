'use client';

import React, { useState } from 'react';
import { Button } from '@portal/ui';
import { Shield, Key, Bell, Database, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'security' | 'telemetry' | 'keys'>('security');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl space-y-space-lg">
      {/* Toast Notice */}
      {savedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-bold text-accent-signal">NODE CONFIGURATION COMMITTED:</span>
          <span>Parameters saved to local encrypted storage.</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-space-md border-b border-border-strong flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>NODE CONTROL // CONFIGURATION &amp; SECURITY</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg uppercase font-extrabold text-fg-primary tracking-tight mt-1">
            Node Settings &amp; Cryptographic Keys
          </h1>
        </div>

        <Button
          variant="signal"
          size="sm"
          onClick={handleSave}
          className="font-label-mono text-xs font-bold"
        >
          <Check size={14} className="mr-1" />
          <span>Save Node Parameters</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left 4 Cols: Navigation */}
        <div className="lg:col-span-4 bg-bg-surface border border-border-strong p-space-md space-y-1">
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left p-3 font-label-mono text-xs uppercase flex items-center gap-2 border transition-colors ${
              activeTab === 'security'
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-transparent text-fg-muted border-transparent hover:bg-bg-subtle hover:text-fg-primary'
            }`}
          >
            <Shield size={16} />
            <span>01. Cryptographic Security</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`w-full text-left p-3 font-label-mono text-xs uppercase flex items-center gap-2 border transition-colors ${
              activeTab === 'telemetry'
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-transparent text-fg-muted border-transparent hover:bg-bg-subtle hover:text-fg-primary'
            }`}
          >
            <Bell size={16} />
            <span>02. Telemetry &amp; Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`w-full text-left p-3 font-label-mono text-xs uppercase flex items-center gap-2 border transition-colors ${
              activeTab === 'keys'
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-transparent text-fg-muted border-transparent hover:bg-bg-subtle hover:text-fg-primary'
            }`}
          >
            <Key size={16} />
            <span>03. API &amp; Webhooks</span>
          </button>
        </div>

        {/* Right 8 Cols: Panel */}
        <div className="lg:col-span-8 bg-bg-surface border border-border-strong p-space-lg space-y-space-md">
          {activeTab === 'security' && (
            <div className="space-y-space-md">
              <div className="border-b border-border-hairline pb-2">
                <h2 className="font-headline-sm font-bold uppercase text-fg-primary">
                  Cryptographic Node Parameters
                </h2>
                <p className="font-body-sm text-xs text-fg-muted mt-0.5">
                  Manage your W3C DID keypairs and multi-factor sovereign identity bindings.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-fg-muted block text-[10px] uppercase mb-1">SOVEREIGN DID STRING</label>
                  <input
                    type="text"
                    readOnly
                    value="did:sih:stu-8042-aarav-sharma-iitb-2025"
                    className="w-full bg-bg-canvas border border-border-strong p-2.5 text-xs text-fg-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-fg-muted block text-[10px] uppercase mb-1">ED25519 PUBLIC VERIFICATION KEY</label>
                  <input
                    type="text"
                    readOnly
                    value="0x4a91c828bf901ea2b091fca71829019b8812c710"
                    className="w-full bg-bg-canvas border border-border-strong p-2.5 text-xs text-fg-primary focus:outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-border-hairline space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer font-sans text-xs">
                    <input type="checkbox" defaultChecked className="rounded-none border-border-strong text-fg-primary" />
                    <span>Require two-factor SMS validation for live proctored interview chambers.</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer font-sans text-xs">
                    <input type="checkbox" defaultChecked className="rounded-none border-border-strong text-fg-primary" />
                    <span>Publish immutable skill assertions to sovereign Academic Bank of Credits (ABC).</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-space-md">
              <div className="border-b border-border-hairline pb-2">
                <h2 className="font-headline-sm font-bold uppercase text-fg-primary">
                  Telemetry &amp; Notification Triggers
                </h2>
                <p className="font-body-sm text-xs text-fg-muted mt-0.5">
                  Configure real-time ATS match alerts and deficit monitoring frequencies.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <label className="flex items-center justify-between p-3 border border-border-hairline bg-bg-canvas">
                  <div>
                    <span className="font-bold text-fg-primary block">High Compatibility Requisition Match (&gt;90%)</span>
                    <span className="text-fg-muted text-[11px]">Instant dispatch via email and SMS when Tier-1 match is detected.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded-none text-fg-primary" />
                </label>

                <label className="flex items-center justify-between p-3 border border-border-hairline bg-bg-canvas">
                  <div>
                    <span className="font-bold text-fg-primary block">Skill Deficit Reminders</span>
                    <span className="text-fg-muted text-[11px]">Weekly pedagogical alerts for critical bottleneck resolution.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded-none text-fg-primary" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-space-md">
              <div className="border-b border-border-hairline pb-2">
                <h2 className="font-headline-sm font-bold uppercase text-fg-primary">
                  API Keys &amp; Automation Webhooks
                </h2>
                <p className="font-body-sm text-xs text-fg-muted mt-0.5">
                  Synchronize your institutional ATS or research telemetry node via secure REST webhooks.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-fg-muted block text-[10px] uppercase mb-1">LIVE API KEY</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      readOnly
                      value="sih_live_880291_77192801a2"
                      className="w-full bg-bg-canvas border border-border-strong p-2.5 text-xs text-fg-primary focus:outline-none"
                    />
                    <Button variant="outline" size="sm" className="font-label-mono text-xs shrink-0">
                      Rotate Key
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-fg-muted block text-[10px] uppercase mb-1">WEBHOOK ENDPOINT</label>
                  <input
                    type="url"
                    defaultValue="https://telemetry.iitb.ac.in/sih/webhook/v1"
                    className="w-full bg-bg-canvas border border-border-strong p-2.5 text-xs text-fg-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
