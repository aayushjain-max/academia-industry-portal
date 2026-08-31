export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeId: string;
  topic: string;
  scheduledAt: string;
  durationMinutes: number;
  meetingLink?: string;
  status: 'REQUESTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  feedbackNotes?: string;
}
