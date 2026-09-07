import { apiClient } from './client';

export interface ApplicationItem {
  id: string;
  opportunity: {
    id: string;
    title: string;
    company_name?: string;
    industry?: {
      company_name?: string;
    };
    stipend_amount?: number;
    stipend_currency?: string;
    location?: string;
  };
  student?: {
    id: string;
    user?: {
      first_name?: string;
      last_name?: string;
      email?: string;
    };
  };
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';
  cover_letter?: string;
  resume_url?: string;
  feedback?: string;
  applied_at: string;
  updated_at: string;
}

export const applicationsApi = {
  getAll: async (): Promise<ApplicationItem[]> => {
    try {
      const res: any = await apiClient.get('/applications/');
      return res.results || res || [];
    } catch {
      return [];
    }
  },

  getById: async (id: string): Promise<ApplicationItem | null> => {
    try {
      return await apiClient.get(`/applications/${id}/`);
    } catch {
      return null;
    }
  },

  create: async (data: { opportunity: string; cover_letter?: string; resume_url?: string }): Promise<ApplicationItem> => {
    return await apiClient.post('/applications/', data);
  },

  updateStatus: async (id: string, status: string, feedback?: string): Promise<ApplicationItem> => {
    return await apiClient.post(`/applications/${id}/update_status/`, { status, feedback });
  },
};
