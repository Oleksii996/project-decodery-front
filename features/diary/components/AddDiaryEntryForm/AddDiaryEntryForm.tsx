'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createDiary, getEmotions, updateDiary } from '../../api';
import { Diary } from '../../types';
import css from './AddDiaryEntryForm.module.css';

interface AddDiaryEntryFormProps {
  entry: Diary | null;
  onSuccess: () => void;
}

interface DiaryFormValues {
  title: string;
  description: string;
  emotions: string[];
}

const schema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, 'Введіть заголовок')
    .max(64, 'Максимум 64 символи')
    .required('Введіть заголовок'),
  description: Yup.string()
    .trim()
    .min(1, 'Введіть текст запису')
    .max(1000, 'Максимум 1000 символів')
    .required('Введіть текст запису'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть хоча б одну категорію')
    .max(12, 'Максимум 12 категорій')
    .required('Оберіть хоча б одну категорію'),
});

export default function AddDiaryEntryForm({
  entry,
  onSuccess,
}: AddDiaryEntryFormProps) {
  const queryClient = useQueryClient();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: emotionsList = [] } = useQuery({
    queryKey: ['emotions'],
    queryFn: getEmotions,
    staleTime: 5 * 60 * 1000,
  });

  const initialEmotions = useMemo<string[]>(() => {
    if (!entry?.emotions?.length) return [];
    if (!emotionsList.length) return [];

    const byTitle = new Map(emotionsList.map(e => [e.title, e._id]));
    return entry.emotions
      .map(value => byTitle.get(value) ?? value)
      .filter(Boolean);
  }, [entry, emotionsList]);

  const initialValues: DiaryFormValues = {
    title: entry?.title ?? '',
    description: entry?.description ?? '',
    emotions: initialEmotions,
  };

  const mutation = useMutation({
    mutationFn: (values: DiaryFormValues) => {
      if (entry?._id) {
        return updateDiary(entry._id, values);
      }
      return createDiary(values);
    },
    onSuccess: () => {
      toast.success(entry?._id ? 'Запис оновлено' : 'Запис створено');
      localStorage.removeItem('editEntry');
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      if (entry?._id) {
        queryClient.invalidateQueries({ queryKey: ['editEntry', entry._id] });
      }
      onSuccess();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ??
        (error as Error)?.message ??
        'Не вдалося зберегти запис';
      toast.error(message);
    },
  });

  useEffect(() => {
    if (!isCategoriesOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen]);

  const heading = entry?._id ? 'Редагувати запис' : 'Новий запис';

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={values => mutation.mutate(values)}
    >
      {({ values, setFieldValue, setFieldTouched }) => {
        const selectedEmotions = emotionsList.filter(e =>
          values.emotions.includes(e._id)
        );

        const toggleEmotion = (id: string) => {
          const next = values.emotions.includes(id)
            ? values.emotions.filter(v => v !== id)
            : [...values.emotions, id];
          setFieldValue('emotions', next);
          setFieldTouched('emotions', true, false);
        };

        return (
          <Form className={css.form} noValidate>
            <h2 className={css.title}>{heading}</h2>

            <label className={css.label}>
              Заголовок
              <Field
                name="title"
                type="text"
                placeholder="Введіть заголовок запису"
                className={css.input}
                maxLength={64}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.label} ref={dropdownRef}>
              Категорії
              <button
                type="button"
                className={css.dropdownToggle}
                onClick={() => setIsCategoriesOpen(open => !open)}
                aria-expanded={isCategoriesOpen}
              >
                <span className={css.chips}>
                  {selectedEmotions.length === 0 ? (
                    <span className={css.placeholder}>Оберіть категорії</span>
                  ) : (
                    selectedEmotions.map(e => (
                      <span className={css.chip} key={e._id}>
                        {e.title}
                      </span>
                    ))
                  )}
                </span>
                <span
                  className={`${css.chevron} ${
                    isCategoriesOpen ? css.chevronOpen : ''
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {isCategoriesOpen && (
                <ul className={css.dropdownList} role="listbox">
                  {emotionsList.length === 0 && (
                    <li className={css.dropdownEmpty}>
                      Немає доступних категорій
                    </li>
                  )}
                  {emotionsList.map(emotion => {
                    const checked = values.emotions.includes(emotion._id);
                    return (
                      <li key={emotion._id} className={css.dropdownItem}>
                        <label className={css.checkboxLabel}>
                          <input
                            type="checkbox"
                            className={css.checkbox}
                            checked={checked}
                            onChange={() => toggleEmotion(emotion._id)}
                          />
                          {emotion.title}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
              <ErrorMessage
                name="emotions"
                component="span"
                className={css.error}
              />
            </div>

            <label className={css.label}>
              Запис
              <Field name="description">
                {({ field }: FieldProps) => (
                  <textarea
                    {...field}
                    placeholder="Запишіть, як ви себе відчуваєте"
                    className={css.textarea}
                    maxLength={1000}
                  />
                )}
              </Field>
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Збереження...' : 'Зберегти'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
