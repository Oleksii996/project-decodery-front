'use client';

import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useMemo } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { applyProfileChildGenderTheme } from '@/utils/localStorageTheme';
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

const onboardingMinWeeks = 1;
const onboardingMaxWeeks = 40;

const monthLabels = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
] as const;

type WeekDayLabel = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Нд';

const weekDayMap: Record<string, WeekDayLabel> = {
  Monday: 'Пн',
  Tuesday: 'Вт',
  Wednesday: 'Ср',
  Thursday: 'Чт',
  Friday: 'Пт',
  Saturday: 'Сб',
  Sunday: 'Нд',
  Mon: 'Пн',
  Tue: 'Вт',
  Wed: 'Ср',
  Thu: 'Чт',
  Fri: 'Пт',
  Sat: 'Сб',
  Sun: 'Нд',
  Mo: 'Пн',
  Tu: 'Вт',
  We: 'Ср',
  Th: 'Чт',
  Fr: 'Пт',
  Sa: 'Сб',
  Su: 'Нд',
};

const getOffsetDate = (weeksFromToday: number) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + weeksFromToday * 7);
  return date;
};

function useDueDateBounds(expectedDueDate: string) {
  return useMemo(() => {
    const minDefault = getOffsetDate(onboardingMinWeeks);
    const maxDefault = getOffsetDate(onboardingMaxWeeks);
    if (!expectedDueDate) {
      return { minDueDate: minDefault, maxDueDate: maxDefault };
    }
    const current = new Date(expectedDueDate);
    if (Number.isNaN(current.getTime())) {
      return { minDueDate: minDefault, maxDueDate: maxDefault };
    }
    current.setHours(0, 0, 0, 0);
    let min = minDefault;
    let max = maxDefault;
    if (current < min) min = new Date(current);
    if (current > max) max = new Date(current);
    return { minDueDate: min, maxDueDate: max };
  }, [expectedDueDate]);
}

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

function ProfileGenderThemeSync() {
  const { values } = useFormikContext<UpdateProfilePayload>();

  useEffect(() => {
    applyProfileChildGenderTheme(values.childGender);
  }, [values.childGender]);

  return null;
}

export default function ProfileEditForm({ profile }: Props) {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfileMutation();
  const { minDueDate, maxDueDate } = useDueDateBounds(profile.expectedDueDate);

  return (
    <section className={css.container}>
      <h2 className={css.heading}>Редагування даних</h2>
      <Formik<UpdateProfilePayload>
        initialValues={toInitialValues(profile)}
        enableReinitialize
        validationSchema={profileValidationSchema}
        onSubmit={async (values, helpers) => {
          try {
            await updateProfile(values);
            toast.success('Профіль оновлено');
          } catch (error: unknown) {
            let message: string | null = null;
            if (isAxiosError(error)) {
              const data = error.response?.data;
              if (data && typeof data === 'object') {
                if ('message' in data && typeof data.message === 'string') {
                  message = data.message;
                } else if ('error' in data && typeof data.error === 'string') {
                  message = data.error;
                }
              }
              message = message ?? error.message;
            }
            toast.error(message?.trim() || 'Не вдалося зберегти зміни');
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({
          isSubmitting,
          resetForm,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className={css.form}>
            <ProfileGenderThemeSync />
            <label className={css.formField}>
              <span>Ім&apos;я</span>
              <Field name="name" className={css.formInput} />
              <ErrorMessage
                name="name"
                component="span"
                className={css.formError}
              />
            </label>

            <label className={css.formField}>
              <span>Email</span>
              <Field name="email" type="email" className={css.formInput} />
              <ErrorMessage
                name="email"
                component="span"
                className={css.formError}
              />
            </label>

            <label className={css.formField}>
              <span>Стать дитини</span>
              <Field as="select" name="childGender" className={css.formInput}>
                {GENDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="childGender"
                component="span"
                className={css.formError}
              />
            </label>

            <label className={css.formField}>
              <span>Планова дата пологів</span>
              <div className={css.datePickerField}>
                <DatePicker
                  selected={
                    values.expectedDueDate
                      ? new Date(values.expectedDueDate)
                      : null
                  }
                  onChange={(date: Date | null) => {
                    const normalizedDate = date
                      ? new Date(
                          date.getTime() - date.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .slice(0, 10)
                      : '';
                    setFieldValue('expectedDueDate', normalizedDate);
                  }}
                  onBlur={() => setFieldTouched('expectedDueDate', true)}
                  minDate={minDueDate}
                  maxDate={maxDueDate}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Оберіть дату"
                  className={css.datePickerInput}
                  calendarClassName={css.datePickerCalendar}
                  popperClassName={css.datePickerPopper}
                  showPopperArrow={false}
                  shouldCloseOnSelect
                  calendarStartDay={1}
                  formatWeekDay={day => weekDayMap[day] ?? day.slice(0, 2)}
                  renderCustomHeader={({
                    changeMonth,
                    changeYear,
                    date,
                    decreaseMonth,
                    increaseMonth,
                    nextMonthButtonDisabled,
                    prevMonthButtonDisabled,
                  }) => {
                    const yearStart = minDueDate.getFullYear();
                    const yearEnd = maxDueDate.getFullYear();
                    const yearOptions = Array.from(
                      { length: yearEnd - yearStart + 1 },
                      (_, i) => yearStart + i
                    );
                    return (
                      <div className={css.datePickerHeader}>
                        <div className={css.datePickerHeaderTitle}>
                          <select
                            className={css.datePickerMonthSelect}
                            value={date.getMonth()}
                            onChange={event =>
                              changeMonth(Number(event.target.value))
                            }
                          >
                            {monthLabels.map((month, index) => (
                              <option key={month} value={index}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            className={css.datePickerYearSelect}
                            value={date.getFullYear()}
                            onChange={event =>
                              changeYear(Number(event.target.value))
                            }
                          >
                            {yearOptions.map(year => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={css.datePickerNav}>
                          <button
                            className={css.datePickerNavButton}
                            type="button"
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            aria-label="Попередній місяць"
                          >
                            <span aria-hidden="true">‹</span>
                          </button>

                          <button
                            className={css.datePickerNavButton}
                            type="button"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            aria-label="Наступний місяць"
                          >
                            <span aria-hidden="true">›</span>
                          </button>
                        </div>
                      </div>
                    );
                  }}
                />

                <span className={css.datePickerIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path
                      d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 8H5v8h14v-8ZM6 6H5v2h14V6h-1v1a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
              {touched.expectedDueDate && errors.expectedDueDate ? (
                <span className={css.formError}>{errors.expectedDueDate}</span>
              ) : null}
            </label>

            <div className={css.buttons}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={() => resetForm({ values: toInitialValues(profile) })}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                className={css.saveButton}
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
