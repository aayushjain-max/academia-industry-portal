import { apiClient } from '@/lib/api/client';

export interface ApplicationItem {
  id: string;
  student?: {
    id: string;
    user: {
      first_name: string;
      last_name: string;
      email: string;
    };
    institution_name?: string;
    degree?: string;
  };
  opportunity?: {
    id: string;
    title: string;
    opportunity_type: string;
    industry: {
      company_name: string;
    };
  };
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';
  cover_letter?: string;
  resume_url?: string;
  feedback?: string;
  applied_at: string;
}

export const listApplications = async (): Promise<ApplicationItem[]> => {
  const res: any = await apiClient.get<any>('/applications/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const applyToOpportunity = async (payload: {
  opportunity: string;
  cover_letter?: string;
  resume_url?: string;
}): Promise<ApplicationItem> => {
  return apiClient.post<ApplicationItem>('/applications/', payload);
};

export const updateApplicationStatus = async (
  applicationId: string,
  payload: { status: string; feedback?: string }
): Promise<ApplicationItem> => {
  return apiClient.post<ApplicationItem>(`/applications/${applicationId}/update_status/`, payload);
};

