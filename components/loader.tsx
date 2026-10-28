'use client'

import { useEffect, useState } from "react";

export default function Loader({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let isMounted = true;
    let safetyTimer: ReturnType<typeof setTimeout>;

   const finish = () => {
  if (!isMounted) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const revealDelay = prefersReducedMotion ? 0 : 300;

  setFadeOut(true);

  window.dispatchEvent(new CustomEvent('portfolio:ready'));

  setTimeout(() => {
  if (isMounted) {
    document.documentElement.dataset.loaderDone = 'true';
    setLoading(false);
  }
}, revealDelay);
};

    const waitForAssets = async () => {
      try {
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready;
        }

        const heroImage = document.querySelector<HTMLImageElement>(
          'img[data-hero-image="true"]'
        );


        if (heroImage && !heroImage.complete) {
          await new Promise<void>((resolve) => {
            const done = () => {
              heroImage.removeEventListener('load', done);
              heroImage.removeEventListener('error', done);
              resolve();
            };

            heroImage.addEventListener('load', done);
            heroImage.addEventListener('error', done);
          });
        }
      } catch (err) {
        console.warn("Error preloading assets:", err);
      } finally {
        if (!isMounted) finish();
      }
    };

    waitForAssets();
    safetyTimer = setTimeout(finish, 2000);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };

  }, []);

  return (
    <>
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="loader-scene">
            <div className="loader-anim" aria-hidden="true">
              
            </div>

            <p className="loader-text font-dot">
              {fadeOut ? 'ready!' : 'booting up...'}
            </p>

            <div className="loader-bar" aria-hidden="true">
              <div className="loader-bar__fill" />
            </div>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}