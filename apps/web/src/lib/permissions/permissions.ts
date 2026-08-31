export const ROLE_PERMISSIONS: Record<string, string[]> = {
  STUDENT: ['apply_opportunity', 'take_assessment', 'view_skill_passport'],
  INDUSTRY: ['post_opportunity', 'view_candidates', 'use_jd_analyzer'],
  ACADEMICIAN: ['view_fdp', 'apply_faculty_internship', 'mentor_students'],
  INSTITUTION_ADMIN: ['view_institution_analytics', 'view_skill_heatmaps', 'manage_students'],
  SUPER_ADMIN: ['manage_all', 'verify_credentials', 'audit_logs'],
};
