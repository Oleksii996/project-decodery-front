import { clientApi } from '@/lib/api/clientApi';
import type { BabyWeekResponse, WeeksDashboardResponse } from './types';

export const getWeeksDashboard = async (): Promise<WeeksDashboardResponse> => {
  const { data } = await clientApi.get<WeeksDashboardResponse>('/api/weeks/me');
  return data;
};

export const getBabyWeekData = async (): Promise<BabyWeekResponse> => {
  const { data } = await clientApi.get<BabyWeekResponse>('/api/weeks/baby');
  return data;
};
