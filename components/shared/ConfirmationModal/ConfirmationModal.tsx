"use client";

import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmationModal.module.css";

export interface ConfirmationModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
  width?: string;
  height?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
}

export default function ConfirmationModal({
  title,
  onConfirm,
  onCancel,
  children,
  width,
  height,
  confirmButtonText = "Так",
  cancelButtonText = "Ні",
  confirmButton,
  cancelButton,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const customStyle =
    width || height ? { width: width ?? "auto", height: height ?? "auto" } : undefined;

  return createPortal(
    <div className={styles["modal-backdrop"]} onClick={onCancel}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
        style={customStyle}
      >
        {/* Хрестик закриття */}
        <button className={styles["modal-close"]} onClick={onCancel}>
          ×
        </button>

        <h2 className={styles["modal-title"]}>{title}</h2>
        {children && <div className={styles["modal-body"]}>{children}</div>}

        <div className={styles["modal-buttons"]}>
          {cancelButton || (
            <button className={styles["cancel-btn"]} onClick={onCancel}>
              {cancelButtonText}
            </button>
          )}
          {confirmButton || (
            <button className={styles["confirm-btn"]} onClick={onConfirm}>
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body //  модалка рендериться у body
  );
}