'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useReducedMotion, } from 'framer-motion';
import { showNotice } from './notice';

export type ToploaderProject = {
  title: string;
  descriptor: string;
  image: string;
  sections: string[];
  tags: string[];
  link: string;
  stickerDeco: string;
  locked: boolean;
};

export default function ProjectCard({ project }: { project: ToploaderProject }) {

const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  const handleLockedClick = () => {
    showNotice(
      `${project.title} is still in the works — check back soon!`
    );
    if (reduceMotion) return;
    controls.stop();
    controls.set({ x: 0 });

    void controls.start({
      x: [0, -4, 4, -3, 3, 0],
      transition: {
        duration: 0.32,
        ease: 'easeInOut',
      },
    });
  };

  const cardContent = (
    <div className="toploaderPlastic relative rounded-2xl p-4 sm:p-5">
      <div className="toploaderLip" />

      <div className="cardInner relative rounded-xl border border-(--blackbean)/20 bg-white p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-(--blackbean)/10 pb-2.5 text-[11px] font-dot tracking-wider text-(--blackbean)/80">
          <div className="flex flex-wrap items-center gap-1.5 line-clamp-1 overflow-hidden">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="line-clamp-1 rounded-md border border-dashed border-(--blackbean)/30 bg-(--blackbean) px-2.5 py-1 font-dot text-[9px] tracking-[0.15em] uppercase text-(--ivory)"
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            aria-hidden="true"
            className="shrink-0 font-bold text-(--blackbean) font-mono"
          >
            ⋆.𐙚 ̊
          </span>
        </div>

        <div className="relative z-10 mt-3 aspect-[1/1] w-full shrink-0 overflow-hidden rounded-lg border-2 border-(--blackbean)/15 bg-white p-1.5 shadow-sm">
          <div className="projectCardImage relative h-full w-full overflow-hidden rounded-md bg-(--blackbean)/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
              className={`object-cover ${
                project.locked ? 'projectCardImage-locked' : ''
              }`}
            />

            {project.locked && (
              <div className="projectCard-locked" aria-hidden="true">
                <span className="projectCard-locked__badge">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="11"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>

                  <span>in the works</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="mt-2.5 font-redact text-2xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
            {project.title}
          </h3>

          <p className="toploaderDescriptor mt-1.5 font-mono tracking-wide text-(--blackbean)/85">
            {project.descriptor}
          </p>
        </div>
      </div>

      <div className="absolute bottom-1.5 right-2 z-30 rounded-md bg-white px-2.5 py-1 font-dot text-[11px] tracking-[0.15em] font-bold text-(--blackbean) border border-(--blackbean)/20 shadow-md -rotate-2">
        {project.stickerDeco}
      </div>
    </div>
  );

  return (
    <div
      className={`toploaderWrapper ${
        project.locked ? 'is-locked' : ''
      }`}
    >
      {project.locked ? (
        <div className="toploaderCard group relative select-none">
          <motion.div
            initial={false}
            animate={controls}
            className="projectCardMotion"
          >
            {cardContent}
          </motion.div>

          <button
            type="button"
            className="projectCard-lockedTrigger"
            onClick={handleLockedClick}
            aria-label={`${project.title}: project in progress. Show availability message.`}
          />
        </div>
      ) : (
        <Link
          href={project.link}
          className="toploaderCard group relative select-none cursor-pointer"
        >
          {cardContent}
        </Link>
      )}
    </div>
  );
}