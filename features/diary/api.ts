import { clientApi } from '@/lib/api/clientApi';
import { AxiosGetAllDiariesResponse, Diary } from './types';

export const getAllDiaries = async (): Promise<AxiosGetAllDiariesResponse> => {
  const { data } = await clientApi.get<AxiosGetAllDiariesResponse>('/diaries');
  return data;
};

export const getDiaryById = async (entryId: string): Promise<Diary> => {
  const { data } = await clientApi.get<Diary>(`/diaries/${entryId}`);
  return data;
};

export const deleteDiary = async (entryId: string): Promise<Diary> => {
  const { data } = await clientApi.delete<Diary>(`/diaries/${entryId}`);
  return data;
};
