import { ApiClient } from './client';
import { LearningResource, UserLearningProgress } from '@portal/shared-types';

export class LearningApi {
  constructor(private client: ApiClient) {}

  async getRecommendations(userId: string) {
    return this.client.request<LearningResource[]>(`/learning/recommendations/?user=${userId}`);
  }

  async updateProgress(resourceId: string, progress: Partial<UserLearningProgress>) {
    return this.client.request<UserLearningProgress>(`/learning/progress/${resourceId}/`, {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }
}
