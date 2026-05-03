import Image from 'next/image';
import css from './BabyTodayCard.module.css';

type BabyTodayCardProps = {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
};

export default function BabyTodayCard({
  image,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
}: BabyTodayCardProps) {
  return (
    <section className={css.babyCard}>
      <h2 className={css.title}>Малюк сьогодні</h2>

      <div className={css.content}>
        <Image
          src={image}
          alt="Baby size illustration"
          className={css.image}
          width={287}
          height={216}
          priority
        />

        <div className={css.info}>
          <p className={css.infoText}>
            <b>Розмір:</b> Приблизно {Math.round(babySize)} см
          </p>
          <p className={css.infoText}>
            <b>Вага:</b> Близько {babyWeight} грамів
          </p>
          <p className={css.infoText}>
            <b>Активність:</b> {babyActivity}
          </p>
        </div>
      </div>
      <p className={css.infoText}>{babyDevelopment}</p>
    </section>
  );
}
