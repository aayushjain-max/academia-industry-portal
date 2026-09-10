import { apiClient } from '@/lib/api/client';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'APPLICATION_UPDATE' | 'MENTORSHIP' | 'ASSESSMENT' | 'SYSTEM' | 'SECURITY' | string;
  channel: 'IN_APP' | 'EMAIL' | 'SMS' | 'WHATSAPP' | string;
  is_read?: boolean;
  isRead?: boolean;
  created_at?: string;
  createdAt?: string;
  link_url?: string;
  linkUrl?: string;
}

export const getNotifications = async (): Promise<NotificationItem[]> => {
  const res: any = await apiClient.get<any>('/notifications/');
  const items = Array.isArray(res) ? res : res?.results || [];
  return items.map((item: any) => ({
    ...item,
    is_read: item.is_read ?? item.isRead ?? false,
    isRead: item.isRead ?? item.is_read ?? false,
    created_at: item.created_at ?? item.createdAt ?? new Date().toISOString(),
    createdAt: item.createdAt ?? item.created_at ?? new Date().toISOString(),
    link_url: item.link_url ?? item.linkUrl,
    linkUrl: item.linkUrl ?? item.link_url,
  }));
};

export const markNotificationAsRead = async (id: string): Promise<any> => {
  return apiClient.post(`/notifications/${id}/read/`, {});
};

export const markAllNotificationsAsRead = async (): Promise<any> => {
  return apiClient.post('/notifications/mark-all-read/', {});
};

