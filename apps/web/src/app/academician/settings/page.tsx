'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getMyAcademicianProfile,
  updateMyAcademicianProfile,
  AcademicianProfile,
} from '@/features/academicians/api';
import { Loader2, Save, CheckCircle, Shield, Award, BookOpen, Building2, User, Globe, Briefcase } from 'lucide-react';

export default function AcademicianSettingsPage() {
  const [profile, setProfile] = useState<AcademicianProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State matching AcademicianProfile
  const [form, setForm] = useState({
    designation: '',
    department: '',
    institution_name: '',
    qualifications: '',
    experience_years: 0,
    areas_of_expertise: '',
    research_interests: '',
    industry_training_interests: '',
    consultancy_areas: '',
    bio: '',
    orcid: '',
    google_scholar: '',
    linkedin_url: '',
    website: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyAcademicianProfile();
      setProfile(data);
      setForm({
        designation: data.designation || '',
        department: data.department || '',
        institution_name: data.institution_name || '',
        qualifications: data.qualifications || 'Ph.D.',
        experience_years: data.experience_years || 0,
        areas_of_expertise: data.areas_of_expertise || '',
        research_interests: data.research_interests || '',
        industry_training_interests: data.industry_training_interests || '',
        consultancy_areas: data.consultancy_areas || '',
        bio: data.bio || '',
        orcid: data.orcid || '',
        google_scholar: data.google_scholar || '',
        linkedin_url: data.linkedin_url || '',
        website: data.website || '',
      });
    } catch (err: any) {
      console.error('Failed to load profile:', err);
      setError('Unable to load faculty settings & profile records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccessMsg(null);

      const updated = await updateMyAcademicianProfile({
        designation: form.designation,
        department: form.department,
        institution_name: form.institution_name,
        qualifications: form.qualifications,
        experience_years: Number(form.experience_years) || 0,
        areas_of_expertise: form.areas_of_expertise,
        research_interests: form.research_interests,
        industry_training_interests: form.industry_training_interests,
        consultancy_areas: form.consultancy_areas,
        bio: form.bio,
        orcid: form.orcid,
        google_scholar: form.google_scholar,
        linkedin_url: form.linkedin_url,
        website: form.website,
      });

      setProfile(updated);
      setSuccessMsg('Faculty settings and scholarly registry successfully updated!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // SETTINGS"
      nodeStatus="IDENTITY VERIFIED"
      category="FACULTY PREFERENCES & INSTITUTIONAL GOVERNANCE"
      title="Faculty Settings & Scholarly Preferences"
      description="Manage institutional credentials, international scholarly identifiers (ORCID / Google Scholar), research focus areas, and industry advisory profiles."
      actions={
        <Button variant="outline" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" />
          Reset Form
        </Button>
      }
      kpis={[
        {
          label: 'Faculty Verification',
          value: profile?.is_verified ? 'VERIFIED' : 'PENDING',
          delta: 'AICTE COMPLIANT',
          deltaType: profile?.is_verified ? 'success' : 'warning',
          subtext: 'Dean Faculty Affairs',
          icon: 'shield',
        },
        {
          label: 'Academic Tenure',
          value: `${form.experience_years} Years`,
          delta: 'TEACHING & RESEARCH',
          deltaType: 'neutral',
          subtext: 'Professional Experience',
          icon: 'award',
        },
        {
          label: 'Scholarly Identifiers',
          value: form.orcid ? 'ORCID LINKED' : 'NOT LINKED',
          delta: form.orcid ? 'VERIFIED' : 'ACTION REQUIRED',
          deltaType: form.orcid ? 'success' : 'warning',
          subtext: 'Global Bibliographic Registry',
          icon: 'users',
        },
        {
          label: 'Institutional Status',
          value: form.institution_name ? 'AFFILIATED' : 'UNASSIGNED',
          delta: 'GOVERNANCE AUDITED',
          deltaType: 'success',
          subtext: form.department || 'Department Ledger',
          icon: 'verified',
        },
      ]}
    >
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Faculty Preferences...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-space-md">
          {error && (
            <div className="p-3 bg-status-danger/10 border border-status-danger text-status-danger text-xs font-mono">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle size={16} />
              {successMsg}
            </div>
          )}

          {/* Section 1: Institutional Credentials */}
          <Card>
            <div className="space-y-4">
              <div className="border-b border-border-hairline pb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm font-bold text-fg-primary uppercase flex items-center gap-2 text-sm">
                    <Building2 size={16} className="text-portal-primary" />
                    Institutional Affiliation &amp; Academic Rank
                  </h3>
                  <p className="text-fg-muted font-mono text-xs">Designation and official university/department affiliations</p>
                </div>
                <Badge variant="signal">{form.qualifications || 'Ph.D.'}</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institution_name}
                    onChange={(e) => setForm({ ...form, institution_name: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Highest Academic Qualifications
                  </label>
                  <input
                    type="text"
                    value={form.qualifications}
                    onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={form.experience_years}
                    onChange={(e) => setForm({ ...form, experience_years: Number(e.target.value) || 0 })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Scholarly & Bibliographic Identifiers */}
          <Card>
            <div className="space-y-4">
              <div className="border-b border-border-hairline pb-2">
                <h3 className="font-headline-sm font-bold text-fg-primary uppercase flex items-center gap-2 text-sm">
                  <Award size={16} className="text-portal-primary" />
                  Scholarly Identifiers &amp; Research Indexing
                </h3>
                <p className="text-fg-muted font-mono text-xs">Global author identifiers for automated bibliographic verification</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    ORCID ID
                  </label>
                  <input
                    type="text"
                    placeholder="0000-0002-1825-0097"
                    value={form.orcid}
                    onChange={(e) => setForm({ ...form, orcid: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Google Scholar Profile
                  </label>
                  <input
                    type="text"
                    placeholder="https://scholar.google.com/citations?user=..."
                    value={form.google_scholar}
                    onChange={(e) => setForm({ ...form, google_scholar: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/..."
                    value={form.linkedin_url}
                    onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Academic Website / Lab Page
                  </label>
                  <input
                    type="text"
                    placeholder="https://faculty.university.edu/~prof"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Research Focus, Consultancy & Bio */}
          <Card>
            <div className="space-y-4">
              <div className="border-b border-border-hairline pb-2">
                <h3 className="font-headline-sm font-bold text-fg-primary uppercase flex items-center gap-2 text-sm">
                  <BookOpen size={16} className="text-portal-primary" />
                  Research Domain, Consultancy &amp; Biography
                </h3>
                <p className="text-fg-muted font-mono text-xs">Core competencies, industrial consulting areas, and scholar supervision statement</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-fg-primary font-bold mb-1">
                      Areas of Expertise
                    </label>
                    <input
                      type="text"
                      placeholder="Edge AI, Distributed Systems, Microservices, Quantum Cryptography"
                      value={form.areas_of_expertise}
                      onChange={(e) => setForm({ ...form, areas_of_expertise: e.target.value })}
                      className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-fg-primary font-bold mb-1">
                      Research Interests
                    </label>
                    <input
                      type="text"
                      placeholder="Autonomous Systems, Privacy-Preserving ML, LLM Architecture"
                      value={form.research_interests}
                      onChange={(e) => setForm({ ...form, research_interests: e.target.value })}
                      className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-fg-primary font-bold mb-1">
                      Consultancy Areas
                    </label>
                    <input
                      type="text"
                      placeholder="Enterprise Cloud Architecture, Smart Grid Optimization, Algorithm Auditing"
                      value={form.consultancy_areas}
                      onChange={(e) => setForm({ ...form, consultancy_areas: e.target.value })}
                      className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-fg-primary font-bold mb-1">
                      Industry Training Interests
                    </label>
                    <input
                      type="text"
                      placeholder="GPU Programming with CUDA, High-Performance Microservices, Clean Architecture"
                      value={form.industry_training_interests}
                      onChange={(e) => setForm({ ...form, industry_training_interests: e.target.value })}
                      className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase text-fg-primary font-bold mb-1">
                    Faculty Biography &amp; Research Statement
                  </label>
                  <textarea
                    rows={4}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Briefly state your academic background, research vision, laboratory facilities, and supervisory focus..."
                    className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="submit" variant="signal" size="md" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1.5" /> Save Faculty Preferences
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </NodePageShell>
  );
}

