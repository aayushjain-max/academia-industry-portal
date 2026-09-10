'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getGrantApplications,
  submitGrantApplication,
  GrantApplication,
  getMyAcademicianProfile,
} from '@/features/academicians/api';
import { Loader2, Plus, X, Search, FileText, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function AcademicianApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState<GrantApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState('Faculty Principal Investigator');

  // New Application Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    project_title: '',
    requested_amount: '',
    executive_summary: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [appsRes, profileRes] = await Promise.allSettled([
        getGrantApplications(),
        getMyAcademicianProfile(),
      ]);

      if (appsRes.status === 'fulfilled') {
        setApplications(appsRes.value.results || []);
      }
      if (profileRes.status === 'fulfilled') {
        const p = profileRes.value;
        const name = `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.email || 'Principal Investigator';
        setFacultyName(name);
      }
    } catch (err: any) {
      console.error('Failed to load grant applications:', err);
      setError('Failed to synchronize grant applications ledger.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project_title || !formData.requested_amount) {
      setSubmitError('Project title and requested amount are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await submitGrantApplication({
        project_title: formData.project_title,
        requested_amount: Number(formData.requested_amount),
        executive_summary: formData.executive_summary,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ project_title: '', requested_amount: '', executive_summary: '' });
        loadData();
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit proposal.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalRequested = applications.reduce((acc, a) => acc + (Number(a.requested_amount) || 0), 0);
  const approvedCount = applications.filter((a) => a.status === 'APPROVED').length;
  const underReviewCount = applications.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'SUBMITTED').length;

  const filtered = applications.filter((app) => {
    const matchSearch =
      app.project_title.toLowerCase().includes(search.toLowerCase()) ||
      (app.grant_opportunity_details?.funding_agency && app.grant_opportunity_details.funding_agency.toLowerCase().includes(search.toLowerCase()));
    if (selectedStatus === 'ALL') return matchSearch;
    return matchSearch && app.status === selectedStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success">APPROVED & SANCTIONED</Badge>;
      case 'UNDER_REVIEW':
        return <Badge variant="warning">UNDER PEER REVIEW</Badge>;
      case 'SUBMITTED':
        return <Badge variant="signal">SUBMITTED</Badge>;
      case 'REJECTED':
        return <Badge variant="outline">REVISION REQUESTED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // APPLICATIONS"
      nodeStatus="LEDGER SYNCHRONIZED"
      category="RESEARCH GRANTS & PROPOSAL TRACKING"
      title="Grant Applications & Proposals Docket"
      description="Track and manage submitted research grant applications, institutional endorsements, review statuses, and funding sanctions."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} className="mr-1" />
            Propose New Docket
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <Icon name="refresh" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      }
      kpis={[
        {
          label: 'Total Proposals',
          value: String(applications.length),
          delta: 'ALL TIME',
          deltaType: 'neutral',
          subtext: 'Submitted Dockets',
          icon: 'article',
        },
        {
          label: 'In Active Review',
          value: String(underReviewCount),
          delta: 'PENDING PEER REVIEW',
          deltaType: underReviewCount > 0 ? 'warning' : 'neutral',
          subtext: 'Dean & Agency Committees',
          icon: 'clock',
        },
        {
          label: 'Sanctioned & Awarded',
          value: String(approvedCount),
          delta: `${approvedCount} GRANTS`,
          deltaType: 'success',
          subtext: 'Institutional Sanctions',
          icon: 'verified',
        },
        {
          label: 'Total Capital Requested',
          value: totalRequested > 0 ? `₹${(totalRequested / 10000000).toFixed(2)} Cr` : '₹0.00',
          delta: 'PORTFOLIO SUM',
          deltaType: 'neutral',
          subtext: 'Across All Proposals',
          icon: 'token',
        },
      ]}
    >
      {/* Category Tabs & Search Bar */}
      <div className="bg-bg-surface border border-border-strong">
        <div className="border-b border-border-hairline flex items-center overflow-x-auto font-mono text-xs">
          {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedStatus(tab)}
              className={`px-space-md py-3 uppercase whitespace-nowrap transition-colors ${
                selectedStatus === tab
                  ? 'bg-fg-primary text-bg-surface font-bold border-b-2 border-portal-primary'
                  : 'text-fg-muted hover:text-fg-primary hover:bg-bg-subtle'
              }`}
            >
              {tab === 'ALL' ? `All Proposals (${applications.length})` : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="p-space-md flex flex-col md:flex-row gap-space-sm items-center">
          <div className="flex-1 w-full flex items-center bg-bg-canvas border border-border-hairline px-3 py-2">
            <Search size={16} className="text-fg-muted mr-2" />
            <input
              type="text"
              placeholder="Search by proposal title or sponsoring agency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs font-mono text-fg-primary placeholder:text-fg-muted"
            />
          </div>
        </div>
      </div>

      {/* Applications Records List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Application Dockets...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <FileText className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Applications Found</p>
          <p className="font-body-sm mt-1 text-xs">No grant application dockets match the current filter criteria.</p>
          <Button variant="signal" size="sm" className="mt-4" onClick={() => setIsModalOpen(true)}>
            Submit Your First Proposal
          </Button>
        </div>
      ) : (
        <div className="space-y-space-md">
          {filtered.map((item) => {
            const requestedFormatted = item.requested_amount
              ? `₹${(Number(item.requested_amount) / 100000).toLocaleString()} L`
              : '₹0';
            const submissionDate = item.submitted_at || item.created_at
              ? new Date(item.submitted_at || item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'Recently';

            return (
              <div
                key={item.id}
                className="bg-bg-surface border border-border-strong p-space-lg space-y-space-md hover:shadow-[3px_3px_0px_0px_#18181B] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-sm">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs px-2 py-0.5 bg-bg-subtle border border-border-hairline font-bold">
                        #DK-{item.id.slice(0, 8).toUpperCase()}
                      </span>
                      {getStatusBadge(item.status)}
                      <span className="font-mono text-xs text-fg-muted">
                        SUBMITTED: {submissionDate}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {item.project_title}
                    </h3>
                    {item.grant_opportunity_details?.funding_agency && (
                      <p className="font-mono text-xs text-fg-secondary mt-0.5">
                        Sponsoring Body: {item.grant_opportunity_details.funding_agency}
                      </p>
                    )}
                  </div>

                  <div className="lg:text-right shrink-0">
                    <span className="font-label-mono text-[10px] text-fg-muted uppercase block">
                      REQUESTED GRANT
                    </span>
                    <span className="font-metric-tabular text-xl font-bold text-fg-primary tnum">
                      {requestedFormatted}
                    </span>
                  </div>
                </div>

                {item.executive_summary && (
                  <p className="font-body-sm text-xs text-fg-secondary border-l-2 border-border-strong pl-3 py-1">
                    {item.executive_summary}
                  </p>
                )}

                <div className="p-3 bg-bg-canvas border border-border-hairline font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-fg-muted text-[10px] uppercase block">PRINCIPAL INVESTIGATOR</span>
                    <span className="text-fg-primary font-bold">{facultyName}</span>
                  </div>
                  <div>
                    <span className="text-fg-muted text-[10px] uppercase block">CALL TYPE</span>
                    <span className="text-fg-primary">
                      {item.grant_opportunity_details ? item.grant_opportunity_details.title : 'Direct PI Proposal'}
                    </span>
                  </div>
                  <div>
                    <span className="text-fg-muted text-[10px] uppercase block">STATUS &amp; FEEDBACK</span>
                    <span className="text-fg-primary">
                      {item.review_notes || (item.status === 'APPROVED' ? 'Sanction Confirmed' : 'In Docket Processing')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Propose Docket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <Badge variant="signal">NEW GRANT DOCKET</Badge>
                <span className="font-mono text-xs text-fg-muted">FACULTY PROPOSAL</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="p-6 space-y-4 overflow-y-auto">
              {submitError && (
                <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold">
                  ✓ Proposal docket submitted successfully!
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Research Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Gen Fault-Tolerant Edge Computing"
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Requested Amount (INR) *
                </label>
                <input
                  type="number"
                  required
                  min={10000}
                  placeholder="e.g. 2000000"
                  value={formData.requested_amount}
                  onChange={(e) => setFormData({ ...formData, requested_amount: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Executive Summary &amp; Scope
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly state objectives, key milestones, and anticipated academic/industrial impact..."
                  value={formData.executive_summary}
                  onChange={(e) => setFormData({ ...formData, executive_summary: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div className="pt-4 border-t border-border-hairline flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={submitting}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="signal" size="sm" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Submitting...
                    </>
                  ) : (
                    'Submit Proposal Docket'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </NodePageShell>
  );
}


