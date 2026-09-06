import { apiClient } from '@/lib/api/client';

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  question_type: 'MULTIPLE_CHOICE' | 'CODING' | 'ESSAY';
  options?: string[];
  points: number;
  order: number;
}

export interface AssessmentItem {
  id: string;
  title: string;
  assessment_type: 'TECHNICAL' | 'SOFT_SKILL' | 'APTITUDE';
  description: string;
  duration_minutes: number;
  passing_score: number;
  skills_assessed?: Array<{ id: string; name: string }>;
}

export interface AssessmentAttemptResult {
  attemptId: string;
  assessmentId: string;
  userId: string;
  score: number;
  percentage: number;
  passed: boolean;
  skillBreakdown: Record<string, number>;
  completedAt: string;
}

export const listAssessments = async (): Promise<AssessmentItem[]> => {
  return apiClient.get<AssessmentItem[]>('/assessments/');
};

export const getAssessmentQuestions = async (assessmentId: string): Promise<AssessmentQuestion[]> => {
  return apiClient.get<AssessmentQuestion[]>(`/assessments/${assessmentId}/questions/`);
};

export const submitAssessmentAttempt = async (
  assessmentId: string,
  answers: Record<string, string | number>
): Promise<AssessmentAttemptResult> => {
  return apiClient.post<AssessmentAttemptResult>(`/assessments/${assessmentId}/submit/`, { answers });
};

export const listMyAttempts = async () => {
  return apiClient.get('/assessments/attempts/');
};

