import { ApiClient } from './client';
import { User, UserProfile } from '@portal/shared-types';

export class UsersApi {
  constructor(private client: ApiClient) {}

  async getCurrentUser() {
    return this.client.request<User>('/auth/me/');
  }

  async getProfile(userId: string) {
    return this.client.request<User>(`/users/${userId}/`);
  }

  async updateProfile(userId: string, data: Partial<User>) {
    return this.client.request<User>(`/users/${userId}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}
