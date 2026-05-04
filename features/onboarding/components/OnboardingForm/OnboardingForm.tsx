'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  getCurrentOnboardingUser,
  updateOnboardingUser,
  uploadOnboardingAvatar,
} from '../../api';
import type {
  BabyGender,
  BackendGenderValue,
  OnboardingFormValues,
  OnboardingGenderValue,
} from '../../types';
import styles from './OnboardingForm.module.css';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/features/auth/types';

const genderOptions: Array<{ value: BabyGender; label: string }> = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' },
];

const allowedAvatarTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxAvatarSize = 5 * 1024 * 1024;
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

const getDefaultDueDate = () => getOffsetDate(39).toISOString().slice(0, 10);

const applyGenderTheme = (
  gender: OnboardingGenderValue | BackendGenderValue
) => {
  document.body.classList.remove('theme-pink', 'theme-blue');

  if (gender === 'girl') {
    document.body.classList.add('theme-pink');
  }

  if (gender === 'boy') {
    document.body.classList.add('theme-blue');
  }
};

const validationSchema = Yup.object({
  dueDate: Yup.string()
    .required('Оберіть планову дату пологів')
    .test('is-valid-date', 'Введіть коректну дату', value =>
      value ? !Number.isNaN(new Date(value).getTime()) : false
    )
    .test(
      'is-not-too-early',
      'Дата має бути не раніше ніж через 1 тиждень',
      value => {
        if (!value) return false;

        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);

        return selectedDate >= getOffsetDate(onboardingMinWeeks);
      }
    )
    .test(
      'is-not-too-late',
      'Дата має бути не пізніше ніж через 40 тижнів',
      value => {
        if (!value) return false;

        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);

        return selectedDate <= getOffsetDate(onboardingMaxWeeks);
      }
    ),
  gender: Yup.string<OnboardingGenderValue>()
    .oneOf(['', 'boy', 'girl', 'unknown'])
    .test('is-selected', 'Оберіть стать дитини', value => value !== ''),
  avatar: Yup.mixed<File>()
    .nullable()
    .test('file-size', 'Фото має бути менше 5 MB', value =>
      value ? value.size <= maxAvatarSize : true
    )
    .test('file-format', 'Підтримуються PNG, JPG або WEBP', value =>
      value ? allowedAvatarTypes.includes(value.type) : true
    ),
});

const emptyValues: OnboardingFormValues = {
  dueDate: getDefaultDueDate(),
  gender: '',
  avatar: null,
};

export default function OnboardingForm() {
  const setAuthUser = useAuthStore(s => s.setAuthUser);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedGenderTheme, setSelectedGenderTheme] =
    useState<OnboardingGenderValue | null>(null);

  const minDueDate = useMemo(() => getOffsetDate(onboardingMinWeeks), []);
  const maxDueDate = useMemo(() => getOffsetDate(onboardingMaxWeeks), []);

  const currentUserQuery = useQuery({
    queryKey: ['onboarding-current-user'],
    queryFn: getCurrentOnboardingUser,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: updateOnboardingUser,
  });

  const avatarMutation = useMutation({
    mutationFn: uploadOnboardingAvatar,
  });

  const isSubmitting = updateMutation.isPending || avatarMutation.isPending;
  const currentAvatar = avatarPreview ?? currentUserQuery.data?.avatar ?? null;
  const currentUserGenderTheme: OnboardingGenderValue =
    currentUserQuery.data?.gender === null ||
    currentUserQuery.data?.gender === undefined
      ? ''
      : currentUserQuery.data.gender;
  const activeGenderTheme = selectedGenderTheme ?? currentUserGenderTheme;

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    if (currentUserQuery.isError) {
      toast.error('Не вдалося завантажити дані профілю');
    }
  }, [currentUserQuery.isError]);

  useEffect(() => {
    applyGenderTheme(activeGenderTheme);

    return () => {
      document.body.classList.remove('theme-pink', 'theme-blue');
    };
  }, [activeGenderTheme]);

  const initialValues: OnboardingFormValues = {
    dueDate: currentUserQuery.data?.dueDate
      ? currentUserQuery.data.dueDate.slice(0, 10)
      : emptyValues.dueDate,
    gender:
      currentUserQuery.data?.gender === null ||
      currentUserQuery.data?.gender === undefined
        ? emptyValues.gender
        : currentUserQuery.data.gender,
    avatar: null,
  };

  const pickAvatar = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<OnboardingFormValues>['setFieldValue']
  ) => {
    const file = event.currentTarget.files?.[0] ?? null;
    setFieldValue('avatar', file);

    if (!file) {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }

      setAvatarPreview(null);
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleSubmit = async (values: OnboardingFormValues) => {
    try {
      const normalizedGender: BackendGenderValue =
        values.gender === 'unknown'
          ? null
          : (values.gender as Exclude<BabyGender, 'unknown'>);

      await updateMutation.mutateAsync({
        dueDate: values.dueDate,
        gender: normalizedGender,
      });

      if (values.avatar) {
        await avatarMutation.mutateAsync(values.avatar);
      }
      const updatedUser = await getCurrentOnboardingUser();

      if (updatedUser) {
        setAuthUser(updatedUser as User);
      }

      toast.success('Дані успішно збережено');
      router.push('/');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не вдалося завершити онбординг';

      toast.error(message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <Image
          src="/Company Logo.svg"
          alt="Лелека"
          width={105}
          height={45}
          className={styles.brandLogo}
          priority
        />
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading}>Давайте познаймимось ближче</h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldTouched, setFieldValue, touched, values }) => (
            <Form className={styles.form}>
              <div className={styles.avatarSection}>
                <div className={styles.avatarPreview}>
                  {currentAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentAvatar} alt="Аватар" />
                  ) : (
                    <span className={styles.avatarInitial}>
                      <Image
                        src="/img/onboarding/avatar.svg"
                        alt=""
                        width={164}
                        height={164}
                        className={styles.avatarPlaceholder}
                      />
                    </span>
                  )}
                </div>

                <div>
                  <button
                    className={styles.btnFoto}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {currentAvatar ? 'Змінити фото' : 'Завантажити фото'}
                  </button>

                  <input
                    ref={fileInputRef}
                    className={styles.hiddenInput}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={event => pickAvatar(event, setFieldValue)}
                  />

                  <ErrorMessage
                    className={styles.error}
                    component="span"
                    name="avatar"
                  />
                </div>
              </div>

              <label className={styles.field1}>
                <span className={styles.label}>Стать дитини</span>

                <Field
                  as="select"
                  className={`${styles.select} ${
                    values.gender ? styles.selectFilled : ''
                  }`}
                  name="gender"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const nextGender = event.target
                      .value as OnboardingGenderValue;
                    setFieldValue('gender', nextGender);
                    setSelectedGenderTheme(nextGender);
                  }}
                >
                  <option value="" disabled>
                    Оберіть стать
                  </option>

                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  className={styles.error}
                  component="span"
                  name="gender"
                />
              </label>

              <label className={styles.field2}>
                <span className={styles.label}>Планова дата пологів</span>

                <div className={styles.datePickerField}>
                  <DatePicker
                    selected={values.dueDate ? new Date(values.dueDate) : null}
                    onChange={(date: Date | null) => {
                      const normalizedDate = date
                        ? new Date(
                            date.getTime() - date.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(0, 10)
                        : '';

                      setFieldValue('dueDate', normalizedDate);
                    }}
                    onBlur={() => setFieldTouched('dueDate', true)}
                    minDate={minDueDate}
                    maxDate={maxDueDate}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Оберіть дату"
                    className={styles.input}
                    calendarClassName={styles.datePickerCalendar}
                    popperClassName={styles.datePickerPopper}
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
                    }) => (
                      <div className={styles.datePickerHeader}>
                        <div className={styles.datePickerHeaderTitle}>
                          <select
                            className={styles.datePickerMonthSelect}
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
                            className={styles.datePickerYearSelect}
                            value={date.getFullYear()}
                            onChange={event =>
                              changeYear(Number(event.target.value))
                            }
                          >
                            {Array.from(
                              { length: onboardingMaxWeeks + 1 },
                              (_, index) => minDueDate.getFullYear() + index
                            ).map(year => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={styles.datePickerNav}>
                          <button
                            className={styles.datePickerNavButton}
                            type="button"
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            aria-label="Попередній місяць"
                          >
                            <span aria-hidden="true">‹</span>
                          </button>

                          <button
                            className={styles.datePickerNavButton}
                            type="button"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            aria-label="Наступний місяць"
                          >
                            <span aria-hidden="true">›</span>
                          </button>
                        </div>
                      </div>
                    )}
                  />

                  <span className={styles.datePickerIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 8H5v8h14v-8ZM6 6H5v2h14V6h-1v1a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>

                {touched.dueDate && errors.dueDate ? (
                  <span className={styles.error}>{errors.dueDate}</span>
                ) : null}
              </label>

              <button
                className={styles.btnSubmit}
                type="submit"
                disabled={isSubmitting || currentUserQuery.isLoading}
              >
                {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
