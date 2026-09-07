import { ROLE_PERMISSIONS } from './permissions';

/**
 * Evaluates whether a user with the given role possesses the specified permission.
 */
export const hasPermission = (userRole?: string | null, permission?: string | null): boolean => {
  if (!userRole || !permission) return false;
  
  const normalizedRole = userRole.toUpperCase().trim();
  
  // Super Admins possess all permissions by default
  if (normalizedRole === 'SUPER_ADMIN' || normalizedRole === 'ADMIN') {
    return true;
  }

  const rolePerms = ROLE_PERMISSIONS[normalizedRole];
  if (!rolePerms) return false;

  return rolePerms.includes(permission.trim().toLowerCase());
};

/**
 * Checks if a user has any of the listed permissions.
 */
export const hasAnyPermission = (userRole?: string | null, permissions: string[] = []): boolean => {
  return permissions.some((perm) => hasPermission(userRole, perm));
};

/**
 * Checks if a user has all of the listed permissions.
 */
export const hasAllPermissions = (userRole?: string | null, permissions: string[] = []): boolean => {
  return permissions.every((perm) => hasPermission(userRole, perm));
};
