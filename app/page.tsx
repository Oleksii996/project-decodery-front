/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useCallback } from "react";
import { getTasks } from "./services/tasksApi";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  _id: string;
  task: string;
  date: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    const res = await getTasks();
    setTasks(res.data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main style={{ padding: "24px" }}>
      <ToastContainer />
      <h1>Завдання</h1>
      <button onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }}>
        + Додати завдання
      </button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id} style={{ margin: "8px 0" }}>
            {t.date} — {t.task}
            <button
              onClick={() => { setTaskToEdit(t); setIsModalOpen(true); }}
              style={{ marginLeft: "8px" }}
            >
              Редагувати
            </button>
          </li>
        ))}
      </ul>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
        onTaskSaved={fetchTasks}
      />
    </main>
  );
}