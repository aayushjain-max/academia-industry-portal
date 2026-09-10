import { apiClient } from '@/lib/api/client';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  institution: string;
  score: number;
  badgesCount: number;
  points: number;
}

export interface BadgeItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  points_reward: number;
}

export interface UserGamificationStats {
  totalPoints: number;
  streakDays: number;
  rank: number;
  badges: BadgeItem[];
}

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res: any = await apiClient.get<any>('/gamification/leaderboard/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getMyGamificationStats = async (): Promise<UserGamificationStats> => {
  return apiClient.get<UserGamificationStats>('/gamification/my-stats/');
};

export const getBadges = async (): Promise<BadgeItem[]> => {
  const res: any = await apiClient.get<any>('/gamification/badges/');
  return Array.isArray(res) ? res : res?.results || [];
};

