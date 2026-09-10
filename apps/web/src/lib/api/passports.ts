import { apiClient } from './client';

export interface SkillPassportCredential {
  id: string;
  skill_name: string;
  proficiency: string;
  score: number;
  verified_by: string;
  verified_at: string;
  verification_code: string;
  crypto_hash: string;
}

export interface SkillPassportData {
  student_id: string;
  full_name: string;
  accreditation_tier: string;
  overall_readiness: number;
  total_verified_credentials: number;
  credentials: SkillPassportCredential[];
}

export const passportsApi = {
  getMyPassport: async (): Promise<SkillPassportData> => {
    return apiClient.get<SkillPassportData>('/skill-passports/me/');
  },

  getPassportByStudentId: async (studentId: string): Promise<SkillPassportData | null> => {
    try {
      return await apiClient.get<SkillPassportData>(`/skill-passports/${studentId}/`);
    } catch {
      return null;
    }
  },
};
