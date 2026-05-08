'use client';
import Loader from '@/components/common/Loader/Loader';

import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
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
  const queryClient = new QueryClient();
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
  const deleteMutation = useMutation({
    mutationFn: () => deleteDiary(diaryId as string),
    onSuccess: async () => {
      toast.success('Запис успішно видалений');
      queryClient.removeQueries({ queryKey: ['diary', diaryId] });
      await queryClient.invalidateQueries({ queryKey: ['diaries'] });
      setShowConfirmModal(false);
      router.push('/diary');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ??
        (error as Error)?.message ??
        'Не вдалося видалити запис';
      toast.error(message);
    },
  });
  const handleDelete = () => {
    if (!diary) return;
    deleteMutation.mutate();
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

  if (!diaryId) return null;
  if (isLoading) return <Loader />;
  if (isError || !diary) return null;

  return (
    <>
      <div className={css.pageContainer}>
        <div className={css.head}>
          <div className={css.heading}>
            <h4 className={css.title}>{diary.title}</h4>

            <button type="button" className={css.editBtn} onClick={handleEdit}>
              <svg className={css.icon} width={24} height={24}>
                <use href="/leleka-sprite.svg#icon-edit_square"></use>
              </svg>
            </button>
          </div>

          <div className={css.dateBlock}>
            <p className={css.date}>
              {(() => {
                const d = new Date(diary.date);
                return `${d.getDate()} ${d.toLocaleString('uk-UA', {
                  month: 'long',
                })} ${d.getFullYear()}`;
              })()}
            </p>

            <button
              type="button"
              className={css.deleteBtn}
              onClick={() => setShowConfirmModal(true)}
            >
              <svg className={css.icon} width={24} height={24}>
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

      {isAddModalOpen && (
        <AddDiaryEntryModal
          onClose={() => {
            localStorage.removeItem('editEntry');
            setIsAddModalOpen(false);
          }}
        />
      )}
    </>
  );
}
