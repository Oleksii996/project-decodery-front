'use client';

import { useState } from 'react';
import styles from './AddTaskModal.module.css';

type Task = {
  id: number;
  title: string;
  done: boolean;
  date: string;
};

type Props = {
  onClose: () => void;
  onSuccess: (task: Task) => void;
};

export default function AddTaskModal({ onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

    const handleSubmit = () => {
      if (!title || !date) return;

      const newTask: Task = {
        id: Date.now(),
        title,
        done: false,
        date,
      };

      onSuccess(newTask);
      onClose();
    };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* CLOSE */}
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>Нове завдання</h2>

        {/* INPUT */}
        <label className={styles.label}>Назва завдання</label>
        <input
          className={styles.input}
          placeholder="Прийняти вітаміни"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DATE */}
                <label className={styles.label}>Дата</label>
              <div className={styles.dateWrapper}>
            <input
            className={styles.input}
            placeholder="дд.мм.рррр"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />  

        </div>
        {/* BUTTON */}
        <div className={styles.buttonWrapper}>
        <button className={styles.saveBtn} onClick={handleSubmit}>
          Зберегти
        </button>
        </div>
      </div>
    </div>
  );
}
