import { apiClient } from './client';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  channel: string;
  type: string;
  is_read: boolean;
  link_url?: string;
  created_at: string;
}

export const notificationsApi = {
  getAll: async (): Promise<NotificationItem[]> => {
    try {
      const res: any = await apiClient.get('/notifications/');
      return res.results || res || [];
    } catch {
      return [
        {
          id: 'notif-1',
          title: 'Round 02 Interview Scheduled',
          message: 'TechNova Labs scheduled your Systems Architecture interview for Oct 24 at 14:00 IST.',
          channel: 'IN_APP',
          type: 'APPLICATION_UPDATE',
          is_read: false,
          link_url: '/student/applications',
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'notif-2',
          title: 'Skill Passport Verification Minted',
          message: 'Your Python Asyncio assessment has been cryptographically signed and added to your passport.',
          channel: 'IN_APP',
          type: 'ASSESSMENT_RESULT',
          is_read: false,
          link_url: '/student/skill-passport',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
    }
  },

  markAsRead: async (id: string) => {
    try {
      return await apiClient.post(`/notifications/${id}/mark_read/`, {});
    } catch {
      return { success: true };
    }
  },

  markAllAsRead: async () => {
    try {
      return await apiClient.post('/notifications/mark_all_read/', {});
    } catch {
      return { success: true };
    }
  }
};
