import Image from 'next/image';
import OnboardingForm from '../OnboardingForm/OnboardingForm';
import styles from './OnboardingPage.module.css';

export default function OnboardingPage() {
  return (
    <section className={styles.page}>
      <div className={styles.formArea}>
        <OnboardingForm />
      </div>

      <div className={styles.hero} aria-hidden="true">
        <Image
          src="/Company Logo.svg"
          alt=""
          fill
          sizes="(min-width: 1440px) 50vw, 100vw"
          priority
        />
      </div>
    </section>
  );
}
