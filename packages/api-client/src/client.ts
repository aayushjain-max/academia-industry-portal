export interface ApiClientConfig {
  baseUrl?: string;
  getToken?: () => string | null | Promise<string | null>;
  getRefreshToken?: () => string | null | Promise<string | null>;
  onTokenRefreshed?: (access: string, refresh?: string) => void | Promise<void>;
  onUnauthorized?: () => void;
}

export interface RequestOptions extends RequestInit {
  _isRetry?: boolean;
}

export class ApiClient {
  private baseUrl: string;
  private getToken?: () => string | null | Promise<string | null>;
  private getRefreshToken?: () => string | null | Promise<string | null>;
  private onTokenRefreshed?: (access: string, refresh?: string) => void | Promise<void>;
  private onUnauthorized?: () => void;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = (config.baseUrl || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:8000/api/v1').replace(/\/$/, '');
    this.getToken = config.getToken;
    this.getRefreshToken = config.getRefreshToken;
    this.onTokenRefreshed = config.onTokenRefreshed;
    this.onUnauthorized = config.onUnauthorized;
  }

  private async tryRefreshToken(): Promise<string | null> {
    if (!this.getRefreshToken) return null;
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.access && this.onTokenRefreshed) {
        await this.onTokenRefreshed(data.access, data.refresh);
      }
      return data.access || null;
    } catch {
      return null;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${formattedEndpoint}`;

    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    const headers: Record<string, string> = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers as Record<string, string>),
    };
    if (isFormData && headers['Content-Type'] === 'application/json') {
      delete headers['Content-Type'];
    }

    if (this.getToken) {
      const token = await this.getToken();
      if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized with automatic token refresh
    if (response.status === 401 && !options._isRetry && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh') && !endpoint.includes('/auth/register')) {
      if (!this.refreshPromise) {
        this.refreshPromise = this.tryRefreshToken().finally(() => {
          this.refreshPromise = null;
        });
      }

      const newAccessToken = await this.refreshPromise;
      if (newAccessToken) {
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      } else if (this.onUnauthorized) {
        this.onUnauthorized();
      }
    } else if (response.status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let message: string = `API Error: ${response.status} ${response.statusText}`;

      if (typeof errorData === 'string' && errorData.trim()) {
        message = errorData;
      } else if (errorData && typeof errorData === 'object') {
        if (typeof errorData.detail === 'string') {
          message = errorData.detail;
        } else if (typeof errorData.message === 'string') {
          message = errorData.message;
        } else if (errorData.error) {
          if (typeof errorData.error === 'string') {
            message = errorData.error;
          } else if (typeof errorData.error.message === 'string') {
            message = errorData.error.message;
          } else if (typeof errorData.error.detail === 'string') {
            message = errorData.error.detail;
          } else if (typeof errorData.error.detail === 'object' && errorData.error.detail !== null) {
            const detailObj = errorData.error.detail;
            if (Array.isArray(detailObj.non_field_errors)) {
              message = detailObj.non_field_errors.join(' ');
            } else {
              const firstKey = Object.keys(detailObj)[0];
              if (firstKey) {
                const val = detailObj[firstKey];
                message = Array.isArray(val) ? `${firstKey}: ${val.join(' ')}` : `${firstKey}: ${val}`;
              }
            }
          }
        } else if (Array.isArray(errorData.non_field_errors)) {
          message = errorData.non_field_errors.join(' ');
        } else {
          const keys = Object.keys(errorData).filter((k) => k !== 'success');
          if (keys.length > 0) {
            const firstKey = keys[0];
            const val = errorData[firstKey];
            message = Array.isArray(val) ? `${firstKey}: ${val.join(' ')}` : `${firstKey}: ${val}`;
          }
        }
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  get<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: any, options: RequestInit = {}) {
    const formattedBody =
      body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined;
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formattedBody,
    });
  }

  put<T>(endpoint: string, body?: any, options: RequestInit = {}) {
    const formattedBody =
      body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined;
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: formattedBody,
    });
  }

  patch<T>(endpoint: string, body?: any, options: RequestInit = {}) {
    const formattedBody =
      body !== undefined ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined;
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: formattedBody,
    });
  }

  delete<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

