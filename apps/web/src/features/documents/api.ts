import { apiClient } from '@/lib/api/client';

export interface DocumentItem {
  id: string;
  title: string;
  document_type: 'RESUME' | 'MARKSHEET' | 'DEGREE_CERTIFICATE' | 'EXPERIENCE_LETTER' | 'IDENTITY_PROOF' | 'OTHER';
  file_url: string;
  file_size_bytes: number;
  mime_type: string;
  is_verified: boolean;
  uploaded_at: string;
}

export const getDocuments = async (): Promise<DocumentItem[]> => {
  const res: any = await apiClient.get<any>('/documents/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const uploadDocument = async (formData: FormData): Promise<DocumentItem> => {
  return apiClient.request<DocumentItem>('/documents/upload/', {
    method: 'POST',
    body: formData,
    headers: {}, // let browser set boundary
  });
};

export const deleteDocument = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/documents/${id}/`);
};

