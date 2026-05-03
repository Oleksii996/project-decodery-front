import axios from 'axios';
import type { BabyWeekResponse, WeeksDashboardResponse } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const getWeeksDashboard = async () => {
  const response = await api.get<WeeksDashboardResponse>('/api/weeks/me');
  return response.data.data;
};

export const getBabyWeekData = async () => {
  const response = await api.get<BabyWeekResponse>('/api/weeks/baby');
  return response.data.data;
};
