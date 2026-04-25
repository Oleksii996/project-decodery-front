"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createTask, updateTask } from "../../services/tasksApi";
import { toast } from "react-toastify";

const today = new Date().toISOString().split("T")[0];

const validationSchema = Yup.object({
  task: Yup.string().required("Назва завдання обовʼязкова"),
  date: Yup.string().required("Дата обовʼязкова"),
});

interface Task {
  _id: string;
  task: string;
  date: string;
}

interface Props {
  taskToEdit?: Task | null;
  onClose: () => void;
  onTaskSaved: () => void;
}

export default function AddTaskForm({ taskToEdit, onClose, onTaskSaved }: Props) {
  const initialValues = {
    task: taskToEdit?.task || "",
    date: taskToEdit?.date || today,
  };

  const handleSubmit = async (values: { task: string; date: string }) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, values);
      } else {
        await createTask(values);
      }
      onTaskSaved();
      onClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Щось пішло не так";
      toast.error(message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label>Завдання</label>
            <Field
              name="task"
              type="text"
              placeholder="Введіть назву завдання"
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              <ErrorMessage name="task" />
            </span>
          </div>
          <div>
            <label>Дата</label>
            <Field
              name="date"
              type="date"
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>
              <ErrorMessage name="date" />
            </span>
          </div>
          <button type="submit" disabled={isSubmitting}>
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}