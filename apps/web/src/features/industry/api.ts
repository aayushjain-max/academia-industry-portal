import { apiClient } from '@/lib/api/client';

export interface IndustryProfile {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    avatar?: string;
  };
  company_name: string;
  website?: string;
  industry_sector?: string;
  company_size?: string;
  headquarters?: string;
  description?: string;
  is_verified?: boolean;
}

export interface IndustryDashboardStats {
  active_opportunities: number;
  total_applicants: number;
  shortlisted_candidates: number;
  interviews_scheduled: number;
}

export const getMyIndustryProfile = async (): Promise<IndustryProfile> => {
  return apiClient.get<IndustryProfile>('/industries/me/');
};

export const updateMyIndustryProfile = async (
  data: Partial<IndustryProfile>
): Promise<IndustryProfile> => {
  return apiClient.patch<IndustryProfile>('/industries/me/', data);
};

export const getIndustryDashboardStats = async (): Promise<IndustryDashboardStats> => {
  return apiClient.get<IndustryDashboardStats>('/industries/dashboard_stats/');
};

export const getIndustriesList = async (): Promise<IndustryProfile[]> => {
  const res: any = await apiClient.get<any>('/industries/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getIndustryById = async (id: string): Promise<IndustryProfile> => {
  return apiClient.get<IndustryProfile>(`/industries/${id}/`);
};

