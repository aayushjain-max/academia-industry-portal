import { ApiClient } from '@portal/api-client';

const getClientToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};

const handleUnauthorized = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
      window.location.href = '/login';
    }
  }
};

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  getToken: getClientToken,
  onUnauthorized: handleUnauthorized,
});

export const aiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8001/api/v1',
  getToken: getClientToken,
});

