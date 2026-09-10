import { apiClient } from '@/lib/api/client';

export interface StudentProfile {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    phone?: string;
    avatar?: string;
  };
  institution_name: string;
  roll_number?: string;
  degree?: string;
  department?: string;
  year_of_study?: number;
  cgpa?: number;
  headline?: string;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
  portfolio_slug?: string;
  guardian_consent_status?: string;
  guardian_name?: string;
  guardian_email?: string;
  guardian_phone?: string;
  guardian_confirmed_at?: string;
  is_verified?: boolean;
}

export interface StudentDashboardStats {
  active_applications: number;
  verified_skills_count: number;
  career_readiness_score: number;
  completed_assessments: number;
  matching_opportunities: number;
}

export const getMyStudentProfile = async (): Promise<StudentProfile> => {
  return apiClient.get<StudentProfile>('/students/me/');
};

export const updateMyStudentProfile = async (
  data: Partial<StudentProfile>
): Promise<StudentProfile> => {
  return apiClient.patch<StudentProfile>('/students/me/', data);
};

export const getStudentDashboardStats = async (): Promise<StudentDashboardStats> => {
  return apiClient.get<StudentDashboardStats>('/students/dashboard_stats/');
};

export const getStudentAdvisorSession = async () => {
  return apiClient.get<any>('/students/advisor/');
};

export const sendStudentAdvisorMessage = async (message: string) => {
  return apiClient.post<any>('/students/advisor/', { message });
};

export const getPublicStudentPortfolio = async (slug: string): Promise<any> => {
  return apiClient.get<any>(`/students/public/${slug}/`);
};

export const getStudentsList = async (): Promise<StudentProfile[]> => {
  const res: any = await apiClient.get<any>('/students/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getStudentById = async (id: string): Promise<StudentProfile> => {
  return apiClient.get<StudentProfile>(`/students/${id}/`);
};

export const studentsApi = {
  getMyStudentProfile,
  updateMyStudentProfile,
  getStudentDashboardStats,
  getStudentAdvisorSession,
  sendStudentAdvisorMessage,
  getPublicStudentPortfolio,
  getStudentsList,
  getStudentById,
  getStudents: getStudentsList,
};

