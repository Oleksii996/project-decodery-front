import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiaryDraft {
  title: string;
  description: string;
  emotions: string[];
}

interface DiaryDraftStore {
  draft: DiaryDraft;
  setDraft: (diary: DiaryDraft) => void;
  clearDraft: () => void;
}

const initialDraft: DiaryDraft = {
  title: '',
  description: '',
  emotions: [],
};

export const useDiaryDraftStore = create<DiaryDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: diary =>
        set(() => ({
          draft: {
            title: diary.title,
            description: diary.description,
            emotions: diary.emotions,
          },
        })),

      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: 'diary',
      partialize: state => ({
        draft: state.draft,
      }),
    }
  )
);
