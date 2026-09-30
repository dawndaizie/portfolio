"use client"

import { useEffect, useState, useRef } from "react";
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
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 transition-all duration-200"      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative flex w-full max-w-5xl flex-col items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}