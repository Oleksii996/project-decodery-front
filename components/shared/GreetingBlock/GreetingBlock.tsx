import css from '../GreetingBlock/GreetingBlock.module.css';
export default function GreetingBlock() {
  return (
    <section className={css.greetingBlock}>
      <p className={css.greetingText}>Доброго ранку </p>
    </section>
  );
}
