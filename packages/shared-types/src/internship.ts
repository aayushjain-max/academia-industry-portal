import { Opportunity } from './opportunity';

export interface InternshipDetails extends Opportunity {
  type: 'INTERNSHIP' | 'MICRO_INTERNSHIP' | 'FACULTY_INTERNSHIP';
  stipendAmount?: number;
  weeklyHours: number;
  mentorshipProvided: boolean;
  certificateProvided: boolean;
  ppoEligible: boolean;
}
