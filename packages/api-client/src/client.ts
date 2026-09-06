export interface ApiClientConfig {
  baseUrl?: string;
  getToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
}

export class ApiClient {
  private baseUrl: string;
  private getToken?: () => string | null | Promise<string | null>;
  private onUnauthorized?: () => void;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = (config.baseUrl || (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:8000/api/v1').replace(/\/$/, '');
    this.getToken = config.getToken;
    this.onUnauthorized = config.onUnauthorized;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${formattedEndpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.getToken) {
      const token = await this.getToken();
      if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 && this.onUnauthorized) {
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

