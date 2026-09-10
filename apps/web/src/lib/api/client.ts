import { ApiClient } from '@portal/api-client';

const getClientToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};

const getClientRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
};

const handleTokenRefreshed = (accessToken: string, refreshToken?: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', accessToken);
    document.cookie = `access_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
};

const handleUnauthorized = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'user_role=; path=/; max-age=0';
    if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
      window.location.href = '/login';
    }
  }
};

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  getToken: getClientToken,
  getRefreshToken: getClientRefreshToken,
  onTokenRefreshed: handleTokenRefreshed,
  onUnauthorized: handleUnauthorized,
});

const getAiBaseUrl = (): string => {
  const raw = (process.env.NEXT_PUBLIC_AI_URL || process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8001/api/v1/ai').replace(/\/$/, '');
  if (!raw.endsWith('/ai')) {
    return `${raw}/ai`;
  }
  return raw;
};

export const aiClient = new ApiClient({
  baseUrl: getAiBaseUrl(),
  getToken: getClientToken,
  getRefreshToken: getClientRefreshToken,
  onTokenRefreshed: handleTokenRefreshed,
});


