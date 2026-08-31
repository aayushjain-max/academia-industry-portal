export type OpportunityType = 
  | 'JOB'
  | 'INTERNSHIP'
  | 'PROJECT'
  | 'MICRO_INTERNSHIP'
  | 'TRAINING'
  | 'WORKSHOP'
  | 'FDP'
  | 'FACULTY_INTERNSHIP'
  | 'CONSULTANCY'
  | 'RESEARCH';

export type OpportunityStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'UNDER_REVIEW' | 'FILLED';

export interface Opportunity {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  type: OpportunityType;
  description: string;
  requirements: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  location: string;
  isRemote: boolean;
  stipendOrSalary?: string;
  duration?: string;
  deadline: string;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityMatchResult {
  opportunityId: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  eligibility: boolean;
  reason: string;
}
