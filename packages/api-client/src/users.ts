import { ApiClient } from './client';
import { User, UserProfile } from '@portal/shared-types';

export class UsersApi {
  constructor(private client: ApiClient) {}

  async getProfile(userId: string) {
    return this.client.request<UserProfile>(`/users/${userId}/profile/`);
  }

  async updateProfile(userId: string, data: Partial<UserProfile>) {
    return this.client.request<UserProfile>(`/users/${userId}/profile/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}
