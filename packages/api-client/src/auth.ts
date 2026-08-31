import { ApiClient } from './client';
import { User } from '@portal/shared-types';

export class AuthApi {
  constructor(private client: ApiClient) {}

  async login(credentials: { email: string; password: string }) {
    return this.client.request<{ access: string; refresh: string; user: User }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: any) {
    return this.client.request<{ message: string; user: User }>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe() {
    return this.client.request<User>('/auth/me/');
  }
}
