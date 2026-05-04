import css from '../GreetingBlock/GreetingBlock.module.css';
import { useAuthStore } from '@/store/authStore';

export default function GreetingBlock() {
  const authStore = useAuthStore();
  const { userInfo } = authStore;

  return (
    <section className={css.greetingBlock}>
      <p className={css.title}>
        {'Доброго дня, ' + (userInfo?.name || 'User') + '!'}
      </p>
    </section>
  );
}
