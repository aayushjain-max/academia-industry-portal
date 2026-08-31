import { ApiClient } from './client';

export class DocumentsApi {
  constructor(private client: ApiClient) {}

  async getUploadUrl(filename: string, contentType: string) {
    return this.client.request<{ uploadUrl: string; fileUrl: string }>('/documents/presigned-url/', {
      method: 'POST',
      body: JSON.stringify({ filename, contentType }),
    });
  }
}
