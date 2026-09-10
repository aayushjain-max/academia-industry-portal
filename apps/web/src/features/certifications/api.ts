import { apiClient } from '@/lib/api/client';

export interface CertificationItem {
  id: string;
  title: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export const getCertifications = async (): Promise<CertificationItem[]> => {
  const res: any = await apiClient.get<any>('/certifications/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const addCertification = async (data: Partial<CertificationItem>): Promise<CertificationItem> => {
  return apiClient.post<CertificationItem>('/certifications/', data);
};

export const deleteCertification = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/certifications/${id}/`);
};

