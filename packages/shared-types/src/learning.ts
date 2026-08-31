export type LearningItemType = 'COURSE' | 'TRAINING' | 'WORKSHOP' | 'MODULE';

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: LearningItemType;
  url: string;
  durationHours: number;
  skillsTargeted: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  rating?: number;
}

export interface UserLearningProgress {
  id: string;
  userId: string;
  resourceId: string;
  progressPercentage: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  startedAt?: string;
  completedAt?: string;
}
