import { apiClient } from '@/lib/api/client';

export interface MicroInternshipItem {
  id: string;
  industry: {
    id: string;
    company_name: string;
    website?: string;
  };
  title: string;
  problem_statement: string;
  deliverables: string[];
  duration_days: number;
  stipend: string;
  required_skills?: Array<{ id: string; name: string }>;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED';
  created_at?: string;
}

export const getMicroInternships = async (params?: { status?: string }): Promise<MicroInternshipItem[]> => {
  const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res: any = await apiClient.get<any>(`/micro-internships/${qs}`);
  return Array.isArray(res) ? res : res?.results || [];
};

export const getMicroInternshipById = async (id: string): Promise<MicroInternshipItem> => {
  return apiClient.get<MicroInternshipItem>(`/micro-internships/${id}/`);
};

export const createMicroInternship = async (data: Partial<MicroInternshipItem>): Promise<MicroInternshipItem> => {
  return apiClient.post<MicroInternshipItem>('/micro-internships/', data);
};

