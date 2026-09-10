import { useAuthStore } from '@/store/authStore';

const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ['*'],
  INSTITUTION_ADMIN: [
    'view_institution_dashboard',
    'manage_institution',
    'verify_project',
    'verify_academician',
    'view_analytics',
    'export_reports',
    'manage_courses',
  ],
  ACADEMICIAN: [
    'view_academician_dashboard',
    'verify_project',
    'create_project',
    'manage_mentorship',
    'view_analytics',
    'manage_courses',
  ],
  INDUSTRY: [
    'view_industry_dashboard',
    'create_opportunity',
    'manage_opportunities',
    'view_applicants',
    'manage_mentorship',
    'create_challenge',
  ],
  STUDENT: [
    'view_student_dashboard',
    'create_project',
    'apply_opportunity',
    'request_mentorship',
    'take_assessment',
    'view_learning',
  ],
};

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role || '').toUpperCase().trim();

  const can = (action: string): boolean => {
    if (!userRole) return false;
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    if (permissions.includes('*') || userRole === 'SUPER_ADMIN') {
      return true;
    }
    return permissions.includes(action);
  };

  return { can, role: userRole };
};
