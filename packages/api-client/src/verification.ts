import { ApiClient } from './client';

export class VerificationApi {
  constructor(private client: ApiClient) {}

  async verifyCredential(verificationId: string) {
    return this.client.request<any>(`/verification/${verificationId}/`);
  }
}
