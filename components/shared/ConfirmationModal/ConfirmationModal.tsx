import { useEffect, ReactNode } from "react";

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
  width?: string;
  height?: string;
}

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  children,
  width = "auto",
  height = "auto",
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
       style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "64px",
          borderRadius: "40px",
          width,
          height,
          maxWidth: "768px",
        }}
      >
        <h2>{title}</h2>
        <div>{children}</div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={onConfirm}>{confirmButtonText}</button>
          <button onClick={onCancel}>{cancelButtonText}</button>
        </div>
      </div>
    </div>
  );
}
