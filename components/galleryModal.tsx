'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import MovingBG from './movingBG';
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
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
}: GalleryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const titleId = useId();

  const callbacksRef = useRef({
    onClose,
    onPrevious,
    onNext,
  });

  const hasMultipleImages = totalImages > 1;

  useEffect(() => {
    callbacksRef.current = {
      onClose,
      onPrevious,
      onNext,
    };
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    if (!dialog.open) {
      dialog.showModal();
    }

    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;

      if (previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDialogElement>
  ) => {
    if (!hasMultipleImages) return;

    const target = event.target;

    if (
      target instanceof HTMLElement &&
      target.closest('input, textarea, select, [contenteditable="true"]')
    ) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      callbacksRef.current.onPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      callbacksRef.current.onNext();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="galleryModal font-space"
      aria-labelledby={titleId}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        callbacksRef.current.onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          callbacksRef.current.onClose();
        }
      }}
    >
      <div className="galleryModal__background" aria-hidden="true">
        <MovingBG />
      </div>

      <div className="galleryModal__shell">
        <header className="galleryModal__toolbar">
          <div className="galleryModal__location font-dot">
            <span aria-hidden="true">  
              ⋆.𐙚 ̊
            </span>
            <span className="tracking-[0.15em]">art archive</span>
          </div>

          <div className="galleryModal__toolbarActions">
            <span className="galleryModal__counter font-dot">
              <span className="sr-only">Artwork </span>
              {currentIndex + 1}
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> of </span>
              {totalImages}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              className="galleryModal__button galleryModal__close"
              onClick={() => callbacksRef.current.onClose()}
              aria-label="Close artwork viewer"
            >
              <BiX aria-hidden="true" />
            </button>
          </div>
        </header>

        <figure className="galleryModal__figure">
          <div className="galleryModal__stage">
            <div
              key={work.image}
              className="galleryModal__image"
            >
              <Image
                src={work.image}
                alt={work.name}
                fill
                loading="eager"
                sizes="(max-width: 899px) 96vw, (max-width: 1500px) 68vw, 1100px"
                className="object-contain"
              />
            </div>
          </div>

          <figcaption className="galleryModal__caption">
            <div className="galleryModal__details">
              <p className="galleryModal__eyebrow font-dot">
                selected artwork
              </p>

              <h2
                id={titleId}
                className="galleryModal__title font-redact"
              >
                {work.name}
              </h2>

              {work.descriptor && (
                <p className="galleryModal__description">
                  {work.descriptor}
                </p>
              )}

              {work.tags.length > 0 && (
                <ul
                  className="galleryModal__tags font-dot"
                  aria-label="Artwork categories"
                >
                  {work.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
            </div>

            {hasMultipleImages && (
              <nav
                className="galleryModal__navigation"
                aria-label="Artwork navigation"
              >
                <button
                  type="button"
                  className="galleryModal__button"
                  onClick={() => callbacksRef.current.onPrevious()}
                  aria-label="View previous artwork"
                >
                  <span aria-hidden="true">←</span>
                </button>

                <button
                  type="button"
                  className="galleryModal__button"
                  onClick={() => callbacksRef.current.onNext()}
                  aria-label="View next artwork"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </nav>
            )}
          </figcaption>
        </figure>

        <p className="galleryModal__hint font-dot">
          esc to close
          {hasMultipleImages && ' · arrow keys to explore'}
        </p>
      </div>
    </dialog>
  );
}