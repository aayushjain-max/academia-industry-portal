import { ApiClient } from './client';
import { NotificationItem } from '@portal/shared-types';

export class NotificationsApi {
  constructor(private client: ApiClient) {}

  async getNotifications() {
    return this.client.request<NotificationItem[]>('/notifications/');
  }

  async markAsRead(id: string) {
    return this.client.request<{ success: boolean }>(`/notifications/${id}/read/`, {
      method: 'POST',
    });
  }
}
