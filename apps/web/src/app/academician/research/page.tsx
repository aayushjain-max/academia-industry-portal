'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getResearchProjects,
  createResearchProject,
  addProjectMilestone,
  addProjectMember,
  ResearchProject,
} from '@/features/academicians/api';
import { Loader2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AcademicianResearchPage() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProjectForMilestone, setSelectedProjectForMilestone] = useState<ResearchProject | null>(null);
  const [selectedProjectForMember, setSelectedProjectForMember] = useState<ResearchProject | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Forms
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    research_area: '',
    funding_amount: 1000000,
    funding_agency: '',
    industry_partner: '',
    status: 'ACTIVE' as ResearchProject['status'],
  });

  const [milestoneForm, setMilestoneForm] = useState({
    title: '',
    description: '',
    due_date: '',
    progress_percentage: 0,
    status: 'PENDING' as const,
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    role: 'CO_PI' as const,
    email: '',
    affiliation: '',
  });

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getResearchProjects();
      setProjects(res.results || []);
    } catch (err: any) {
      console.error('Failed to load research projects', err);
      setError(err?.message || 'Failed to fetch research projects from repository.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createResearchProject(projectForm);
      setShowCreateModal(false);
      setProjectForm({
        title: '',
        description: '',
        research_area: '',
        funding_amount: 1000000,
        funding_agency: '',
        industry_partner: '',
        status: 'ACTIVE',
      });
      loadProjects();
    } catch (err: any) {
      alert(err?.message || 'Failed to create research project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForMilestone) return;
    setSubmitting(true);
    try {
      await addProjectMilestone(selectedProjectForMilestone.id, milestoneForm);
      setSelectedProjectForMilestone(null);
      setMilestoneForm({ title: '', description: '', due_date: '', progress_percentage: 0, status: 'PENDING' });
      loadProjects();
    } catch (err: any) {
      alert(err?.message || 'Failed to add milestone');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForMember) return;
    setSubmitting(true);
    try {
      await addProjectMember(selectedProjectForMember.id, memberForm);
      setSelectedProjectForMember(null);
      setMemberForm({ name: '', role: 'CO_PI', email: '', affiliation: '' });
      loadProjects();
    } catch (err: any) {
      alert(err?.message || 'Failed to add team member');
    } finally {
      setSubmitting(false);
    }
  };

  const totalFunding = projects.reduce((acc, p) => acc + Number(p.funding_amount || 0), 0);
  const activeCount = projects.filter((p) => p.status === 'ACTIVE').length;
  const totalMilestones = projects.reduce((acc, p) => acc + (p.milestones?.length || 0), 0);
  const totalMembers = projects.reduce((acc, p) => acc + (p.members?.length || 0), 0);

  return (
    <NodePageShell
      nodeId="LAB-PODS-01"
      nodeStatus="R&D MATRIX ACTIVE"
      category="RESEARCH MANAGEMENT & CO-INVESTIGATION PODS"
      title="R&D Projects, Lab Pods & Milestones"
      description="Manage sponsored research projects, team investigations, milestones, funding tranches, and bilateral industry deliverables."
      actions={
        <Button variant="signal" size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Launch New Research Project
        </Button>
      }
      kpis={[
        { label: 'Active Projects', value: activeCount.toString(), delta: `${projects.length} TOTAL`, deltaType: 'success', subtext: 'Currently Investigating', icon: 'biotech' },
        { label: 'Total Grant Funding', value: `₹${(totalFunding / 100000).toFixed(1)} L`, delta: 'SANCTIONED', deltaType: 'success', subtext: 'Across Active Grants', icon: 'payments' },
        { label: 'Appointed Researchers', value: totalMembers.toString(), delta: 'INTER-DISCIPLINARY', deltaType: 'neutral', subtext: 'PIs, Fellows & Scholars', icon: 'group' },
        { label: 'Tracked Milestones', value: totalMilestones.toString(), delta: 'STATUTORY', deltaType: 'neutral', subtext: 'Deliverables & Audits', icon: 'flag' },
      ]}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[350px] space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-fg-primary" />
          <span className="font-label-mono text-xs uppercase text-fg-muted">
            Synchronizing research pods &amp; telemetry...
          </span>
        </div>
      ) : error ? (
        <div className="p-space-lg bg-bg-surface border border-status-danger/40 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-status-danger mx-auto" />
          <p className="font-mono text-xs text-status-danger">{error}</p>
          <Button variant="outline" size="sm" onClick={loadProjects}>Retry</Button>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-space-xl bg-bg-surface border border-dashed border-border-strong text-center space-y-3">
          <Icon name="biotech" size={32} className="text-fg-muted mx-auto" />
          <h3 className="font-headline-sm font-bold text-lg">No Research Projects Registered Yet</h3>
          <p className="font-mono text-xs text-fg-muted max-w-md mx-auto">
            Launch your first sponsored or bilateral research project to begin tracking investigation milestones and team members.
          </p>
          <Button variant="signal" size="sm" onClick={() => setShowCreateModal(true)}>
            + Create First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-space-lg">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-bg-surface border-2 border-border-strong p-space-lg space-y-space-md shadow-[2px_2px_0px_0px_rgba(24,24,27,0.06)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md border-b border-border-hairline pb-space-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                    <Badge variant={proj.status === 'ACTIVE' ? 'success' : 'signal'}>{proj.status}</Badge>
                    <span className="font-mono text-fg-muted">#{proj.id.slice(0, 8).toUpperCase()}</span>
                    {proj.research_area && (
                      <>
                        <span className="text-border-hairline">|</span>
                        <span className="text-fg-primary font-bold">{proj.research_area}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-headline-sm text-xl font-bold text-fg-primary">
                    {proj.title}
                  </h2>
                  <p className="text-body-sm text-fg-muted font-mono text-xs">
                    {proj.funding_agency ? `Agency: ${proj.funding_agency} ` : ''}
                    {proj.industry_partner ? `// Industry Partner: ${proj.industry_partner}` : ''}
                  </p>
                  {proj.description && (
                    <p className="text-xs text-fg-secondary pt-1 font-sans">{proj.description}</p>
                  )}
                </div>

                <div className="lg:text-right shrink-0 font-mono text-xs">
                  <span className="text-fg-muted uppercase text-[10px] block">APPROVED GRANT VALUE</span>
                  <span className="font-metric-tabular text-2xl font-bold text-status-success font-bold block tnum">
                    ₹{Number(proj.funding_amount).toLocaleString()}
                  </span>
                  <span className="text-fg-muted text-[10px]">
                    Progress: {proj.progress_percentage}%
                  </span>
                </div>
              </div>

              {/* Milestones & Team Members Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md pt-1">
                {/* Milestones (7 cols) */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex justify-between items-center border-b pb-1">
                    <span className="font-label-mono text-xs font-bold uppercase text-fg-primary">
                      Milestones &amp; Deliverables ({proj.milestones?.length || 0})
                    </span>
                    <button
                      onClick={() => setSelectedProjectForMilestone(proj)}
                      className="font-label-mono text-[11px] text-fg-primary hover:underline"
                    >
                      + Add Milestone
                    </button>
                  </div>

                  {!proj.milestones || proj.milestones.length === 0 ? (
                    <p className="text-[11px] font-mono text-fg-muted p-2 bg-bg-canvas border">
                      No milestones recorded yet. Click above to add statutory milestones.
                    </p>
                  ) : (
                    proj.milestones.map((ms) => (
                      <div key={ms.id} className="p-2 border border-border-hairline bg-bg-canvas space-y-1 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-fg-primary">{ms.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-bg-subtle font-bold">{ms.status}</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-200 overflow-hidden">
                          <div className="bg-fg-primary h-full" style={{ width: `${ms.progress_percentage}%` }} />
                        </div>
                        {ms.due_date && (
                          <div className="flex justify-between text-[10px] text-fg-muted">
                            <span>DUE: {ms.due_date}</span>
                            <span>{ms.progress_percentage}% Completed</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Team Members (5 cols) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex justify-between items-center border-b pb-1">
                    <span className="font-label-mono text-xs font-bold uppercase text-fg-primary">
                      Investigation Team ({proj.members?.length || 0})
                    </span>
                    <button
                      onClick={() => setSelectedProjectForMember(proj)}
                      className="font-label-mono text-[11px] text-fg-primary hover:underline"
                    >
                      + Add Member
                    </button>
                  </div>

                  {!proj.members || proj.members.length === 0 ? (
                    <p className="text-[11px] font-mono text-fg-muted p-2 bg-bg-canvas border">
                      No team members logged.
                    </p>
                  ) : (
                    proj.members.map((m) => (
                      <div key={m.id} className="p-2 border border-border-hairline bg-bg-canvas flex justify-between items-center font-mono text-xs">
                        <div>
                          <span className="font-bold text-fg-primary block">{m.name}</span>
                          <span className="text-[10px] text-fg-muted">{m.affiliation || m.email}</span>
                        </div>
                        <span className="font-label-mono text-[10px] px-2 py-0.5 bg-portal-primary text-portal-on-primary font-bold">
                          {m.role}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-lg p-space-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg font-headline-sm uppercase">Launch Research Lab Pod</h3>
              <button onClick={() => setShowCreateModal(false)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  placeholder="e.g. Byzantine Consensus for Aerospace Edge"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Research Area</label>
                  <input
                    type="text"
                    value={projectForm.research_area}
                    onChange={(e) => setProjectForm({ ...projectForm, research_area: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. Distributed Systems"
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Funding Amount (INR)</label>
                  <input
                    type="number"
                    value={projectForm.funding_amount}
                    onChange={(e) => setProjectForm({ ...projectForm, funding_amount: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Funding Agency</label>
                  <input
                    type="text"
                    value={projectForm.funding_agency}
                    onChange={(e) => setProjectForm({ ...projectForm, funding_agency: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. DRDO / DST / ISRO"
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Industry Partner</label>
                  <input
                    type="text"
                    value={projectForm.industry_partner}
                    onChange={(e) => setProjectForm({ ...projectForm, industry_partner: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. TechNova Labs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Description / Abstract</label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Launch Pod'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {selectedProjectForMilestone && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-md p-space-lg space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-base font-headline-sm uppercase">Add Milestone</h3>
              <button onClick={() => setSelectedProjectForMilestone(null)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleAddMilestone} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={milestoneForm.due_date}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, due_date: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={milestoneForm.progress_percentage}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, progress_percentage: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setSelectedProjectForMilestone(null)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Add Milestone'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {selectedProjectForMember && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-bg-surface border-2 border-border-strong w-full max-w-md p-space-lg space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-base font-headline-sm uppercase">Add Team Researcher</h3>
              <button onClick={() => setSelectedProjectForMember(null)} className="font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-fg-muted uppercase text-[10px] mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Role</label>
                  <select
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value as any })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                  >
                    <option value="CO_PI">Co-Principal Investigator</option>
                    <option value="INDUSTRY_LEAD">Industry Partner Lead</option>
                    <option value="JRF">Junior Research Fellow</option>
                    <option value="SRF">Senior Research Fellow</option>
                    <option value="STUDENT_RESEARCHER">Student Researcher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-fg-muted uppercase text-[10px] mb-1">Affiliation</label>
                  <input
                    type="text"
                    value={memberForm.affiliation}
                    onChange={(e) => setMemberForm({ ...memberForm, affiliation: e.target.value })}
                    className="w-full p-2 bg-bg-canvas border text-fg-primary outline-none"
                    placeholder="e.g. ECE Dept"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" type="button" onClick={() => setSelectedProjectForMember(null)}>Cancel</Button>
                <Button variant="signal" size="sm" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Add Member'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </NodePageShell>
  );
}
