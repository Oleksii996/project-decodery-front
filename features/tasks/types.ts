export type TaskStatus = 'pending' | 'in-progress' | 'done';

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskBody {
  title: string;
  status?: TaskStatus;
  date: string;
}

export interface UpdateTaskStatusBody {
  status: TaskStatus;
}
