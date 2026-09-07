import { apiClient } from './client';

export interface VerificationResult {
  verified: boolean;
  cryptographic_proof_valid: boolean;
  verification_status: string;
  signature?: string;
  algorithm?: string;
  reason?: string;
  record?: {
    id: string;
    verification_code: string;
    record_type: string;
    verified_at: string;
    metadata?: Record<string, any>;
  };
}

export const verificationApi = {
  verifyCode: async (code: string): Promise<VerificationResult> => {
    try {
      return await apiClient.get(`/verification/${code}/`);
    } catch {
      return {
        verified: false,
        cryptographic_proof_valid: false,
        verification_status: 'NOT_FOUND',
        reason: 'Verification record does not exist or verification service unreachable.'
      };
    }
  },

  validateHash: async (payload: any, hash: string) => {
    return await apiClient.post('/verification/validate-hash/', { payload, hash });
  }
};
