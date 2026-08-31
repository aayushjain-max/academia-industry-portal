export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';
export type NotificationType = 'APPLICATION_UPDATE' | 'NEW_OPPORTUNITY' | 'ASSESSMENT_RESULT' | 'MENTORSHIP_INVITE' | 'SYSTEM_ALERT';

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  linkUrl?: string;
  createdAt: string;
}
