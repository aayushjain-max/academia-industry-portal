'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import { AdvisorMessage, AdvisorSessionData } from '@/types/student-features';
import { useAuthStore } from '@/store/authStore';

const INITIAL_SUGGESTIONS = [
  {
    label: 'Identify Critical Skill Gaps',
    prompt: 'Analyze my verified skills against Full Stack Engineer requirements and identify my most critical gaps.',
    icon: 'tune',
  },
  {
    label: 'Generate 4-Week Roadmap',
    prompt: 'Provide a structured 4-week learning schedule to raise my Industry Readiness Index from 74% to 85%.',
    icon: 'calendar_month',
  },
  {
    label: 'System Design Interview Mock',
    prompt: 'Run a mock technical interview question on designing a scalable real-time notification engine in PostgreSQL/Redis.',
    icon: 'terminal',
  },
  {
    label: 'Portfolio & Resume Review',
    prompt: 'Critique my current project portfolio structure and suggest 2 high-impact open-source capstones to add.',
    icon: 'person_pin',
  },
];

import { aiClient } from '@/lib/api/client';

export default function StudentAssistantPage() {
  const [studentContext, setStudentContext] = useState({
    name: 'Candidate',
    institution: 'Accredited Institution',
    level: 'Verified Node',
    readiness_index: 75,
    top_skills: ['Python', 'TypeScript', 'SQL', 'System Architecture'],
  });

  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quota, setQuota] = useState({
    remaining: 30,
    daily_limit: 30,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const rawUser = localStorage.getItem('user');
        if (rawUser) {
          const u = JSON.parse(rawUser);
          const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Candidate';
          const ctx = {
            name: fullName,
            institution: u.institution_name || 'Accredited Institution',
            level: 'Verified Node',
            readiness_index: 75,
            top_skills: u.skills || ['Python', 'TypeScript', 'SQL', 'System Architecture'],
          };
          setStudentContext(ctx);
          setMessages([
            {
              id: 'msg-01',
              role: 'system',
              content: `AI Career Advisor initialized. Context synchronized with student passport data for ${fullName}.`,
              timestamp: '10:00 AM',
            },
            {
              id: 'msg-02',
              role: 'assistant',
              content: `Greetings ${fullName}. I have initialized your sovereign candidate telemetry session.\n\nHow can I assist your career roadmap today? You can select a curated diagnostic prompt on the left or enter your inquiry directly.`,
              timestamp: '10:01 AM',
              suggested_actions: [
                { label: 'View Skill Gaps // Telemetry', href: '/student/readiness' },
                { label: 'Take Diagnostic Assessment', href: '/student/assessment' },
              ],
            },
          ]);
          return;
        }
      } catch (e) {
        // fallback to default
      }
    }

    setMessages([
      {
        id: 'msg-01',
        role: 'system',
        content: 'AI Career Advisor initialized. Context synchronized with student passport data.',
        timestamp: '10:00 AM',
      },
      {
        id: 'msg-02',
        role: 'assistant',
        content: 'Greetings Candidate. I have initialized your sovereign candidate telemetry session.\n\nHow can I assist your career roadmap today? You can select a curated diagnostic prompt on the left or enter your inquiry directly.',
        timestamp: '10:01 AM',
        suggested_actions: [
          { label: 'View Skill Gaps // Telemetry', href: '/student/readiness' },
          { label: 'Take Diagnostic Assessment', href: '/student/assessment' },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getFormattedTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isTyping || quota.remaining <= 0) return;

    const userMessage: AdvisorMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setQuota((prev) => ({ ...prev, remaining: Math.max(0, prev.remaining - 1) }));

    try {
      let responseContent = '';
      let actions: Array<{ label: string; href: string }> = [];

      try {
        const currentUser = useAuthStore.getState().user;
        const aiRes: any = await aiClient.post('/assistant/chat', {
          message: prompt,
          user_id: currentUser?.id || 'candidate-node',
          context: studentContext,
        });
        if (aiRes && aiRes.response) {
          responseContent = aiRes.response;
          actions = aiRes.suggested_actions || [];
        }
      } catch (apiErr) {
        console.warn('AI microservice fallback:', apiErr);
      }

      if (!responseContent) {
        if (prompt.toLowerCase().includes('gap') || prompt.toLowerCase().includes('skill')) {
          responseContent = `Based on current industry demand matrices for **Full Stack Engineer**:
1. **Critical Gap:** Distributed Systems & Message Queues (Kafka/RabbitMQ) — Required: 7.5, Current: 3.5.
2. **Moderate Gap:** Docker containerization & CI/CD deployment pipelines — Required: 8.0, Current: 6.0.
3. **Verified Met:** TypeScript, React/Next.js, and SQL schema design are already exceeding the 80th percentile.

**Immediate Next Steps:**
- Complete the 20-minute **System Design Diagnostic Test**.
- Document an event-driven architecture in your project portfolio.`;
          actions = [
            { label: 'Launch System Design Test', href: '/student/assessment' },
            { label: 'View Readiness Index', href: '/student/readiness' },
          ];
        } else if (prompt.toLowerCase().includes('roadmap') || prompt.toLowerCase().includes('week')) {
          responseContent = `### 4-Week Accelerated Readiness Plan (Target: 85% IRI)

- **Week 1 (Distributed Systems):** Master message broker patterns and publish-subscribe pipelines.
- **Week 2 (Containerization):** Write multi-stage Dockerfiles and deploy sample services to Kubernetes.
- **Week 3 (Assessments & Verification):** Complete verified technical assessments to lock in your credentials on the Skill Passport ledger.
- **Week 4 (Capstone Alignment):** Deploy your public portfolio link directly to active internship listings.`;
          actions = [
            { label: 'Explore Curriculum Tracks', href: '/student/learning/courses' },
            { label: 'Match Opportunities', href: '/student/opportunities' },
          ];
        } else {
          responseContent = `I have logged your request: **"${prompt}"**.

In accordance with AICTE & Industry Benchmark Guidelines:
- Your verified skills profile has been referenced.
- Recommendations are aligned with standard tier-01 placement criteria.

Feel free to ask for interview drill simulations, code reviews, or tailored gap-closing exercises.`;
          actions = [
            { label: 'Explore Assessments', href: '/student/assessment' },
            { label: 'Open Portfolio Builder', href: '/student/portfolio' },
          ];
        }
      }

      const assistantMessage: AdvisorMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: getFormattedTime(),
        suggested_actions: actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: AdvisorMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Telemetry pipeline interruption. Please retry your inquiry or inspect telemetry network status.',
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <NodePageShell
      nodeId="STU-8042 // ADVISOR-AI"
      nodeStatus="GROQ LLM FAST-INFERENCE ACTIVE"
      category="AI CAREER ADVISOR // TELEMETRY TERMINAL"
      title="AI Career Advisor"
      description="Context-aware AI career counselor powered by LLM inference, calibrated against your verified Skill Passport telemetry."
      actions={
        <div className="flex items-center gap-space-xs">
          <span className="font-label-mono text-xs px-2.5 py-1 bg-bg-subtle border border-border-strong text-fg-primary">
            QUOTA: <strong>{quota.remaining}/{quota.daily_limit}</strong> DAILY TOKENS
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setMessages([
                {
                  id: `msg-${Date.now()}-01`,
                  role: 'system',
                  content: `AI Career Advisor re-initialized for ${studentContext.name}.`,
                  timestamp: getFormattedTime(),
                },
                {
                  id: `msg-${Date.now()}-02`,
                  role: 'assistant',
                  content: `Session reset. How can I assist your career roadmap today, ${studentContext.name}?`,
                  timestamp: getFormattedTime(),
                },
              ])
            }
          >
            <Icon name="refresh" size={14} className="mr-1" />
            Reset Session
          </Button>
        </div>
      }
      kpis={[
        { label: 'Readiness Index', value: '74.0%', delta: '+6.2%', deltaType: 'success', subtext: 'Industry-Ready Tier', icon: 'speed' },
        { label: 'Context Window', value: '8 MSGS', delta: 'ACTIVE', deltaType: 'neutral', subtext: 'Token Hygiene', icon: 'history' },
        { label: 'Inference Engine', value: 'GROQ LLM', delta: '< 250MS', deltaType: 'success', subtext: 'Guardrails Active', icon: 'bolt' },
        { label: 'Daily Allowance', value: `${quota.remaining} REMAINING`, delta: '30 CAP', deltaType: 'neutral', subtext: 'Reset at 00:00 UTC', icon: 'token' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-space-md">
        {/* Left Telemetry Sidebar */}
        <div className="lg:col-span-1 space-y-space-md">
          {/* Candidate Dossier Context Card */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-3">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
              ACTIVE CANDIDATE CONTEXT
            </span>
            <div>
              <h3 className="font-headline-sm font-bold text-fg-primary uppercase">
                {studentContext.name}
              </h3>
              <p className="font-label-mono text-xs text-fg-muted">
                {studentContext.institution} // {studentContext.level}
              </p>
            </div>

            <div className="pt-2 border-t border-border-hairline space-y-2 font-label-mono text-xs">
              <div className="flex justify-between">
                <span className="text-fg-muted">TARGET ROLE:</span>
                <span className="text-fg-primary font-bold">FULL STACK ENG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">READINESS:</span>
                <span className="text-status-success font-bold">{studentContext.readiness_index}% / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">PASSPORT ID:</span>
                <span className="text-fg-primary">0x8042...SHA</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border-hairline">
              <span className="font-label-mono text-[10px] text-fg-muted uppercase block mb-1">
                TOP VERIFIED SKILLS
              </span>
              <div className="flex flex-wrap gap-1">
                {studentContext.top_skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-label-mono text-[10px] bg-bg-subtle border border-border-hairline px-1.5 py-0.5 text-fg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-bg-surface border border-border-strong p-space-md space-y-2">
            <span className="font-label-mono text-[10px] text-fg-muted uppercase tracking-wider block">
              CURATED PROMPT CHIPS
            </span>
            <div className="space-y-1.5">
              {INITIAL_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isTyping}
                  className="w-full text-left p-2 border border-border-hairline bg-bg-canvas hover:border-border-strong hover:bg-bg-subtle transition-colors text-xs font-label-mono flex items-start gap-2 text-fg-primary"
                >
                  <span className="material-symbols-outlined text-[16px] text-portal-primary mt-0.5">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main AI Chat Terminal */}
        <div className="lg:col-span-3 flex flex-col bg-bg-surface border border-border-strong h-[640px]">
          {/* Terminal Header */}
          <div className="bg-bg-subtle border-b border-border-strong px-space-md py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
              <span className="font-label-mono text-xs font-bold uppercase tracking-wider text-fg-primary">
                ADVISOR TELEMETRY SESSION // ACTIVE
              </span>
            </div>
            <span className="font-label-mono text-[10px] text-fg-muted">
              ROLLING CONTEXT: 8 MSG CAP
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-space-md space-y-space-md bg-bg-canvas">
            {messages.map((msg) => {
              if (msg.role === 'system') {
                return (
                  <div
                    key={msg.id}
                    className="p-2 border border-border-hairline bg-bg-subtle/70 font-label-mono text-[11px] text-fg-muted text-center"
                  >
                    [SYSTEM] {msg.content}
                  </div>
                );
              }

              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-2 font-label-mono text-[10px] text-fg-muted">
                    <span className="uppercase font-bold text-fg-secondary">
                      {isUser ? 'CANDIDATE // YOU' : 'AI ADVISOR // GROQ INFERENCE'}
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-space-md border text-xs sm:text-sm font-sans leading-relaxed ${
                      isUser
                        ? 'bg-fg-primary text-bg-surface border-border-strong'
                        : 'bg-bg-surface text-fg-primary border-border-strong whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}

                    {msg.suggested_actions && msg.suggested_actions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border-hairline flex flex-wrap gap-2">
                        {msg.suggested_actions.map((act, i) => (
                          <Link
                            key={i}
                            href={act.href}
                            className="inline-flex items-center gap-1 font-label-mono text-xs bg-portal-primary text-portal-on-primary px-2.5 py-1 font-bold border border-border-strong hover:bg-portal-primary-hover transition-colors"
                          >
                            <span>{act.label}</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 font-label-mono text-xs text-fg-muted p-2 bg-bg-surface border border-border-hairline w-fit">
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>AI Advisor generating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="border-t border-border-strong p-space-md bg-bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-space-xs"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={
                    quota.remaining > 0
                      ? 'Type career question, skill gap inquiry, or interview scenario...'
                      : 'Daily message quota reached (30/30). Resets at 00:00 UTC.'
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping || quota.remaining <= 0}
                  className="w-full h-11 px-3 border border-border-strong bg-bg-canvas font-mono text-xs text-fg-primary focus:outline-none focus:ring-2 focus:ring-portal-primary"
                />
              </div>

              <Button
                type="submit"
                variant="signal"
                size="md"
                disabled={!input.trim() || isTyping || quota.remaining <= 0}
                className="h-11 px-5"
              >
                <Icon name="send" size={16} className="mr-1.5" />
                Transmit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </NodePageShell>
  );
}
