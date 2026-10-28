'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export type ToploaderProject = {
  title: string;
  descriptor: string;
  image: string;
  tags: string[];
  link: string;
  stickerDeco: string;
  locked: boolean;
};

export default function ProjectCard({ project }: { project: ToploaderProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const plasticRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const canAnimateHover = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    return (
      event.pointerType !== 'touch' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  };

  const handlePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!canAnimateHover(event)) return;

    const plastic = plasticRef.current;
    if (!plastic) return;

    setIsHovered(true);

    gsap.to(plastic, {
      scale: 1.008,
      y: -2,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        autoAlpha: 0.28,
        duration: 0.3,
        overwrite: 'auto',
      });
    }

    if (foilRef.current) {
      gsap.to(foilRef.current, {
        autoAlpha: 0.18,
        duration: 0.3,
        overwrite: 'auto',
      });
    }
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!canAnimateHover(event)) return;

    const card = cardRef.current;
    const plastic = plasticRef.current;

    if (!card || !plastic) return;

    const bounds = card.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;


    const normalizedX = gsap.utils.clamp(
      -1,
      1,
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    );

    const normalizedY = gsap.utils.clamp(
      -1,
      1,
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    );

    const maxTilt = 2;

    gsap.to(plastic, {
      rotationX: normalizedY * maxTilt,
      rotationY: -normalizedX * maxTilt,

      boxShadow: `
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      ${normalizedX * 2}px ${10 + normalizedY * 2}px
      26px rgba(53, 23, 16, 0.12)
    `,

      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });


    const highlightX = ((normalizedX + 1) / 2) * 100;
    const highlightY = ((normalizedY + 1) / 2) * 100;

    if (glareRef.current) {
      glareRef.current.style.background = `
      radial-gradient(
        circle at ${highlightX}% ${highlightY}%,
        rgba(255, 255, 255, 0.55) 0%,
        transparent 65%
      )
    `;
    }

    if (foilRef.current) {
      foilRef.current.style.background = `
      radial-gradient(
        circle at ${highlightX}% ${highlightY}%,
        rgba(252, 243, 193, 0.65) 0%,
        rgba(199, 219, 230, 0.5) 35%,
        rgba(244, 180, 200, 0.35) 60%,
        transparent 80%
      )
    `;
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);

    const plastic = plasticRef.current;
    if (!plastic) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    gsap.to(plastic, {
      scale: 1,
      y: 0,
      rotationX: 0,
      rotationY: 0,

      boxShadow: `
      0 1px 0 rgba(255, 255, 255, 0.9) inset,
      0 8px 24px rgba(53, 23, 16, 0.1)
    `,

      duration: prefersReducedMotion ? 0 : 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const overlays = [
      glareRef.current,
      foilRef.current,
    ].filter((element): element is HTMLDivElement => element !== null);

    if (overlays.length) {
      gsap.to(overlays, {
        autoAlpha: 0,
        duration: prefersReducedMotion ? 0 : 0.25,
        overwrite: 'auto',
      });
    }
  };
  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className={`toploaderWrapper ${isHovered ? 'is-active' : ''}`}
    >
      <Link
        href={project.link}
        className="toploaderCard group block relative select-none cursor-pointer"
      >

        <div ref={plasticRef} className="toploaderPlastic relative rounded-2xl p-4 sm:p-5">

          <div ref={glareRef} className="toploaderPlasticGlare" />
          <div className="toploaderLip" />


          <div className="tradingCardInner relative rounded-xl border border-(--blackbean)/20 bg-white p-4 flex flex-col justify-between overflow-hidden shadow-inner">


            <div ref={foilRef} className="holoFoilOverlay" />


            <div className="relative z-10 flex items-center justify-between border-b border-(--blackbean)/10 pb-2.5 text-[11px] font-dot tracking-wider text-(--blackbean)/80">
              <span className="font-bold text-(--cornell) flex items-center gap-1.5">
                
                {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="items-center line-clamp-1 rounded-md border border-dashed border-(--cornell)/30 bg-(--cornell) px-2.5 py-1 font-dot text-[12px] tracking-[0.15em] uppercase text-(--ivory)"
                >
                  {tag}
                </span>
              ))}
              </span>

              <span className="font-bold text-(--blackbean) font-mono">⋆.𐙚 ̊</span>
            </div>

            <div className="relative z-10 mt-3 aspect-[1/1] w-full overflow-hidden rounded-lg border-2 border-(--blackbean)/15 bg-white p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-md bg-(--blackbean)/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="mt-2.5 font-redact text-2xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
                {project.title}
              </h3>

              <p className="toploaderDescriptor mt-1.5 text-sm sm:text-[14px] font-mono tracking-wide leading-relaxed text-(--blackbean)/85">
                {project.descriptor}
              </p>
            </div>


          </div>

          <div className="absolute bottom-1.5 right-2 z-30 rounded-md bg-white px-2.5 py-1 font-dot text-[11px] tracking-[0.15em]  font-bold text-(--blackbean) border border-(--blackbean)/20 shadow-md backdrop-blur-xs -rotate-2">
            {project.stickerDeco}
          </div>
        </div>
      </Link>
    </div>
  );
}