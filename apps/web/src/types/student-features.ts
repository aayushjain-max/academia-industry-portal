/**
 * Shared Type Definitions for Student Platform Features
 * (Readiness, AI Advisor, Assessments, Shareable Portfolio, Guardian Flow)
 */

// ==========================================
// 1. INDUSTRY READINESS & SKILL GAPS
// ==========================================

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  description: string;
  benchmark_skills: Record<string, number>;
  is_industry_verified?: boolean;
}

export interface StudentSkillGapItem {
  skill: string;
  current_score: number;
  required_score: number;
  gap: number;
  severity: 'Critical' | 'Moderate' | 'Met';
}

export interface GapAnalysisResult {
  targetRoleId: string;
  targetRoleTitle: string;
  gaps: StudentSkillGapItem[];
}

export interface ReadinessScoreResult {
  overallScore: number;
  skillReadiness: number;
  assessmentCoverage: number;
  consistency: number;
  tier: 'NOVICE' | 'DEVELOPING' | 'INDUSTRY_READY' | 'ADVANCED_EXPERT';
}

export interface ActionPlanItem {
  focus_area: string;
  gap_severity: 'Critical' | 'Moderate' | 'Met';
  milestone: string;
  recommended_actions: string[];
  estimated_time_to_close: string;
}

export interface ActionPlanResult {
  targetRoleTitle: string;
  source: 'ai' | 'fallback';
  plan: ActionPlanItem[];
}

// ==========================================
// 2. ASSESSMENTS
// ==========================================

export type AssessmentCategory = 'technical' | 'soft' | 'aptitude';

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number; // 0-indexed
  category: AssessmentCategory;
  skill_tag: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  explanation?: string;
}

export interface AssessmentTest {
  id: string;
  title: string;
  slug: string;
  category: AssessmentCategory;
  description: string;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  skill_tags: string[];
  questions?: AssessmentQuestion[];
}

export interface AssessmentAttempt {
  id: string;
  test_id: string;
  test_title: string;
  category: AssessmentCategory;
  score_percentage: number;
  score_raw: number; // 0-10 scale
  total_questions: number;
  correct_count: number;
  completed_at: string;
  time_spent_seconds: number;
  status: 'passed' | 'failed';
  topic_breakdown: Array<{
    skill_tag: string;
    correct: number;
    total: number;
    score: number;
  }>;
}

// ==========================================
// 3. AI ADVISOR & TELEMETRY
// ==========================================

export interface AdvisorMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggested_actions?: Array<{
    label: string;
    href: string;
  }>;
}

export interface AdvisorSessionData {
  daily_count: number;
  daily_limit: number;
  remaining: number;
  messages: AdvisorMessage[];
  student_context: {
    name: string;
    institution: string;
    level: string;
    readiness_index: number;
    top_skills: string[];
  };
}

// ==========================================
// 4. PUBLIC PORTFOLIO
// ==========================================

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  featured?: boolean;
}

export interface PortfolioCertificate {
  id: string;
  title: string;
  issuer: string;
  issued_at: string;
  verification_id: string;
  credential_url?: string;
}

export interface PublicPortfolioData {
  slug: string;
  full_name: string;
  headline: string;
  bio: string;
  avatar_url?: string;
  institution_name: string;
  degree_program: string;
  graduation_year: string;
  readiness_score: number;
  verified_skills: Array<{
    name: string;
    score: number;
    category: 'technical' | 'soft';
    verified: boolean;
  }>;
  projects: PortfolioProject[];
  certificates: PortfolioCertificate[];
  passport_hash: string;
  contact_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// ==========================================
// 5. GUARDIAN CONSENT FLOW
// ==========================================

export type GuardianConsentStatus = 'not_required' | 'pending' | 'confirmed';

export interface GuardianConsentInfo {
  student_name: string;
  student_email: string;
  student_age: number;
  guardian_name: string;
  guardian_email: string;
  status: GuardianConsentStatus;
  requested_at: string;
  confirmed_at?: string;
}
