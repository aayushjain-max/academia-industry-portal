export interface Certification {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  skillsCovered: string[];
}
