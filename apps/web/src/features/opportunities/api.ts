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
  const res: any = await apiClient.get<any>(`/opportunities/${qs}`);
  return Array.isArray(res) ? res : res?.results || [];
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

export type Opportunity = OpportunityItem & {
  company_name?: string;
  stipend_amount?: number;
  duration_weeks?: number;
  is_active?: boolean;
};

export const opportunitiesApi = {
  getOpportunities: async (params?: Record<string, string>): Promise<{ results: Opportunity[]; count: number }> => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const res: any = await apiClient.get<any>(`/opportunities/${qs}`);
    if (Array.isArray(res)) {
      return { results: res as Opportunity[], count: res.length };
    }
    return {
      results: (res?.results || []) as Opportunity[],
      count: res?.count ?? (res?.results?.length || 0),
    };
  },
  listOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  matchOpportunityWithProfile,
};

