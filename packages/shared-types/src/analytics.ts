export interface InstitutionSkillAnalytics {
  totalStudents: number;
  averageSkillReadiness: number;
  placementRate: number;
  internshipRate: number;
  topSkillsDemand: { skill: string; demandIndex: number }[];
  skillGapDistribution: { skill: string; studentAvg: number; industryRequirement: number }[];
}

export interface IndustryHiringTrends {
  openPositions: number;
  applicantsTotal: number;
  shortlistedTotal: number;
  topDemandedSkills: string[];
}
