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
   const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

   useEffect(() => {
    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updatePreference = () => {
      setReduceMotion(preference.matches);
    };

    updatePreference();
    preference.addEventListener('change', updatePreference);

    return () => {
      preference.removeEventListener('change', updatePreference);
    };
  }, []);
    

  const longestString = array.reduce(
    (longest, current) =>
      current.length > longest.length ? current : longest,
    ''
  );



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