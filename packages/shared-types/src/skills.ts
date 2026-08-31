export type SkillCategory = 'TECHNICAL' | 'SOFT' | 'APTITUDE' | 'DOMAIN' | 'INDUSTRY';
export type SkillProficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: SkillCategory;
  description?: string;
  isVerified?: boolean;
}

export interface UserSkill {
  id: string;
  userId: string;
  skill: Skill;
  proficiency: SkillProficiency;
  score: number; // 0-100
  verified: boolean;
  verifiedAt?: string;
  verificationSource?: string;
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gapScore: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  actionItems: string[];
}
