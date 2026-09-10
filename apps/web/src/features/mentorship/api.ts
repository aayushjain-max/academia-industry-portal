import { apiClient } from '@/lib/api/client';

export interface MentorProfileItem {
  id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  };
  expertise: string[];
  company_or_institution: string;
  designation: string;
  bio: string;
  is_available: boolean;
}

export interface MentorshipSessionItem {
  id: string;
  mentor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  mentee: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  topic: string;
  scheduled_at: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  meeting_link?: string;
  notes?: string;
}

export const getMentors = async (): Promise<MentorProfileItem[]> => {
  const res: any = await apiClient.get<any>('/mentorship/mentors/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getMentorshipSessions = async (): Promise<MentorshipSessionItem[]> => {
  const res: any = await apiClient.get<any>('/mentorship/sessions/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const bookMentorshipSession = async (data: { mentor_id: string; topic: string; scheduled_at: string }): Promise<MentorshipSessionItem> => {
  return apiClient.post<MentorshipSessionItem>('/mentorship/sessions/request/', {
    mentorId: data.mentor_id,
    mentor_id: data.mentor_id,
    topic: data.topic,
    scheduledAt: data.scheduled_at,
    scheduled_at: data.scheduled_at,
  });
};

