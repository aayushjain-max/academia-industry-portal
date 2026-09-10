'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getGrantOpportunities,
  submitGrantApplication,
  GrantOpportunity,
} from '@/features/academicians/api';
import { Loader2, Plus, X, Search, Building2, Calendar, DollarSign, FileText } from 'lucide-react';

export default function AcademicianOpportunitiesPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [opportunities, setOpportunities] = useState<GrantOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Proposal Submission Modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<GrantOpportunity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    project_title: '',
    requested_amount: '',
    executive_summary: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getGrantOpportunities();
      setOpportunities(res.results || []);
    } catch (err: any) {
      console.error('Failed to load grant opportunities:', err);
      setError('Unable to synchronize live grant opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenSubmit = (opp?: GrantOpportunity) => {
    setSelectedOpportunity(opp || null);
    setProposalForm({
      project_title: opp ? `Research Proposal: ${opp.title}` : '',
      requested_amount: opp?.total_funding ? String(opp.total_funding) : '',
      executive_summary: '',
    });
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitModalOpen(true);
  };

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.project_title || !proposalForm.requested_amount) {
      setSubmitError('Project title and requested amount are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await submitGrantApplication({
        project_title: proposalForm.project_title,
        grant_opportunity_id: selectedOpportunity?.id,
        requested_amount: Number(proposalForm.requested_amount),
        executive_summary: proposalForm.executive_summary,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsSubmitModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit grant proposal. Please verify your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  const agencies = Array.from(new Set(opportunities.map((o) => o.funding_agency).filter(Boolean)));
  const totalFundingPool = opportunities.reduce((acc, o) => acc + (Number(o.total_funding) || 0), 0);
  const openCallsCount = opportunities.filter((o) => o.is_active).length;

  const filtered = opportunities.filter((op) => {
    const matchSearch =
      op.title.toLowerCase().includes(search.toLowerCase()) ||
      (op.funding_agency && op.funding_agency.toLowerCase().includes(search.toLowerCase())) ||
      (op.category && op.category.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'all') return matchSearch;
    if (filter === 'OPEN') return matchSearch && op.is_active;
    return matchSearch && op.category === filter;
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // GRANTS"
      nodeStatus="CENTRAL SYNCHRONIZED"
      category="RESEARCH GRANTS & SPONSORED R&D REQUISITIONS"
      title="R&D Grant & Funding Opportunities"
      description="Centrally synchronized directory of sanctioned bilateral government, institutional, and corporate research grants with direct Principal Investigator application channels."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={() => handleOpenSubmit()}>
            <Plus size={14} className="mr-1" />
            Submit Joint Proposal
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <Icon name="refresh" size={14} className="mr-1" />
            Refresh Opportunities
          </Button>
        </div>
      }
      kpis={[
        {
          label: 'Total Funding Pool',
          value: totalFundingPool > 0 ? `₹${(totalFundingPool / 10000000).toFixed(2)} Cr` : '₹0.00',
          delta: `${opportunities.length} TOTAL CALLS`,
          deltaType: 'success',
          subtext: `${agencies.length} Sponsoring Agencies`,
          icon: 'token',
        },
        {
          label: 'Open Requisitions',
          value: String(openCallsCount),
          delta: 'ACTIVE NOW',
          deltaType: 'success',
          subtext: 'Accepting PI Proposals',
          icon: 'article',
        },
        {
          label: 'Sponsoring Bodies',
          value: String(agencies.length),
          delta: 'GOVT & PSUs',
          deltaType: 'neutral',
          subtext: 'DST, ISRO, DRDO & Industry',
          icon: 'hub',
        },
        {
          label: 'Institutional Eligibility',
          value: '100%',
          delta: 'AICTE VERIFIED',
          deltaType: 'success',
          subtext: 'Direct Submission Enabled',
          icon: 'verified',
        },
      ]}
    >
      {/* Filter and Search Bar */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'OPEN'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={
                'px-3 py-1 font-label-mono text-xs uppercase border transition-colors ' +
                (filter === tab
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary')
              }
            >
              {tab === 'all' ? `All Calls (${opportunities.length})` : 'Active Calls'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title, agency, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Grant Cards List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Synchronizing Grant Ledger from National Databases...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <FileText className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Grant Opportunities Found</p>
          <p className="font-body-sm mt-1 text-xs">No active grant requisitions match the selected filters or search parameters.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilter('all'); setSearch(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((item) => {
            const fundingFormatted = item.total_funding
              ? `₹${(Number(item.total_funding) / 100000).toLocaleString()} Lakhs`
              : 'Variable / Open';
            const deadlineFormatted = item.deadline
              ? new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'OPEN CALL';

            return (
              <Card key={item.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-[11px]">
                      <Badge variant={item.is_active ? 'signal' : 'default'}>
                        {item.is_active ? 'ACTIVE CALL' : 'ARCHIVED'}
                      </Badge>
                      <span className="text-fg-muted font-mono">{item.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {item.funding_agency}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="font-body-sm text-xs text-fg-secondary line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span className="flex items-center gap-1">
                        <DollarSign size={13} className="text-status-success" />
                        TOTAL GRANT: <strong className="text-status-success font-bold font-metric-tabular">{fundingFormatted}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-fg-muted" />
                        DEADLINE: <strong className="text-status-danger font-semibold">{deadlineFormatted}</strong>
                      </span>
                      {item.duration_months && (
                        <span>
                          DURATION: <strong className="text-fg-primary">{item.duration_months} Months</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <Button variant="signal" size="sm" onClick={() => handleOpenSubmit(item)}>
                      Apply as PI
                    </Button>
                    {item.guidelines_url && (
                      <a
                        href={item.guidelines_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-border-strong text-xs font-mono uppercase text-fg-primary hover:bg-bg-subtle"
                      >
                        <FileText size={12} />
                        Guidelines
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Submit Proposal Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <Badge variant="signal">PI PROPOSAL SUBMISSION</Badge>
                <span className="font-mono text-xs text-fg-muted">
                  {selectedOpportunity ? selectedOpportunity.funding_agency : 'CENTRAL GRANT LEDGER'}
                </span>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="p-6 space-y-4 overflow-y-auto">
              {submitError && (
                <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold">
                  ✓ Grant proposal docket submitted successfully! Forwarded for peer &amp; institutional review.
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-muted mb-1">
                  Selected Grant Call
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedOpportunity ? `${selectedOpportunity.title} (${selectedOpportunity.funding_agency})` : 'General R&D Grant Call'}
                  className="w-full bg-bg-canvas border border-border-hairline px-3 py-2 text-xs font-mono text-fg-muted"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Research Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Edge Vision for UAV Navigation"
                  value={proposalForm.project_title}
                  onChange={(e) => setProposalForm({ ...proposalForm, project_title: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Requested Budget (INR) *
                </label>
                <input
                  type="number"
                  required
                  min={10000}
                  placeholder="e.g. 2500000"
                  value={proposalForm.requested_amount}
                  onChange={(e) => setProposalForm({ ...proposalForm, requested_amount: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Executive Summary &amp; Methodology
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline the problem statement, proposed methodology, deliverables, and institutional infrastructure..."
                  value={proposalForm.executive_summary}
                  onChange={(e) => setProposalForm({ ...proposalForm, executive_summary: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div className="pt-4 border-t border-border-hairline flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={submitting}
                  onClick={() => setIsSubmitModalOpen(false)}
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

