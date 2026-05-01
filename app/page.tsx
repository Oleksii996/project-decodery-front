"use client";

import DashBoardPage from "@/features/dashboard/components/DashBoardPage/DashBoardPage";
import { useGlobalModal } from "@/components/providers/ModalProvider";

export default function Home() {
  const { openModal } = useGlobalModal();

  return (
    <div style={{ padding: "40px" }}>
      {/* Твій Dashboard */}
      <DashBoardPage />

      {/* Кнопка для відкриття модалки зі стандартними кнопками */}
      <button
        onClick={() =>
          openModal({
            title: "Ви впевнені, що хочете вийти?",
            onConfirm: () => console.log("Підтверджено!"),
            onCancel: () => console.log("Скасовано!"),
            children: <p style={{ color: "red" }}>Ця дія незворотна!</p>,
          })
        }
      >
        Відкрити модальне вікно
      </button>
    </div>
  );
}