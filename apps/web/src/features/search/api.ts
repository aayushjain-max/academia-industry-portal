import { apiClient } from '@/lib/api/client';

export interface SearchResultsResponse {
  query: string;
  total: number;
  results: {
    opportunities: Array<{ id: string; title: string; company: string; type: string; location: string; skills: string[] }>;
    skills: Array<{ id: string; name: string; category: string; demandLevel: string }>;
    students: Array<{ id: string; name: string; headline: string; college: string; skills: string[] }>;
    projects: Array<{ id: string; title: string; type: string; technologies: string[] }>;
    institutions: Array<{ id: string; name: string; city: string; state: string; type: string }>;
    academicians: Array<{ id: string; name: string; institution: string; department: string }>;
  };
}

export const searchEverything = async (query: string, category?: string): Promise<SearchResultsResponse> => {
  const catParam = category ? `&cat=${encodeURIComponent(category)}` : '';
  return apiClient.get<SearchResultsResponse>(`/search/?q=${encodeURIComponent(query)}${catParam}`);
};

