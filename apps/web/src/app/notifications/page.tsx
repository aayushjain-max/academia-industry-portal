'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@portal/ui';
import { Bell, CheckCircle2, AlertTriangle, Coins, Briefcase, Check } from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'interview' | 'passport' | 'system'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF-01',
      title: 'Interview Chamber Scheduled: TechNova Labs',
      category: 'interview',
      desc: 'Proctored Round 02 Architecture Interview confirmed for Oct 24 at 14:00 IST.',
      time: '12 MINS AGO',
      unread: true,
      actionLabel: 'Join Chamber',
      actionHref: '/student/applications',
      icon: Briefcase,
    },
    {
      id: 'NOTIF-02',
      title: 'Skill Passport Attestation Minted',
      category: 'passport',
      desc: 'New verified credential "PostgreSQL Relational Optimization" signed with Ed25519 hash 0x9b1772...c4.',
      time: '2 HOURS AGO',
      unread: true,
      actionLabel: 'Inspect Ledger',
      actionHref: '/student/skill-passport',
      icon: Coins,
    },
    {
      id: 'NOTIF-03',
      title: 'Critical Skill Deficit Diagnostic Alert',
      category: 'system',
      desc: 'Docker & Kubernetes orchestration deficit (-30%) is currently blocking 4 Tier-1 enterprise opportunities.',
      time: '5 HOURS AGO',
      unread: false,
      actionLabel: 'Remediate Gap',
      actionHref: '/student/skill-gaps',
      icon: AlertTriangle,
    },
    {
      id: 'NOTIF-04',
      title: 'Offer Letter Letter of Intent (LOI) Extended',
      category: 'interview',
      desc: 'Barclays Global Service issued an offer letter for FinTech Microservices Intern: ₹50,000/mo.',
      time: 'YESTERDAY',
      unread: false,
      actionLabel: 'Review Docket',
      actionHref: '/student/applications',
      icon: CheckCircle2,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-space-md lg:px-space-lg py-space-xl space-y-space-lg">
      <div className="pb-space-md border-b border-border-strong flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>SOVEREIGN DISPATCH TELEMETRY // SIH-8042</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg uppercase font-extrabold text-fg-primary tracking-tight mt-1">
            Notification Dispatch Feed
          </h1>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          className="font-label-mono text-xs"
        >
          <Check size={14} className="mr-1.5" />
          <span>Mark All Read</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-bg-surface border border-border-strong p-2 flex items-center gap-2 overflow-x-auto">
        {(['all', 'interview', 'passport', 'system'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 font-label-mono text-xs uppercase border transition-colors ${
              filter === tab
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
            }`}
          >
            {tab === 'all' && 'All Dispatches'}
            {tab === 'interview' && 'Interviews & Offers'}
            {tab === 'passport' && 'Passport Stamps'}
            {tab === 'system' && 'Deficits & Audits'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-space-sm">
        {filtered.map((notif) => {
          const IconComp = notif.icon;
          return (
            <div
              key={notif.id}
              className={`p-space-md border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-md ${
                notif.unread
                  ? 'bg-bg-surface border-2 border-border-strong shadow-[2px_2px_0px_0px_#18181B]'
                  : 'bg-bg-surface border-border-hairline opacity-80'
              }`}
            >
              <div className="flex items-start gap-space-md">
                <div
                  className={`w-10 h-10 flex items-center justify-center shrink-0 border border-border-strong ${
                    notif.unread ? 'bg-accent-signal text-fg-primary' : 'bg-bg-subtle text-fg-muted'
                  }`}
                >
                  <IconComp size={18} />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-body-md font-bold text-fg-primary">
                      {notif.title}
                    </span>
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-accent-signal inline-block" />
                    )}
                  </div>
                  <p className="font-body-sm text-xs text-fg-secondary">
                    {notif.desc}
                  </p>
                  <span className="font-label-mono text-[10px] text-fg-muted block pt-1">
                    {notif.time}
                  </span>
                </div>
              </div>

              <Link
                href={notif.actionHref}
                className="px-space-md py-1.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase font-bold hover:bg-accent-signal hover:text-fg-primary transition-colors border border-border-strong text-center shrink-0"
              >
                {notif.actionLabel} →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
