import { Opportunity } from './opportunity';

export interface JobDetails extends Opportunity {
  type: 'JOB';
  minExperienceYears: number;
  maxExperienceYears: number;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  salaryMin?: number;
  salaryMax?: number;
}
