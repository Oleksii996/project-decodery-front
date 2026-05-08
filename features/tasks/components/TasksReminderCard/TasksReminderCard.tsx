'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import styles from './TasksReminderCard.module.css';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import TaskItem from './TaskItem';

import { createTask, getTasks, updateTaskStatus } from '@/features/tasks/api';
import type { Task, TaskStatus } from '@/features/tasks/types';

interface TaskReminderProps {
  isAuth: boolean;
  className?: string;
}

const getNextStatus = (status: TaskStatus): TaskStatus => {
  return status === 'done' ? 'pending' : 'done';
};

export default function TasksReminderCard({ isAuth }: TaskReminderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    enabled: isAuth,
    retry: false,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatus(taskId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleAddClick = () => {
    if (!isAuth) {
      router.push('/auth/register');
      return;
    }

    setIsOpen(true);
  };

  const handleCreateTask = (body: { title: string; date: string }) => {
    createTaskMutation.mutate({
      title: body.title,
      date: body.date,
      status: 'pending',
    });
  };

  const handleToggle = (task: Task) => {
    updateStatusMutation.mutate({
      taskId: task._id,
      status: getNextStatus(task.status),
    });
  };

  const activeTasks = tasks.filter(task => task.status !== 'done');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <section className={styles.infoText}>
      <div className={styles.top}>
        <h3 className={styles.title}>Важливі завдання</h3>

        <button className={styles.addBtn} onClick={handleAddClick}>
          <svg width={24} height={24}>
            <use href="/leleka-sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Актуальні:</p>

        {!isAuth ? (
          <p className={styles.placeholder}>
            Зареєструйтесь або увійдіть, щоб додавати завдання
          </p>
        ) : isLoading ? (
          <p className={styles.placeholder}>Завантаження...</p>
        ) : isError ? (
          <p className={styles.placeholder}>Не вдалося завантажити завдання</p>
        ) : activeTasks.length === 0 ? (
          <p className={styles.placeholder}>Немає актуальних завдань</p>
        ) : (
          activeTasks.map(task => (
            <TaskItem key={task._id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Виконані:</p>

        {doneTasks.length === 0 ? (
          <p className={styles.placeholder}>Немає виконаних завдань</p>
        ) : (
          doneTasks.map(task => (
            <TaskItem key={task._id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>

      {isOpen && (
        <AddTaskModal
          onClose={() => setIsOpen(false)}
          onSubmit={handleCreateTask}
          isPending={createTaskMutation.isPending}
        />
      )}
    </section>
  );
}
