'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './Breadcrumbs.module.css';
import { useQuery } from '@tanstack/react-query';
import { getDiaryById } from '@/features/diary/api';

const nameMap: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const entryId = segments[0] === 'diary' && segments[1] ? segments[1] : null;

  const { data: diary } = useQuery({
    queryKey: ['diary', entryId],
    queryFn: () => getDiaryById(entryId as string),
    enabled: Boolean(entryId),
    retry: false,
  });
  const isHome = segments.length === 0;

  return (
    <nav className={css.breadcrumbs}>
      <div className={css.breadcrumbsContainer}>
        <Link href="/" className={css.brand}>
          Лелека
        </Link>
        {isHome && (
          <>
            <span className={css.separator}>
              <svg width="24" height="24" aria-hidden>
                <use href="/leleka-sprite.svg#icon-keyboard_arrow_down" />
              </svg>
            </span>
            <span className={css.current}>Мій день</span>
          </>
        )}

        {!isHome &&
          segments.map((segment, index) => {
            const path = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;
            let name = nameMap[segment] || decodeURIComponent(segment);

            if (segments[0] === 'diary' && index === 1 && diary?.title) {
              name = diary.title;
            }

            return (
              <span key={path} className={css.item}>
                <span className={css.separator}>
                  <svg width="24" height="24" aria-hidden>
                    <use href="/leleka-sprite.svg#icon-keyboard_arrow_down" />
                  </svg>
                </span>

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
