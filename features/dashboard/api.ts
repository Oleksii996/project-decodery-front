import { clientApi } from '@/lib/api/clientApi';
import type { BabyWeekResponse, WeeksDashboardResponse } from './types';

export const getWeeksDashboard = async () => {
  const { data } = await clientApi.get<WeeksDashboardResponse>('/weeks/me');
  return data.data;
};

export const getBabyWeekData = async () => {
  const { data } = await clientApi.get<BabyWeekResponse>('/weeks/baby');
  return data.data;
};
