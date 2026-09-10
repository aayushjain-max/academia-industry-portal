import { ApiClient } from './client';
import { LearningResource, UserLearningProgress } from '@portal/shared-types';

export class LearningApi {
  constructor(private client: ApiClient) {}

  async getResources() {
    return this.client.request<LearningResource[]>('/learning/');
  }

  async getRecommendations() {
    return this.client.request<LearningResource[]>('/learning/recommended/');
  }

  async getProgress() {
    return this.client.request<UserLearningProgress[]>('/learning/progress/');
  }

  async updateProgress(resourceId: string, progress: { progress_percentage: number; completed?: boolean }) {
    return this.client.request<UserLearningProgress>('/learning/progress/', {
      method: 'POST',
      body: JSON.stringify({ resource: resourceId, ...progress }),
    });
  }
}
