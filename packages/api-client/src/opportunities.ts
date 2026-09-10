import { ApiClient } from './client';
import { Opportunity, OpportunityMatchResult } from '@portal/shared-types';

export class OpportunitiesApi {
  constructor(private client: ApiClient) {}

  async listOpportunities(params?: Record<string, string>) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const res: any = await this.client.request<any>(`/opportunities/${qs}`);
    return Array.isArray(res) ? res : res?.results || [];
  }

  async getOpportunity(id: string) {
    return this.client.request<Opportunity>(`/opportunities/${id}/`);
  }

  async matchWithUser(opportunityId: string, userId: string) {
    return this.client.request<OpportunityMatchResult>(`/opportunities/${opportunityId}/match/?user=${userId}`);
  }
}
