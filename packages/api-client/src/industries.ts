import { ApiClient } from './client';

export class IndustriesApi {
  constructor(private client: ApiClient) {}

  async getCompanyProfile(industryId: string) {
    return this.client.request<any>(`/industries/${industryId}/`);
  }

  async searchCandidates(query: any) {
    return this.client.request<any[]>('/industries/candidates/search/', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }
}
