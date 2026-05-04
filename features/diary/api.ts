import { clientApi } from '@/lib/api/clientApi';
import { Diary, Emotion } from './types';

export const getAllDiaries = async (): Promise<Diary[]> => {
  const { data } = await clientApi.get<Diary[]>('/diary');
  return data;
};

export const getDiaryById = async (entryId: string): Promise<Diary> => {
  const { data } = await clientApi.get<Diary>(`/diary/${entryId}`);
  return data;
};

export const deleteDiary = async (entryId: string): Promise<Diary> => {
  const { data } = await clientApi.delete<Diary>(`/diary/${entryId}`);
  return data;
};

export const createDiary = async (body: Partial<Diary>): Promise<Diary> => {
  const { data } = await clientApi.post<Diary>('/diary', body);
  return data;
};

export const updateDiary = async (
  entryId: string,
  body: Partial<Diary>
): Promise<Diary> => {
  const { data } = await clientApi.patch<Diary>(`/diary/${entryId}`, body);
  return data;
};

export const getEmotions = async (): Promise<Emotion[]> => {
  const { data } = await clientApi.get<Emotion[]>('/emotions');
  return data;
};