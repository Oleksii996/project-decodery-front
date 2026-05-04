import css from './MomTipCard.module.css';

interface MomTipCardProps {
  momTip: string;
}
export default function MomTipCardCard({ momTip }: MomTipCardProps) {
  return (
    <section className={css.momTipCard}>
      <h2 className={css.title}>Порада для мами</h2>
      <p className={css.infoText}>{momTip}</p>
    </section>
  );
}
