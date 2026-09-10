import { apiClient } from '@/lib/api/client';

export interface CareerPathItem {
  id: string;
  title: string;
  description: string;
  industry: string;
  salary_range?: { min: number; max: number; currency: string };
  salaryRange?: { min: number; max: number; currency: string };
  growth_projection?: string;
  growthProjection?: string;
  core_skills?: string[];
  coreSkills?: string[];
  recommended_steps?: string[];
  recommendedSteps?: string[];
}

export interface CareerReadinessData {
  id: string;
  overall_score: number;
  overallScore?: number;
  technical_score: number;
  technicalScore?: number;
  soft_skill_score: number;
  softSkillScore?: number;
  project_score: number;
  projectScore?: number;
  certification_score: number;
  certificationScore?: number;
  experience_score: number;
  experienceScore?: number;
  explanation: string;
  calculated_at?: string;
  calculatedAt?: string;
}

export interface ActionPlanStep {
  id: string;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  resourceLink?: string;
}

export interface ActionPlanData {
  id: string;
  target_role: string;
  targetRole?: string;
  skill_gap: string;
  skillGap?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  steps: ActionPlanStep[];
}

export const getCareerPaths = async (): Promise<CareerPathItem[]> => {
  const res: any = await apiClient.get<any>('/career/paths/');
  const items = Array.isArray(res) ? res : res?.results || [];
  return items.map((p: any) => ({
    ...p,
    salary_range: p.salary_range ?? p.salaryRange,
    salaryRange: p.salaryRange ?? p.salary_range,
    growth_projection: p.growth_projection ?? p.growthProjection,
    growthProjection: p.growthProjection ?? p.growth_projection,
    core_skills: p.core_skills ?? p.coreSkills ?? [],
    coreSkills: p.coreSkills ?? p.core_skills ?? [],
    recommended_steps: p.recommended_steps ?? p.recommendedSteps ?? [],
    recommendedSteps: p.recommendedSteps ?? p.recommended_steps ?? [],
  }));
};

export const getCareerPathById = async (id: string): Promise<CareerPathItem> => {
  const p: any = await apiClient.get<CareerPathItem>(`/career/paths/${id}/`);
  return {
    ...p,
    salary_range: p.salary_range ?? p.salaryRange,
    salaryRange: p.salaryRange ?? p.salary_range,
    growth_projection: p.growth_projection ?? p.growthProjection,
    growthProjection: p.growthProjection ?? p.growth_projection,
    core_skills: p.core_skills ?? p.coreSkills ?? [],
    coreSkills: p.coreSkills ?? p.core_skills ?? [],
    recommended_steps: p.recommended_steps ?? p.recommendedSteps ?? [],
    recommendedSteps: p.recommendedSteps ?? p.recommended_steps ?? [],
  };
};

export const getMyCareerReadiness = async (): Promise<CareerReadinessData> => {
  const data: any = await apiClient.get<any>('/career/readiness/');
  return {
    ...data,
    overall_score: data.overall_score ?? data.overallScore ?? 0,
    overallScore: data.overallScore ?? data.overall_score ?? 0,
    technical_score: data.technical_score ?? data.technicalScore ?? 0,
    technicalScore: data.technicalScore ?? data.technical_score ?? 0,
    soft_skill_score: data.soft_skill_score ?? data.softSkillScore ?? 0,
    softSkillScore: data.softSkillScore ?? data.soft_skill_score ?? 0,
    project_score: data.project_score ?? data.projectScore ?? 0,
    projectScore: data.projectScore ?? data.project_score ?? 0,
    certification_score: data.certification_score ?? data.certificationScore ?? 0,
    certificationScore: data.certificationScore ?? data.certification_score ?? 0,
    experience_score: data.experience_score ?? data.experienceScore ?? 0,
    experienceScore: data.experienceScore ?? data.experience_score ?? 0,
    explanation: data.explanation || '',
  };
};

export const getUserCareerReadiness = async (userId: string): Promise<CareerReadinessData> => {
  const data: any = await apiClient.get<any>(`/career/readiness/${userId}/`);
  return {
    ...data,
    overall_score: data.overall_score ?? data.overallScore ?? 0,
    overallScore: data.overallScore ?? data.overall_score ?? 0,
    technical_score: data.technical_score ?? data.technicalScore ?? 0,
    technicalScore: data.technicalScore ?? data.technical_score ?? 0,
    soft_skill_score: data.soft_skill_score ?? data.softSkillScore ?? 0,
    softSkillScore: data.softSkillScore ?? data.soft_skill_score ?? 0,
    project_score: data.project_score ?? data.projectScore ?? 0,
    projectScore: data.projectScore ?? data.project_score ?? 0,
    certification_score: data.certification_score ?? data.certificationScore ?? 0,
    certificationScore: data.certificationScore ?? data.certification_score ?? 0,
    experience_score: data.experience_score ?? data.experienceScore ?? 0,
    experienceScore: data.experienceScore ?? data.experience_score ?? 0,
    explanation: data.explanation || '',
  };
};

export const getMyActionPlan = async (): Promise<ActionPlanData> => {
  const data: any = await apiClient.get<any>('/career/action-plan/');
  return {
    ...data,
    target_role: data.target_role ?? data.targetRole ?? '',
    targetRole: data.targetRole ?? data.target_role ?? '',
    skill_gap: data.skill_gap ?? data.skillGap ?? '',
    skillGap: data.skillGap ?? data.skill_gap ?? '',
    priority: data.priority ?? 'MEDIUM',
    steps: data.steps || [],
  };
};

export const getUserActionPlan = async (userId: string): Promise<ActionPlanData> => {
  const data: any = await apiClient.get<any>(`/career/action-plan/${userId}/`);
  return {
    ...data,
    target_role: data.target_role ?? data.targetRole ?? '',
    targetRole: data.targetRole ?? data.target_role ?? '',
    skill_gap: data.skill_gap ?? data.skillGap ?? '',
    skillGap: data.skillGap ?? data.skill_gap ?? '',
    priority: data.priority ?? 'MEDIUM',
    steps: data.steps || [],
  };
};

export const sendCareerAssistantQuery = async (query: string): Promise<{ query: string; response: string; suggested_actions: string[] }> => {
  return apiClient.post('/career/assistant/', { query });
};

