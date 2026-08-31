import { ApiClient } from './client';
import { PublicPortfolio } from '@portal/shared-types';

export class PortfolioApi {
  constructor(private client: ApiClient) {}

  async getPublicPortfolio(username: string) {
    return this.client.request<PublicPortfolio>(`/portfolios/public/${username}/`);
  }
}
