import { ApiClient } from './client';
import { Skill, UserSkill, SkillGapItem } from '@portal/shared-types';

export class SkillsApi {
  constructor(private client: ApiClient) {}

  async getSkillsList(category?: string, search?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return this.client.request<Skill[]>(`/skills/${qs}`);
  }

  async getUserSkills() {
    return this.client.request<UserSkill[]>('/skills/my-skills/');
  }

  async addStudentSkill(skillId: string, proficiencyLevel: string = 'INTERMEDIATE') {
    return this.client.request<UserSkill>('/skills/my-skills/', {
      method: 'POST',
      body: JSON.stringify({ skill: skillId, proficiency: proficiencyLevel }),
    });
  }

  async getSkillGaps() {
    return this.client.request<SkillGapItem[]>('/skill-gaps/');
  }

  async analyzeSkillGap(targetRole: string = 'Full Stack Developer') {
    return this.client.request<SkillGapItem>('/skill-gaps/analyze/', {
      method: 'POST',
      body: JSON.stringify({ target_role: targetRole }),
    });
  }
}
