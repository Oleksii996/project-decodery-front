import { clientApi } from '@/lib/api/clientApi';
import { JourneyWeek } from './types';

export const getJourneyWeek = async (
  weekNumber: number
): Promise<JourneyWeek> => {
  const res = await clientApi.get<JourneyWeek>(`/weeks/${weekNumber}`);
  return res.data;
};
