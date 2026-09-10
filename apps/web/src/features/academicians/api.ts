import { apiClient } from '@/lib/api/client';
export type {
  AcademicianProfile,
  AcademicianDashboardMetrics,
  Publication,
  Patent,
  ResearchProject,
  ResearchMilestone,
  ResearchMember,
  GrantOpportunity,
  GrantApplication,
  IndustryCollaboration,
  ConsultancyProject,
  FDPProgram,
  FDPRegistration,
  TrainingProgram,
  TrainingRegistration,
  Workshop,
  WorkshopRegistration,
  DepartmentStudent,
  SkillHeatmapData,
  CurriculumAlignmentItem,
  FacultyImpactScore,
} from '@portal/api-client';

import type {
  AcademicianProfile,
  AcademicianDashboardMetrics,
  Publication,
  Patent,
  ResearchProject,
  ResearchMilestone,
  ResearchMember,
  GrantOpportunity,
  GrantApplication,
  IndustryCollaboration,
  ConsultancyProject,
  FDPProgram,
  FDPRegistration,
  TrainingProgram,
  TrainingRegistration,
  Workshop,
  WorkshopRegistration,
  DepartmentStudent,
  SkillHeatmapData,
  CurriculumAlignmentItem,
  FacultyImpactScore,
} from '@portal/api-client';

// Core Academician Identity & Aggregates
export const getMyAcademicianProfile = async (): Promise<AcademicianProfile> => {
  return apiClient.get<AcademicianProfile>('/academicians/me/');
};

export const updateMyAcademicianProfile = async (
  data: Partial<AcademicianProfile>
): Promise<AcademicianProfile> => {
  return apiClient.patch<AcademicianProfile>('/academicians/me/', data);
};

export const getAcademicianDashboard = async (): Promise<AcademicianDashboardMetrics> => {
  return apiClient.get<AcademicianDashboardMetrics>('/academicians/dashboard/');
};

export const getAcademicianDashboardStats = async (): Promise<AcademicianDashboardMetrics['scholastic_metrics']> => {
  return apiClient.get<AcademicianDashboardMetrics['scholastic_metrics']>('/academicians/dashboard_stats/');
};

export const getDepartmentStudents = async (params?: { batch?: string; readiness?: string; search?: string }): Promise<DepartmentStudent[]> => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiClient.get<DepartmentStudent[]>(`/academicians/students/${q ? '?' + q : ''}`);
};

export const getSkillHeatmap = async (params?: { batch?: string }): Promise<SkillHeatmapData> => {
  const q = new URLSearchParams(params as Record<string, string>).toString();
  return apiClient.get<SkillHeatmapData>(`/academicians/skill_heatmap/${q ? '?' + q : ''}`);
};

export const getCurriculumAlignment = async (): Promise<{ department: string; alignments: CurriculumAlignmentItem[] }> => {
  return apiClient.get<{ department: string; alignments: CurriculumAlignmentItem[] }>('/academicians/curriculum_alignment/');
};

export const getFacultyImpactScore = async (): Promise<FacultyImpactScore> => {
  return apiClient.get<FacultyImpactScore>('/academicians/faculty_impact/');
};

// Publications
export const getPublications = async (params?: Record<string, string>): Promise<{ results: Publication[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/publications/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const createPublication = async (data: Partial<Publication>): Promise<Publication> => {
  return apiClient.post<Publication>('/academicians/publications/', data);
};

export const updatePublication = async (id: string, data: Partial<Publication>): Promise<Publication> => {
  return apiClient.patch<Publication>(`/academicians/publications/${id}/`, data);
};

export const deletePublication = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/academicians/publications/${id}/`);
};

// Patents
export const getPatents = async (params?: Record<string, string>): Promise<{ results: Patent[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/patents/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const createPatent = async (data: Partial<Patent>): Promise<Patent> => {
  return apiClient.post<Patent>('/academicians/patents/', data);
};

// Research Projects
export const getResearchProjects = async (params?: Record<string, string>): Promise<{ results: ResearchProject[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/research-projects/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const createResearchProject = async (data: Partial<ResearchProject> & { milestones?: any[]; members?: any[] }): Promise<ResearchProject> => {
  return apiClient.post<ResearchProject>('/academicians/research-projects/', data);
};

export const addProjectMilestone = async (projectId: string, data: Partial<ResearchMilestone>): Promise<ResearchMilestone> => {
  return apiClient.post<ResearchMilestone>(`/academicians/research-projects/${projectId}/add_milestone/`, data);
};

export const addProjectMember = async (projectId: string, data: Partial<ResearchMember>): Promise<ResearchMember> => {
  return apiClient.post<ResearchMember>(`/academicians/research-projects/${projectId}/add_member/`, data);
};

// Grants
export const getGrantOpportunities = async (params?: Record<string, string>): Promise<{ results: GrantOpportunity[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/grant-opportunities/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const getGrantApplications = async (params?: Record<string, string>): Promise<{ results: GrantApplication[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/grant-applications/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const submitGrantApplication = async (data: { project_title: string; grant_opportunity_id?: string; requested_amount: number; executive_summary?: string }): Promise<GrantApplication> => {
  return apiClient.post<GrantApplication>('/academicians/grant-applications/', data);
};

// Industry Collaborations
export const getCollaborations = async (params?: Record<string, string>): Promise<{ results: IndustryCollaboration[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/collaborations/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const createCollaboration = async (data: Partial<IndustryCollaboration>): Promise<IndustryCollaboration> => {
  return apiClient.post<IndustryCollaboration>('/academicians/collaborations/', data);
};

// Consultancy Projects
export const getConsultancies = async (params?: Record<string, string>): Promise<{ results: ConsultancyProject[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/consultancies/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const createConsultancy = async (data: Partial<ConsultancyProject>): Promise<ConsultancyProject> => {
  return apiClient.post<ConsultancyProject>('/academicians/consultancies/', data);
};

// FDP Programs & Registrations
export const getFDPPrograms = async (params?: Record<string, string>): Promise<{ results: FDPProgram[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/fdp-programs/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const registerForFDP = async (programId: string): Promise<FDPRegistration> => {
  return apiClient.post<FDPRegistration>(`/academicians/fdp-programs/${programId}/register/`, {});
};

export const getMyFDPRegistrations = async (): Promise<{ results: FDPRegistration[]; count: number }> => {
  const res = await apiClient.get<any>('/academicians/fdp-registrations/');
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

// Industrial Training
export const getTrainingPrograms = async (params?: Record<string, string>): Promise<{ results: TrainingProgram[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/training-programs/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const registerForTraining = async (programId: string): Promise<TrainingRegistration> => {
  return apiClient.post<TrainingRegistration>(`/academicians/training-programs/${programId}/register/`, {});
};

export const getMyTrainingRegistrations = async (): Promise<{ results: TrainingRegistration[]; count: number }> => {
  const res = await apiClient.get<any>('/academicians/training-registrations/');
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

// Workshops
export const getWorkshops = async (params?: Record<string, string>): Promise<{ results: Workshop[]; count: number }> => {
  const q = params ? new URLSearchParams(params).toString() : '';
  const res = await apiClient.get<any>(`/academicians/workshops/${q ? '?' + q : ''}`);
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};

export const registerForWorkshop = async (workshopId: string): Promise<WorkshopRegistration> => {
  return apiClient.post<WorkshopRegistration>(`/academicians/workshops/${workshopId}/register/`, {});
};

export const getMyWorkshopRegistrations = async (): Promise<{ results: WorkshopRegistration[]; count: number }> => {
  const res = await apiClient.get<any>('/academicians/workshop-registrations/');
  return Array.isArray(res) ? { results: res, count: res.length } : res;
};
