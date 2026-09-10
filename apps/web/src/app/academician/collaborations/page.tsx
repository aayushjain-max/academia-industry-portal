'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getCollaborations,
  createCollaboration,
  IndustryCollaboration,
} from '@/features/academicians/api';
import { Loader2, Plus, X, Search, Building2, Handshake, DollarSign, Calendar, FileText } from 'lucide-react';

export default function AcademicianCollaborationsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [collaborations, setCollaborations] = useState<IndustryCollaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Collaboration Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    title: '',
    collaboration_type: 'RESEARCH',
    description: '',
    contract_value: '',
    start_date: '',
    status: 'ACTIVE',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCollaborations();
      setCollaborations(res.results || []);
    } catch (err: any) {
      console.error('Failed to load collaborations:', err);
      setError('Unable to synchronize industry collaborations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name || !formData.title) {
      setSubmitError('Partner company and collaboration title are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await createCollaboration({
        company_name: formData.company_name,
        title: formData.title,
        collaboration_type: formData.collaboration_type as any,
        description: formData.description,
        contract_value: formData.contract_value ? Number(formData.contract_value) : 0,
        start_date: formData.start_date || undefined,
        status: formData.status as any,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          company_name: '',
          title: '',
          collaboration_type: 'RESEARCH',
          description: '',
          contract_value: '',
          start_date: '',
          status: 'ACTIVE',
        });
        loadData();
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to register collaboration.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalFunding = collaborations.reduce((acc, c) => acc + (Number(c.contract_value) || 0), 0);
  const activeCount = collaborations.filter((c) => c.status === 'ACTIVE' || c.status === 'APPROVED').length;
  const mouCount = collaborations.filter((c) => c.status === 'APPROVED' || c.status === 'ACTIVE').length;

  const filtered = collaborations.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'all') return matchSearch;
    return matchSearch && c.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">ACTIVE ENGAGEMENT</Badge>;
      case 'APPROVED':
        return <Badge variant="signal">MoU SANCTIONED</Badge>;
      case 'PROPOSED':
        return <Badge variant="warning">PROPOSAL UNDER AUDIT</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline">COMPLETED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // COLLABORATIONS"
      nodeStatus="INSTITUTIONALLY SANCTIONED"
      category="INDUSTRY PARTNERSHIPS & BILATERAL MOUS"
      title="Industry Collaborations & Bilateral MoUs"
      description="Registry of corporate research alliances, sponsored lab infrastructure, joint development agreements, and bilateral faculty-industry exchange pods."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} className="mr-1" />
            Register Industry MoU
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <Icon name="refresh" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      }
      kpis={[
        {
          label: 'Active Alliances',
          value: String(activeCount),
          delta: `${collaborations.length} TOTAL ALLIANCES`,
          deltaType: 'success',
          subtext: 'Bilateral Partnerships',
          icon: 'handshake',
        },
        {
          label: 'MoU Commitments',
          value: String(mouCount),
          delta: 'SIGNATURES SEALED',
          deltaType: 'neutral',
          subtext: 'Institutional Governance',
          icon: 'verified',
        },
        {
          label: 'Bilateral Capital',
          value: totalFunding > 0 ? `₹${(totalFunding / 10000000).toFixed(2)} Cr` : '₹0.00',
          delta: 'SPONSORED R&D',
          deltaType: 'success',
          subtext: 'Industry Inflow',
          icon: 'token',
        },
        {
          label: 'Engagement Velocity',
          value: '100%',
          delta: 'AICTE TIER-1',
          deltaType: 'neutral',
          subtext: 'Compliance Standard',
          icon: 'shield',
        },
      ]}
    >
      {/* Filter and Search Bar */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'ACTIVE', 'APPROVED', 'PROPOSED', 'COMPLETED'].map((tab) => (
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
              {tab === 'all' ? `All Alliances (${collaborations.length})` : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by corporate partner or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Collaborations List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Synchronizing Bilateral MoU Ledger...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <Handshake className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Industry Collaborations Found</p>
          <p className="font-body-sm mt-1 text-xs">No active bilateral industry agreements match the filter criteria.</p>
          <Button variant="signal" size="sm" className="mt-4" onClick={() => setIsModalOpen(true)}>
            Register First Collaboration
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((item) => {
            const fundingFormatted = Number(item.contract_value) > 0
              ? `₹${(Number(item.contract_value) / 100000).toLocaleString()} Lakhs`
              : 'Non-Monetary / Exchange';
            const mouDateFormatted = item.start_date
              ? new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'Under Drafting';

            return (
              <Card key={item.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      {getStatusBadge(item.status)}
                      <span className="font-mono text-fg-muted">#MOU-{item.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {item.company_name}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="text-body-sm text-fg-muted font-sans line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span>
                        TYPE: <strong className="text-fg-primary">{item.collaboration_type.replace('_', ' ')}</strong>
                      </span>
                      <span>
                        FUNDING: <strong className="text-status-success font-bold font-metric-tabular">{fundingFormatted}</strong>
                      </span>
                      <span>
                        START DATE: <strong className="text-fg-primary">{mouDateFormatted}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <Badge variant="signal">{item.collaboration_type}</Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-xl shadow-[6px_6px_0px_0px_#18181B] max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-border-hairline flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <Badge variant="signal">NEW INDUSTRY COLLABORATION</Badge>
                <span className="font-mono text-xs text-fg-muted">BILATERAL MOU</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-fg-muted hover:text-fg-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
              {submitError && (
                <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold">
                  ✓ Industry collaboration docket registered successfully!
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Partner Corporate Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy Services / NVIDIA Enterprise"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Collaboration Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Center of Excellence for Advanced Edge Robotics"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Collaboration Type
                  </label>
                  <select
                    value={formData.collaboration_type}
                    onChange={(e) => setFormData({ ...formData, collaboration_type: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary"
                  >
                    <option value="RESEARCH">Joint Research &amp; IP</option>
                    <option value="CONSULTANCY">Industry Consultancy</option>
                    <option value="TRAINING">Corporate Training</option>
                    <option value="INTERNSHIP">Faculty / Student Internship</option>
                    <option value="INDUSTRY_PROJECT">Industry Sponsored Project</option>
                    <option value="CURRICULUM">Curriculum Alignment</option>
                    <option value="WORKSHOP">Technical Workshop</option>
                    <option value="FACULTY_DEVELOPMENT">Faculty Development</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="APPROVED">MoU Signed / Approved</option>
                    <option value="PROPOSED">Proposed / In Discussion</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Contract Value (INR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="e.g. 1500000"
                    value={formData.contract_value}
                    onChange={(e) => setFormData({ ...formData, contract_value: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Start / Effective Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Scope &amp; Strategic Deliverables
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline key resource commitments, research objectives, and institutional benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Registering...
                    </>
                  ) : (
                    'Register Collaboration'
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

