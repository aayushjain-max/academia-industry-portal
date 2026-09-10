import { ApiClient } from './client';

export class StudentsApi {
  constructor(private client: ApiClient) {}

  async getMyProfile() {
    return this.client.request<any>('/students/me/');
  }

  async updateMyProfile(data: Record<string, any>) {
    return this.client.request<any>('/students/me/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getStudentProfile(studentId: string) {
    return this.client.request<any>(`/students/${studentId}/`);
  }

  async getStudentDashboard() {
    return this.client.request<any>('/students/dashboard_stats/');
  }

  async getAdvisorSession() {
    return this.client.request<any>('/students/advisor/');
  }

  async sendAdvisorMessage(message: string) {
    return this.client.request<any>('/students/advisor/', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getPublicPortfolio(slug: string) {
    return this.client.request<any>(`/students/public/${slug}/`);
  }

  async confirmGuardianConsent(token: string) {
    return this.client.request<any>(`/students/guardian-confirm/${token}/`, {
      method: 'POST',
    });
  }

  async getCareerRoles() {
    return this.client.request<any>('/career/paths/');
  }

  async calculateReadiness(targetRole?: string) {
    const url = targetRole ? `/career/readiness/?target_role=${encodeURIComponent(targetRole)}` : '/career/readiness/';
    return this.client.request<any>(url);
  }

  async getCareerActionPlan() {
    return this.client.request<any>('/career/action-plan/');
  }

  async getAssessments(category?: string) {
    const url = category ? `/assessments/?category=${category}` : '/assessments/';
    return this.client.request<any>(url);
  }

  async submitAssessment(testId: string, answers: Record<string, any>) {
    return this.client.request<any>(`/assessments/${testId}/submit/`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }
}
