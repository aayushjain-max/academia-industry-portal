import { apiClient } from '@/lib/api/client';

export interface VerificationResult {
  code: string;
  verified: boolean;
  status?: string;
  message?: string;
  payload?: any;
  hash?: string;
  issuedAt?: string;
  issuer?: string;
}

export const verifyCredential = async (code: string): Promise<VerificationResult> => {
  return apiClient.get<VerificationResult>(`/verification/${code}/`);
};

export const validateCredentialHash = async (payload: any, hash: string): Promise<VerificationResult> => {
  return apiClient.post<VerificationResult>('/verification/validate-hash/', { payload, hash });
};

export const getVerificationRecords = async (): Promise<any[]> => {
  const res: any = await apiClient.get<any>('/verification/');
  return Array.isArray(res) ? res : res?.results || [];
};

