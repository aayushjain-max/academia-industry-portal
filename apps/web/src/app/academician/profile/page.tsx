'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card, Input } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getMyAcademicianProfile,
  updateMyAcademicianProfile,
  getPublications,
  createPublication,
  getPatents,
  createPatent,
  getFacultyImpactScore,
  AcademicianProfile,
  Publication,
  Patent,
  FacultyImpactScore,
} from '@/features/academicians/api';
import { Loader2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AcademicianProfilePage() {
  const [profile, setProfile] = useState<AcademicianProfile | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [patents, setPatents] = useState<Patent[]>([]);
  const [impact, setImpact] = useState<FacultyImpactScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [showPubModal, setShowPubModal] = useState(false);
  const [showPatentModal, setShowPatentModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [pubForm, setPubForm] = useState({
    title: '',
    authors: '',
    journal: '',
    conference: '',
    publication_type: 'JOURNAL' as Publication['publication_type'],
    doi: '',
    indexing: 'SCOPUS',
    citation_count: 0,
  });

  const [patentForm, setPatentForm] = useState({
    title: '',
    patent_number: '',
    filing_date: '',
    grant_date: '',
    status: 'FILED' as Patent['status'],
    inventors: '',
    jurisdiction: 'India (IPO)',
  });

  const [profileForm, setProfileForm] = useState({
    bio: '',
    orcid: '',
    google_scholar: '',
    linkedin_url: '',
    website: '',
    areas_of_expertise: '',
    research_interests: '',
    experience_years: 5,
  });

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profData, pubData, patData, impactData] = await Promise.all([
        getMyAcademicianProfile(),
        getPublications(),
        getPatents(),
        getFacultyImpactScore().catch(() => null),
      ]);
      setProfile(profData);
      setPublications(pubData.results || []);
      setPatents(patData.results || []);
      if (impactData) setImpact(impactData);

      setProfileForm({
        bio: profData.bio || '',
        orcid: profData.orcid || '',
        google_scholar: profData.google_scholar || '',
        linkedin_url: profData.linkedin_url || '',
        website: profData.website || '',
        areas_of_expertise: profData.areas_of_expertise || '',
        research_interests: profData.research_interests || '',
        experience_years: profData.experience_years || 5,
      });
    } catch (err: any) {
      console.error('Failed to load profile data', err);
      setError(err?.message || 'Failed to fetch academician profile records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPublication(pubForm);
      setShowPubModal(false);
      setPubForm({
        title: '',
        authors: '',
        journal: '',
        conference: '',
        publication_type: 'JOURNAL',
        doi: '',
        indexing: 'SCOPUS',
        citation_count: 0,
      });
      loadAll();
    } catch (err: any) {
      alert(err?.message || 'Failed to create publication');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreatePatent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPatent(patentForm);
      setShowPatentModal(false);
      setPatentForm({
        title: '',
        patent_number: '',
        filing_date: '',
        grant_date: '',
        status: 'FILED',
        inventors: '',
        jurisdiction: 'India (IPO)',
      });
      loadAll();
    } catch (err: any) {
      alert(err?.message || 'Failed to register patent');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateMyAcademicianProfile(profileForm);
      setShowEditProfileModal(false);
      loadAll();
    } catch (err: any) {
      alert(err?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-fg-primary" />
        <span className="font-label-mono text-xs uppercase text-fg-muted">
          Loading Academician Dossier &amp; IP Ledger...
        </span>
      </div>
    );
  }

  const totalCitations = publications.reduce((acc, p) => acc + (p.citation_count || 0), 0);
  const grantedPatentsCount = patents.filter((p) => p.status === 'GRANTED').length;

  return (
    <NodePageShell
      nodeId={`FAC-${profile?.id?.slice(0, 6).toUpperCase() || 'NODE'}`}
      nodeStatus={profile?.is_verified ? 'INSTITUTIONALLY VERIFIED' : 'TENURED NODE'}
      category="RESEARCH PORTFOLIO & INTELLECTUAL PROPERTY LEDGER"
      title="Faculty Portfolio, Patents & Citations"
      description="Official institutional registry of peer-reviewed publications, granted patents, research interests, and verified academic credentials."
      actions={
        <>
          <Button variant="signal" size="sm" onClick={() => setShowPubModal(true)}>
            <Icon name="upload" size={14} className="mr-1" />
            Add Publication
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowPatentModal(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Patent
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowEditProfileModal(true)}>
            <Icon name="edit" size={14} className="mr-1" />
            Edit Profile
          </Button>
        </>
      }
      kpis={[
        { label: 'Total Publications', value: publications.length.toString(), delta: `${publications.filter(p => p.indexing === 'SCOPUS').length} SCOPUS`, deltaType: 'success', subtext: 'Peer-Reviewed', icon: 'article' },
        { label: 'Total Citations', value: totalCitations.toString(), delta: 'VERIFIED', deltaType: 'neutral', subtext: 'Aggregate Index', icon: 'verified' },
        { label: 'Registered Patents', value: patents.length.toString(), delta: `${grantedPatentsCount} GRANTED`, deltaType: 'success', subtext: 'National & Global IPO', icon: 'token' },
        { label: 'Impact Index', value: impact ? `${impact.total_impact_score}/100` : 'CALCULATING', delta: 'OPTIMAL', deltaType: 'success', subtext: 'Evidence Score', icon: 'badge' },
      ]}
    >
      {/* Faculty Summary Bio */}
      <div className="bg-bg-surface border border-border-strong p-space-md lg:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-headline-sm font-bold text-fg-primary">
              {profile ? `${profile.first_name} ${profile.last_name}`.trim() || profile.email : 'Faculty Member'}
            </span>
            <Badge variant="signal">{profile?.designation || 'PROFESSOR'}</Badge>
          </div>
          <p className="text-body-md text-fg-secondary">
            Department of {profile?.department || 'Engineering'}, {profile?.institution_name || 'Affiliated Institution'}
          </p>
          <div className="flex items-center gap-space-md text-xs font-label-mono text-fg-muted pt-1 flex-wrap">
            <span>RESEARCH: {profile?.research_interests || profile?.areas_of_expertise || 'General Computing, Distributed Systems'}</span>
            <span>TENURE: {profile?.experience_years ?? 0} Years</span>
            {profile?.orcid && <span>ORCID: {profile.orcid}</span>}
          </div>
          {profile?.bio && (
            <p className="text-body-sm text-fg-secondary pt-2 text-xs leading-relaxed max-w-3xl">
              {profile.bio}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="font-label-mono text-xs text-status-success font-bold block">
            {profile?.is_verified ? '✓ NIRF FACULTY AUDIT COMPLETE' : '✓ VERIFICATION ACTIVE'}
          </span>
          <span className="font-mono text-xs text-fg-muted">
            SYNCHRONIZED WITH CORE
          </span>
        </div>
      </div>

      {/* Publications Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
            Peer-Reviewed Publications ({publications.length})
          </span>
          <Button variant="outline" size="sm" onClick={() => setShowPubModal(true)}>
            + Add Publication
          </Button>
        </div>

        {publications.length === 0 ? (
          <div className="p-space-lg bg-bg-surface border border-dashed border-border-hairline text-center space-y-2">
            <p className="font-mono text-xs text-fg-muted">No publications recorded in your ledger yet.</p>
            <Button variant="signal" size="sm" onClick={() => setShowPubModal(true)}>
              Register First Publication
            </Button>
          </div>
        ) : (
          publications.map((p) => (
            <Card key={p.id} className="hover:border-border-strong transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant="signal">{p.indexing || p.publication_type}</Badge>
                  {p.publication_date && <span className="text-fg-muted">{new Date(p.publication_date).getFullYear()}</span>}
                  {p.doi && (
                    <>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-secondary font-mono">DOI: {p.doi}</span>
                    </>
                  )}
                  <span className="ml-auto font-metric-tabular text-status-success font-bold">
                    {p.citation_count} Citations
                  </span>
                </div>
                <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
                  {p.title}
                </h3>
                <p className="text-body-sm text-fg-muted">
                  {p.authors ? `${p.authors} — ` : ''}{p.journal || p.conference}
                </p>
                {p.abstract && (
                  <p className="text-xs text-fg-secondary line-clamp-2 pt-1 font-sans">{p.abstract}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Patents Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between border-b border-border-hairline pb-space-xs">
          <span className="font-label-mono text-xs uppercase font-bold text-fg-primary">
            Granted Patents &amp; Intellectual Property ({patents.length})
          </span>
          <Button variant="outline" size="sm" onClick={() => setShowPatentModal(true)}>
            + Add Patent
          </Button>
        </div>

        {patents.length === 0 ? (
          <div className="p-space-lg bg-bg-surface border border-dashed border-border-hairline text-center space-y-2">
            <p className="font-mono text-xs text-fg-muted">No intellectual property or patents logged yet.</p>
            <Button variant="signal" size="sm" onClick={() => setShowPatentModal(true)}>
              Register First Patent
            </Button>
          </div>
        ) : (
          patents.map((pat) => (
            <Card key={pat.id} className="hover:border-border-strong transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                  <Badge variant={pat.status === 'GRANTED' ? 'success' : 'signal'}>{pat.status}</Badge>
                  <span className="text-fg-primary font-mono font-bold">{pat.patent_number || 'PENDING'}</span>
                  <span className="text-border-hairline">|</span>
                  <span className="text-fg-muted">{pat.jurisdiction}</span>
                  {pat.grant_date && (
                    <span className="text-fg-secondary">GRANTED: {pat.grant_date}</span>
                  )}
                </div>
                <h3 className="font-headline-sm text-body-md font-bold text-fg-primary">
                  {pat.title}
                </h3>
                {pat.inventors && (
                  <p className="text-body-sm text-fg-secondary font-mono text-xs">Inventors: {pat.inventors}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Publication Modal */}
      {showPubModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-lg p-space-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg font-headline-sm uppercase">Register New Publication</h3>
              <button onClick={() => setShowPubModal(false)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreatePublication} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={pubForm.title}
                  onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="Paper title"
                />
              </div>
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Authors</label>
                <input
                  type="text"
                  value={pubForm.authors}
                  onChange={(e) => setPubForm({ ...pubForm, authors: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="e.g. A. Nambiar, P. Menon"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Journal / Conference</label>
                  <input
                    type="text"
                    value={pubForm.journal}
                    onChange={(e) => setPubForm({ ...pubForm, journal: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. IEEE Transactions"
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Indexing</label>
                  <select
                    value={pubForm.indexing}
                    onChange={(e) => setPubForm({ ...pubForm, indexing: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  >
                    <option>SCOPUS</option>
                    <option>SCI / SCIE</option>
                    <option>Web of Science</option>
                    <option>UGC CARE</option>
                    <option>Peer Reviewed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">DOI</label>
                  <input
                    type="text"
                    value={pubForm.doi}
                    onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="10.1109/..."
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Citations</label>
                  <input
                    type="number"
                    value={pubForm.citation_count}
                    onChange={(e) => setPubForm({ ...pubForm, citation_count: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowPubModal(false)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Registering...' : 'Save Publication'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Patent Modal */}
      {showPatentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-lg p-space-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg font-headline-sm uppercase">Register New Patent</h3>
              <button onClick={() => setShowPatentModal(false)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreatePatent} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Patent Title *</label>
                <input
                  type="text"
                  required
                  value={patentForm.title}
                  onChange={(e) => setPatentForm({ ...patentForm, title: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="Patent Title"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Patent Number</label>
                  <input
                    type="text"
                    value={patentForm.patent_number}
                    onChange={(e) => setPatentForm({ ...patentForm, patent_number: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. IN-2024-1102"
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Status</label>
                  <select
                    value={patentForm.status}
                    onChange={(e) => setPatentForm({ ...patentForm, status: e.target.value as any })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  >
                    <option value="FILED">Filed</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="GRANTED">Granted</option>
                    <option value="LICENSED">Licensed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Inventors</label>
                <input
                  type="text"
                  value={patentForm.inventors}
                  onChange={(e) => setPatentForm({ ...patentForm, inventors: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="e.g. Dr. A. Nambiar, TechNova"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowPatentModal(false)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Registering...' : 'Save Patent'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-lg p-space-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg font-headline-sm uppercase">Edit Faculty Profile</h3>
              <button onClick={() => setShowEditProfileModal(false)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Bio / Profile Summary</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">ORCID ID</label>
                  <input
                    type="text"
                    value={profileForm.orcid}
                    onChange={(e) => setProfileForm({ ...profileForm, orcid: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="0000-0002-..."
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={profileForm.experience_years}
                    onChange={(e) => setProfileForm({ ...profileForm, experience_years: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Research Interests</label>
                <input
                  type="text"
                  value={profileForm.research_interests}
                  onChange={(e) => setProfileForm({ ...profileForm, research_interests: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="e.g. Distributed Computing, Edge AI"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowEditProfileModal(false)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Update Dossier'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </NodePageShell>
  );
}
