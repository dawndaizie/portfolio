'use client'

import { useEffect, useState } from 'react';

export default function MovingBG() {
  const imageSize = 30;
  const gap = 40;
  const tileSize = imageSize + gap;

  const [tileUrl, setTileUrl] = useState('');

  useEffect(() => {
    let cancelled = false;

    const image = new window.Image();

    image.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement('canvas');
      canvas.width = tileSize;
      canvas.height = tileSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      
      const scale =
        imageSize / Math.max(image.naturalWidth, image.naturalHeight);

      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      ctx.drawImage(
        image,
        (tileSize - width) / 2,
        (tileSize - height) / 2,
        width,
        height
      );

      setTileUrl(canvas.toDataURL('image/svg'));
    };

    image.src = '/base.svg';

    return () => {
      cancelled = true;
      image.onload = null;
    };
  }, [imageSize, tileSize]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 min-h-screen w-screen overflow-hidden bg-(--sky)"
    >
      <div
        className="image-pattern absolute inset-0 opacity-55"
        style={{
          backgroundImage: tileUrl ? `url("${tileUrl}")` : undefined,
          backgroundSize: `${tileSize}px ${tileSize}px`,
        }}
      />

      <style jsx global>{`
        .image-pattern {
          pointer-events: none;
          background-repeat: repeat;
          animation: drift 75s linear infinite;
        }

        @keyframes drift {
          from {
            background-position: 0px 0px;
          }

          to {
            background-position:
              -${tileSize * 6}px -${tileSize * 6}px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-pattern {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}