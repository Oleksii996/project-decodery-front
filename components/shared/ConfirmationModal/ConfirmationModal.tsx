import { useEffect, ReactNode } from "react";
import styles from "./ConfirmationModal.module.css";

export interface ConfirmationModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
  width?: string;
  height?: string;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
}

export default function ConfirmationModal({
  title,
  onConfirm,
  onCancel,
  children,
  width,
  height,
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

  // inline-стилі застосовуються тільки якщо width/height передані
  const customStyle =
    width || height ? { width: width ?? "auto", height: height ?? "auto" } : undefined;

  return (
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

        <p>{title}</p>
        <div>{children}</div>

        <div className={styles["modal-buttons"]}>
              {cancelButton || (
            <button className={styles["cancel-btn"]} onClick={onCancel}>
              Ні
            </button>
          )}
          {confirmButton || (
            <button className={styles["confirm-btn"]} onClick={onConfirm}>
              Так
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
