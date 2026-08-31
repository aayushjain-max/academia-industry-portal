import { ApiClient } from './client';
import { Skill, UserSkill, SkillGapItem } from '@portal/shared-types';

export class SkillsApi {
  constructor(private client: ApiClient) {}

  async getSkillsList() {
    return this.client.request<Skill[]>('/skills/');
  }

  async getUserSkills(userId: string) {
    return this.client.request<UserSkill[]>(`/skills/user/${userId}/`);
  }

  async getSkillGaps(userId: string, targetRoleId?: string) {
    return this.client.request<SkillGapItem[]>(`/skills/gaps/?user=${userId}&role=${targetRoleId || ''}`);
  }
}
