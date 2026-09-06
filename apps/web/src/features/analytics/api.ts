import { apiClient } from '@/lib/api/client';

export interface InstitutionOverview {
  totalStudents: number;
  averageSkillReadiness: number;
  placementRate: number;
  internshipRate: number;
  topSkillsDemand: Array<{ skill: string; demandIndex: number }>;
  skillGapDistribution: Array<{ skill: string; studentAvg: number; industryRequirement: number }>;
}

export interface SkillHeatmapItem {
  region: string;
  domain: string;
  skill: string;
  demandScore: number;
  growth: string;
}

export interface IndustryTrends {
  openPositions: number;
  applicantsTotal: number;
  shortlistedTotal: number;
  topDemandedSkills: string[];
}

export const getInstitutionOverview = async (): Promise<InstitutionOverview> => {
  return apiClient.get<InstitutionOverview>('/analytics/institution-overview/');
};

export const getSkillDemandHeatmap = async (): Promise<SkillHeatmapItem[]> => {
  return apiClient.get<SkillHeatmapItem[]>('/analytics/skill-demand-heatmap/');
};

export const getIndustryTrends = async (): Promise<IndustryTrends> => {
  return apiClient.get<IndustryTrends>('/analytics/industry-trends/');
};

