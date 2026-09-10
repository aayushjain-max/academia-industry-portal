import { apiClient } from '@/lib/api/client';

export interface LearningResourceItem {
  id: string;
  title: string;
  provider: string;
  type: 'COURSE' | 'TRAINING' | 'WORKSHOP' | 'MODULE';
  url: string;
  duration_hours: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  rating: number;
  skills_targeted?: Array<{ id: string; name: string }>;
}

export interface LearningProgressItem {
  id: string;
  resource: LearningResourceItem;
  progress_percentage: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  started_at?: string;
  completed_at?: string;
}

export interface IndustryTrainingItem {
  id: string;
  title: string;
  industry: {
    id: string;
    company_name: string;
  };
  description: string;
  duration_weeks: number;
  max_participants: number;
  mode: string;
  is_active: boolean;
}

export const getLearningResources = async (params?: { type?: string; difficulty?: string }): Promise<LearningResourceItem[]> => {
  const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res: any = await apiClient.get<any>(`/learning/${qs}`);
  return Array.isArray(res) ? res : res?.results || [];
};

export const getLearningResourceById = async (id: string): Promise<LearningResourceItem> => {
  return apiClient.get<LearningResourceItem>(`/learning/${id}/`);
};

export const getUserLearningProgress = async (): Promise<LearningProgressItem[]> => {
  const res: any = await apiClient.get<any>('/learning/progress/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const updateLearningProgress = async (resourceId: string, progress: number, status?: string) => {
  return apiClient.post('/learning/progress/', { resource: resourceId, progress_percentage: progress, status });
};

export const getIndustryTrainings = async (): Promise<IndustryTrainingItem[]> => {
  const res: any = await apiClient.get<any>('/learning/trainings/');
  return Array.isArray(res) ? res : res?.results || [];
};

