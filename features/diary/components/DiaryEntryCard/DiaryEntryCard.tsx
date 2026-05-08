'use client';
import { useRouter } from 'next/navigation';
import { Diary } from '../../types';
import css from './DiaryEntryCard.module.css';
interface DiaryEntryCardProps {
  diary: Diary;
  isActive?: boolean;
  onSelectDiary?: (id: string) => void;
  isDesktop: boolean;
}

export default function DiaryEntryCard({
  diary,
  isActive,
  onSelectDiary,
  isDesktop,
}: DiaryEntryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (isDesktop) {
      onSelectDiary?.(diary._id as string);
      return;
    } else {
      router.push(`/diary/${diary._id}`);
    }
  };

  return (
    <li
      className={`${css.card} ${isActive ? css.active : ''}`}
      onClick={handleClick}
    >
      <div className={css.cardHeading}>
        <h4 className={css.cardTitle}>{diary.title}</h4>
        <p className={css.cardDate}>
          {(() => {
            const d = new Date(diary.date);
            return `${d.getDate()} ${d.toLocaleString('uk-UA', {
              month: 'long',
            })} ${d.getFullYear()}`;
          })()}
        </p>
      </div>
      <ul className={css.emotions}>
        {diary.emotions.map((emotion, index) => (
          <li className={css.emotion} key={index}>
            {emotion}
          </li>
        ))}
      </ul>
    </li>
  );
}
