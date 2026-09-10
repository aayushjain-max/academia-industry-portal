export type {
  AcademicianProfile,
  AcademicianDashboardMetrics,
  Publication,
  Patent,
  ResearchProject,
  ResearchMilestone,
  ResearchMember,
  GrantOpportunity,
  GrantApplication,
  IndustryCollaboration,
  ConsultancyProject,
  FDPProgram,
  FDPRegistration,
  TrainingProgram,
  TrainingRegistration,
  Workshop,
  WorkshopRegistration,
  DepartmentStudent,
  SkillHeatmapData,
  CurriculumAlignmentItem,
  FacultyImpactScore,
} from '@portal/api-client';

export interface AcademiciansState {
  isLoading: boolean;
  error: string | null;
}

