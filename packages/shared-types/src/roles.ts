export enum Role {
  STUDENT = 'STUDENT',
  INDUSTRY = 'INDUSTRY',
  ACADEMICIAN = 'ACADEMICIAN',
  INSTITUTION_ADMIN = 'INSTITUTION_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string;
  module: string;
}

export interface RolePermissions {
  role: Role;
  permissions: string[];
}
