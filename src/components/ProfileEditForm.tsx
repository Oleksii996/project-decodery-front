'use client'

import { Field, Form, Formik, type FieldProps } from 'formik'
import { toast } from 'sonner'
import type { ChildGender, ProfileUpdatePayload, UserProfile } from '@/types/profile'
import { profileFormSchema } from '@/validation/profileFormSchema'
import { useUpdateProfileMutation } from '@/hooks/useProfile'
import { FormField } from './uiKit/FormField'
import { Spinner } from '@/components/ui/Spinner'
import styles from './ProfileEditForm.module.css'

const GENDER_LABELS: Record<ChildGender, string> = {
  male: 'Хлопчик',
  female: 'Дівчинка',
  unspecified: 'Не вказано',
}

function fromProfile(p: UserProfile): ProfileUpdatePayload {
  return {
    name: p.name,
    email: p.email,
    childGender: p.childGender,
    expectedDueDate: p.expectedDueDate,
  }
}

type ProfileEditFormProps = {
  profile: UserProfile
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const { mutateAsync: saveProfile, isPending } = useUpdateProfileMutation()

  return (
    <section className={styles.root} aria-labelledby="profile-edit-title">
      <h2 id="profile-edit-title" className={styles.title}>
        Редагування даних
      </h2>
      <Formik<ProfileUpdatePayload>
        enableReinitialize
        initialValues={fromProfile(profile)}
        validationSchema={profileFormSchema}
        validateOnMount={false}
        onSubmit={async (values, helpers) => {
          helpers.setStatus(undefined)
          try {
            await saveProfile({
              name: values.name.trim(),
              email: values.email.trim(),
              childGender: values.childGender,
              expectedDueDate: values.expectedDueDate,
            })
            toast.success('Профіль оновлено')
          } catch {
            const msg =
              'Не вдалося зберегти зміни. Спробуйте пізніше.'
            helpers.setStatus(msg)
            toast.error(msg)
          } finally {
            helpers.setSubmitting(false)
          }
        }}
      >
        {(formik) => (
          <Form className={styles.form} noValidate>
            <Field name="name">
              {({ field, meta }: FieldProps<string>) => (
                <FormField
                  id="profile-name"
                  label="Ім'я"
                  {...field}
                  autoComplete="name"
                  error={
                    meta.touched && meta.error ? String(meta.error) : undefined
                  }
                />
              )}
            </Field>
            <Field name="email">
              {({ field, meta }: FieldProps<string>) => (
                <FormField
                  id="profile-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  {...field}
                  autoComplete="email"
                  error={
                    meta.touched && meta.error ? String(meta.error) : undefined
                  }
                />
              )}
            </Field>
            <Field name="childGender">
              {({ field, meta }: FieldProps<string>) => (
                <FormField
                  as="select"
                  id="profile-gender"
                  label="Стать дитини"
                  {...field}
                  error={
                    meta.touched && meta.error ? String(meta.error) : undefined
                  }
                >
                  {(Object.keys(GENDER_LABELS) as ChildGender[]).map((key) => (
                    <option key={key} value={key}>
                      {GENDER_LABELS[key]}
                    </option>
                  ))}
                </FormField>
              )}
            </Field>
            <Field name="expectedDueDate">
              {({ field, meta }: FieldProps<string>) => (
                <FormField
                  id="profile-due"
                  label="Планова дата пологів"
                  type="date"
                  {...field}
                  error={
                    meta.touched && meta.error ? String(meta.error) : undefined
                  }
                />
              )}
            </Field>
            {formik.status ? (
              <p className={styles.formError} role="alert">
                {formik.status}
              </p>
            ) : null}
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => {
                  formik.resetForm({ values: fromProfile(profile) })
                  formik.setStatus(undefined)
                }}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={formik.isSubmitting || isPending}
              >
                {formik.isSubmitting || isPending ? (
                  <span className={styles.submitInner}>
                    <Spinner size="sm" label="Збереження профілю" />
                    Збереження…
                  </span>
                ) : (
                  'Зберегти зміни'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}
