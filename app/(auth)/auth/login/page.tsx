import LoginForm from '@/features/auth/components/LoginForm/LoginForm';
import Link from 'next/link';
import css from './Page.module.css';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід в додаток Лелека',
  description: 'Увійдіть у свій акаунт Лелека.',
  openGraph: {
    title: 'Вхід в додаток Лелека',
    description: 'Увійдіть у свій акаунт Лелека.',
    images: [
      {
        url: 'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
        width: 1200,
        height: 630,
        alt: 'Логотип додатку Лелека',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Вхід в додаток Лелека',
    description: 'Увійдіть у свій акаунт Лелека.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};
export default function LoginPage() {
  return (
    <div className={css['container']}>
      <div className={css['login-wrapper']}>
        <div className={css['login-left']}>
          <div className={css['login-page']}>
            <div className={css['logo']}>
              <Image
                src="/Company Logo.svg"
                width={105}
                height={45}
                alt="logo"
                priority
              />
            </div>

            <h2 className={css['login-title']}>Вхід</h2>

            <LoginForm />

            <div className={css['login-additional']}>
              <p className={css['login-text']}>Немає аккаунту?</p>
              <Link href="/auth/register" className={css['login-link']}>
                Зареєструватися
              </Link>
            </div>
          </div>
        </div>

        <div className={css['login-right']}>
          <Image
            src="/img/auth-img/leleka-nest.jpg"
            alt="leleky"
            width={720}
            height={900}
            className={css['login-img']}
          />
        </div>
      </div>
    </div>
  );
}
