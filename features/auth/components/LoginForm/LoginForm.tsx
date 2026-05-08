'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import css from './LoginForm.module.css';
import { LoginFormValues } from '../../types';
import { loginValidationSchema } from './loginValidationSchema';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const setAuthStore = useAuthStore(s => s.setAuthUser);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginUser(values);
      setAuthStore(data.user);

      router.push('/');
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.message ||
        'Невірний email або пароль';

      toast.error(message);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ isSubmitting, validateForm, submitForm, isValid, dirty }) => (
          <Form
            className={css['login-form']}
            noValidate
            onSubmit={async e => {
              e.preventDefault();

              const errors = await validateForm();

              if (Object.keys(errors).length > 0) {
                const firstError = Object.values(errors)[0];
                toast.error(firstError as string);
                return;
              }

              submitForm();
            }}
          >
            <div className={css['login-wrapper']}>
              <label
                htmlFor={`${fieldId}-email`}
                className={css['login-label']}
              >
                Пошта*
              </label>
              <Field
                type="email"
                name="email"
                id={`${fieldId}-email`}
                className={css['login-input']}
                placeholder="hello@leleka.com"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css['login-error']}
              />
            </div>

            <div className={css['login-wrapper']}>
              <label
                htmlFor={`${fieldId}-password`}
                className={css['login-label']}
              >
                Пароль*
              </label>
              <Field
                type="password"
                name="password"
                id={`${fieldId}-password`}
                className={css['login-input']}
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css['login-error']}
              />
            </div>

            <button
              type="submit"
              className={css['login-btn']}
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? <span className={css.loader}></span> : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
