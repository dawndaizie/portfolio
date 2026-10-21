'use client';

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
  cardNo: string;
  rarity: string;
  hp: string;
  typeBadge: string;
  stickerDeco: string;
};

export default function ProjectCard({ project }: { project: ToploaderProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const plasticRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handlePointerEnter = () => {
    setIsHovered(true);
    const el = plasticRef.current;
    if (!el) return;
     gsap.to(el, {
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
    });


     if (glareRef.current && foilRef.current) {
      gsap.to([glareRef.current, foilRef.current], {
        autoAlpha: 1,
        duration: 0.3,
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
     const card = cardRef.current;
    const plastic = plasticRef.current;
    if (!card || !plastic) return;

    const bounds = card.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;

    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
     const rotationX = center.y / 20;  
    const rotationY = -center.x / 20; 

    const shadowOffsetX = -rotationY * 3;
    const shadowOffsetY = rotationX * 3;

    gsap.to(plastic, {
      rotationX: rotationX,
      rotationY: rotationY,
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.35,
      boxShadow: `${shadowOffsetX}px ${shadowOffsetY + 12}px 36px 0px rgba(53, 23, 16, 0.22)`,
    });
    const glareX = center.x * 1.5 + bounds.width / 2;
    const glareY = center.y * 1.5 + bounds.height / 2;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255, 255, 255, 0.5) 0%, transparent 65%)`;
    }

    if (foilRef.current) {
      foilRef.current.style.background = `radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255, 255, 255, 0.9) 0%, rgba(252, 243, 193, 0.65) 25%, rgba(199, 219, 230, 0.55) 45%, rgba(244, 180, 200, 0.45) 65%, transparent 80%)`;
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    const plastic = plasticRef.current;
    if (!plastic) return;

    gsap.to(plastic, {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      boxShadow: '0 8px 24px rgba(53, 23, 16, 0.1)',
      duration: 0.6,
      ease: 'power2.out',
    });

    if (glareRef.current && foilRef.current) {
      gsap.to([glareRef.current, foilRef.current], {
        autoAlpha: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`toploaderWrapper ${isHovered ? 'is-active' : ''}`}
    >
      <Link
        href={project.link}
        className="toploaderCard group block relative select-none cursor-pointer"
      >

        <div ref={plasticRef} className="toploaderPlastic relative rounded-2xl p-4 sm:p-5">

          <div ref={glareRef} className="toploaderPlasticGlare" />
          <div className="toploaderLip" />


          <div className="absolute top-7 right-7 z-30 rounded-md bg-white px-2.5 py-1 font-dot text-[10px] font-bold text-(--blackbean) border border-(--blackbean)/20 shadow-md backdrop-blur-xs -rotate-2">
            {project.stickerDeco}
          </div>


          <div className="tradingCardInner relative rounded-xl border border-(--blackbean)/20 bg-white p-4 flex flex-col justify-between overflow-hidden shadow-inner">


            <div ref={foilRef} className="holoFoilOverlay" />


            <div className="relative z-10 flex items-center justify-between border-b border-(--blackbean)/10 pb-2.5 text-[11px] font-dot tracking-wider text-(--blackbean)/80">
              <span className="font-bold text-(--cornell) flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-(--cornell) animate-pulse" />
                {project.typeBadge}
              </span>
              <span className="font-mono text-[10px] text-(--blackbean)/60">{project.cardNo}</span>
              <span className="font-bold text-(--blackbean) font-mono">{project.hp}</span>
            </div>

            <div className="relative z-10 mt-3 aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-(--blackbean)/15 bg-white p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-md bg-(--blackbean)/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="relative z-10 mt-3.5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-dashed border-(--cornell)/30 bg-(--cornell) px-2.5 py-0.5 font-dot text-[10px] tracking-wider uppercase text-(--ivory)"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="mt-2.5 font-redact text-2xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
                {project.title}
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm font-dot tracking-wide leading-relaxed text-(--blackbean)/85 line-clamp-3">
                {project.descriptor}
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-2.5 border-t border-(--blackbean)/10 flex items-center justify-between text-[10px] font-dot text-(--blackbean)/75">
              <span className="font-bold text-(--cornell)">{project.rarity}</span>
              <span className="flex items-center gap-1 font-bold text-(--blackbean) group-hover:text-(--cornell) transition-colors">
                INSPECT CARD ↗
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}