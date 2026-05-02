'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './DiaryEntryDetails.module.css'
import { getDiaryById } from '../../api';

interface DiaryEntryDetailsProps {
  diaryId: string | null;
}
export default function DiaryEntryDetails({diaryId}: DiaryEntryDetailsProps) {
 
  const { data: diary , isLoading, isError } = useQuery({
    queryKey: ['diary', diaryId],
    queryFn: () => getDiaryById(diaryId as string),
    enabled: Boolean(diaryId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });

  if (!diaryId) {
    return (
      <div className={css.pageContainer}>
        <p>Наразі записи у щоденнику відсутні</p>
      </div>
    );
  }

  if (isLoading) return <div className={css.pageContainer}>Завантаження...</div>;
  if (isError || !diary) return <div className={css.pageContainer}>Помилка завантаження</div>;

  return <div className={css.pageContainer}>
<div className={css.head}>
  <div className={css.heading}>
    <h4 className={css.title}>{diary.title}</h4>
    <button type="button" className={css.editBtn}>
      <svg width={24} height={24}>
        <use href='/leleka-sprite.svg#icon-edit_square'></use>
      </svg>
    </button>
  </div>
  <div className={css.dateBlock}>
    <p className={css.date}>{diary.date}</p>
    <button type="button" className={css.deleteBtn}>
      <svg width={24} height={24}>
        <use href='/leleka-sprite.svg#icon-delete'></use>
      </svg>
    </button>
  </div>
</div>
<p className={css.description}>{diary.description}</p>
<ul className={css.emotions}>
  {diary.emotions.map((emotion, index) => (
          <li className={css.emotion} key={index}>
            {emotion}
          </li>
        ))}
</ul>
  </div>;
}
