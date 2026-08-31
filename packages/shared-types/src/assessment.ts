export type AssessmentType = 'TECHNICAL' | 'APTITUDE' | 'SOFT_SKILLS' | 'DOMAIN_SPECIFIC';
export type AssessmentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type AttemptStatus = 'IN_PROGRESS' | 'COMPLETED' | 'EVALUATED' | 'ABANDONED';

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: AssessmentType;
  durationMinutes: number;
  totalMarks: number;
  passingScore: number;
  status: AssessmentStatus;
  skillsAssessed: string[];
}

export interface AssessmentResult {
  attemptId: string;
  assessmentId: string;
  userId: string;
  score: number;
  percentage: number;
  passed: boolean;
  skillBreakdown: Record<string, number>;
  completedAt: string;
}
