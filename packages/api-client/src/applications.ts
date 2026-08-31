import { ApiClient } from './client';
import { Application } from '@portal/shared-types';

export class ApplicationsApi {
  constructor(private client: ApiClient) {}

  async apply(opportunityId: string, data: { resumeUrl?: string; coverLetter?: string }) {
    return this.client.request<Application>(`/applications/apply/${opportunityId}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listUserApplications() {
    return this.client.request<Application[]>('/applications/my-applications/');
  }
}
