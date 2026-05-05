'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '../../hooks';
import { profileValidationSchema } from '../../profileValidationSchema';
import type {
  ChildGender,
  UpdateProfilePayload,
  UserProfile,
} from '../../types';
import css from './ProfileEditForm.module.css';

const GENDER_OPTIONS: Array<{ label: string; value: ChildGender }> = [
  { label: 'Хлопчик', value: 'male' },
  { label: 'Дівчинка', value: 'female' },
  { label: 'Не вказано', value: 'unspecified' },
];

type Props = {
  profile: UserProfile;
};

function toInitialValues(profile: UserProfile): UpdateProfilePayload {
  return {
    name: profile.name,
    email: profile.email,
    childGender: profile.childGender,
    expectedDueDate: profile.expectedDueDate,
  };
}

export default function ProfileEditForm({ profile }: Props) {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfileMutation();

  return (
    <section className={css.card}>
      <h2 className={css.title}>Редагування даних</h2>
      <Formik<UpdateProfilePayload>
        initialValues={toInitialValues(profile)}
        enableReinitialize
        validationSchema={profileValidationSchema}
        onSubmit={async (values, helpers) => {
          try {
            await updateProfile(values);
            toast.success('Профіль оновлено');
          } catch {
            toast.error('Не вдалося зберегти зміни');
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className={css.form}>
            <label className={css.label}>
              <span>Ім&apos;я</span>
              <Field name="name" className={css.input} />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span>Email</span>
              <Field name="email" type="email" className={css.input} />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span>Стать дитини</span>
              <Field as="select" name="childGender" className={css.input}>
                {GENDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="childGender"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span>Планова дата пологів</span>
              <Field name="expectedDueDate" type="date" className={css.input} />
              <ErrorMessage
                name="expectedDueDate"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.actions}>
              <button
                type="button"
                className={css.secondaryButton}
                onClick={() => resetForm({ values: toInitialValues(profile) })}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                className={css.primaryButton}
                disabled={isSubmitting || isPending}
              >
                {isSubmitting || isPending ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
