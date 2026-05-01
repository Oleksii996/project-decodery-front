'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { RegistrationFormValues } from '../../types';
import { registrationValidationSchema } from './registrationValidationSchema';
import { registerUser } from '../../api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const initialValues: RegistrationFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const fieldId = useId();
  const router = useRouter();

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      const data = await registerUser(values);
      toast.success('Реєстрація успішна');
      router.push('/profile/edit');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Користувач вже існує';

      toast.error(message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registrationValidationSchema}
    >
      {({ isSubmitting, validateForm, submitForm }) => (
        <Form
          className={css['registerForm']}
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
          <div className={css['wrapper']}>
            <label htmlFor={`${fieldId}-name`} className={css['label']}>
              Імʼя*
            </label>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              className={css['input']}
              placeholder="Ваше імʼя"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css['error']}
            />
          </div>

          <div className={css['wrapper']}>
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
            <ErrorMessage
              name="email"
              component="span"
              className={css['error']}
            />
          </div>

          <div className={css['wrapper']}>
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
          </div>

          <button
            type="submit"
            className={css['register-btn']}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={css.loader}></span>
            ) : (
              'Зареєструватись'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
