'use client';
import { useState } from 'react';
import { Diary } from '../../types';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import css from './DiaryList.module.css';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';

interface DiaryListProps {
  diaries: Diary[];
  selectedDiaryId?: string | null;
  onSelectDiary?: (id: string) => void;
  isDesktop: boolean;
}
export default function DiaryList({
  diaries,
  selectedDiaryId,
  onSelectDiary,
  isDesktop,
}: DiaryListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    localStorage.removeItem('editEntry');
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    localStorage.removeItem('editEntry');
    setIsAddModalOpen(false);
  };
  return (
    <>
      <div className={css.container}>
        <div className={css.head}>
          <h3 className={css.title}>Ваші записи</h3>
          <button
            type="button"
            className={css.addButton}
            onClick={handleOpenAddModal}
          >
            Новий запис
            <svg className={css.icon} width={24} height={24}>
              <use href="/leleka-sprite.svg#icon-add_circle"></use>
            </svg>
          </button>
        </div>

        {diaries?.length > 0 ? (
          <ul className={css.list}>
            {diaries.map(diary => (
              <DiaryEntryCard
                key={diary._id}
                diary={diary}
                isActive={selectedDiaryId === diary._id}
                onSelectDiary={onSelectDiary}
                isDesktop={isDesktop}
              />
            ))}
          </ul>
        ) : (
          <p className={css.empty}> Наразі записи у щоденнику відсутні</p>
        )}
      </div>
      {isAddModalOpen && <AddDiaryEntryModal onClose={handleCloseModal} />}
    </>
  );
}
