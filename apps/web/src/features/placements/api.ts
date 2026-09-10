import { apiClient } from '@/lib/api/client';

export interface PlacementDriveItem {
  id: string;
  company: {
    id: string;
    company_name: string;
  };
  title: string;
  eligible_branches: string[];
  minimum_cgpa: number;
  package_lpa: number;
  drive_date: string;
  rounds: string[];
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
}

export interface PlacementRecordItem {
  id: string;
  student: {
    id: string;
    user: { first_name: string; last_name: string; email: string };
  };
  drive: PlacementDriveItem;
  package_offered_lpa: number;
  status: 'OFFERED' | 'ACCEPTED' | 'DECLINED';
  offer_letter_url?: string;
  offered_at?: string;
}

export const getPlacementDrives = async (): Promise<PlacementDriveItem[]> => {
  const res: any = await apiClient.get<any>('/placements/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const getPlacementDriveById = async (id: string): Promise<PlacementDriveItem> => {
  return apiClient.get<PlacementDriveItem>(`/placements/${id}/`);
};

export const getPlacementRecords = async (): Promise<PlacementRecordItem[]> => {
  const res: any = await apiClient.get<any>('/placements/records/');
  return Array.isArray(res) ? res : res?.results || [];
};

export const createPlacementDrive = async (data: Partial<PlacementDriveItem>): Promise<PlacementDriveItem> => {
  return apiClient.post<PlacementDriveItem>('/placements/', data);
};

