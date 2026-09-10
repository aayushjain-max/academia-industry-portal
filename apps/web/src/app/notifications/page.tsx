'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@portal/ui';
import { Bell, CheckCircle2, AlertTriangle, Coins, Briefcase, Check, Loader2 } from 'lucide-react';
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead, NotificationItem } from '@/features/notifications/api';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'interview' | 'passport' | 'system'>('all');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifs() {
      try {
        const data = await getNotifications();
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(
            data.map((n: NotificationItem) => {
              const cat = n.type === 'APPLICATION_UPDATE' ? 'interview' : n.type === 'ASSESSMENT' ? 'passport' : 'system';
              return {
                id: n.id,
                title: n.title,
                category: cat,
                desc: n.message,
                time: n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'RECENT',
                unread: !n.is_read,
                actionLabel: cat === 'interview' ? 'View Applications' : cat === 'passport' ? 'Inspect Passport' : 'View System Status',
                actionHref: cat === 'interview' ? '/student/applications' : cat === 'passport' ? '/student/skill-passport' : '/student/dashboard',
                icon: cat === 'interview' ? Briefcase : cat === 'passport' ? Coins : AlertTriangle,
              };
            })
          );
        }
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotifs();
  }, []);

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
    } catch (err) {
      console.warn('Backend mark all read fallback');
    }
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
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-fg-muted bg-bg-surface border border-border-hairline">
            Synchronizing dispatch telemetry feed...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-2">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Notifications in this Category</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              Your dispatch feed is currently quiet. System alerts, interview updates, and passport attestations will appear here.
            </p>
          </div>
        ) : (
          filtered.map((notif) => {
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
          })
        )}
      </div>
    </div>
  );
}
