'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './DiaryEntryDetails.module.css';
import { deleteDiary, getDiaryById } from '../../api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmationModal from '@/components/shared/ConfirmationModal/ConfirmationModal';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import toast from 'react-hot-toast';
import { useDiaryDraftStore } from '@/store/diaryStore';

interface DiaryEntryDetailsProps {
  diaryId: string | null;
}

export default function DiaryEntryDetails({ diaryId }: DiaryEntryDetailsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const setDraft = useDiaryDraftStore(state => state.setDraft);
  const router = useRouter();

  const {
    data: diary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diary', diaryId],
    queryFn: () => getDiaryById(diaryId as string),
    enabled: Boolean(diaryId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });

  const handleDelete = async () => {
    if (!diary) return;

    await deleteDiary(diary._id as string);
    setShowConfirmModal(false);
    router.push('/diary');
    toast.success('Запис щоденника видалений');
  };

  const handleEdit = () => {
    if (!diary) return;

    localStorage.setItem('editEntry', JSON.stringify(diary));

    setDraft({
      title: diary.title,
      description: diary.description,
      emotions: diary.emotions,
    });

    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    localStorage.removeItem('editEntry');
    setIsAddModalOpen(false);
  };

  if (!diaryId) return null;
  if (isLoading) return null;
  if (isError || !diary) return null;

  return (
    <>
      <div className={css.pageContainer}>
        <div className={css.head}>
          <div className={css.heading}>
            <h4 className={css.title}>{diary.title}</h4>

            <button type="button" className={css.editBtn} onClick={handleEdit}>
              <svg width={24} height={24}>
                <use href="/leleka-sprite.svg#icon-edit_square"></use>
              </svg>
            </button>
          </div>

          <div className={css.dateBlock}>
            <p className={css.date}>{diary.date}</p>

            <button
              type="button"
              className={css.deleteBtn}
              onClick={() => setShowConfirmModal(true)}
            >
              <svg width={24} height={24}>
                <use href="/leleka-sprite.svg#icon-delete"></use>
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
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {isAddModalOpen && <AddDiaryEntryModal onClose={handleCloseModal} />}
    </>
  );
}
