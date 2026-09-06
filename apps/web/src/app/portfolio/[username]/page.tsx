import React from 'react';
import Link from 'next/link';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { PublicPortfolioData } from '@/types/student-features';

const SAMPLE_PORTFOLIO: PublicPortfolioData = {
  slug: 'aarav-sharma',
  full_name: 'Aarav Sharma',
  headline: 'Full Stack Engineer & Distributed Systems Enthusiast',
  bio: 'Computer Science undergraduate at IIT Bombay with deep focus on React/Next.js architectures, scalable PostgreSQL backends, and low-latency API design. AICTE Tier-01 verified candidate.',
  institution_name: 'IIT Bombay',
  degree_program: 'B.Tech in Computer Science and Engineering',
  graduation_year: 'Class of 2025',
  readiness_score: 74,
  passport_hash: '0x8042f9b1c7a24e93d18e5f29910c44ad11e4',
  verified_skills: [
    { name: 'TypeScript', score: 8.8, category: 'technical', verified: true },
    { name: 'Next.js / React', score: 8.5, category: 'technical', verified: true },
    { name: 'PostgreSQL & SQL Optimization', score: 7.2, category: 'technical', verified: true },
    { name: 'REST & API Architecture', score: 7.8, category: 'technical', verified: true },
    { name: 'System Architecture', score: 6.0, category: 'technical', verified: true },
    { name: 'Workplace Communication', score: 8.5, category: 'soft', verified: true },
    { name: 'Quantitative Logic & Reasoning', score: 8.5, category: 'soft', verified: true },
  ],
  projects: [
    {
      id: 'proj-01',
      title: 'Real-time Academia-Industry Telemetry Engine',
      description: 'Distributed synchronization engine connecting university talent dossiers with real-time enterprise job matrices using Next.js App Router, Supabase/PostgreSQL, and Groq LLM fast inference.',
      tags: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Groq AI'],
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      featured: true,
    },
    {
      id: 'proj-02',
      title: 'High-Throughput Asynchronous Stream Filter',
      description: 'Zero-copy telemetry ingestion pipeline processing 50,000 sensor frames/second with automated checksum verification and moving average computations.',
      tags: ['Python', 'AsyncIO', 'Redis', 'Docker'],
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      featured: true,
    },
    {
      id: 'proj-03',
      title: 'Merkle Tree Credential Attestation Protocol',
      description: 'Cryptographic student credential notary generating immutable SHA-256 verifiable passport proofs compliant with W3C DID standards.',
      tags: ['Cryptography', 'TypeScript', 'Node.js'],
      github_url: 'https://github.com',
      featured: false,
    },
  ],
  certificates: [
    {
      id: 'cert-01',
      title: 'AICTE Tier-01 Industry Readiness Certification',
      issuer: 'Apex Accreditation Bureau (Govt of India)',
      issued_at: 'AUG 2024',
      verification_id: 'AICTE-IND-2024-8042',
      credential_url: '#',
    },
    {
      id: 'cert-02',
      title: 'Verified Full-Stack Architect Specialist',
      issuer: 'National Skill Development Council (NSDC)',
      issued_at: 'JUL 2024',
      verification_id: 'NSDC-FSA-88190',
      credential_url: '#',
    },
  ],
  contact_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'aarav.sharma@iitb.ac.in',
  },
};

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const portfolio = SAMPLE_PORTFOLIO;

  return (
    <div className="min-h-screen bg-bg-canvas text-fg-primary p-space-md md:p-space-lg lg:p-space-xl font-body-md">
      <div className="max-w-5xl mx-auto space-y-space-lg">
        {/* Recruiter Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-border-strong pb-space-sm print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-status-success rounded-full" />
            <span className="font-label-mono text-xs uppercase tracking-widest text-fg-primary font-bold">
              ACADEMIA-INDUSTRY PORTAL // PUBLIC SCHOLAR DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-label-mono text-[11px] bg-accent-signal text-fg-primary px-2 py-0.5 border border-border-strong font-bold">
              AICTE ACCREDITED
            </span>
            <Link
              href="/"
              className="px-3 py-1 border border-border-hairline font-label-mono text-xs text-fg-secondary hover:text-fg-primary uppercase"
            >
              ← Portal Core
            </Link>
          </div>
        </div>

        {/* Hero Dossier Card */}
        <div className="border border-border-strong bg-bg-surface p-space-lg space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
            <div className="flex items-start gap-space-md">
              <div className="w-20 h-20 bg-fg-primary text-bg-surface border border-border-strong flex items-center justify-center font-headline-lg font-bold text-2xl shrink-0">
                AS
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-fg-primary">
                    {portfolio.full_name}
                  </h1>
                  <Badge variant="signal">VERIFIED SCHOLAR</Badge>
                </div>
                <p className="font-sans text-sm font-semibold text-fg-secondary">
                  {portfolio.headline}
                </p>
                <div className="font-label-mono text-xs text-fg-secondary flex items-center gap-2 flex-wrap pt-0.5 font-medium">
                  <span>🏛️ {portfolio.institution_name}</span>
                  <span>•</span>
                  <span>{portfolio.degree_program}</span>
                  <span>•</span>
                  <span>{portfolio.graduation_year}</span>
                </div>
              </div>
            </div>

            {/* IRI Readiness Gauge Badge */}
            <div className="p-space-sm bg-bg-canvas border border-border-strong text-center min-w-[160px] space-y-1">
              <span className="font-label-mono text-[10px] text-fg-secondary uppercase font-semibold block">
                INDUSTRY READINESS (IRI)
              </span>
              <div className="font-metric-tabular text-3xl font-bold text-status-success">
                {portfolio.readiness_score}%
              </div>
              <span className="font-label-mono text-[10px] bg-bg-subtle border border-border-hairline px-2 py-0.5 inline-block font-semibold text-fg-primary">
                INDUSTRY-READY TIER
              </span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-fg-secondary leading-relaxed pt-2 border-t border-border-hairline">
            {portfolio.bio}
          </p>

          {/* Ledger Proof Bar */}
          <div className="p-2 bg-bg-subtle border border-border-hairline font-label-mono text-[11px] flex items-center justify-between flex-wrap gap-2 text-fg-secondary">
            <span>PASSPORT LEDGER: <strong className="text-fg-primary">{portfolio.passport_hash}</strong></span>
            <span className="text-status-success font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-status-success rounded-full" />
              CRYPTOGRAPHICALLY SEALED
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Skills & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          {/* Left Column: Verified Skills & Certs */}
          <div className="space-y-space-md">
            {/* Skills Card */}
            <div className="border border-border-strong bg-bg-surface p-space-md space-y-3">
              <h2 className="font-headline-sm font-bold text-fg-primary uppercase flex items-center justify-between">
                <span>Verified Skills</span>
                <span className="font-label-mono text-xs text-fg-secondary font-semibold">
                  {portfolio.verified_skills.length} ATTESTED
                </span>
              </h2>

              <div className="space-y-2">
                {portfolio.verified_skills.map((skill) => (
                  <div key={skill.name} className="p-2 border border-border-hairline bg-bg-canvas space-y-1 font-label-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-fg-primary">{skill.name}</span>
                      <span className="text-status-success font-bold">{skill.score} / 10</span>
                    </div>
                    <div className="w-full h-1.5 bg-bg-subtle border border-border-hairline overflow-hidden">
                      <div
                        className="h-full bg-status-success"
                        style={{ width: `${(skill.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="border border-border-strong bg-bg-surface p-space-md space-y-3">
              <h2 className="font-headline-sm font-bold text-fg-primary uppercase">
                Accreditations
              </h2>
              <div className="space-y-2">
                {portfolio.certificates.map((cert) => (
                  <div key={cert.id} className="p-3 border border-border-hairline bg-bg-canvas space-y-1 font-label-mono text-xs">
                    <div className="font-bold text-fg-primary">{cert.title}</div>
                    <div className="text-fg-secondary text-[11px]">{cert.issuer} // {cert.issued_at}</div>
                    <div className="text-[10px] text-fg-primary font-mono pt-1">ID: {cert.verification_id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Projects & Recruitment Connect */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="border border-border-strong bg-bg-surface p-space-md space-y-space-md">
              <h2 className="font-headline-sm font-bold text-fg-primary uppercase">
                Featured Capstone Projects
              </h2>

              <div className="space-y-space-sm">
                {portfolio.projects.map((proj) => (
                  <div key={proj.id} className="p-space-md border border-border-hairline bg-bg-canvas space-y-2 hover:border-border-strong transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-headline-sm font-bold text-fg-primary">
                        {proj.title}
                      </h3>
                      {proj.featured && <Badge variant="signal">CAPSTONE</Badge>}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-fg-secondary leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tags.map((t) => (
                        <span key={t} className="font-label-mono text-[10px] bg-bg-subtle border border-border-hairline px-1.5 py-0.5 text-fg-primary font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-space-xs font-label-mono text-xs print:hidden">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 border border-border-strong bg-bg-surface hover:bg-bg-subtle transition-colors flex items-center gap-1 text-fg-primary"
                        >
                          <span>GitHub Repository</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 border border-border-strong bg-accent-signal text-fg-primary font-bold hover:bg-accent-signal-hover transition-colors flex items-center gap-1"
                        >
                          <span>Live Deployment</span>
                          <span className="material-symbols-outlined text-[14px]">launch</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Contact Drawer */}
            <div className="border border-border-strong bg-bg-surface p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md print:hidden">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                  Recruit {portfolio.full_name}
                </h3>
                <p className="font-body-sm text-fg-secondary">
                  Direct candidate connection for verified internships &amp; engineering placements.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`mailto:${portfolio.contact_links.email}`}
                  className="px-4 py-2 bg-accent-signal text-fg-primary font-bold border border-border-strong font-label-mono text-xs uppercase hover:bg-accent-signal-hover transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  Connect Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
