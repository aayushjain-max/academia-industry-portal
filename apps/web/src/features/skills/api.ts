import { apiClient } from '@/lib/api/client';

export interface SkillItem {
  id: string;
  name: string;
  category: 'PROGRAMMING' | 'FRAMEWORKS' | 'DATABASES' | 'CLOUD_DEVOPS' | 'AI_ML' | 'DOMAIN_KNOWLEDGE' | 'SOFT_SKILLS';
  description?: string;
}

export interface StudentSkillItem {
  id: string;
  skill: SkillItem;
  proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  is_verified: boolean;
  verified_score?: number;
}

export const getAllSkills = async (category?: string): Promise<SkillItem[]> => {
  const catParam = category ? `?category=${category}` : '';
  const res: any = await apiClient.get<any>(`/skills/${catParam}`);
  return Array.isArray(res) ? res : res?.results || [];
};

export const getMySkills = async (): Promise<StudentSkillItem[]> => {
  const res: any = await apiClient.get<any>('/skills/my-skills/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const addStudentSkill = async (skillId: string, proficiency: string): Promise<StudentSkillItem> => {
  return apiClient.post<StudentSkillItem>('/skills/my-skills/', { skill: skillId, proficiency });
};

export const updateStudentSkill = async (id: string, data: Partial<StudentSkillItem>): Promise<StudentSkillItem> => {
  return apiClient.patch<StudentSkillItem>(`/skills/my-skills/${id}/`, data);
};

export const deleteStudentSkill = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/skills/my-skills/${id}/`);
};

export const skillsApi = {
  getSkills: async (params?: { category?: string; page_size?: number }): Promise<{ results: SkillItem[]; count: number }> => {
    const list = await getAllSkills(params?.category);
    return { results: list, count: list.length };
  },
  getAllSkills,
  getMySkills,
  addStudentSkill,
  updateStudentSkill,
  deleteStudentSkill,
};

