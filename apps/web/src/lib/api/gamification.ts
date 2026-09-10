import { apiClient } from './client';

export interface LeaderboardEntry {
  rank: number;
  student_id: string;
  name: string;
  institution: string;
  xp_points: number;
  badges_count: number;
  verified_skills_count: number;
  tier: string;
}

export const gamificationApi = {
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    const res: any = await apiClient.get('/gamification/leaderboard/');
    return res.results || res || [];
  },

  getMyStats: async () => {
    return apiClient.get<any>('/gamification/my-stats/');
  }
};
