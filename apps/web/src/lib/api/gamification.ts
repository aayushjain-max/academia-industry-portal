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
    try {
      const res: any = await apiClient.get('/gamification/leaderboard/');
      return res.results || res || [];
    } catch {
      return [
        { rank: 1, student_id: 'STU-1029', name: 'Aarav Sharma', institution: 'IIT Bombay', xp_points: 12450, badges_count: 14, verified_skills_count: 9, tier: 'TIER 01 DIAMOND' },
        { rank: 2, student_id: 'STU-8042', name: 'Current Student (You)', institution: 'COEP Tech', xp_points: 9820, badges_count: 11, verified_skills_count: 7, tier: 'TIER 01 GOLD' },
        { rank: 3, student_id: 'STU-3381', name: 'Priya Patel', institution: 'BITS Pilani', xp_points: 8940, badges_count: 9, verified_skills_count: 6, tier: 'TIER 02 SILVER' },
        { rank: 4, student_id: 'STU-5520', name: 'Rohan Deshmukh', institution: 'VJTI Mumbai', xp_points: 8200, badges_count: 8, verified_skills_count: 5, tier: 'TIER 02 SILVER' },
        { rank: 5, student_id: 'STU-4419', name: 'Ananya Roy', institution: 'NIT Trichy', xp_points: 7600, badges_count: 7, verified_skills_count: 4, tier: 'TIER 02 BRONZE' },
      ];
    }
  },

  getMyStats: async () => {
    try {
      return await apiClient.get('/gamification/my-stats/');
    } catch {
      return {
        rank: 2,
        xp_points: 9820,
        current_streak_days: 14,
        badges_earned: 11,
        next_tier_progress: 78
      };
    }
  }
};
