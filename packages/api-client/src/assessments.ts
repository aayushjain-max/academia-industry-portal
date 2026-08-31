import { ApiClient } from './client';
import { Assessment, AssessmentResult } from '@portal/shared-types';

export class AssessmentsApi {
  constructor(private client: ApiClient) {}

  async getAssessments() {
    return this.client.request<Assessment[]>('/assessments/');
  }

  async submitAssessmentAttempt(assessmentId: string, answers: any) {
    return this.client.request<AssessmentResult>(`/assessments/${assessmentId}/submit/`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }
}
