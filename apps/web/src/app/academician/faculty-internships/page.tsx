'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { opportunitiesApi, Opportunity } from '@/features/opportunities/api';
import { submitGrantApplication } from '@/features/academicians/api';
import { Loader2, Plus, X, Search, Building2, Calendar, DollarSign, MapPin, Briefcase, FileText } from 'lucide-react';

export default function AcademicianFacultyInternshipsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationNotes, setApplicationNotes] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await opportunitiesApi.getOpportunities();
      const rawList = Array.isArray(res) ? res : res?.results;
      setOpportunities(Array.isArray(rawList) ? rawList : []);
    } catch (err: any) {
      console.error('Failed to load faculty immersion opportunities:', err);
      setError('Unable to load faculty sabbatical and industrial immersion opportunities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenApply = (opp: Opportunity) => {
    setSelectedOpp(opp);
    setApplicationNotes('');
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsModalOpen(true);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpp) return;

    try {
      setSubmitting(true);
      setSubmitError(null);
      const hostName = selectedOpp.company_name || selectedOpp.industry?.company_name || 'Host Organization';
      await submitGrantApplication({
        project_title: `Faculty Sabbatical & Immersion: ${selectedOpp.title || 'Corporate Fellowship'}`,
        requested_amount: Number(selectedOpp.stipend_amount) || 120000,
        executive_summary: `Faculty Industrial Immersion Requisition for ${hostName}. Scope / Objective: ${applicationNotes || selectedOpp.description || 'Corporate research residency'}`,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit faculty immersion requisition.');
    } finally {
      setSubmitting(false);
    }
  };

  const oppList = Array.isArray(opportunities) ? opportunities : [];
  const companies = Array.from(
    new Set(
      oppList
        .map((o) => o?.company_name || o?.industry?.company_name)
        .filter(Boolean)
    )
  );
  const activeCount = oppList.filter((o) => o?.is_active || o?.status === 'ACTIVE').length;

  const filtered = oppList.filter((op) => {
    if (!op) return false;
    const title = (op.title || '').toLowerCase();
    const company = (op.company_name || op.industry?.company_name || '').toLowerCase();
    const desc = (op.description || '').toLowerCase();
    const query = search.toLowerCase();
    const matchSearch = title.includes(query) || company.includes(query) || desc.includes(query);
    const isActive = Boolean(op.is_active || op.status === 'ACTIVE');

    if (filter === 'all') return matchSearch;
    if (filter === 'ACTIVE') return matchSearch && isActive;
    return matchSearch && (op.opportunity_type === filter);
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // SABBATICALS"
      nodeStatus="INSTITUTIONALLY SANCTIONED"
      category="FACULTY INDUSTRIAL IMMERSIONS & SABBATICALS"
      title="Faculty Sabbaticals & Corporate Immersions"
      description="Portal for university faculty to undertake structured industrial sabbaticals, research residencies in enterprise labs, and corporate advisory fellowships."
      actions={
        <Button variant="outline" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" />
          Refresh Calls
        </Button>
      }
      kpis={[
        {
          label: 'Available Immersions',
          value: String(activeCount),
          delta: `${opportunities.length} TOTAL POSITIONS`,
          deltaType: 'success',
          subtext: 'Corporate Host Labs',
          icon: 'briefcase',
        },
        {
          label: 'Corporate Hosts',
          value: String(companies.length),
          delta: 'TIER-1 R&D',
          deltaType: 'neutral',
          subtext: 'Verified Tech Centers',
          icon: 'building',
        },
        {
          label: 'Institutional Clearance',
          value: '100%',
          delta: 'DEAN NOC READY',
          deltaType: 'success',
          subtext: 'Dean Faculty Affairs Norms',
          icon: 'verified',
        },
        {
          label: 'IP Protection',
          value: 'Bilateral',
          delta: 'STANDARD WIPO',
          deltaType: 'neutral',
          subtext: 'Joint Authorship & Royalty',
          icon: 'shield',
        },
      ]}
    >
      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'ACTIVE', 'INTERNSHIP', 'JOB'].map((tab) => (
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
              {tab === 'all' ? `All Positions (${opportunities.length})` : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by company, domain, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Synchronizing Corporate Immersion Calls...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <Briefcase className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Faculty Immersion Positions Found</p>
          <p className="font-body-sm mt-1 text-xs">No active corporate sabbatical calls match your search criteria.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilter('all'); setSearch(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((op) => {
            const stipendFormatted = op.stipend_amount || op.stipend_or_salary
              ? (typeof op.stipend_amount === 'number'
                  ? `₹${op.stipend_amount.toLocaleString()} / mo`
                  : String(op.stipend_or_salary || op.stipend_amount))
              : 'Corporate Deputation Allowance';
            const companyName = op.company_name || op.industry?.company_name || 'Host Enterprise';
            const opIdStr = String(op.id || '');
            const idBadge = opIdStr.length >= 8 ? opIdStr.slice(0, 8).toUpperCase() : (opIdStr.toUpperCase() || 'IMM');
            const isActive = Boolean(op.is_active || op.status === 'ACTIVE');

            return (
              <Card key={op.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      <Badge variant={isActive ? 'signal' : 'outline'}>
                        {isActive ? 'ACTIVE REQUISITION' : 'CLOSED'}
                      </Badge>
                      <span className="font-mono text-fg-muted">#IMM-{idBadge}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {companyName}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {op.title}
                    </h2>

                    <p className="text-body-sm text-fg-muted font-sans line-clamp-2">
                      {op.description}
                    </p>

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span>
                        STIPEND / HONORARIUM: <strong className="text-status-success font-bold font-metric-tabular">{stipendFormatted}</strong>
                      </span>
                      {op.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {op.location}
                        </span>
                      )}
                      {op.duration_weeks && (
                        <span>
                          DURATION: <strong className="text-fg-primary">{op.duration_weeks} Weeks</strong>
                        </span>
                      )}
                    </div>

                    {op.required_skills && op.required_skills.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {op.required_skills.map((skill: any, idx: number) => {
                          const name = typeof skill === 'string' ? skill : skill.name || 'Competency';
                          return (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-bg-subtle text-fg-secondary font-label-mono text-[10px] border border-border-hairline"
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <Button variant="signal" size="sm" onClick={() => handleOpenApply(op)}>
                      Apply for Deputation
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Application Modal */}
      {isModalOpen && selectedOpp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <Badge variant="signal">FACULTY SABBATICAL REQUISITION</Badge>
                <span className="font-mono text-xs text-fg-muted">{selectedOpp.company_name || selectedOpp.industry?.company_name || 'Host Entity'}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-6 space-y-4 overflow-y-auto">
              {submitError && (
                <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold">
                  ✓ Faculty sabbatical requisition submitted! Forwarded to Dean of Faculty Affairs and Corporate R&amp;D Director.
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-muted mb-1">
                  Host Program &amp; Entity
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedOpp.title || 'Faculty Immersion'} — ${selectedOpp.company_name || selectedOpp.industry?.company_name || 'Host Entity'}`}
                  className="w-full bg-bg-canvas border border-border-hairline px-3 py-2 text-xs font-mono text-fg-muted"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Proposed Research Focus &amp; Objectives
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your research expertise, proposed technical focus during the sabbatical, lab facilities required, and intended knowledge transfer back to your academic institution..."
                  value={applicationNotes}
                  onChange={(e) => setApplicationNotes(e.target.value)}
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
                    'Submit Sabbatical Requisition'
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

