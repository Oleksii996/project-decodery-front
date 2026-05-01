'use client';

import Image from 'next/image';
import css from './Page.module.css';
import RegistrationForm from '@/features/auth/components/RegistrationForm/RegistrationForm';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className={css['container']}>
      <div className={css['register-wrapper']}>
        <div className={css['register-left']}>
          <div className={css['register-page']}>
            <div className={css['logo']}>
              <Image
                src="/Company Logo.svg"
                width={105}
                height={45}
                alt="logo"
              />
            </div>

            <h2 className={css['register-title']}>Реєстрація</h2>

            <RegistrationForm />

            <div className={css['register-additional']}>
              <p className={css['register-text']}>Вже маєте аккаунт?</p>
              <Link href="/auth/login" className={css['register-link']}>
                Увійти
              </Link>
            </div>
          </div>
        </div>

        <div className={css['register-right']}>
          <Image
            src="/img/auth-img/leleka-nest.jpg"
            alt="leleky"
            width={720}
            height={900}
            className={css['register-img']}
          />
        </div>
      </div>
    </div>
  );
}
