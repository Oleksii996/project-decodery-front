"use client";

import { useState } from "react";
import styles from "./TasksReminderCard.module.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import TaskItem from "./TaskItem";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  isAuth: boolean;
};

export default function TasksReminderCard({ isAuth }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (id: number) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const handleAddClick = () => {
    if (!isAuth) {
      window.location.href = "/auth/register";
      return;
    }
    setIsOpen(true);
  };

  return (
   <div className={styles.card}>
  <div className={styles.top}>
    <h3 className={styles.title}>Важливі завдання</h3>

    <button
      className={styles.addBtn}
      onClick={handleAddClick}
    >
      +
    </button>
  </div>

  <div className={styles.section}>
    <p className={styles.sectionTitle}>Сьогодні:</p>

    {tasks.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={handleToggle}
      />
    ))}
  </div>

  <div className={styles.section}>
    <p className={styles.sectionTitle}>
      Найближчий тиждень:
    </p>

    {tasks.map(task => (
      <TaskItem
        key={task.id + "_week"}
        task={task}
        onToggle={handleToggle}
      />
    ))}
  </div>
</div>
  );
}