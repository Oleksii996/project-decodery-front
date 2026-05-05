'use client';
import { useEffect } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { Task } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
  onTaskSaved: () => void;
}

export default function AddTaskModal({ isOpen, onClose, taskToEdit, onTaskSaved }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '24px', borderRadius: '8px', minWidth: '400px', position: 'relative' }}>
        <h2>{taskToEdit ? 'Редагувати завдання' : 'Нове завдання'}</h2>
        <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px' }}>x</button>
        <AddTaskForm taskToEdit={taskToEdit} onClose={onClose} onTaskSaved={onTaskSaved} />
      </div>
    </div>
  );
}
