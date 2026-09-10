import { ApiClient } from './client';
import { Application } from '@portal/shared-types';

export class ApplicationsApi {
  constructor(private client: ApiClient) {}

  async apply(opportunityId: string, data: { resumeUrl?: string; coverLetter?: string; resume_url?: string; cover_letter?: string }) {
    return this.client.request<Application>('/applications/', {
      method: 'POST',
      body: JSON.stringify({
        opportunity: opportunityId,
        resume_url: data.resume_url || data.resumeUrl,
        cover_letter: data.cover_letter || data.coverLetter,
      }),
    });
  }

  async listUserApplications() {
    return this.client.request<Application[]>('/applications/');
  }

  async withdraw(applicationId: string) {
    return this.client.request<Application>(`/applications/${applicationId}/withdraw/`, {
      method: 'POST',
    });
  }

  async updateStatus(applicationId: string, status: string, feedback?: string) {
    return this.client.request<Application>(`/applications/${applicationId}/update_status/`, {
      method: 'POST',
      body: JSON.stringify({ status, feedback }),
    });
  }
}
