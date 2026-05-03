"use client";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  onClose: () => void;
  onSuccess: (task: Task) => void;
};

export default function AddTaskModal({ onClose, onSuccess }: Props) {
  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now(),
      title: "Нова задача",
      done: false,
    };

    onSuccess(newTask);
    onClose();
  };

  return (
    <div>
      <button onClick={handleSubmit}>Створити</button>
      <button onClick={onClose}>Закрити</button>
    </div>
  );
}