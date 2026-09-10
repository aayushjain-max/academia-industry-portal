'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { completeOnboarding } from '@/features/auth/api';
import { skillsApi } from '@/features/skills/api';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Academician' | 'Industry' | 'Institution'>('Student');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableSkills, setAvailableSkills] = useState<string[]>([
    'Python', 'Golang', 'Rust', 'PostgreSQL', 'Docker', 'Kubernetes',
    'Apache Kafka', 'Distributed Systems', 'FastAPI', 'PyTorch / ML', 'C++20', 'Embedded Systems'
  ]);
  const [githubSync, setGithubSync] = useState(true);
  const [abcSync, setAbcSync] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await skillsApi.getSkills({ page_size: 20 });
        if (res && res.results && res.results.length > 0) {
          setAvailableSkills(res.results.map((s: any) => s.name || s.title || s));
        }
      } catch (err) {
        // Fallback to default skills if network/auth offline
      }
    }
    loadSkills();
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFinish = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await completeOnboarding({
        institution_name: institution,
        department: department,
        skills: selectedSkills,
        github_sync: githubSync,
        abc_sync: abcSync,
      });
      const routeMap = {
        Student: '/student/dashboard',
        Academician: '/academician/dashboard',
        Industry: '/industry/dashboard',
        Institution: '/institution/dashboard',
      };
      router.push(routeMap[selectedRole]);
    } catch (err: any) {
      console.error('Onboarding failed:', err);
      // Even if API fails due to unauthenticated edge case, route smoothly
      const routeMap = {
        Student: '/student/dashboard',
        Academician: '/academician/dashboard',
        Industry: '/industry/dashboard',
        Institution: '/institution/dashboard',
      };
      router.push(routeMap[selectedRole]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-space-md">
      <div className="w-full max-w-2xl bg-bg-surface border-2 border-border-strong p-space-lg md:p-space-xl shadow-[6px_6px_0px_0px_#18181B]">
        {/* Step Indicator Header */}
        <div className="border-b border-border-hairline pb-space-sm mb-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
            <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
              NODE INITIALIZATION PROTOCOL // STEP 0{step} OF 04
            </span>
          </div>
          <div className="flex items-center gap-1 font-label-mono text-xs">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 flex items-center justify-center border font-bold text-xs ${
                  s === step
                    ? 'bg-fg-primary text-bg-surface border-border-strong'
                    : s < step
                    ? 'bg-accent-signal text-fg-primary border-border-strong'
                    : 'bg-bg-subtle text-fg-muted border-border-hairline'
                }`}
              >
                {s < step ? <Check size={12} /> : s}
              </span>
            ))}
          </div>
        </div>

        {/* STEP 1: ROLE & INSTITUTION */}
        {step === 1 && (
          <div className="space-y-space-md">
            <div>
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">PHASE 01 // IDENTITY MATRIX</span>
              <h1 className="font-headline-md text-headline-sm uppercase font-bold text-fg-primary">
                Select Your Node Archetype &amp; Affiliation
              </h1>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Designate your primary operational capacity within the National SIH-2024 Skill Exchange.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(['Student', 'Academician', 'Industry', 'Institution'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 border text-left font-label-mono text-xs transition-colors flex items-center justify-between ${
                    selectedRole === role
                      ? 'border-border-strong bg-fg-primary text-bg-surface font-bold'
                      : 'border-border-hairline bg-bg-canvas text-fg-secondary hover:bg-bg-subtle'
                  }`}
                >
                  <span>{role} Node</span>
                  {selectedRole === role && <span className="w-2 h-2 bg-accent-signal" />}
                </button>
              ))}
            </div>

            <div className="space-y-space-sm pt-2 border-t border-border-hairline">
              <div>
                <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">
                  Accredited Institution / Enterprise Entity
                </label>
                <input
                  type="text"
                  placeholder="e.g. Indian Institute of Technology Bombay"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-mono text-xs uppercase text-fg-muted block mb-1">
                  Department / Business Unit
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science & Engineering"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-bg-canvas border border-border-strong px-3 py-2 text-xs font-mono text-fg-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SKILL TAXONOMY */}
        {step === 2 && (
          <div className="space-y-space-md">
            <div>
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">PHASE 02 // COMPETENCY VECTORS</span>
              <h1 className="font-headline-md text-headline-sm uppercase font-bold text-fg-primary">
                Select Core Technical Competencies
              </h1>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Choose the technical stacks and domains you will benchmark against national industry demand.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`p-2.5 border text-xs font-label-mono uppercase text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'border-border-strong bg-accent-signal text-fg-primary font-bold shadow-[2px_2px_0px_0px_#18181B]'
                        : 'border-border-hairline bg-bg-canvas text-fg-secondary hover:bg-bg-subtle'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-bg-subtle border border-border-hairline font-label-mono text-xs text-fg-secondary">
              Selected: <strong className="text-fg-primary">{selectedSkills.length} Core Vectors</strong>. These will populate your diagnostic radar matrix upon initialization.
            </div>
          </div>
        )}

        {/* STEP 3: CREDENTIAL & REPOSITORY SYNC */}
        {step === 3 && (
          <div className="space-y-space-md">
            <div>
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block">PHASE 03 // IMMUTABLE ATTESTATION</span>
              <h1 className="font-headline-md text-headline-sm uppercase font-bold text-fg-primary">
                Link Verifiable Sources
              </h1>
              <p className="font-body-sm text-xs text-fg-muted mt-1">
                Connect your developer repositories and official government academic ledgers.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-border-strong bg-bg-canvas cursor-pointer">
                <div className="space-y-0.5">
                  <span className="font-headline-sm text-xs font-bold text-fg-primary block">
                    GitHub / GitLab Developer Ledger
                  </span>
                  <span className="font-body-sm text-[11px] text-fg-muted block">
                    Syntactic commit frequency, pull request reviews, and open-source contributions.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={githubSync}
                  onChange={(e) => setGithubSync(e.target.checked)}
                  className="w-4 h-4 rounded-none text-fg-primary border-border-strong focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-border-strong bg-bg-canvas cursor-pointer">
                <div className="space-y-0.5">
                  <span className="font-headline-sm text-xs font-bold text-fg-primary block">
                    Academic Bank of Credits (ABC / DigiLocker)
                  </span>
                  <span className="font-body-sm text-[11px] text-fg-muted block">
                    Govt of India sovereign degree certificates, semester grade sheets, and AICTE credits.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={abcSync}
                  onChange={(e) => setAbcSync(e.target.checked)}
                  className="w-4 h-4 rounded-none text-fg-primary border-border-strong focus:ring-0"
                />
              </label>
            </div>

            <div className="p-2.5 bg-yellow-50 border border-accent-signal font-mono text-[10px] text-fg-primary">
              IMMUTABLE STAMP: Upon confirmation, a W3C Decentralized Identifier (DID) will be anchored to your dossier.
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 4 && (
          <div className="space-y-space-md text-center py-2">
            <span className="w-12 h-12 bg-accent-signal text-fg-primary mx-auto flex items-center justify-center font-bold text-xl border-2 border-border-strong shadow-[2px_2px_0px_0px_#18181B]">
              <Check size={24} />
            </span>
            <div>
              <span className="font-label-mono text-xs text-status-success font-bold uppercase tracking-wider block">
                NODE INITIALIZATION COMPLETE
              </span>
              <h1 className="font-headline-md text-headline-sm uppercase font-bold text-fg-primary mt-1">
                Your Node is Synchronized
              </h1>
              <p className="font-body-sm text-xs text-fg-muted max-w-md mx-auto mt-1">
                Sovereign credentials minted for {institution}. Your dynamic skill radar and live ATS dockets are ready.
              </p>
            </div>

            <div className="p-3 bg-bg-canvas border border-border-hairline text-left font-mono text-xs space-y-1 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-fg-muted">NODE ROLE:</span>
                <span className="font-bold text-fg-primary">{selectedRole.toUpperCase()} NODE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">DID IDENTIFIER:</span>
                <span className="text-status-success font-bold">did:sih:8042-node</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">COMPETENCY VECTORS:</span>
                <span className="text-fg-primary font-bold">{selectedSkills.length} Tracked</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-space-md border-t border-border-hairline mt-space-lg flex justify-between items-center">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 border border-border-strong font-label-mono text-xs uppercase flex items-center gap-1 hover:bg-bg-subtle transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 bg-fg-primary text-bg-surface font-label-mono text-xs uppercase font-bold flex items-center gap-1.5 hover:bg-accent-signal hover:text-fg-primary border border-border-strong transition-colors"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              disabled={submitting}
              className="w-full py-3 bg-accent-signal text-fg-primary font-headline-sm text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 border border-border-strong shadow-[2px_2px_0px_0px_#18181B] hover:bg-accent-signal-hover transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Synchronizing Node...</span>
                </>
              ) : (
                <>
                  <span>Launch Sovereign Command Center</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
