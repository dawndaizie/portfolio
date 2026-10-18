'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12; 
    const rotateX = -((y - centerY) / centerY) * 12; 

    el.style.setProperty('--pointer-x', `${percentX}%`);
    el.style.setProperty('--pointer-y', `${percentY}%`);
    el.style.setProperty('--rotate-x', `${rotateX}deg`);
    el.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rotate-x', '0deg');
    el.style.setProperty('--rotate-y', '0deg');
    el.style.setProperty('--pointer-x', '50%');
    el.style.setProperty('--pointer-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`toploaderWrapper ${isHovered ? 'is-active' : ''}`}
    >
      <Link
        href={project.link}
        className="toploaderCard group block relative select-none cursor-pointer"
      >
       
        <div className="toploaderPlastic relative rounded-2xl p-4 sm:p-5">
        
          <div className="toploaderLip" />

         
          <div className="absolute top-7 right-7 z-30 rounded-md bg-white px-2.5 py-1 font-dot text-[10px] font-bold text-(--blackbean) border border-(--blackbean)/20 shadow-md backdrop-blur-xs -rotate-2">
            {project.stickerDeco}
          </div>

         
          <div className="tradingCardInner relative rounded-xl border border-(--blackbean)/20 bg-white p-4 flex flex-col justify-between overflow-hidden shadow-inner">
            
           
            <div className="holoFoilOverlay" />

            
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
              <h3 className="mt-2.5 font-kiwi text-3xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
                {project.title}
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm font-dot tracking-wide leading-relaxed text-(--blackbean)/85 line-clamp-2">
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