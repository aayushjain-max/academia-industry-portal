import { apiClient } from '@/lib/api/client';

export interface InstitutionProfile {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    avatar?: string;
  };
  name: string;
  code?: string;
  institution_type?: string;
  accreditation?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  contact_email?: string;
  is_verified?: boolean;
  total_students_enrolled?: number;
  placement_rate?: number;
}

export interface InstitutionAnalytics {
  total_institutions: number;
  verified_institutions: number;
  placement_benchmarks: {
    average_placement_rate: number;
    top_performing_tier: string;
  };
}

export const getMyInstitutionProfile = async (): Promise<InstitutionProfile> => {
  return apiClient.get<InstitutionProfile>('/institutions/me/');
};

export const updateMyInstitutionProfile = async (
  data: Partial<InstitutionProfile>
): Promise<InstitutionProfile> => {
  return apiClient.patch<InstitutionProfile>('/institutions/me/', data);
};

export const getInstitutionAnalytics = async (): Promise<InstitutionAnalytics> => {
  return apiClient.get<InstitutionAnalytics>('/institutions/analytics/');
};

export const getInstitutionsList = async (): Promise<InstitutionProfile[]> => {
  const res: any = await apiClient.get<any>('/institutions/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getInstitutionById = async (id: string): Promise<InstitutionProfile> => {
  return apiClient.get<InstitutionProfile>(`/institutions/${id}/`);
};

