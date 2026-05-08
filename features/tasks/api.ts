import { clientApi } from '@/lib/api/clientApi';
import { CreateTaskBody, Task, UpdateTaskStatusBody } from './types';

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await clientApi.get<Task[]>('/tasks');
  return data;
};

export const createTask = async (body: CreateTaskBody): Promise<Task> => {
  const { data } = await clientApi.post<Task>('/tasks', body);
  return data;
};

export const updateTaskStatus = async (
  taskId: string,
  body: UpdateTaskStatusBody
) => {
  const { data } = await clientApi.patch<Task>(`/tasks/${taskId}/status`, body);

  return data;
};
