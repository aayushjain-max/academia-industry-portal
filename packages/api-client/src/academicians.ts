import { ApiClient } from './client';

export class AcademiciansApi {
  constructor(private client: ApiClient) {}

  async getFacultyProfile(facultyId: string) {
    return this.client.request<any>(`/academicians/${facultyId}/`);
  }
}
