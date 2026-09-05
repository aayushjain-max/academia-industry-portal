'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge, Button } from '@portal/ui';
import { Icon } from '@/components/ui/icon';

export default function SkillPassportPage() {
  const [selectedCredential, setSelectedCredential] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [auditNotice, setAuditNotice] = useState<string | null>(null);

  const didString = 'did:sih:stu-8042-aarav-sharma-iitb-2025';

  const credentials = [
    {
      id: 'VC-SIH-9921',
      title: 'Python Core & Asynchronous Metaprogramming',
      score: '91.4%',
      issuer: 'HackerRank Enterprise Verification Pod',
      date: 'OCT 12, 2024',
      hash: '0x4a91c8...f201b9',
      merkleIndex: 'TREE_04 // LEAF_12',
      status: 'VERIFIED ON-CHAIN',
      signature: 'SIG_ED25519_8b991a0210f84a1...99e',
      skills: ['Asyncio', 'Metaclasses', 'Generators', 'Memory Optimization'],
    },
    {
      id: 'VC-SIH-8840',
      title: 'PostgreSQL Relational Optimization & Indexing',
      score: '84.0%',
      issuer: 'IIT Bombay Advanced Systems Lab',
      date: 'OCT 18, 2024',
      hash: '0x9b1772...c4081e',
      merkleIndex: 'TREE_04 // LEAF_14',
      status: 'VERIFIED ON-CHAIN',
      signature: 'SIG_ED25519_23f98c114e9100...aa4',
      skills: ['Query Planning', 'EXPLAIN ANALYZE', 'B-Tree & GIN', 'Partitioning'],
    },
    {
      id: 'VC-SIH-7014',
      title: 'Smart India Hackathon 2024 Finalist Laurels',
      score: 'TIER-1',
      issuer: 'Ministry of Education & AICTE Consortium',
      date: 'SEP 28, 2024',
      hash: '0x804200...91bf20',
      merkleIndex: 'TREE_02 // LEAF_01',
      status: 'SOVEREIGN NATIONAL STAMP',
      signature: 'SIG_GOVT_AICTE_771890...41c',
      skills: ['Problem Solving', 'Architecture Defense', 'Autonomous Systems'],
    },
    {
      id: 'VC-SIH-6120',
      title: 'Cloud Native Docker & Container Architectures',
      score: '65.0%',
      issuer: 'Cloud Native Computing Foundation (CNCF) Campus Node',
      date: 'OCT 22, 2024',
      hash: '0x1c3029...77b819',
      merkleIndex: 'TREE_05 // LEAF_08',
      status: 'PROVISIONAL ATTESTATION',
      signature: 'SIG_ED25519_400192e...771',
      skills: ['Dockerfiles', 'Multi-stage Builds', 'Bridge Networking'],
    },
  ];

  const handleCopyDid = () => {
    navigator.clipboard.writeText(didString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAudit = (hash: string) => {
    setAuditNotice(`Merkle path verified for ${hash}: 0 critical state anomalies.`);
    setTimeout(() => setAuditNotice(null), 4000);
  };

  return (
    <div className="space-y-space-lg">
      {/* Toast Alert */}
      {auditNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-border-strong text-on-primary border border-primary px-space-md py-space-sm shadow-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-bg-surface">
            CHAIN ATTESTATION:
          </span>
          <span className="font-body-sm text-body-sm text-neutral-200">{auditNotice}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="pb-space-md border-b border-border-strong flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-label-mono text-label-mono text-fg-muted uppercase">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong" />
            <span>W3C VERIFIABLE CREDENTIALS v2.0</span>
            <span className="text-border-hairline">|</span>
            <span className="text-status-success font-semibold">ALL SEALS VALID</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg uppercase tracking-tight text-fg-primary mt-1 font-extrabold">
            Sovereign Skill Passport &amp; Ledger
          </h1>
          <p className="text-body-md text-body-md text-fg-muted">
            Cryptographically anchored skill credentials with immutable Merkle proofs, verifiable by national industry partners.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyDid}
            className="font-label-mono text-xs"
          >
            <Icon name="token" size={14} className="mr-1.5" />
            <span>{copied ? 'DID Copied!' : 'Copy DID String'}</span>
          </Button>
          <Button
            variant="signal"
            size="sm"
            onClick={() => handleAudit('ROOT_MERKLE_TREE_04')}
            className="font-label-mono text-xs"
          >
            <Icon name="verified_user" size={14} className="mr-1.5" />
            <span>Verify Merkle Tree</span>
          </Button>
        </div>
      </div>

      {/* DID Identity Card */}
      <div className="bg-bg-surface border-2 border-border-strong p-space-lg shadow-[4px_4px_0px_0px_#18181B]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border-b border-border-hairline pb-space-md mb-space-md">
          <div className="space-y-1">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-widest block">
              DECENTRALIZED IDENTIFIER (DID)
            </span>
            <div className="font-mono text-sm md:text-base font-bold text-fg-primary break-all">
              {didString}
            </div>
            <span className="font-label-mono text-xs text-status-success flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
              STATUS: IMMUTABLE ANCHOR // NATIONAL SIH LEDGER
            </span>
          </div>

          <div className="p-3 bg-bg-canvas border border-border-strong text-center shrink-0">
            <span className="font-label-mono text-[10px] text-fg-muted block uppercase mb-1">
              TOTAL SEALS
            </span>
            <span className="font-metric-tabular text-3xl font-bold text-fg-primary tnum">04</span>
            <span className="font-label-mono text-[9px] text-status-success block font-bold mt-0.5">
              100% AUDIT PASS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md font-mono text-xs">
          <div>
            <span className="text-fg-muted block text-[10px] uppercase">CONSORTIUM</span>
            <span className="font-bold text-fg-primary">AICTE-SIH 2024</span>
          </div>
          <div>
            <span className="text-fg-muted block text-[10px] uppercase">SIGNING ALGO</span>
            <span className="font-bold text-fg-primary">Ed25519 SHA-256</span>
          </div>
          <div>
            <span className="text-fg-muted block text-[10px] uppercase">LAST STAMP</span>
            <span className="font-bold text-fg-primary">22 OCT 2024</span>
          </div>
          <div>
            <span className="text-fg-muted block text-[10px] uppercase">DIGILOCKER ABC</span>
            <span className="font-bold text-status-success">SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="space-y-space-md">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal" />
            <h2 className="font-headline-sm uppercase font-bold text-fg-primary">
              Attested Verifiable Credentials ({credentials.length})
            </h2>
          </div>
          <span className="font-label-mono text-xs text-fg-muted">SORT: ISSUANCE DATE (DESC)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="bg-bg-surface border border-border-strong p-space-lg flex flex-col justify-between hover:shadow-[3px_3px_0px_0px_#18181B] transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-hairline pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-fg-muted">{cred.id}</span>
                    <Badge variant={cred.score === 'TIER-1' ? 'signal' : 'success'}>
                      {cred.score}
                    </Badge>
                  </div>
                  <span className="font-label-mono text-[10px] text-status-success font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
                    {cred.status}
                  </span>
                </div>

                <h3 className="font-headline-sm text-body-lg font-bold text-fg-primary mb-1">
                  {cred.title}
                </h3>
                <span className="font-label-mono text-xs text-fg-muted block mb-3">
                  ISSUED BY: {cred.issuer}
                </span>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cred.skills.map((s: string) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-bg-subtle border border-border-hairline font-label-mono text-[10px] uppercase text-fg-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="p-2.5 bg-bg-canvas border border-border-hairline font-mono text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-fg-muted">BLOCK HASH:</span>
                    <span className="font-bold text-fg-primary">{cred.hash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fg-muted">MERKLE LEAF:</span>
                    <span className="text-fg-secondary">{cred.merkleIndex}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-hairline">
                <span className="font-label-mono text-[11px] text-fg-muted">{cred.date}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAudit(cred.hash)}
                    className="font-label-mono text-xs"
                  >
                    Audit Proof
                  </Button>
                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => setSelectedCredential(cred)}
                    className="font-label-mono text-xs"
                  >
                    Inspect JSON-LD
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credential JSON-LD Inspection Dialog */}
      <Dialog open={!!selectedCredential} onOpenChange={(open) => !open && setSelectedCredential(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifiable Credential Docket</DialogTitle>
            <DialogDescription>
              {selectedCredential?.title} // ID: {selectedCredential?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedCredential && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-bg-canvas border border-border-hairline space-y-1.5 max-h-60 overflow-y-auto">
                <div className="text-status-success">// W3C VERIFIABLE CREDENTIAL v2.0 DOCKET</div>
                <div>{`{`}</div>
                <div className="pl-4 text-fg-secondary">{`"@context": ["https://www.w3.org/2018/credentials/v1"],`}</div>
                <div className="pl-4 text-fg-secondary">{`"id": "urn:uuid:${selectedCredential.id}",`}</div>
                <div className="pl-4 text-fg-secondary">{`"type": ["VerifiableCredential", "TechnicalSkillAssertion"],`}</div>
                <div className="pl-4 text-fg-secondary">{`"issuer": "${selectedCredential.issuer}",`}</div>
                <div className="pl-4 text-fg-secondary">{`"issuanceDate": "${selectedCredential.date}",`}</div>
                <div className="pl-4 text-fg-secondary">{`"credentialSubject": {`}</div>
                <div className="pl-8 text-accent-signal">{`"id": "${didString}",`}</div>
                <div className="pl-8 text-white">{`"skill": "${selectedCredential.title}",`}</div>
                <div className="pl-8 text-white">{`"score": "${selectedCredential.score}"`}</div>
                <div className="pl-4 text-fg-secondary">{`},`}</div>
                <div className="pl-4 text-fg-secondary">{`"proof": {`}</div>
                <div className="pl-8 text-neutral-400">{`"type": "Ed25519Signature2020",`}</div>
                <div className="pl-8 text-neutral-400">{`"merkleRoot": "${selectedCredential.hash}",`}</div>
                <div className="pl-8 text-neutral-400">{`"signatureValue": "${selectedCredential.signature}"`}</div>
                <div className="pl-4 text-fg-secondary">{`}`}</div>
                <div>{`}`}</div>
              </div>

              <div className="flex justify-between items-center text-fg-muted font-label-mono text-[10px]">
                <span>STATUS: IMMUTABLE ANCHOR</span>
                <span className="text-status-success font-bold">SHA-256 MATCH CONFIRMED</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose>
              <Button variant="outline" size="sm">Close Inspector</Button>
            </DialogClose>
            <Button
              variant="signal"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(selectedCredential, null, 2));
                setSelectedCredential(null);
                setAuditNotice('JSON-LD raw signature copied to clipboard.');
              }}
            >
              Copy Raw JSON-LD
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
