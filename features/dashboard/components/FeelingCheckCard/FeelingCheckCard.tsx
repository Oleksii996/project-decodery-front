import css from './FeelingCheckCard.module.css';
export default function FeelingCheckCard() {
  return (
    <section className={css.feelingCard}>
      <p className={css.infoText}>важливі завдання чекапи бла-бла-бла </p>
      <p className={css.infoText2}>Як ви себе почуваете? </p>
    </section>
  );
}
