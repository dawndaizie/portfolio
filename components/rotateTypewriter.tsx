'use client'

import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

type RotateTypewriterProps = {
  array: string[];
  className?: string;
  startDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
};

export default function RotateTypewriter({
  array,
  className = '',
  startDelay = 900,
  typeSpeed = 55,
  deleteSpeed = 28,
  pauseTime = 1800,
}: RotateTypewriterProps) {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleReady = () => {
      if (prefersReducedMotion) {
        setHasStarted(true);
        return;
      }

      setTimeout(() => setHasStarted(true), startDelay);
    };

    if (document.documentElement.dataset.loaderDone === 'true') {
      handleReady();
      return;
    }

    window.addEventListener('portfolio:ready', handleReady);

    return () => {
      window.removeEventListener('portfolio:ready', handleReady);
    };
  }, [startDelay]);

  const longestString = array.reduce(
    (longest, current) =>
      current.length > longest.length ? current : longest,
    ''
  );

  if (!hasStarted) {
    return (
      <span className={`rotate-typewriter ${className}`}>
        <span className="invisible">{longestString}</span>
      </span>
    );
  }

  return (
    <span className={`rotate-typewriter ${className}`}>
      <Typewriter
        options={{
          strings: array,
          autoStart: true,
          loop: true,
          delay: typeSpeed,
          deleteSpeed: deleteSpeed,
          pauseFor: pauseTime,
          cursor: '▌',
        }}
      />

      <span className="sr-only">
        {array.join(', ')}
      </span>
    </span>
  );
}