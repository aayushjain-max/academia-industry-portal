export interface Project {
  id: string;
  title: string;
  description: string;
  skillsUsed: string[];
  repoUrl?: string;
  liveDemoUrl?: string;
  mediaUrls?: string[];
  isVerified: boolean;
  completionDate?: string;
}
