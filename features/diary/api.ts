import { clientApi } from '@/lib/api/clientApi';
import {  Diary } from './types';

export const getAllDiaries = async (): Promise<Diary []> => {
  const { data } = await clientApi.get<Diary []>('/diary');
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
