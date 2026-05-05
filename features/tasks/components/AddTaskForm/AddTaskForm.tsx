'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { createTask, updateTask } from '../../api';
import { Task } from '../../types';

const today = new Date().toISOString().split('T')[0];

const validationSchema = Yup.object({
  task: Yup.string().required('Назва завдання обовязкова'),
  date: Yup.string().required('Дата обовязкова'),
});

interface Props {
  taskToEdit?: Task | null;
  onClose: () => void;
  onTaskSaved: () => void;
}

export default function AddTaskForm({ taskToEdit, onClose, onTaskSaved }: Props) {
  const initialValues = {
    task: taskToEdit?.task || '',
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
    } catch {
      toast.error('Щось пішло не так');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Назва завдання</label>
            <Field name="task" type="text" placeholder="Прийняти вітаміни" />
            <span><ErrorMessage name="task" /></span>
          </div>
          <div>
            <label>Дата</label>
            <Field name="date" type="date" />
            <span><ErrorMessage name="date" /></span>
          </div>
          <button type="submit" disabled={isSubmitting}>Зберегти</button>
        </Form>
      )}
    </Formik>
  );
}
