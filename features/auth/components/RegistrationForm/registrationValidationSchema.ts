import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object({
  name: Yup.string().max(32, 'Максимум 32 символи').required('Введіть імʼя'),

  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Максимум 64 символи')
    .required('Введіть email'),

  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Введіть пароль'),
});
