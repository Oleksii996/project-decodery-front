import LoginForm from '@/features/auth/components/LoginForm/LoginForm';
import Link from 'next/link';
import css from './Page.module.css';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className={css['container']}>
      <div className={css['login-wrapper']}>
        <div className={css['login-left']}>
          <div className={css['login-page']}>
            <div className={css['logo']}>
              <Image src="/logo.svg" width={105} height={45} alt="logo" />
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
            src="/images/leleka-nest.jpg"
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
