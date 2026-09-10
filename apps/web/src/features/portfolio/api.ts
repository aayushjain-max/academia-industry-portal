import { apiClient } from '@/lib/api/client';

export interface DigitalPortfolioData {
  id: string;
  student: {
    id: string;
    user: { first_name: string; last_name: string; email: string };
    headline?: string;
    bio?: string;
    institution_name?: string;
    degree?: string;
  };
  username: string;
  is_public: boolean;
  custom_theme: string;
  views_count: number;
  achievements: string[];
}

export const getMyPortfolio = async (): Promise<DigitalPortfolioData> => {
  const res: any = await apiClient.get<any>('/portfolios/');
  const list = Array.isArray(res) ? res : res?.results || [];
  return list[0] || null;
};

export const getPortfolioByUsername = async (username: string): Promise<DigitalPortfolioData> => {
  const res: any = await apiClient.get<any>(`/portfolios/?username=${username}`);
  const list = Array.isArray(res) ? res : res?.results || [];
  return list[0] || null;
};

export const updateMyPortfolio = async (id: string, data: Partial<DigitalPortfolioData>): Promise<DigitalPortfolioData> => {
  return apiClient.patch<DigitalPortfolioData>(`/portfolios/${id}/`, data);
};

