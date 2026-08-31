export interface CareerPath {
  id: string;
  title: string;
  description: string;
  industry: string;
  salaryRange: { min: number; max: number; currency: string };
  growthProjection: string;
  coreSkills: string[];
  recommendedSteps: string[];
}

export interface CareerReadinessScore {
  userId: string;
  overallScore: number; // 0 - 100
  technicalScore: number;
  softSkillScore: number;
  projectScore: number;
  certificationScore: number;
  experienceScore: number;
  explanation: string;
  calculatedAt: string;
}

export interface ActionPlan {
  id: string;
  userId: string;
  targetRole: string;
  skillGap: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  steps: {
    id: string;
    title: string;
    description: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    resourceLink?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
