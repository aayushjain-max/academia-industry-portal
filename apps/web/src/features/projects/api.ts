import { apiClient } from '@/lib/api/client';

export interface ProjectItem {
  id: string;
  student?: {
    id: string;
    user: { first_name: string; last_name: string; email: string };
  };
  title: string;
  description: string;
  project_type: 'ACADEMIC_CAPSTONE' | 'INDUSTRY_LIVE' | 'RESEARCH_CONSULTANCY' | 'HACKATHON';
  skills_used: string[];
  repo_url?: string;
  live_demo_url?: string;
  is_verified?: boolean;
  created_at?: string;
}

export const getProjects = async (params?: { type?: string }): Promise<ProjectItem[]> => {
  const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
  const res: any = await apiClient.get<any>(`/projects/${qs}`);
  return Array.isArray(res) ? res : res?.results || [];
};

export const getProjectById = async (id: string): Promise<ProjectItem> => {
  return apiClient.get<ProjectItem>(`/projects/${id}/`);
};

export const createProject = async (data: Partial<ProjectItem>): Promise<ProjectItem> => {
  return apiClient.post<ProjectItem>('/projects/', data);
};

export const updateProject = async (id: string, data: Partial<ProjectItem>): Promise<ProjectItem> => {
  return apiClient.patch<ProjectItem>(`/projects/${id}/`, data);
};

export const deleteProject = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/projects/${id}/`);
};

