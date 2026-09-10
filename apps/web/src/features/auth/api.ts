import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/authStore';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role: 'STUDENT' | 'INDUSTRY' | 'INSTITUTION_ADMIN' | 'ACADEMICIAN' | 'SUPER_ADMIN';
  phone_number?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

export const loginUser = async (credentials: LoginPayload): Promise<AuthResponse> => {
  const data = await apiClient.post<AuthResponse>('/auth/login/', credentials);
  if (typeof window !== 'undefined' && data.access) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    document.cookie = `access_token=${data.access}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `user_role=${data.user.role}; path=/; max-age=86400; SameSite=Lax`;
  }
  if (data.user) {
    useAuthStore.getState().setUser(data.user);
  }
  return data;
};

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const data = await apiClient.post<AuthResponse>('/auth/register/', payload);
  if (typeof window !== 'undefined' && data.access) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    document.cookie = `access_token=${data.access}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `user_role=${data.user.role}; path=/; max-age=86400; SameSite=Lax`;
  }
  if (data.user) {
    useAuthStore.getState().setUser(data.user);
  }
  return data;
};

export interface OnboardingPayload {
  institution_name?: string;
  department?: string;
  degree?: string;
  year_of_study?: number;
  company_name?: string;
  industry_sector?: string;
  website?: string;
  designation?: string;
  bio?: string;
  skills?: string[];
  github_sync?: boolean;
  abc_sync?: boolean;
}

export const completeOnboarding = async (payload: OnboardingPayload) => {
  return apiClient.post('/auth/onboarding/', payload);
};

export const getCurrentUser = async () => {
  const user = await apiClient.get<any>('/auth/me/');
  if (user) {
    useAuthStore.getState().setUser(user);
  }
  return user;
};

export const logoutUser = () => {
  useAuthStore.getState().logout();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'user_role=; path=/; max-age=0';
    window.location.href = '/login';
  }
};


