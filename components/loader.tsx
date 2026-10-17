'use client'

import { useEffect, useState } from "react";
import MovingBG from "./movingBG";

export default function Loader({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let isMounted = true;

    const waitForAssets = async () => {
      try {
        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready;
        }

        const images = Array.from(document.images);

        const imagePromises = images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            const onDone = () => {
              img.removeEventListener("load", onDone);
              img.removeEventListener("error", onDone);
              resolve();
            };

            img.addEventListener("load", onDone);
            img.addEventListener("error", onDone);
          });
        });

        await Promise.all(imagePromises);
      } catch (err) {
        console.warn("Error preloading assets:", err);
      } finally {
        if (!isMounted) return;

        setTimeout(() => {
          if (!isMounted) return;
          setFadeOut(true);
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 600);
        }, 500);
      }
    };

    waitForAssets();

    const safetyTimer = setTimeout(() => {
      if (isMounted && loading) {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 600);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div
          aria-hidden="true"
          className={`font-redact fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
            fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center space-y-6">
            
            <div className="loader" />
            <p className="z-10 text-4xl text-(--blackbean)">loading...</p>
          </div>
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}