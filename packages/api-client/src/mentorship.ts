import { ApiClient } from './client';
import { MentorshipSession } from '@portal/shared-types';

export class MentorshipApi {
  constructor(private client: ApiClient) {}

  async requestSession(data: { mentorId: string; topic: string; scheduledAt: string }) {
    return this.client.request<MentorshipSession>('/mentorship/sessions/request/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
