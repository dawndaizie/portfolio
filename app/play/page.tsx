'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type PlayPiece = {
  id: string;
  name: string;
  image: string;
  descriptor: string;
  initialX: number;
  initialY: number;
  width: number;
  aspectRatio: string;
  rotation: number;
};

const BASE_WORKS: PlayPiece[] = [
  {
    id: 'calico',
    name: 'calico',
    image: '/works/calico.png',
    descriptor: 'nice place',
    initialX: 12,
    initialY: 60,
    width: 250,
    aspectRatio: 'aspect-[4/3]',
    rotation: -4,
  },
  {
    id: 'cecil',
    name: 'cecil iteration',
    image: '/works/Cecil Iteration Sequence.png',
    descriptor: 'character iteration',
    initialX: 42,
    initialY: 40,
    width: 250,
    aspectRatio: 'aspect-[4/3]',
    rotation: 3,
  },
  {
    id: 'calico-study',
    name: 'calico study',
    image: '/works/calico.png',
    descriptor: 'illustrations',
    initialX: 70,
    initialY: 70,
    width: 250,
    aspectRatio: 'aspect-[4/3]',
    rotation: -2,
  },
];

type ItemPos = {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  rotation: number;
};

export default function PlayPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const positionsRef = useRef<Map<string, ItemPos>>(new Map());
  const highestZRef = useRef<number>(50);
  const [isReady, setIsReady] = useState(false);

  const applyTransform = (
    id: string,
    x: number,
    y: number,
    rotation: number,
    isDragging = false
  ) => {
    const el = itemRefs.current.get(id);
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rotation}deg) scale(${
      isDragging ? 1.04 : 1
    })`;
  };

  const initializePositions = useCallback(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 640;
    highestZRef.current = BASE_WORKS.length + 10;
    positionsRef.current.clear();

    const containerRect = containerRef.current.getBoundingClientRect();

    BASE_WORKS.forEach((work, index) => {
      const defaultX = isMobile
        ? 10 + (index % 2) * 16
        : (work.initialX / 100) * (containerRect.width - work.width * 0.8);

      const defaultY = isMobile
        ? index * 200 + 20
        : work.initialY;

      const zIndex = index + 10;

      positionsRef.current.set(work.id, {
        id: work.id,
        x: defaultX,
        y: defaultY,
        zIndex,
        rotation: work.rotation,
      });

      const el = itemRefs.current.get(work.id);
      if (el) {
        el.style.zIndex = `${zIndex}`;
        applyTransform(work.id, defaultX, defaultY, work.rotation, false);
      }
    });

    setIsReady(true);
  }, []);

  useEffect(() => {
    initializePositions();
    const handleResize = () => requestAnimationFrame(initializePositions);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializePositions]);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    const container = containerRef.current;
    const currentPos = positionsRef.current.get(id);
    const targetEl = itemRefs.current.get(id);
    if (!container || !currentPos || !targetEl) return;

    // Bring clicked element to top
    highestZRef.current += 1;
    currentPos.zIndex = highestZRef.current;
    targetEl.style.zIndex = `${highestZRef.current}`;
    targetEl.classList.add('cursor-grabbing');

    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startX = currentPos.x;
    const startY = currentPos.y;

    const pieceConfig = BASE_WORKS.find((w) => w.id === id);
    const pieceWidth = pieceConfig?.width || 240;

    let rafId: number | null = null;
    let currentX = startX;
    let currentY = startY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startPointerX;
      const deltaY = moveEvent.clientY - startPointerY;

      const containerRect = container.getBoundingClientRect();

      // Bounds allow item to drag out of the overlay onto the moving background:
      // Left bound: allowed all the way to the window's left edge
      const minX = -containerRect.left + 8;
      // Right bound: allowed all the way to the window's right edge
      const maxX = window.innerWidth - containerRect.left - pieceWidth + 8;
      
      const minY = -containerRect.top + 70; // Keep below fixed navbar
      const maxY = containerRect.height + 400; // Allow dragging down into footer area

      currentX = Math.max(minX, Math.min(startX + deltaX, maxX));
      currentY = Math.max(minY, Math.min(startY + deltaY, maxY));

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyTransform(id, currentX, currentY, currentPos.rotation, true);
      });
    };

    const onPointerUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      currentPos.x = currentX;
      currentPos.y = currentY;
      applyTransform(id, currentX, currentY, currentPos.rotation, false);
      targetEl.classList.remove('cursor-grabbing');

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { once: true });
  };

  return (
    <main className="relative w-full overflow-visible py-25 font-space text-(--blackbean)">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-(--blackbean)/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-kiwi text-4xl sm:text-5xl text-(--blackbean)">
            Playground
          </h1>
          <p className="mt-1 font-space text-xs sm:text-sm text-(--blackbean)/70">
            play with my work...
          </p>
        </div>

        <button
          type="button"
          onClick={initializePositions}
          className="group flex items-center gap-2 rounded-full border border-(--blackbean)/25 bg-(--ivory) px-5 py-2 font-dot text-xs tracking-wider text-(--blackbean) transition-all hover:border-(--blackbean) hover:shadow-sm active:scale-95"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">
            ↺
          </span>
          Reset Posters
        </button>
      </div>

      
      <div
        ref={containerRef}
        className="relative min-h-[75vh] w-full overflow-visible touch-none"
      >
        {BASE_WORKS.map((piece) => (
          <div
            key={piece.id}
            ref={(node) => {
              if (node) itemRefs.current.set(piece.id, node);
              else itemRefs.current.delete(piece.id);
            }}
            onPointerDown={(e) => handlePointerDown(e, piece.id)}
            style={{
              width: `${piece.width}px`,
              opacity: isReady ? 1 : 0,
            }}
            className="absolute left-0 top-0 cursor-grab touch-none transition-opacity duration-300 will-change-transform"
          >
            <div className="group relative rounded-2xl shadow-[0_10px_25px_rgba(53,23,16,0.15)] ring-1 ring-(--blackbean)/15 transition-shadow hover:shadow-[0_20px_35px_rgba(53,23,16,0.22)]">
              <div
                className={`relative overflow-hidden rounded-xl bg-(--blackbean)/5 ${piece.aspectRatio} pointer-events-none`}
              >
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  draggable={false}
                  className="object-cover select-none pointer-events-none"
                />
              </div>

              
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}