import * as yup from 'yup'
import type { ChildGender } from '@/types/profile'

export const profileFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .required("Обов'язкове поле"),
  email: yup
    .string()
    .trim()
    .email('Введіть коректну електронну адресу')
    .required("Обов'язкове поле"),
  childGender: yup
    .mixed<ChildGender>()
    .oneOf(['male', 'female', 'unspecified'] as const)
    .required(),
  expectedDueDate: yup
    .string()
    .required('Оберіть планову дату пологів')
    .test('valid-date', 'Некоректна дата', (value) => {
      if (!value) return false
      const d = new Date(value + 'T00:00:00')
      return !Number.isNaN(d.getTime())
    })
    .test('not-past', 'Дата не може бути в минулому', (value) => {
      if (!value) return false
      const d = new Date(value + 'T00:00:00')
      if (Number.isNaN(d.getTime())) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return d >= today
    }),
})

export type ProfileFormValues = yup.InferType<typeof profileFormSchema>
