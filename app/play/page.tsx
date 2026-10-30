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

const works: PlayPiece[] = [
  {
    id: 'inyourthoughts',
    name: 'inyourthoughts',
    image: '/playSection/inyourthoughts.jpg',
    descriptor: '18 x 24, acrylic, painting for exhibit',
    initialX: 0,
    initialY: 20,
    width: 250,
    aspectRatio: 'aspect-[4/3]',
    rotation: -4,
  },
  {
    id: 'meow',
    name: 'meow',
    image: '/playSection/meow.jpg',
    descriptor: '12 x 12, acrylic, commissioned painting',
    initialX: 30,
    initialY: 20,
    width: 250,
    aspectRatio: 'aspect-[1/1]',
    rotation: 3,
  },
  {
    id: 'scary tree',
    name: 'scary tree',
    image: '/playSection/scaryTree.png',
    descriptor: 'procreate illustration for halloween',
    initialX: 60,
    initialY: 20,
    width: 250,
    aspectRatio: 'aspect-[5/7]',
    rotation: -2,
  },

  {
    id: 'meiji jingu',
    name: 'entrance to meiji jingu',
    image: '/playSection/meijijingu.jpg',
    descriptor: '12 x 24, acrylic, based on trip to japan',
    initialX: 95,
    initialY: 20,
    width: 350,
    aspectRatio: 'aspect-[2/1]',
    rotation: -2,
  },

  {
    id: 'cloth',
    name: 'cloth',
    image: '/playSection/cloth.jpg',
    descriptor: 'charcoal drawing of cloth',
    initialX: -5,
    initialY: 400,
    width: 350,
    aspectRatio: 'aspect-[4/3]',
    rotation: 2,
  },

  {
    id: 'lady',
    name: 'lady',
    image: '/playSection/lady.jpg',
    descriptor: 'graphite drawing of bust still-life',
    initialX: 30,
    initialY: 400,
    width: 250,
    aspectRatio: 'aspect-[3/4]',
    rotation: -2,
  },

  {
    id: 'natural texture',
    name: 'natural textures',
    image: '/playSection/Steele Natural Texture.jpg',
    descriptor: 'charcoal drawing of nature still life',
    initialX: 65,
    initialY: 500,
    width: 350,
    aspectRatio: 'aspect-[4/3]',
    rotation: 2,
  },

  {
    id: 'still life',
    name: 'bottle still life',
    image: '/playSection/still life.jpg',
    descriptor: 'graphite drawing, still life',
    initialX: 95,
    initialY: 400,
    width: 250,
    aspectRatio: 'aspect-[3/4]',
    rotation: -2,
  },

  {
    id: 'b master layout',
    name: 'Layout Design',
    image: '/playSection/B Master Layout.png',
    descriptor: 'Layout Design for cafe-themed presentation',
    initialX: 0,
    initialY: 800,
    width: 350,
    aspectRatio: 'aspect-[4/3]',
    rotation: -2,
  },
];

type ItemPos = {
  x: number;
  y: number;
  rotation: number;
};

type DragSession = {
  id: string;
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startX: number;
  startY: number;
};

const BOARD_PADDING = 24;
const BOTTOM_SPACE = 120;

export default function PlayPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const positionsRef = useRef<Map<string, ItemPos>>(new Map());

  const dragRef = useRef<DragSession | null>(null);
  const highestZRef = useRef(20);

  const [desktopMode, setDesktopMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia(
      '(min-width: 900px) and (hover: hover) and (pointer: fine)'
    );

    const updateMode = () => {
      setDesktopMode(query.matches);
    };

    updateMode();
    query.addEventListener('change', updateMode);

    return () => {
      query.removeEventListener('change', updateMode);
    };
  }, []);

  const applyPosition = useCallback(
    (id: string, position: ItemPos) => {
      const element = itemRefs.current.get(id);
      if (!element) return;

      element.style.transform = `
        translate3d(${position.x}px, ${position.y}px, 0)
        rotate(${position.rotation}deg)
      `;
    },
    []
  );

  const bringToFront = useCallback((id: string) => {
    const element = itemRefs.current.get(id);
    if (!element) return;

    highestZRef.current += 1;
    element.style.zIndex = `${highestZRef.current}`;
  }, []);

  const finishDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;

    dragRef.current = null;

    const element = itemRefs.current.get(drag.id);

    if (element) {
      element.classList.remove('is-dragging');

      if (element.hasPointerCapture(drag.pointerId)) {
        element.releasePointerCapture(drag.pointerId);
      }
    }
  }, []);

  const initializePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    finishDrag();
    setActiveTooltip(null);

    positionsRef.current.clear();
    highestZRef.current = works.length + 20;

    if (!desktopMode) {
      container.style.removeProperty('height');

      itemRefs.current.forEach((element) => {
        element.style.removeProperty('transform');
        element.style.removeProperty('z-index');
      });

      setIsReady(true);
      return;
    }

    const boardWidth = container.clientWidth;
    let bottomEdge = 0;

    works.forEach((piece, index) => {
      const element = itemRefs.current.get(piece.id);
      if (!element) return;

      const availableWidth = Math.max(
        0,
        boardWidth - element.offsetWidth - BOARD_PADDING * 2
      );

      const position: ItemPos = {
        x:
          BOARD_PADDING +
          (piece.initialX / 100) * availableWidth,
        y: BOARD_PADDING + piece.initialY,
        rotation: piece.rotation,
      };

      positionsRef.current.set(piece.id, position);

      element.style.zIndex = `${index + 10}`;

      applyPosition(piece.id, position);


      bottomEdge = Math.max(
        bottomEdge,
        position.y + element.offsetHeight + BOTTOM_SPACE
      );
    });

    container.style.height = `${Math.ceil(bottomEdge)}px`;

    setIsReady(true);
  }, [desktopMode, applyPosition, finishDrag]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    initializePositions();


    let previousWidth = container.clientWidth;
    let frame: number | null = null;

    const observer = new ResizeObserver(() => {
      const nextWidth = container.clientWidth;

      if (Math.abs(nextWidth - previousWidth) < 1) return;

      previousWidth = nextWidth;

      if (frame !== null) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(initializePositions);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();

      if (frame !== null) cancelAnimationFrame(frame);

      finishDrag();
    };
  }, [initializePositions, finishDrag]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveTooltip(null);
        finishDrag();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('blur', finishDrag);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('blur', finishDrag);
    };
  }, [finishDrag]);

  const showTooltip = (id: string) => {
    if (!desktopMode) return;

    setActiveTooltip(id);
    bringToFront(id);
  };

  const clampPosition = (
  element: HTMLDivElement,
  x: number,
  y: number
) => {
  const container = containerRef.current;

  if (!container) return { x, y };

  const containerRect = container.getBoundingClientRect();
  const minX = -containerRect.left + BOARD_PADDING;

  const maxX = Math.max(
    minX,
    document.documentElement.clientWidth -
      containerRect.left -
      element.offsetWidth -
      BOARD_PADDING
  );

  return {
    x: Math.max(minX, Math.min(x, maxX)),
    y,
  };
};

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    id: string
  ) => {

    if (
      !desktopMode ||
      event.pointerType === 'touch' ||
      event.button !== 0 ||
      !event.isPrimary ||
      dragRef.current
    ) {
      return;
    }

    const position = positionsRef.current.get(id);
    if (!position) return;

    event.preventDefault();



    bringToFront(id);
    setActiveTooltip(null);

    dragRef.current = {
      id,
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    event.currentTarget.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current;

    if (!drag || event.pointerId !== drag.pointerId) return;

    const position = positionsRef.current.get(drag.id);
    if (!position) return;

    const next = clampPosition(
      event.currentTarget,
      drag.startX + event.clientX - drag.startPointerX,
      drag.startY + event.clientY - drag.startPointerY
    );

    position.x = next.x;
    position.y = next.y;

    applyPosition(drag.id, position);
  };



  return (
    <main className="playPage artPage font-space py-40">
      <div className="artPage__container">
        <header className="artPage__header playPage__header">
          <div>
            <h1 className="artPage__title font-redact">
              playground
            </h1>

            <p className="artPage__intro">
              A collection of things I’m making and exploring.
            </p>

            <p className="playPage__instructions font-dot">
              {desktopMode
                ? 'Click and drag to rearrange — make yourself at home.'
                : 'Scroll through the collection and explore the notes.'}
            </p>
          </div>

          {desktopMode && (
            <button
              type="button"
              onClick={initializePositions}
              className="mt-5 rounded-lg px-10 py-2 font-dot tracking-[0.15em]  transition font-dot bg-(--ivory) hover:bg-(--cornell)/75 text-(--blackbean) hover:scale-105"
            >
              <span aria-hidden="true">↺ </span>
              Reset arrangement
            </button>
          )}
        </header>

        <div
          ref={containerRef}
          className={`playBoard ${desktopMode ? 'is-desktop' : ''
            } ${isReady ? 'is-ready' : ''}`}
        >
          {works.map((piece, index) => {
            const tooltipId = `play-description-${index}`;
            const isTooltipOpen = activeTooltip === piece.id;

            return (
              <div
                key={piece.id}
                ref={(node) => {
                  if (node) {
                    itemRefs.current.set(piece.id, node);
                  } else {
                    itemRefs.current.delete(piece.id);
                  }
                }}
                aria-label={desktopMode ? piece.name : undefined}
                aria-describedby={desktopMode ? tooltipId : undefined}

                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') {
                    showTooltip(piece.id);
                  }
                }}
                onPointerLeave={(event) => {
                  if (
                    !event.currentTarget.contains(document.activeElement)
                  ) {
                    setActiveTooltip((current) =>
                      current === piece.id ? null : current
                    );
                  }
                }}
                onPointerDown={(event) =>
                  handlePointerDown(event, piece.id)
                }
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
                onLostPointerCapture={finishDrag}

                style={
                  {
                    '--poster-width': `${piece.width}px`,
                  } as React.CSSProperties
                }
                className="playPoster"
              >
                <div className="playPoster__art">
                  <div
                    className={`playPoster__image ${piece.aspectRatio}`}
                  >
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      draggable={false}
                      sizes="(max-width: 639px) 85vw, 350px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  id={tooltipId}
                  role={desktopMode ? 'tooltip' : undefined}
                  className={`playTooltip ${isTooltipOpen ? 'is-visible' : ''
                    }`}
                >
                  <div className="playTooltip__label">
                    <span
                      className="playTooltip__marker"
                      aria-hidden="true"
                    >
                      ⋆.𐙚 ̊
                    </span>

                    <p className="playTooltip__text font-space">
                      {piece.descriptor}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}