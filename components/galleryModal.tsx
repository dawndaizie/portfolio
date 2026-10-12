'use client'

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


  useEffect(() => {
    if (!allWorks.length) return;
    const nextIdx = (currentIndex + 1) % allWorks.length;
    const prevIdx = (currentIndex - 1 + allWorks.length) % allWorks.length;

    const img1 = new window.Image();
    img1.src = allWorks[nextIdx].image;
    const img2 = new window.Image();
    img2.src = allWorks[prevIdx].image;
  }, [currentIndex, allWorks]);


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
      <div className="flex w-full flex-col gap-3 font-space text-(--blackbean)">

        <div className="flex items-center justify-between px-1">
          <p className="rounded-full bg-white/95 px-4 py-1.5 font-dot text-xs tracking-wider text-(--blackbean) shadow-sm backdrop-blur-sm">
            {currentIndex + 1} / {totalImages}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image modal"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--ivory) text-xl font-bold leading-none text-(--blackbean) shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <BiX className="text-3xl" />
          </button>
        </div>






        <div className="relative flex h-[52vh] sm:h-[60vh] md:h-[64vh] w-full items-center justify-center overflow-hidden rounded-2xl p-2 sm:p-4">
          <div className="relative h-full w-full ">
            <Image
              src={work.image}
              alt={work.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain "
            />
          </div>
        </div>

        <div className="stampEffect flex flex-col items-center justify-between gap-3 rounded-xl border border-(--blackbean)/10 bg-white p-3 sm:px-5 sm:py-3.5 shadow-md">

          <div className="min-w-0 flex-1">
            <h2 className="font-space text-lg sm:text-xl font-bold text-(--blackbean)">
              {work.name}
            </h2>
            <p className="font-dot text-center text-xs tracking-wider text-(--blackbean)/75">
              {work.descriptor}
            </p>
          </div>
          <div className="justify-between">
            {hasMultipleImages && (
              <div className="justify-between">
                <button
                  type="button"
                  onClick={onPrevious}
                  aria-label="View previous artwork"
                  className="h-9 w-9 m-2 sm:h-10 sm:w-10 ring ring-2 ring-(--blackbean) items-center justify-center rounded-full bg-white text-base font-bold text-(--blackbean) shadow-sm transition hover:scale-105 hover:bg-(--blackbean) hover:text-(--ivory) active:scale-95">

                  ᐊ

                </button>

                <button
                  type="button"
                  onClick={onNext}
                  aria-label="View next artwork"
                  className="h-9 w-9 m-2 sm:h-10 sm:w-10 ring ring-2 ring-(--blackbean) items-center justify-center rounded-full bg-white text-base font-bold text-(--blackbean) shadow-sm transition hover:scale-105 hover:bg-(--blackbean) hover:text-(--ivory) active:scale-95 ">
                  ᐅ

                </button>
              </div>
            )}
          </div>

        </div>


      </div>




    </BaseModal>
  );
}