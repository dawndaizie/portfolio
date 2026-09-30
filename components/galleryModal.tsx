'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import BaseModal from './baseModal';
import { BiX } from 'react-icons/bi';

export type Artwork = {
  name: string;
  image: string;
  descriptor: string;
  tags: string[];
};

type GalleryModalProps = {
  work: Artwork;
  allWorks?: Artwork[];
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GalleryModal({
  work,
  allWorks = [],
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
}: GalleryModalProps) {
  const hasMultipleImages = totalImages > 1;
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrevious);
  onNextRef.current = onNext;
  onPrevRef.current = onPrevious;

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (!allWorks.length) return;
    const nextIdx = (currentIndex + 1) % allWorks.length;
    const prevIdx = (currentIndex - 1 + allWorks.length) % allWorks.length;

    const img1 = new window.Image();
    img1.src = allWorks[nextIdx].image;
    const img2 = new window.Image();
    img2.src = allWorks[prevIdx].image;
  }, [currentIndex, allWorks]);

  // Stable keyboard arrow navigation
  useEffect(() => {
    if (!hasMultipleImages) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrevRef.current();
      if (event.key === 'ArrowRight') onNextRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleImages]);

  return (
    <BaseModal label={`${work.name} image viewer`} onClose={onClose}>
      <div className="relative w-full">
        {/* Top Header Bar */}
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="rounded-full bg-white/95 px-4 py-1.5 font-dot text-xs tracking-wider text-(--blackbean) shadow-sm backdrop-blur-sm">
            {currentIndex + 1} / {totalImages}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image modal"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--ivory) text-2xl font-bold leading-none text-(--blackbean) shadow-md transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--sky)"
          >
            <BiX className="text-3xl" />
          </button>
        </div>

      
        <div className="relative flex w-full items-center justify-center">
         
          {hasMultipleImages && (
            <button
              type="button"
              onClick={onPrevious}
              aria-label="View previous artwork"
              className="absolute -left-5 lg:-left-7 z-20 flex h-12 w-12 -translate-x-full items-center justify-center rounded-full bg-(--ivory) text-(--blackbean) shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--sky) max-md:left-3 max-md:translate-x-0">
              <span
                className="h-5 w-5 -translate-x-0.5">
              ᐊ
              </span>
            </button>
          )}

         
          <div className="relative flex h-[64vh] sm:h-[70vh] lg:h-[74vh] w-full items-center justify-center overflow-hidden rounded-2xl p-2 sm:p-4">
            <div className="relative h-full w-full">
              <Image
                src={work.image}
                alt={work.name}
                fill
                priority
                sizes="(max-width: 1024px) 95vw, 1200px"
                quality={85}
                className="object-contain"
              />
            </div>
          </div>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={onNext}
              aria-label="View next artwork"
              className="absolute -right-5 lg:-right-7 z-20 flex h-12 w-12 translate-x-full items-center justify-center rounded-full bg-(--ivory) text-(--blackbean) shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--sky) max-md:right-3 max-md:translate-x-0"
            >
              <span
                className="h-5 w-5 translate-x-0.5"
              >
              ᐅ
              </span>
            </button>
          )}
        </div>

       
        <div className="mt-3.5 rounded-2xl border border-(--blackbean)/10 bg-(--ivory) px-6 py-4 text-left shadow-lg">
          <h2 className="font-kiwi text-2xl text-(--blackbean)">
            {work.name}
          </h2>
          <p className="mt-1 font-dot text-sm tracking-wider text-(--blackbean)/75">
            {work.descriptor}
          </p>
        </div>
      </div>
    </BaseModal>
  );
}