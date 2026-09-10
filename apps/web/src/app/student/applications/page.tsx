'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@portal/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { applicationsApi, ApplicationItem } from '@/lib/api/applications';

export default function StudentApplicationsPage() {
  const [filter, setFilter] = useState<'all' | 'interview' | 'review' | 'offer'>('all');
  const [activeChamber, setActiveChamber] = useState<any | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadApplications() {
      try {
        const res = await applicationsApi.getAll();
        if (Array.isArray(res) && res.length > 0) {
          const mapped = res.map((app: ApplicationItem, idx: number) => {
            const isInterview = app.status === 'ACCEPTED' || (app.status as string) === 'INTERVIEW';
            const isOffer = (app.status as string) === 'ACCEPTED';
            const category = isOffer ? 'offer' : isInterview ? 'interview' : 'review';
            const statusType = isOffer ? ('success' as const) : isInterview ? ('signal' as const) : ('default' as const);

            return {
              id: app.id ? `APP-${app.id.slice(0, 8).toUpperCase()}` : `APP-${idx + 1000}`,
              company: app.opportunity?.company_name || app.opportunity?.industry?.company_name || 'Partner Enterprise',
              role: app.opportunity?.title || 'Engineering Fellow',
              stipend: app.opportunity?.stipend_amount ? `₹${app.opportunity.stipend_amount.toLocaleString()} / mo` : 'Standard Fellowship',
              stage: app.status?.replace('_', ' ') || 'UNDER REVIEW',
              date: app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'RECENT',
              status: app.status?.replace('_', ' ') || 'UNDER REVIEW',
              statusType,
              category,
              proctored: isInterview,
              panel: 'Industry Technical Evaluation Board',
              techFocus: 'Verified Competencies & Portfolio Repository',
            };
          });
          setApplications(mapped);
        }
      } catch (err) {
        console.warn('Unable to load applications:', err);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  const filtered = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.category === filter;
  });

  const interviewsCount = applications.filter((a) => a.category === 'interview').length;
  const offersCount = applications.filter((a) => a.category === 'offer').length;
  const reviewCount = applications.filter((a) => a.category === 'review').length;

  return (
    <div className="space-y-space-lg">
      {/* Top Protocol Header */}
      <div className="pb-space-md border-b border-border-strong flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-label-mono text-label-mono text-fg-muted uppercase tracking-wider block">
            ATS LIFECYCLE TRACKER // CANDIDATE DOSSIER
          </span>
          <h1 className="font-headline-lg text-headline-lg text-fg-primary tracking-tight uppercase mt-1 font-extrabold">
            Active Application Dockets
          </h1>
          <p className="font-body-md text-fg-muted mt-1">
            Real-time pipeline progression, proctored interview chambers, and extended corporate offer letters.
          </p>
        </div>

        <div className="flex items-center gap-space-sm font-label-mono text-xs">
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">ACTIVE</span>
            <span className="text-fg-primary font-bold text-sm">{applications.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">INTERVIEWS</span>
            <span className="text-status-warning font-bold text-sm">{interviewsCount.toString().padStart(2, '0')}</span>
          </div>
          <div className="p-2 border border-border-hairline bg-bg-surface text-center">
            <span className="text-fg-muted block text-[10px]">OFFERS</span>
            <span className="text-status-success font-bold text-sm">{offersCount.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-bg-surface border border-border-strong p-2 flex items-center gap-2 overflow-x-auto">
        {(['all', 'interview', 'review', 'offer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 font-label-mono text-xs uppercase border transition-colors ${
              filter === tab
                ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary'
            }`}
          >
            {tab === 'all' && `All Applications (${applications.length})`}
            {tab === 'interview' && `Interviews Scheduled (${interviewsCount})`}
            {tab === 'review' && `Under Evaluation (${reviewCount})`}
            {tab === 'offer' && `Extended Offers (${offersCount})`}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-space-md">
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-fg-muted bg-bg-surface border border-border-hairline">
            Synchronizing applicant tracking telemetry...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-2">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Applications in this Category</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              You currently have no active applications recorded under this filter. Apply to opportunities to track hiring pipelines.
            </p>
          </div>
        ) : (
          filtered.map((app) => (
          <div
            key={app.id}
            className="bg-bg-surface border border-border-strong p-space-lg hover:shadow-[3px_3px_0px_0px_#18181B] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                <Badge variant={app.statusType}>{app.status}</Badge>
                <span className="font-mono text-fg-muted">{app.id}</span>
                <span className="text-border-hairline">|</span>
                <span className="text-fg-primary font-bold">{app.company}</span>
              </div>

              <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                {app.role}
              </h2>

              <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                <span>STIPEND / BAND: <strong className="text-fg-primary">{app.stipend}</strong></span>
                <span>•</span>
                <span>STAGE: <strong className="text-fg-secondary">{app.stage}</strong></span>
                <span>•</span>
                <span>PANEL: <strong className="text-fg-secondary">{app.panel}</strong></span>
              </div>

              <div className="font-mono text-[11px] text-fg-secondary bg-bg-subtle p-2 border border-border-hairline inline-block">
                CORE TECHNICAL FOCUS: {app.techFocus}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2 shrink-0">
              <span className="font-label-mono text-xs font-bold text-fg-primary">{app.date}</span>
              {app.proctored ? (
                <Button
                  variant="signal"
                  size="sm"
                  onClick={() => setActiveChamber(app)}
                >
                  Join Proctored Chamber
                </Button>
              ) : app.statusType === 'success' ? (
                <Button variant="primary" size="sm">
                  Review Letter of Intent (LOI)
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  Inspect Requisition Docket
                </Button>
              )}
            </div>
          </div>
        ))
      )}
      </div>

      {/* Proctored Chamber Modal */}
      <Dialog open={!!activeChamber} onOpenChange={(open) => !open && setActiveChamber(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Secure Proctored Interview Chamber</DialogTitle>
            <DialogDescription>
              {activeChamber?.company} // {activeChamber?.role}
            </DialogDescription>
          </DialogHeader>

          {activeChamber && (
            <div className="space-y-space-md font-mono text-xs">
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-2">
                <div className="flex justify-between">
                  <span className="text-fg-muted">SESSION SCHEDULE:</span>
                  <span className="text-portal-primary font-bold">{activeChamber.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">LEAD EVALUATOR:</span>
                  <span className="text-fg-primary font-bold">{activeChamber.panel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fg-muted">SECURITY MODE:</span>
                  <span className="text-status-success font-bold">NATIONAL AIR-GAPPED ENVIRONMENT</span>
                </div>
              </div>

              <div className="space-y-1 text-fg-secondary font-sans text-xs">
                <span className="font-bold font-mono text-fg-primary block uppercase">Proctor Checklist:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Webcam &amp; microphone hardware permissions authenticated</li>
                  <li>Dual-monitor detection enabled &amp; full-screen lock engaged</li>
                  <li>In-browser Python/Go execution sandbox active with test runner</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button
              variant="signal"
              size="sm"
              onClick={() => {
                alert(`Connecting to ${activeChamber?.company} proctored terminal...`);
                setActiveChamber(null);
              }}
            >
              Enter Proctored Chamber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
