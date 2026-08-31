import { ApiClient } from './client';
import { InstitutionSkillAnalytics } from '@portal/shared-types';

export class AnalyticsApi {
  constructor(private client: ApiClient) {}

  async getSkillDemandHeatmap() {
    return this.client.request<any>('/analytics/skill-demand-heatmap/');
  }

  async getInstitutionOverview() {
    return this.client.request<InstitutionSkillAnalytics>('/analytics/institution-overview/');
  }
}
