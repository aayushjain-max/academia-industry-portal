'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getConsultancies,
  createConsultancy,
  ConsultancyProject,
} from '@/features/academicians/api';
import { Loader2, Plus, X, Search, Building2, DollarSign, Clock, Briefcase, FileText } from 'lucide-react';

export default function AcademicianConsultancyPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [contracts, setContracts] = useState<ConsultancyProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New Contract Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    client_company: '',
    project_title: '',
    description: '',
    contract_value: '',
    institutional_share_pct: '30.00',
    hours_delivered: '0',
    hours_allocated: '100',
    start_date: '',
    end_date: '',
    status: 'ACTIVE',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getConsultancies();
      setContracts(res.results || []);
    } catch (err: any) {
      console.error('Failed to load consultancy contracts:', err);
      setError('Unable to synchronize corporate consultancy contracts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_company || !formData.project_title || !formData.contract_value) {
      setSubmitError('Client company, project title, and contract value are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await createConsultancy({
        client_company: formData.client_company,
        project_title: formData.project_title,
        description: formData.description,
        contract_value: Number(formData.contract_value),
        institutional_share_pct: Number(formData.institutional_share_pct),
        hours_delivered: Number(formData.hours_delivered) || 0,
        hours_allocated: Number(formData.hours_allocated) || 100,
        start_date: formData.start_date || undefined,
        end_date: formData.end_date || undefined,
        status: formData.status as any,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          client_company: '',
          project_title: '',
          description: '',
          contract_value: '',
          institutional_share_pct: '30.00',
          hours_delivered: '0',
          hours_allocated: '100',
          start_date: '',
          end_date: '',
          status: 'ACTIVE',
        });
        loadData();
      }, 1500);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to register consultancy contract.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalValue = contracts.reduce((acc, c) => acc + (Number(c.contract_value) || 0), 0);
  const totalHoursDelivered = contracts.reduce((acc, c) => acc + (Number(c.hours_delivered) || 0), 0);
  const activeCount = contracts.filter((c) => c.status === 'ACTIVE' || c.status === 'CONTRACT').length;

  const filtered = contracts.filter((c) => {
    const matchSearch =
      c.project_title.toLowerCase().includes(search.toLowerCase()) ||
      c.client_company.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'all') return matchSearch;
    return matchSearch && c.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'CONTRACT':
        return <Badge variant="signal">ACTIVE CONSULTANCY</Badge>;
      case 'MILESTONES_IN_REVIEW':
        return <Badge variant="warning">MILESTONES IN REVIEW</Badge>;
      case 'COMPLETED':
        return <Badge variant="success">COMPLETED & AUDITED</Badge>;
      case 'PROPOSAL':
      case 'LEAD':
        return <Badge variant="outline">PROPOSAL STAGE</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // CONSULTANCY"
      nodeStatus="INSTITUTIONALLY SANCTIONED"
      category="INDUSTRIAL CONSULTANCY & CORPORATE R&D CONTRACTS"
      title="Industrial Consultancy & Corporate Advisory"
      description="Institutional registry of authorized industry consultancy contracts, technical advisory retainers, and bilateral expert engagements governed by institutional R&D norms."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="signal" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} className="mr-1" />
            Register Corporate Contract
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <Icon name="refresh" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      }
      kpis={[
        {
          label: 'Active Retainers',
          value: String(activeCount),
          delta: `${contracts.length} TOTAL CONTRACTS`,
          deltaType: 'success',
          subtext: 'Direct Corporate Billing',
          icon: 'token',
        },
        {
          label: 'Total Contract Value',
          value: totalValue > 0 ? `₹${(totalValue / 100000).toFixed(1)} Lakhs` : '₹0.00',
          delta: 'SANCTIONED REVENUE',
          deltaType: 'neutral',
          subtext: 'Dean R&D Governed',
          icon: 'token',
        },
        {
          label: 'Institutional Share',
          value: '30%',
          delta: 'COMPLIANT',
          deltaType: 'neutral',
          subtext: 'Institutional Overheads',
          icon: 'verified',
        },
        {
          label: 'Hours Delivered',
          value: `${totalHoursDelivered} HRS`,
          delta: 'ON SCHEDULE',
          deltaType: 'success',
          subtext: 'Faculty Time Ledger',
          icon: 'clock',
        },
      ]}
    >
      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'ACTIVE', 'CONTRACT', 'PROPOSAL', 'COMPLETED'].map((tab) => (
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
              {tab === 'all' ? `All Contracts (${contracts.length})` : tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by client company or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Contracts List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Corporate Consultancy Contracts...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <Briefcase className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Consultancy Contracts Found</p>
          <p className="font-body-sm mt-1 text-xs">No corporate advisory engagements match the current filter.</p>
          <Button variant="signal" size="sm" className="mt-4" onClick={() => setIsModalOpen(true)}>
            Register First Contract
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((c) => {
            const valueFormatted = c.contract_value
              ? `₹${(Number(c.contract_value) / 100000).toLocaleString()} Lakhs`
              : '₹0';
            const progress = c.hours_allocated > 0
              ? Math.min(100, Math.round((c.hours_delivered / c.hours_allocated) * 100))
              : 0;

            return (
              <Card key={c.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      {getStatusBadge(c.status)}
                      <span className="font-mono text-fg-muted">#CONS-{c.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {c.client_company}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {c.project_title}
                    </h2>

                    {c.description && (
                      <p className="text-body-sm text-fg-muted">
                        Scope: {c.description}
                      </p>
                    )}

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span>
                        CONTRACT VALUE: <strong className="text-status-success font-bold font-metric-tabular">{valueFormatted}</strong>
                      </span>
                      <span>
                        INSTITUTION SHARE: <strong className="text-fg-primary">{c.institutional_share_pct}%</strong>
                      </span>
                      <span>
                        TIME BILLED: <strong className="text-fg-primary">{c.hours_delivered} / {c.hours_allocated} Hours ({progress}%)</strong>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-bg-subtle h-1.5 border border-border-hairline mt-1">
                      <div
                        className="bg-portal-primary h-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <Badge variant="outline">{c.hours_delivered}h Delivered</Badge>
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
                <Badge variant="signal">NEW CONSULTANCY CONTRACT</Badge>
                <span className="font-mono text-xs text-fg-muted">CORPORATE ADVISORY</span>
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
                  ✓ Corporate consultancy registered successfully!
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Client Corporate Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TechNova Autonomous Labs"
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Project / Advisory Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Microservices Architecture Audit"
                  value={formData.project_title}
                  onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Contract Value (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={10000}
                    placeholder="e.g. 3200000"
                    value={formData.contract_value}
                    onChange={(e) => setFormData({ ...formData, contract_value: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Institutional Share (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={formData.institutional_share_pct}
                    onChange={(e) => setFormData({ ...formData, institutional_share_pct: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Hours Delivered
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.hours_delivered}
                    onChange={(e) => setFormData({ ...formData, hours_delivered: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                    Allocated Hours
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.hours_allocated}
                    onChange={(e) => setFormData({ ...formData, hours_allocated: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-fg-primary font-bold mb-1">
                  Scope of Work &amp; Deliverables
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe technical deliverables, review schedules, and IP terms..."
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
                    'Register Contract'
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

