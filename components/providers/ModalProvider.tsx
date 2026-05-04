"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ConfirmationModal, { ConfirmationModalProps } from "@/components/shared/ConfirmationModal/ConfirmationModal";

// Тип контексту: відкриття модалки з будь-якими пропсами + закриття
interface ModalContextType {
  openModal: (props: ConfirmationModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useGlobalModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useGlobalModal must be used within ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalProps, setModalProps] = useState<ConfirmationModalProps | null>(null);

  const openModal = (props: ConfirmationModalProps) => setModalProps(props);
  const closeModal = () => setModalProps(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && (
        <ConfirmationModal
          {...modalProps}
          onConfirm={() => {
            modalProps.onConfirm();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
}
