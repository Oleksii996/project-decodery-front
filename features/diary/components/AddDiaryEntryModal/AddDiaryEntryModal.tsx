'use client';

import { useEffect } from 'react';
import { Diary } from '../../types';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';

interface AddDiaryEntryModalProps {
  onClose: () => void;
}

function getEditEntry(): Diary | null {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem('editEntry');

  if (!data) return null;

  return JSON.parse(data) as Diary;
}

export default function AddDiaryEntryModal({
  onClose,
}: AddDiaryEntryModalProps) {
  const entry = getEditEntry();

  const handleClose = () => {
    localStorage.removeItem('editEntry');
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={handleClose}>
          ×
        </button>

        <AddDiaryEntryForm entry={entry} onSuccess={handleClose} />
      </div>
    </div>
  );
}
