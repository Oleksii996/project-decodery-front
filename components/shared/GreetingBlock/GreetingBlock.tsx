import css from '../GreetingBlock/GreetingBlock.module.css';
import { useAuthStore } from '@/store/authStore';

import { getGreeting } from '@/utils/getGreeting';

export default function GreetingBlock() {
  const authStore = useAuthStore();
  const { userInfo } = authStore;

  return (
    <section className={css.greetingBlock}>
      <p className={css.title}>
        {getGreeting()}, {userInfo?.name || 'сонечко'}!
      </p>
    </section>
  );
}
