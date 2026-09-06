import { apiClient } from '@/lib/api/client';

export interface VerifiedCredential {
  skill: string;
  proficiency: string;
  verified_score: number;
}

export interface SkillPassportData {
  id: string;
  passport_number: string;
  qr_code_url?: string;
  cryptographic_signature: string;
  is_valid: boolean;
  issued_at: string;
  verified_credentials_snapshot: VerifiedCredential[];
}

export interface VerificationResult {
  valid: boolean;
  passportNumber: string;
  studentName: string;
  institution: string;
  degree: string;
  issuedAt: string;
  verifiedCredentials: VerifiedCredential[];
  signature: string;
  message: string;
}

export const getMySkillPassport = async (): Promise<SkillPassportData> => {
  return apiClient.get<SkillPassportData>('/skill-passports/my_passport/');
};

export const verifyPassportSignature = async (signature: string): Promise<VerificationResult> => {
  return apiClient.get<VerificationResult>(`/skill-passports/verify/${signature}/`);
};

