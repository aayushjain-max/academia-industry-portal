import { ApiClient } from './client';
import { CareerReadinessScore, ActionPlan, CareerPath } from '@portal/shared-types';

export class CareerApi {
  constructor(private client: ApiClient) {}

  async getReadinessScore(userId: string) {
    return this.client.request<CareerReadinessScore>(`/career/readiness/${userId}/`);
  }

  async getActionPlan(userId: string) {
    return this.client.request<ActionPlan>(`/career/action-plan/${userId}/`);
  }

  async getCareerPaths() {
    return this.client.request<CareerPath[]>('/career/paths/');
  }
}
