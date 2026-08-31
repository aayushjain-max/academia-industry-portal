import { UserSkill } from './skills';
import { Project } from './project';
import { Certification } from './certification';

export interface PublicPortfolio {
  username: string;
  fullName: string;
  headline?: string;
  bio?: string;
  location?: string;
  skills: UserSkill[];
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  isPublic: boolean;
}
