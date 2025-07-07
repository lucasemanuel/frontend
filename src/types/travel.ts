export interface Travel {
  id: number;
  user: User;
  destination: string;
  departure_date: string;
  return_date: string;
  status: TravelStatus;
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type TravelStatus = 'requested' | 'approved' | 'canceled';

export interface TravelFilters {
  destination?: string;
  status?: TravelStatus;
  startDate?: string;
  endDate?: string;
}
