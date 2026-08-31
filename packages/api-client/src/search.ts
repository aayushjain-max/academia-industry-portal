import { ApiClient } from './client';

export class SearchApi {
  constructor(private client: ApiClient) {}

  async globalSearch(query: string, category?: string) {
    return this.client.request<any>(`/search/?q=${encodeURIComponent(query)}&cat=${category || ''}`);
  }
}
