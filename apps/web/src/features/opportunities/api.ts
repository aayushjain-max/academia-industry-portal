import { apiClient } from '@/lib/api/client';

export interface OpportunityItem {
  id: string;
  title: string;
  industry?: {
    id: string;
    company_name: string;
    industry_type?: string;
  };
  opportunity_type: 'INTERNSHIP' | 'JOB' | 'MICRO_INTERNSHIP' | 'PROJECT';
  description: string;
  location: string;
  is_remote: boolean;
  stipend_or_salary: string;
  required_skills?: Array<{ id: string; name: string }>;
  application_deadline?: string;
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
  openings_count?: number;
  created_at?: string;
}

export const listOpportunities = async (params?: Record<string, string>): Promise<OpportunityItem[]> => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiClient.get<OpportunityItem[]>(`/opportunities/${qs}`);
};

export const getOpportunityById = async (id: string): Promise<OpportunityItem> => {
  return apiClient.get<OpportunityItem>(`/opportunities/${id}/`);
};

export const createOpportunity = async (payload: Partial<OpportunityItem>): Promise<OpportunityItem> => {
  return apiClient.post<OpportunityItem>('/opportunities/', payload);
};

export const updateOpportunity = async (id: string, payload: Partial<OpportunityItem>): Promise<OpportunityItem> => {
  return apiClient.patch<OpportunityItem>(`/opportunities/${id}/`, payload);
};

export const deleteOpportunity = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/opportunities/${id}/`);
};

export const matchOpportunityWithProfile = async (opportunityId: string) => {
  return apiClient.get(`/opportunities/${opportunityId}/match/`);
};

