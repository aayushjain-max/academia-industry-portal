export type ApplicationStatus =
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'ASSESSMENT'
  | 'INTERVIEW'
  | 'SELECTED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'JOINED'
  | 'COMPLETED';

export interface ApplicationTimelineEvent {
  id: string;
  status: ApplicationStatus;
  comment?: string;
  actorId: string;
  timestamp: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  applicantId: string;
  applicantName: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  timeline: ApplicationTimelineEvent[];
  appliedAt: string;
  updatedAt: string;
}
