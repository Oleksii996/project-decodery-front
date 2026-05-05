import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Мінімум 2 символи").required("Вкажіть ім'я"),
  email: Yup.string().trim().email('Некоректний email').required('Вкажіть email'),
  childGender: Yup.string()
    .oneOf(['male', 'female', 'unspecified'])
    .required('Оберіть стать дитини'),
  expectedDueDate: Yup.string().required('Вкажіть планову дату пологів'),
});
