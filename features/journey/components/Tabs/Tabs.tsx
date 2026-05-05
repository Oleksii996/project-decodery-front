'use client';

import styles from './Tabs.module.css';

interface Props {
  tab: 'baby' | 'mom';
  setTab: (tab: 'baby' | 'mom') => void;
}

export default function Tabs({ tab, setTab }: Props) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => setTab('baby')}
        className={`${styles.tab} ${tab === 'baby' ? styles.active : ''}`}
      >
        Розвиток малюка
      </button>

      <button
        onClick={() => setTab('mom')}
        className={`${styles.tab} ${tab === 'mom' ? styles.active : ''}`}
      >
        Тіло мами
      </button>
    </div>
  );
}
