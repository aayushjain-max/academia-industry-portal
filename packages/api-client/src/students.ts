import { ApiClient } from './client';

export class StudentsApi {
  constructor(private client: ApiClient) {}

  async getStudentProfile(studentId: string) {
    return this.client.request<any>(`/students/${studentId}/`);
  }

  async getStudentDashboard() {
    return this.client.request<any>('/students/dashboard/');
  }
}
