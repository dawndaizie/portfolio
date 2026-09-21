"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactGridLayout, {
  useContainerWidth,
  type Layout,
  type LayoutItem,
} from "react-grid-layout";

import ImageModal from "../../components/imageModal";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

type PlaygroundImage = {
  id: string;
  src: string;
  alt: string;
  descriptor: string;
  width: number;
  height: number;
  rotation?: string;
};

const COLS = 12;
const ROW_HEIGHT = 24;
const MARGIN: [number, number] = [16, 16];
const CONTAINER_PADDING: [number, number] = [16, 24];

const MIN_W = 2;
const MAX_W = 8;
const MIN_H = 3;
const MAX_H = 28;

const FALLBACK_WIDTH = 1200;

const images: PlaygroundImage[] = [
  {
    id: "play-1",
    src: "/works/calico.png",
    alt: "Flower study",
    descriptor:
      "A soft study exploring flower shapes, warm colors, and painterly texture.",
    width: 1191,
    height: 842,
    rotation: "-rotate-2",
  },
  {
    id: "play-2",
    src: "/works/Cecil Iteration Sequence.png",
    alt: "Character sketch",
    descriptor:
      "A character iteration sequence focused on silhouette, expression, and costume ideas.",
    width: 1600,
    height: 1000,
    rotation: "rotate-2",
  },
  {
    id: "play-3",
    src: "/banner.png",
    alt: "Environment illustration",
    descriptor:
      "An environment piece focused on atmosphere, shape language, and color.",
    width: 1600,
    height: 900,
    rotation: "-rotate-1",
  },
  {
    id: "play-4",
    src: "/works/calico.png",
    alt: "Texture experiment",
    descriptor:
      "A layered texture experiment using loose marks and muted color.",
    width: 1911,
    height: 842,
    rotation: "rotate-1",
  },
  {
    id: "play-5",
    src: "/works/Cecil Iteration Sequence.png",
    alt: "Animation frame",
    descriptor:
      "A movement study captured from a character-animation sequence.",
    width: 1600,
    height: 1000,
    rotation: "-rotate-3",
  },
  {
    id: "play-6",
    src: "/banner.png",
    alt: "Painting study",
    descriptor:
      "A color and light study with an atmospheric painted finish.",
    width: 1600,
    height: 900,
    rotation: "rotate-3",
  },
];

function getColumnWidth(containerWidth: number) {
  const availableWidth =
    containerWidth -
    CONTAINER_PADDING[0] * 2 -
    MARGIN[0] * (COLS - 1);

  return availableWidth / COLS;
}

function getPixelWidth(gridWidth: number, containerWidth: number) {
  const columnWidth = getColumnWidth(containerWidth);

  return gridWidth * columnWidth + (gridWidth - 1) * MARGIN[0];
}

function getProportionalHeight(
  gridWidth: number,
  image: PlaygroundImage,
  containerWidth: number
) {
  const pixelWidth = getPixelWidth(gridWidth, containerWidth);
  const imageRatio = image.width / image.height;
  const pixelHeight = pixelWidth / imageRatio;

  const heightInRows = Math.round(
    (pixelHeight + MARGIN[1]) / (ROW_HEIGHT + MARGIN[1])
  );

  return Math.min(MAX_H, Math.max(MIN_H, heightInRows));
}

function makeInitialLayout(containerWidth: number): Layout {
  let x = 0;
  let y = 0;
  let rowHeight = 0;

  return images.map((image) => {
    const ratio = image.width / image.height;

    const suggestedWidth = Math.round(ratio * 3.2);
    const w = Math.min(MAX_W, Math.max(MIN_W, suggestedWidth));

    if (x + w > COLS) {
      x = 0;
      y += rowHeight;
      rowHeight = 0;
    }

    const h = getProportionalHeight(w, image, containerWidth);

    const item: LayoutItem = {
      i: image.id,
      x,
      y,
      w,
      h,
      minW: MIN_W,
      maxW: MAX_W,
      minH: MIN_H,
      maxH: MAX_H,
    };

    x += w;
    rowHeight = Math.max(rowHeight, h);

    return item;
  });
}

export default function Play() {
  const {
    width,
    containerRef,
    mounted: widthReady,
  } = useContainerWidth({
    initialWidth: FALLBACK_WIDTH,
  });

  const currentWidth = width > 0 ? width : FALLBACK_WIDTH;

  const [layout, setLayout] = useState<Layout>(() =>
    makeInitialLayout(FALLBACK_WIDTH)
  );

  const hasCreatedInitialLayout = useRef(false);

  useEffect(() => {
    if (!widthReady || hasCreatedInitialLayout.current) return;

    setLayout(makeInitialLayout(currentWidth));
    hasCreatedInitialLayout.current = true;
  }, [currentWidth, widthReady]);

  const resetBoard = useCallback(() => {
    setLayout(makeInitialLayout(currentWidth));
  }, [currentWidth]);

  const handleLayoutChange = useCallback((nextLayout: Layout) => {
    setLayout(nextLayout);
  }, []);

  const handleResize = useCallback(
    (
      nextLayout: Layout,
      _oldItem: LayoutItem | null,
      newItem: LayoutItem | null,
      placeholder: LayoutItem | null
    ) => {
      if (!newItem) {
        setLayout(nextLayout);
        return;
      }

      const image = images.find((item) => item.id === newItem.i);

      if (!image) {
        setLayout(nextLayout);
        return;
      }

      const nextWidth = Math.min(
        newItem.maxW ?? MAX_W,
        Math.max(newItem.minW ?? MIN_W, newItem.w)
      );

      const nextHeight = getProportionalHeight(
        nextWidth,
        image,
        currentWidth
      );

      newItem.w = nextWidth;
      newItem.h = nextHeight;

      if (placeholder) {
        placeholder.w = nextWidth;
        placeholder.h = nextHeight;
      }

      setLayout(
        nextLayout.map((item) =>
          item.i === newItem.i
            ? {
                ...item,
                w: nextWidth,
                h: nextHeight,
              }
            : item
        )
      );
    },
    [currentWidth]
  );

  return (
    <main className="min-h-screen w-full px-5 py-20 font-space sm:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 py-10 flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-space text-sm uppercase tracking-[0.2em] text-slate-500">
              Move things around + Resize
            </p>

            <h1 className="mt-2 font-kiwi text-5xl text-(--blackbean)">
              Playground
            </h1>

            <p className="mt-3 max-w-xl font-space text-slate-600">
              Explore some of my personal works + hobbies
            </p>
          </div>

          <button
            type="button"
            onClick={resetBoard}
            className="rounded-full border-2 border-(--blackbean) bg-(--ivory) px-6 py-3 text-(--blackbean) shadow-[3px_3px_0_var(--blackbean)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--blackbean)] focus:outline-none active:translate-y-0 active:shadow-[1px_1px_0_(--blackbean)"
          >
            Reset board ↺
          </button>
        </header>

        <section
          ref={containerRef}
          className="relative min-h-[950px] w-full"
          aria-label="Interactive artwork board"
        >
          {widthReady && (
            <ReactGridLayout
              width={width}
              layout={layout}
              onLayoutChange={handleLayoutChange}
              onResize={handleResize}
              gridConfig={{
                cols: COLS,
                rowHeight: ROW_HEIGHT,
                margin: MARGIN,
                containerPadding: CONTAINER_PADDING,
              }}
              dragConfig={{
                enabled: true,
                handle: ".drag-handle",
                bounded: true,
              }}
              resizeConfig={{
                enabled: true,
                handles: ["se"],
              }}
              className="play-grid"
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative ${image.rotation ?? ""}`}
                >
                  <div className="relative h-full w-full">
                    <button
                      type="button"
                      className="drag-handle absolute left-1/2 top-0 z-20 flex h-8 w-16 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition hover:scale-105 hover:bg-white active:cursor-grabbing"
                      aria-label={`Drag ${image.alt}`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-8 rounded-full bg-[var(--blackbean)]/45"
                      />
                    </button>

                    <ImageModal
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      descriptor={image.descriptor}
                      className="block h-full w-full"
                    />

                    <div
                      aria-hidden="true"
                      className="resize-marker pointer-events-none absolute -bottom-4 -right-4 z-30 grid h-11 w-11 place-items-center rounded-full "
                    >
                      <span className="mb-1 mr-1 h-4 w-4 border-b-[3px] border-r-[3px] border-[var(--blackbean)]" />
                    </div>
                  </div>
                </div>
              ))}
            </ReactGridLayout>
          )}
        </section>

        <p className="mt-6 text-center font-space text-sm text-slate-500">
          Tip: drag from the little tab, resize from the lower-right circle,
          and click an image to view its caption.
        </p>
      </div>
    </main>
  );
}