'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './Breadcrumbs.module.css';

const nameMap = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const isHome = segments.length === 0;

  return (
    <nav className={css.breadcrumbs}>
      <div className={css.breadcrumbsContainer}>
        <Link href="/">Лелека</Link>
        {isHome && (
          <>
            <span className={css.separator}> / </span>
            <span className={css.current}>Мій день</span>
          </>
        )}

        {/* Інші сторінки */}
        {!isHome &&
          segments.map((segment, index) => {
            const path = '/' + segments.slice(0, index + 1).join('/');

            const name = nameMap[segment] || decodeURIComponent(segment);

            const isLast = index === segments.length - 1;

            return (
              <span key={path} className={css.item}>
                <span className={css.separator}> / </span>

                {isLast ? (
                  <span className={css.current}>{name}</span>
                ) : (
                  <Link className={css.link} href={path}>
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
      </div>
    </nav>
  );
}
