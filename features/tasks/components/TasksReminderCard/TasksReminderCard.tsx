'use client';

import { useState } from 'react';
import styles from './TasksReminderCard.module.css';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import TaskItem from './TaskItem';

type Task = {
  id: number;
  title: string;
  done: boolean;
  date: string;
};

type Props = {
  isAuth: boolean;
  className?: string;
};

const parseDate = (str: string) => {
  const [day, month, year] = str.split('.').map(Number);
  return new Date(year, month - 1, day);
};

export default function TasksReminderCard({ isAuth }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleAddClick = () => {
    if (!isAuth) {
      window.location.href = '/auth/register';
      return;
    }
    setIsOpen(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks.filter(t => {
    const d = parseDate(t.date);
    return d.toDateString() === today.toDateString() && !t.done;
  });

  const weekTasks = tasks.filter(t => {
    const d = parseDate(t.date);
    const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diff > 0 && diff <= 7 && !t.done;
  });

  const doneTasks = tasks.filter(t => t.done);

  return (
    <section className={styles.infoText}>
      <div className={styles.top}>
        <h3 className={styles.title}>Важливі завдання</h3>

        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleAddClick}
          aria-label="Додати"
        >
          <svg className={styles.addIcon} width="20" height="20">
            <use href="/leleka-sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Сьогодні:</p>

        {todayTasks.length === 0 ? (
          <p className={styles.placeholder}>Немає завдань на сьогодні</p>
        ) : (
          todayTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Найближчий тиждень:</p>

        {weekTasks.length === 0 ? (
          <p className={styles.placeholder}>Немає найближчих завдань</p>
        ) : (
          weekTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Виконані завдання за тиждень:</p>

        {doneTasks.length === 0 ? (
          <p className={styles.placeholder}>Немає виконаних завдань</p>
        ) : (
          doneTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>

      {isOpen && (
        <AddTaskModal
          onClose={() => setIsOpen(false)}
          onSuccess={newTask => {
            setTasks(prev => [
              ...prev,
              {
                id: newTask.id,
                title: newTask.title,
                done: newTask.done ?? false,
                date: newTask.date || '',
              },
            ]);
          }}
        />
      )}
    </section>
  );
}
