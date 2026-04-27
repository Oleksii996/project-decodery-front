'use client';

import Image from 'next/image';
import css from './Page.module.css';
import RegistrationForm from '@/features/auth/components/RegistrationForm/RegistrationForm';

export default function LoginPage() {
  return (
    <div className={css['container']}>
      <div className={css['register-wrapper']}>
        <div className={css['register-left']}>
          <div className={css['register-page']}>
            <div className={css['logo']}>
              <Image src="/logo.svg" width={105} height={45} alt="logo" />
            </div>

            <h2 className={css['register-title']}>Реєстрація</h2>

            <RegistrationForm />

            <div className={css['register-additional']}>
              <p className={css['register-text']}>Вже маєте аккаунт?</p>
              <a href="" className={css['register-link']}>
                Увійти
              </a>
            </div>
          </div>
        </div>

        <div className={css['register-right']}>
          <Image
            src="/images/leleky.jpg"
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
