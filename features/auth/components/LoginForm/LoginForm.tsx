'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import css from './LoginForm.module.css';
import { LoginFormValues } from '../../types';
import { loginValidationSchema } from './loginValidationSchema';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const fieldId = useId();

  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginUser(values);

      if (!data.user.isOnboardingCompleted) {
        router.push('/onboarding');
        return;
      }

      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        <Form className={css['login-form']}>
          <div className={css['login-wrapper']}>
            <label htmlFor={`${fieldId}-email`} className={css['login-label']}>
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

          <button type="submit" className={css['login-btn']}>
            Увійти
          </button>
        </Form>
      </Formik>
    </>
  );
}
