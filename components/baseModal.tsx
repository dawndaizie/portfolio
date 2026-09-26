"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type BaseModalProps = {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
};

export default function BaseModal({
  children,
  label,
  onClose,
}: BaseModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-5 backdrop-blur-sm animate-[modal-overlay-in_250ms_ease-out_forwards] sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="w-full max-w-5xl animate-[modal-content-in_350ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}