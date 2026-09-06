import { aiClient } from '@/lib/api/client';

export interface JDAnalysisResult {
  job_title: string;
  required_skills: string[];
  preferred_skills: string[];
  qualifications: string[];
  experience: string;
  responsibilities: string[];
  salary_range?: string;
  location?: string;
  industry?: string;
  keywords: string[];
}

export interface ActionPlanResult {
  user_id: string;
  skill_gap: string;
  priority: string;
  target_role: string;
  estimated_weeks: number;
  action_plan: string[];
  resources: Array<{ title: string; type: string; platform: string }>;
}

export const analyzeJobDescription = async (rawText: string): Promise<JDAnalysisResult> => {
  return aiClient.post<JDAnalysisResult>('/jd-analyzer/analyze', { raw_text: rawText });
};

export const generateSkillActionPlan = async (payload: {
  user_id: string;
  skill_gap: string;
  target_role?: string;
  current_level?: number;
}): Promise<ActionPlanResult> => {
  return aiClient.post<ActionPlanResult>('/action-plan/generate', payload);
};

export const chatWithCareerAssistant = async (message: string, userId: string): Promise<{ response: string }> => {
  return aiClient.post<{ response: string }>('/assistant/chat', { message, user_id: userId });
};

