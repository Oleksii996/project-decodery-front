'use client';

import { useState } from 'react';
import styles from './AddTaskModal.module.css';

type Props = {
  onClose: () => void;
  onSubmit: (body: { title: string; date: string }) => void;
  isPending?: boolean;
};

export default function AddTaskModal({ onClose, onSubmit, isPending }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!title || !date) return;

    onSubmit({
      title: title.trim(),
      date: date.trim(),
    });
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
          onChange={e => setTitle(e.target.value)}
          disabled={isPending}
        />

        {/* DATE */}
        <label className={styles.label}>Дата</label>
        <div className={styles.dateWrapper}>
          <input
            className={styles.input}
            placeholder="дд.мм.рррр"
            value={date}
            onChange={e => setDate(e.target.value)}
            disabled={isPending}
          />
        </div>
        {/* BUTTON */}
        <div className={styles.buttons}>
          <button
            className={styles.saveBtn}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {' '}
            {isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      </div>
    </div>
  );
}
