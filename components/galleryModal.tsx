"use client";

import { useEffect } from "react";
import BaseModal from "./baseModal";

type Artwork = {
  name: string;
  image: string;
  descriptor: string;
  tags: string[];
};

type GalleryModalProps = {
  work: Artwork;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GalleryModal({
  work,
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
}: GalleryModalProps) {
  const hasMultipleImages = totalImages > 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasMultipleImages) {
        onPrevious();
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, onNext, onPrevious]);

  return (
    <BaseModal
      label={`${work.name} image viewer`}
      onClose={onClose}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-sm">
          {currentIndex + 1} / {totalImages}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image modal"
          className="grid h-11 w-11 place-items-center rounded-full bg-[var(--ivory)] text-2xl leading-none text-[var(--blackbean)] shadow-md transition hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)]"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
        <img
          src={work.image}
          alt={work.name}
          width={1200}
          height={900}
          className="block max-h-[70vh] w-full object-contain"
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={onPrevious}
              aria-label="View previous artwork"
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-[var(--blackbean)] shadow-lg transition hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)] sm:left-5 sm:h-14 sm:w-14"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="View next artwork"
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-[var(--blackbean)] shadow-lg transition hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)] sm:right-5 sm:h-14 sm:w-14"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-[#efdeda] bg-[#fff8f5] px-5 py-5 text-left shadow-lg sm:px-8 sm:py-6">
        <h2 className="font-space text-2xl text-[var(--blackbean)]">
          {work.name}
        </h2>

        <p className="mt-2 font-dot tracking-[0.15em] text-base leading-relaxed text-slate-700 sm:text-lg">
          {work.descriptor}
        </p>
      </div>
    </BaseModal>
  );
}