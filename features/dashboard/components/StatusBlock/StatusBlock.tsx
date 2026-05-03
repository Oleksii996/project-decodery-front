import css from './StatusBlock.module.css';

export default function StatusBlock() {
  return (
    <section className={css.statusCard}>
      <p className={css.infoText}>14</p>
      <p className={css.infoText2}>~165 </p>
    </section>
  );
}
