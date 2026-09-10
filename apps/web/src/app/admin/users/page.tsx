'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { apiClient } from '@/lib/api/client';
import { Loader2 } from 'lucide-react';

export default function AdminUsersPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res: any = await apiClient.get('/users/');
        const list = Array.isArray(res) ? res : res?.results || [];
        if (list.length > 0) {
          setUsers(
            list.map((u: any) => ({
              id: u.id ? `USR-${u.id.slice(0, 8).toUpperCase()}` : 'USR-NODE',
              title: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
              entity: `${u.email} // Role: ${u.role}`,
              timestamp: u.created_at ? new Date(u.created_at).toLocaleDateString() : 'ACTIVE',
              status: u.is_active ? 'ACTIVE NODE' : 'SUSPENDED',
              variant: u.is_active ? ('success' as const) : ('danger' as const),
              role: u.role,
              details: `Email Verified: ${u.is_email_verified ? 'YES' : 'NO'} | Onboarding: ${u.onboarding_completed ? 'COMPLETE' : 'PENDING'} | Phone: ${u.phone_number || 'N/A'}`,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filtered = users.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.entity.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchSearch;
    return matchSearch && r.role?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <NodePageShell
      nodeId="GOV-NATIONAL-SIH // REGISTRY ROOT"
      nodeStatus="APEX SOVEREIGN ROOT"
      category="GOVERNANCE // APEX PORTAL ARBITRATION"
      title="Users"
      description="Super Admin - Users management."
      actions={
        <>
          <Button variant="signal" size="sm">
            <Icon name="upload" size={14} className="mr-1" />
            Synchronize Docket
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="download" size={14} className="mr-1" />
            Export Audit Ledger
          </Button>
        </>
      }
      kpis={[
        { label: 'Active Nodes', value: '3,344', delta: 'OPTIMAL', deltaType: 'success', subtext: 'Updated Today', icon: 'dashboard' },
        { label: 'National Compliance', value: '99.8%', delta: '+4.1%', deltaType: 'success', subtext: 'Cohort Standard', icon: 'verified' },
        { label: 'System Health', value: '100%', delta: 'SYNCHRONIZED', deltaType: 'neutral', subtext: 'Root Validated', icon: 'token' },
        { label: 'Cryptographic Root', value: '0x7E31...A92F', delta: 'AICTE TIER-1', deltaType: 'neutral', subtext: 'SIH-2024 Compliant', icon: 'shield' },
      ]}
    >
      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'active', 'archived'].map((tab) => (
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
              {tab === 'all' ? 'All Telemetry (03)' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter docket reference or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Icon name="search" size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Dockets Feed */}
      <div className="space-y-space-sm">
        {loading ? (
          <div className="p-12 text-center font-mono text-xs text-fg-muted bg-bg-surface border border-border-hairline">
            Synchronizing apex user registry...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-2">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Registered Users Found</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              No authenticated users match the selected role or keyword filter in the national arbitration matrix.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <Card key={item.id} className="hover:border-border-strong transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                    <Badge variant={item.variant}>{item.status}</Badge>
                    <span className="font-mono text-fg-muted">{item.id}</span>
                    <span className="text-border-hairline">|</span>
                    <span className="text-fg-primary font-bold">{item.entity}</span>
                  </div>

                  <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                    {item.title}
                  </h2>

                  <p className="text-body-sm text-fg-muted font-sans">
                    {item.details}
                  </p>

                  <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted">
                    <span>TIMESTAMP: <strong className="text-fg-primary">{item.timestamp}</strong></span>
                    <span>PROTOCOL: <strong className="text-status-success font-semibold">SIH-8042 COMPLIANT</strong></span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-2 shrink-0">
                  <Button variant="signal" size="sm">Inspect Telemetry</Button>
                  <Button variant="outline" size="sm">Audit Cryptographic Proof</Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </NodePageShell>
  );
}
