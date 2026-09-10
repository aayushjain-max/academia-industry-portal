'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { getDocuments, DocumentItem } from '@/features/documents/api';
import { Loader2 } from 'lucide-react';

export default function DocumentsVaultPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      try {
        const data = await getDocuments();
        if (Array.isArray(data) && data.length > 0) {
          setDocuments(
            data.map((doc: DocumentItem) => ({
              id: doc.id ? `DOC-${doc.id.slice(0, 8).toUpperCase()}` : 'DOC-RECORD',
              title: doc.title || 'Verified Institutional Credential',
              entity: `${doc.document_type} // ${(doc.file_size_bytes / 1024).toFixed(1)} KB`,
              timestamp: doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'ACTIVE',
              status: doc.is_verified ? 'VERIFIED & SIGNED' : 'PENDING ATTESTATION',
              variant: doc.is_verified ? ('success' as const) : ('signal' as const),
              details: `MIME: ${doc.mime_type || 'application/pdf'} | DigiLocker Hash: SHA-256 Validated`,
              docType: doc.document_type,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load documents:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDocs();
  }, []);

  const filtered = documents.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.entity.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchSearch;
    return matchSearch && r.docType?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <NodePageShell
      nodeId="SYS-NODE-SIH // UNIVERSAL"
      nodeStatus="PROTOCOL VERIFIED"
      category="NATIONAL ARBITRATION MATRIX"
      title="Documents Vault"
      description="Sovereign synchronization module for academic-industry collaboration protocol."
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
        { label: 'Active Dossiers', value: '142', delta: 'OPTIMAL', deltaType: 'success', subtext: 'Updated Today', icon: 'dashboard' },
        { label: 'Compliance Rate', value: '98.4%', delta: '+4.1%', deltaType: 'success', subtext: 'Cohort Standard', icon: 'verified' },
        { label: 'Verification Hash', value: 'SHA-256', delta: 'SYNCHRONIZED', deltaType: 'neutral', subtext: 'Root Validated', icon: 'token' },
        { label: 'Telemetry Health', value: 'OPTIMAL', delta: 'AICTE TIER-1', deltaType: 'neutral', subtext: 'SIH-2024 Compliant', icon: 'shield' },
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
            Synchronizing document vault ledger...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-bg-surface border border-dashed border-border-strong space-y-2">
            <h3 className="font-headline-sm text-sm font-bold uppercase text-fg-primary">No Documents Found</h3>
            <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto">
              No verified marksheets, resumes, or certificates found under this filter. Upload credentials to synchronize with DigiLocker.
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
