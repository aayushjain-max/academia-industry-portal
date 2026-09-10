import { apiClient } from '@/lib/api/client';
import { OpportunityItem } from '@/features/opportunities/api';

export interface InternshipItem {
  id: string;
  opportunity: OpportunityItem;
  internship_type: 'SUMMER' | 'WINTER' | 'SEMESTER_LONG' | 'FACULTY_INTERNSHIP';
  weekly_hours: number;
  mentorship_provided: boolean;
  certificate_provided: boolean;
  ppo_eligible: boolean;
  created_at?: string;
}

export const getInternships = async (params?: { type?: string }): Promise<InternshipItem[]> => {
  const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res: any = await apiClient.get<any>(`/internships/${qs}`);
  return Array.isArray(res) ? res : res?.results || [];
};

export const getInternshipById = async (id: string): Promise<InternshipItem> => {
  return apiClient.get<InternshipItem>(`/internships/${id}/`);
};

export const createInternship = async (data: Partial<InternshipItem>): Promise<InternshipItem> => {
  return apiClient.post<InternshipItem>('/internships/', data);
};

