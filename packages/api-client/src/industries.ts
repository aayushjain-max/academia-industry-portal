import { ApiClient } from './client';

export class IndustriesApi {
  constructor(private client: ApiClient) {}

  async getMyProfile() {
    return this.client.request<any>('/industries/me/');
  }

  async updateMyProfile(data: Record<string, any>) {
    return this.client.request<any>('/industries/me/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getDashboardStats() {
    return this.client.request<any>('/industries/dashboard_stats/');
  }

  async getCompanyProfile(industryId: string) {
    return this.client.request<any>(`/industries/${industryId}/`);
  }

  async searchCandidates(query: string = '') {
    return this.client.request<any>(`/search/?cat=students&q=${encodeURIComponent(query)}`);
  }
}
