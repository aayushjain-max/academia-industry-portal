import { aiClient } from './client';

export interface ActionPlanResponse {
  user_id: string;
  skill_gap: string;
  target_role: string;
  priority: string;
  current_level: number;
  estimated_weeks: number;
  plan_title: string;
  schedule: Array<{
    week: number;
    focus: string;
    topics: string[];
    deliverable: string;
  }>;
  resources: Array<{
    title: string;
    url: string;
    type: string;
  }>;
}

export interface LearningRecommendationsResponse {
  user_id: string;
  deficit_focus: string[];
  recommendation_count: number;
  estimated_completion_weeks: number;
  courses: Array<{
    id: string;
    title: string;
    provider: string;
    skill: string;
    level: string;
    duration: string;
    rating: number;
    enrolled: number;
    url: string;
  }>;
}

export const learningApi = {
  getRecommendations: async (userId: string, deficits?: string[]): Promise<LearningRecommendationsResponse> => {
    const query = deficits ? `?deficits=${encodeURIComponent(deficits.join(','))}` : '';
    return await aiClient.get(`/learning/recommendations/${userId}${query}`);
  },

  generateActionPlan: async (data: {
    user_id: string;
    skill_gap: string;
    target_role?: string;
    current_level?: number;
  }): Promise<ActionPlanResponse> => {
    return await aiClient.post('/action-plan/generate', data);
  },

  chatAssistant: async (userId: string, message: string) => {
    return await aiClient.post('/assistant/chat', { user_id: userId, message });
  },

  getSkillGapAnalysis: async (userId: string, targetRole: string = 'Backend Developer') => {
    return await aiClient.get(`/skill-gap/analyze/${userId}?target_role=${encodeURIComponent(targetRole)}`);
  },

  getCareerReadiness: async (userId: string) => {
    return await aiClient.get(`/career/readiness/${userId}`);
  }
};
