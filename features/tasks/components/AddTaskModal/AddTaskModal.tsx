'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './AddTaskModal.module.css';

interface Props {
  onClose: () => void;
  onSubmit: (body: { title: string; date: string }) => void;
  isPending?: boolean;
}

interface FormValues {
  title: string;
  date: Date | null;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(2, 'Назва має містити мінімум 2 символи')
    .max(100, 'Назва має містити максимум 100 символів')
    .required('Введіть назву завдання'),

  date: Yup.date().nullable().required('Оберіть дату'),
});

const formatDateToBackend = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export default function AddTaskModal({ onClose, onSubmit, isPending }: Props) {
  const initialValues: FormValues = {
    title: '',
    date: null,
  };

  const handleSubmit = (values: FormValues) => {
    if (!values.date) return;

    onSubmit({
      title: values.title.trim(),
      date: formatDateToBackend(values.date),
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          disabled={isPending}
        >
          ×
        </button>

        <h2 className={styles.title}>Нове завдання</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <label className={styles.label} htmlFor="title">
                Назва завдання
              </label>

              <Field
                id="title"
                name="title"
                className={styles.input}
                placeholder="Прийняти вітаміни"
                disabled={isPending}
              />

              <ErrorMessage
                name="title"
                component="p"
                className={styles.error}
              />

              <label className={styles.label}>Дата</label>

              <DatePicker
                selected={values.date}
                onChange={(date: Date | null) => setFieldValue('date', date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="дд.мм.рррр"
                className={styles.input}
                disabled={isPending}
                minDate={new Date()}
              />

              <ErrorMessage
                name="date"
                component="p"
                className={styles.error}
              />

              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={isPending}
                >
                  {isPending ? 'Збереження...' : 'Зберегти'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
