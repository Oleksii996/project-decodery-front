'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { RegistrationFormValues } from '../../types';
import { registrationValidationSchema } from './registrationValidationSchema';
import { registerUser } from '../../api';
import { useRouter } from 'next/navigation';

const initialValues: RegistrationFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const fieldId = useId();
  const router = useRouter();

  const handleSubmit = async (values: RegistrationFormValues) => {
    console.log(values);
    try {
      const data = await registerUser(values);
      router.push('/profile');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registrationValidationSchema}
    >
      <Form className={css['registerForm']}>
        <label htmlFor={`${fieldId}-username`} className={css['label']}>
          Імʼя*
        </label>
        <Field
          type="text"
          name="name"
          id={`${fieldId}-name`}
          className={css['input']}
          placeholder="Ваше імʼя"
        />
        <ErrorMessage name="name" component="span" className={css['error']} />

        <label htmlFor={`${fieldId}-email`} className={css['label']}>
          Пошта*
        </label>
        <Field
          type="email"
          name="email"
          id={`${fieldId}-email`}
          className={css['input']}
          placeholder="hello@leleka.com"
        />
        <ErrorMessage name="email" component="span" className={css['error']} />

        <label htmlFor={`${fieldId}-password`} className={css['label']}>
          Пароль*
        </label>
        <Field
          type="password"
          name="password"
          id={`${fieldId}-password`}
          className={css['input']}
          placeholder="********"
        />
        <ErrorMessage
          name="password"
          component="span"
          className={css['error']}
        />

        <button type="submit" className={css['register-btn']}>
          Зареєструватись
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
