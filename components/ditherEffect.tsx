'use client';

import { useEffect, useState, useRef } from 'react';

type DitherEffectProps = {
  text: string;
  className?: string;
  startDelay?: number;
  stagger?: number;
  scrambleDuration?: number;
  swapInterval?: number;
  onComplete?: () => void;
};

const GLYPHS = ['·', '░', '▒'];

export default function DitherEffect({
  text,
  className = '',
  startDelay = 650,
  stagger = 28,
  scrambleDuration = 140,
  swapInterval = 70,
  onComplete,
}: DitherEffectProps) {

 const [elapsed, setElapsed] = useState<number | null>(null);

const onCompleteRef = useRef(onComplete);
const hasCompletedRef = useRef(false);

useEffect(() => {
  onCompleteRef.current = onComplete;
}, [onComplete]);

useEffect(() => {
  const preference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let startTimer: ReturnType<typeof setTimeout> | undefined;
  let interval: ReturnType<typeof setInterval> | undefined;
  let completeTimer: ReturnType<typeof setTimeout> | undefined;

  hasCompletedRef.current = false;

  const clearTimers = () => {
    if (startTimer !== undefined) clearTimeout(startTimer);
    if (interval !== undefined) clearInterval(interval);
    if (completeTimer !== undefined) clearTimeout(completeTimer);
  };

  const notifyComplete = () => {
    if (hasCompletedRef.current) return;

    hasCompletedRef.current = true;
    onCompleteRef.current?.();
  };

  const finish = (immediate = false) => {
    clearTimers();
    setElapsed(null);

    if (immediate) {
      notifyComplete();
      return;
    }
    completeTimer = setTimeout(notifyComplete, 180);
  };

  const start = () => {
    clearTimers();

    if (preference.matches || !text.length) {
      finish(true);
      return;
    }
    if (hasCompletedRef.current) {
      setElapsed(null);
      return;
    }

    setElapsed(-1);

    startTimer = setTimeout(() => {
      const startedAt = performance.now();

      const totalDuration =
        Math.max(0, Array.from(text).length - 1) * stagger +
        scrambleDuration;

      setElapsed(0);

      interval = setInterval(() => {
        const nextElapsed = performance.now() - startedAt;

        if (nextElapsed >= totalDuration) {
          finish();
          return;
        }

        setElapsed(nextElapsed);
      }, Math.max(40, swapInterval));
    }, Math.max(0, startDelay));
  };

  start();
  preference.addEventListener('change', start);

  return () => {
    clearTimers();
    preference.removeEventListener('change', start);
  };
}, [
  text,
  startDelay,
  stagger,
  scrambleDuration,
  swapInterval,
]);

  const words = text.split(/(\s+)/);
  let characterIndex = 0;

  return (
    <span className={`dither ${className}`}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            characterIndex += Array.from(word).length;

            return (
              <span key={`space-${wordIndex}`}>
                {word}
              </span>
            );
          }

          return (
            <span
              key={`word-${wordIndex}`}
              className="dither__word"
            >
              {Array.from(word).map((character, index) => {
                const position = characterIndex++;
                const beginsAt = position * stagger;

                const waiting =
                  elapsed !== null &&
                  (elapsed < 0 || elapsed < beginsAt);

                const scrambling =
                  elapsed !== null &&
                  !waiting &&
                  elapsed < beginsAt + scrambleDuration;

                const phase = Math.floor(
                  Math.max(0, elapsed ?? 0) /
                    Math.max(40, swapInterval)
                );

                const glyph =
                  GLYPHS[(position + phase) % GLYPHS.length];

                return (
                  <span
                    key={index}
                    className="dither__cell"
                  >
                    <span
                      className={`dither__letter ${
                        waiting
                          ? 'is-waiting'
                          : scrambling
                            ? 'is-scrambling'
                            : ''
                      }`}
                    >
                      {character}
                    </span>

                    {scrambling && (
                      <span className="dither__glyph">
                        {glyph}
                      </span>
                    )}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}