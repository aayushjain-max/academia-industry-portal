import { ApiClient } from './client';

export class InstitutionsApi {
  constructor(private client: ApiClient) {}

  async getInstitutionAnalytics() {
    return this.client.request<any>('/institutions/analytics/');
  }
}
