'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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



 
  return (
    <div className="toploaderWrapper hover:scale-102 transition">
      <Link
        href={project.link}
        className="toploaderCard group block relative select-none cursor-pointer"
      >

        <div className="toploaderPlastic relative rounded-2xl p-4 sm:p-5">
          <div className="toploaderLip" />


          <div className="cardInner relative rounded-xl border border-(--blackbean)/20 bg-white p-4 flex flex-col justify-between overflow-hidden shadow-inner">


          


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
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="mt-2.5 font-redact text-2xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
                {project.title}
              </h3>

              <p className="mt-1.5 text-sm sm:text-[14px] font-mono tracking-wide leading-relaxed text-(--blackbean)/85">
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