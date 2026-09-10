import { ApiClient } from './client';

export interface AcademicianProfile {
  id: string;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  institution_name: string;
  department: string;
  designation: string;
  qualifications?: string;
  experience_years?: number;
  areas_of_expertise?: string;
  research_interests?: string;
  industry_training_interests?: string;
  consultancy_areas?: string;
  bio?: string;
  orcid?: string;
  google_scholar?: string;
  linkedin_url?: string;
  website?: string;
  avatar_url?: string;
  is_verified?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AcademicianDashboardMetrics {
  profile: {
    id: string;
    name: string;
    email: string;
    designation: string;
    department: string;
    institution_name: string;
    experience_years: number;
    is_verified: boolean;
    orcid?: string;
    avatar_url?: string;
  };
  scholastic_metrics: {
    mentorship_requests: number;
    active_mentees: number;
    completed_mentorship_sessions: number;
    active_research_projects: number;
    total_research_projects: number;
    total_research_funding: number;
    completed_milestones: number;
    pending_milestones: number;
    total_publications: number;
    scopus_publications: number;
    total_citations: number;
    h_index: number;
    total_patents: number;
    granted_patents: number;
    proposals_in_review: number;
    approved_grants: number;
    approved_grant_funds: number;
    active_consultancies: number;
    total_consultancy_value: number;
    total_consultancy_hours: number;
    active_collaborations: number;
    fdp_registered: number;
    training_registered: number;
    workshops_registered: number;
  };
  department_summary: {
    total_students: number;
    average_readiness_score: number;
  };
}

export interface Publication {
  id: string;
  academician: string;
  academician_name?: string;
  title: string;
  authors?: string;
  journal?: string;
  conference?: string;
  publication_type: 'JOURNAL' | 'CONFERENCE' | 'BOOK_CHAPTER' | 'PATENT' | 'PREPRINT';
  publication_date?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  indexing?: string;
  citation_count: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patent {
  id: string;
  academician: string;
  academician_name?: string;
  title: string;
  patent_number?: string;
  filing_date?: string;
  grant_date?: string;
  status: 'FILED' | 'PUBLISHED' | 'GRANTED' | 'LICENSED' | 'ABANDONED';
  inventors?: string;
  jurisdiction?: string;
  description?: string;
  document_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResearchMilestone {
  id: string;
  project: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  progress_percentage: number;
  completion_date?: string;
}

export interface ResearchMember {
  id: string;
  project: string;
  name: string;
  role: 'PI' | 'CO_PI' | 'INDUSTRY_LEAD' | 'JRF' | 'SRF' | 'POSTDOC' | 'STUDENT_RESEARCHER';
  email?: string;
  affiliation?: string;
  joined_at?: string;
}

export interface ResearchProject {
  id: string;
  academician: string;
  pi_name?: string;
  title: string;
  description?: string;
  research_area?: string;
  status: 'PLANNED' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  start_date?: string;
  end_date?: string;
  funding_amount: number | string;
  funding_agency?: string;
  industry_partner?: string;
  objectives?: string[];
  progress_percentage: number;
  milestones?: ResearchMilestone[];
  members?: ResearchMember[];
  created_at: string;
  updated_at: string;
}

export interface GrantOpportunity {
  id: string;
  title: string;
  funding_agency: string;
  grant_code?: string;
  category: string;
  description?: string;
  total_funding: number | string;
  duration_months: number;
  deadline?: string;
  eligibility_criteria?: string;
  guidelines_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GrantApplication {
  id: string;
  academician: string;
  academician_name?: string;
  grant_opportunity?: string;
  grant_opportunity_details?: GrantOpportunity;
  project_title: string;
  executive_summary?: string;
  requested_amount: number | string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED';
  submitted_at?: string;
  approved_at?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface IndustryCollaboration {
  id: string;
  academician: string;
  academician_name?: string;
  company_name: string;
  title: string;
  collaboration_type: 'RESEARCH' | 'CONSULTANCY' | 'TRAINING' | 'INTERNSHIP' | 'INDUSTRY_PROJECT' | 'CURRICULUM' | 'WORKSHOP' | 'FACULTY_DEVELOPMENT';
  description?: string;
  start_date?: string;
  end_date?: string;
  status: 'PROPOSED' | 'DISCUSSION' | 'APPROVED' | 'ACTIVE' | 'COMPLETED';
  contract_value: number | string;
  outcomes?: string;
  document_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ConsultancyProject {
  id: string;
  academician: string;
  academician_name?: string;
  client_company: string;
  project_title: string;
  description?: string;
  contract_value: number | string;
  institutional_share_pct: number | string;
  status: 'LEAD' | 'PROPOSAL' | 'NEGOTIATION' | 'CONTRACT' | 'ACTIVE' | 'MILESTONES_IN_REVIEW' | 'COMPLETED';
  start_date?: string;
  end_date?: string;
  deliverables?: string;
  hours_allocated: number;
  hours_delivered: number;
  invoice_status: string;
  created_at: string;
  updated_at: string;
}

export interface FDPProgram {
  id: string;
  title: string;
  organizer: string;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  start_date?: string;
  end_date?: string;
  duration_days: number;
  category: string;
  description?: string;
  venue_or_link?: string;
  total_seats: number;
  is_active: boolean;
  is_registered?: boolean;
  created_at: string;
  updated_at: string;
}

export interface FDPRegistration {
  id: string;
  academician: string;
  program: string;
  program_details?: FDPProgram;
  status: 'REGISTERED' | 'ATTENDED' | 'COMPLETED' | 'CANCELLED';
  certificate_url?: string;
  feedback_score?: number;
  feedback_text?: string;
  registered_at: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  provider: string;
  industry_partner?: string;
  start_date?: string;
  end_date?: string;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  description?: string;
  eligibility?: string;
  is_active: boolean;
  is_registered?: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrainingRegistration {
  id: string;
  academician: string;
  program: string;
  program_details?: TrainingProgram;
  status: 'REGISTERED' | 'IN_TRAINING' | 'COMPLETED';
  certificate_url?: string;
  registered_at: string;
}

export interface Workshop {
  id: string;
  title: string;
  domain: string;
  organizer: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  venue_or_link?: string;
  capacity: number;
  is_active: boolean;
  is_registered?: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkshopRegistration {
  id: string;
  academician: string;
  workshop: string;
  workshop_details?: Workshop;
  status: 'REGISTERED' | 'ATTENDED' | 'COMPLETED';
  certificate_url?: string;
  feedback_rating?: number;
  registered_at: string;
}

export interface DepartmentStudent {
  id: string;
  name: string;
  email: string;
  roll_number?: string;
  degree?: string;
  department: string;
  year_of_study: number;
  cgpa?: number;
  readiness_score: number;
  readiness_category: 'INDUSTRY_READY' | 'ALMOST_READY' | 'NEEDS_INTERVENTION' | 'AT_RISK';
  badge_color: 'success' | 'warning' | 'signal' | 'danger';
  skills: { name: string; proficiency: string; is_verified: boolean }[];
  action_plan_count: number;
}

export interface SkillHeatmapData {
  skill_columns: string[];
  cohorts: {
    cohort: string;
    year: number;
    student_count: number;
    skills: Record<string, number>;
  }[];
}

export interface CurriculumAlignmentItem {
  skill_name: string;
  category: string;
  demand_score: number;
  curriculum_supply_score: number;
  gap: number;
  status_tag: 'CRITICAL GAP' | 'MODERATE GAP' | 'ALIGNED';
  prescription: string;
}

export interface FacultyImpactScore {
  total_impact_score: number;
  breakdown: {
    research_funding: { score: number; max: number; evidence: string };
    publications_citations: { score: number; max: number; evidence: string };
    patents_ip: { score: number; max: number; evidence: string };
    industry_collaboration: { score: number; max: number; evidence: string };
    student_mentorship: { score: number; max: number; evidence: string };
  };
}

export class AcademiciansApi {
  constructor(private client: ApiClient) {}

  async getMyProfile(): Promise<AcademicianProfile> {
    return this.client.request<AcademicianProfile>('/academicians/me/');
  }

  async updateMyProfile(data: Partial<AcademicianProfile>): Promise<AcademicianProfile> {
    return this.client.request<AcademicianProfile>('/academicians/me/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getDashboard(): Promise<AcademicianDashboardMetrics> {
    return this.client.request<AcademicianDashboardMetrics>('/academicians/dashboard/');
  }

  async getDepartmentStudents(params?: { batch?: string; readiness?: string; search?: string }): Promise<DepartmentStudent[]> {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return this.client.request<DepartmentStudent[]>(`/academicians/students/${q ? '?' + q : ''}`);
  }

  async getSkillHeatmap(params?: { batch?: string }): Promise<SkillHeatmapData> {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return this.client.request<SkillHeatmapData>(`/academicians/skill_heatmap/${q ? '?' + q : ''}`);
  }

  async getCurriculumAlignment(): Promise<{ department: string; alignments: CurriculumAlignmentItem[] }> {
    return this.client.request<{ department: string; alignments: CurriculumAlignmentItem[] }>('/academicians/curriculum_alignment/');
  }

  async getFacultyImpactScore(): Promise<FacultyImpactScore> {
    return this.client.request<FacultyImpactScore>('/academicians/faculty_impact/');
  }

  // Publications
  async getPublications(params?: Record<string, string>): Promise<{ results: Publication[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/publications/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async createPublication(data: Partial<Publication>): Promise<Publication> {
    return this.client.request<Publication>('/academicians/publications/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePublication(id: string, data: Partial<Publication>): Promise<Publication> {
    return this.client.request<Publication>(`/academicians/publications/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deletePublication(id: string): Promise<void> {
    return this.client.request<void>(`/academicians/publications/${id}/`, {
      method: 'DELETE',
    });
  }

  // Patents
  async getPatents(params?: Record<string, string>): Promise<{ results: Patent[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/patents/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async createPatent(data: Partial<Patent>): Promise<Patent> {
    return this.client.request<Patent>('/academicians/patents/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Research Projects
  async getResearchProjects(params?: Record<string, string>): Promise<{ results: ResearchProject[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/research-projects/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async createResearchProject(data: Partial<ResearchProject> & { milestones?: any[]; members?: any[] }): Promise<ResearchProject> {
    return this.client.request<ResearchProject>('/academicians/research-projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateResearchProject(id: string, data: Partial<ResearchProject>): Promise<ResearchProject> {
    return this.client.request<ResearchProject>(`/academicians/research-projects/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async addProjectMilestone(projectId: string, data: Partial<ResearchMilestone>): Promise<ResearchMilestone> {
    return this.client.request<ResearchMilestone>(`/academicians/research-projects/${projectId}/add_milestone/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addProjectMember(projectId: string, data: Partial<ResearchMember>): Promise<ResearchMember> {
    return this.client.request<ResearchMember>(`/academicians/research-projects/${projectId}/add_member/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Grants
  async getGrantOpportunities(params?: Record<string, string>): Promise<{ results: GrantOpportunity[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/grant-opportunities/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async getGrantApplications(params?: Record<string, string>): Promise<{ results: GrantApplication[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/grant-applications/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async submitGrantApplication(data: { project_title: string; grant_opportunity_id?: string; requested_amount: number; executive_summary?: string }): Promise<GrantApplication> {
    return this.client.request<GrantApplication>('/academicians/grant-applications/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Collaborations
  async getCollaborations(params?: Record<string, string>): Promise<{ results: IndustryCollaboration[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/collaborations/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async createCollaboration(data: Partial<IndustryCollaboration>): Promise<IndustryCollaboration> {
    return this.client.request<IndustryCollaboration>('/academicians/collaborations/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Consultancy
  async getConsultancies(params?: Record<string, string>): Promise<{ results: ConsultancyProject[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/consultancies/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async createConsultancy(data: Partial<ConsultancyProject>): Promise<ConsultancyProject> {
    return this.client.request<ConsultancyProject>('/academicians/consultancies/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // FDP
  async getFDPPrograms(params?: Record<string, string>): Promise<{ results: FDPProgram[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/fdp-programs/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async registerForFDP(programId: string): Promise<FDPRegistration> {
    return this.client.request<FDPRegistration>(`/academicians/fdp-programs/${programId}/register/`, {
      method: 'POST',
    });
  }

  async getMyFDPRegistrations(): Promise<{ results: FDPRegistration[]; count: number }> {
    const res = await this.client.request<any>('/academicians/fdp-registrations/');
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  // Training
  async getTrainingPrograms(params?: Record<string, string>): Promise<{ results: TrainingProgram[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/training-programs/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async registerForTraining(programId: string): Promise<TrainingRegistration> {
    return this.client.request<TrainingRegistration>(`/academicians/training-programs/${programId}/register/`, {
      method: 'POST',
    });
  }

  async getMyTrainingRegistrations(): Promise<{ results: TrainingRegistration[]; count: number }> {
    const res = await this.client.request<any>('/academicians/training-registrations/');
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  // Workshops
  async getWorkshops(params?: Record<string, string>): Promise<{ results: Workshop[]; count: number }> {
    const q = params ? new URLSearchParams(params).toString() : '';
    const res = await this.client.request<any>(`/academicians/workshops/${q ? '?' + q : ''}`);
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }

  async registerForWorkshop(workshopId: string): Promise<WorkshopRegistration> {
    return this.client.request<WorkshopRegistration>(`/academicians/workshops/${workshopId}/register/`, {
      method: 'POST',
    });
  }

  async getMyWorkshopRegistrations(): Promise<{ results: WorkshopRegistration[]; count: number }> {
    const res = await this.client.request<any>('/academicians/workshop-registrations/');
    return Array.isArray(res) ? { results: res, count: res.length } : res;
  }
}
