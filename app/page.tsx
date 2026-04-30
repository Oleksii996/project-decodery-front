"use client";

import DashBoardPage from "@/features/dashboard/components/DashBoardPage/DashBoardPage";
import { useGlobalModal } from "@/components/providers/ModalProvider";

export default function Home() {
  const { openModal } = useGlobalModal();

  return (
    <div style={{ padding: "40px" }}>
      {/* Твій Dashboard */}
      <DashBoardPage />

      {/* Кнопка для відкриття модалки */}
      <button
        onClick={() =>
          openModal({
            title: "Ви впевнені, що хочете вийти?",
            confirmButtonText: "Так",
            cancelButtonText: "Ні",
            onConfirm: () => console.log("Підтверджено!"),
            children: <p style={{ color: "red" }}>Ця дія незворотна!</p>,
          })
        }
      >
        Відкрити модальне вікно
      </button>
    </div>
  );
}
