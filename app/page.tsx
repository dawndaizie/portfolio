'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import FilterBar from "../components/filters";


export default function Home() {

  const router = useRouter();
  const [tearingLink, setTearingLink] = useState<string | null>(null);

  const photoStripItems = [
    { id: '1', image: '/works/calico.png', },
    { id: '2', image: '/works/Cecil Iteration Sequence.png', },
    { id: '3', image: '/banner.png', },
    { id: '4', image: '/banner.png', },
    { id: '5', image: '/works/calico.png', },
    { id: '6', image: '/works/Cecil Iteration Sequence.png', },
  ];

  const tags = ["favorites", "dev", "design", "art"];
  const projects = [
    {
      title: "CocoCoins",
      descriptor: "beach themed financial tracker.",
      image: "/banner.png",
      tags: ["favorites", "dev"],
      link: "/projects/cococoins",
      passNo: 'CC-0804',
      date: '2025/2026',
      section: 'DEV // UI',
      accentColor: 'text-(--cornell)',
    },
    {
      title: "Bite Me",
      descriptor: "Visual development project for a animated show about an out-of-control teenage vampire prince sentenced to military school.",
      image: "/banner.png",
      tags: ["favorites", "art"],
      link: "/projects/bite-me",
      passNo: 'BM-1031',
      date: '2024/2025',
      section: 'VISDEV // 2D',
      accentColor: 'text-(--cornell)',
    },
  ]

  const [active, setActive] = useState("favorites");
  const filtered =
    active === "favorites"
      ? projects
      : projects.filter((p) => p.tags.includes(active))


  const handleTicketClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (tearingLink) return;

    setTearingLink(link);
    setTimeout(() => {
      router.push(link);
    }, 380);
  };

  return (
    <main className="font-space min-h-screen max-w-full flex flex-col items-center justify-center text-(--blackbean)">

      <section id="hero" className="py-90 h-50 max-w-full flex items-center">
        <div className="flex flex-col items-center justify-center m-10">
          <h3 className="font-dot text-2xl mt-7 text-left ">hi, I'm</h3>
          <h1 className="lg:text-7xl text-4xl font-redact m-2">dawniqueca steele</h1>
          <h3 className="text-lg mt-7 font-dot tracking-[0.15em] text-center">An Atlanta-based multidiscplinary designer, focusing on storytelling and interaction ⋆˚꩜｡</h3>
        </div>
        <div className=" justify-center mt-10 w-200">
          <img className="aspect-auto object-contain m-auto" src="/hero-animation.png" />
        </div>

      </section>

      <section id="gallery" className="w-full py-10 flex flex-col items-center select-none overflow-hidden">

        <div className="w-full max-w-6xl px-4 sm:px-6 mb-3 flex items-center justify-between text-[11px] font-dot tracking-[0.2em] uppercase text-(--blackbean)/60">
          <span className="flex items-center gap-1.5 font-bold text-(--cornell)">
            ROLL // 35MM CONTINUOUS STRIP
          </span>
          <span>ISO 400 · RAW EXPOSURES</span>
        </div>


        <div className="filmStripContainer w-full overflow-hidden relative">

          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-[#faf8f5] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-[#faf8f5] to-transparent" />


          <div className="filmStripTrack flex items-center">


            <div className="continuousFilmRibbon flex items-center shrink-0">
              {photoStripItems.map((item) => (
                <div
                  key={item.id}
                  className="filmExposureFrame group relative flex flex-col items-center justify-center px-4 py-8 shrink-0 cursor-pointer"
                >

                  <div className="relative aspect-[16/9] w-52 sm:w-64 overflow-hidden rounded-md bg-black/5 border border-(--blackbean)/15 shadow-inner group-hover:scale-105 transition-200">
                    <Image
                      src={item.image}
                      alt={item.id}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="absolute right-0 top-0 bottom-0 w-px bg-(--blackbean)/20 pointer-events-none" />
                </div>
              ))}
            </div>


            <div aria-hidden="true" className="continuousFilmRibbon flex items-center shrink-0">
              {photoStripItems.map((item) => (
                <div
                  key={`clone-${item.id}`}
                  className="filmExposureFrame group relative flex flex-col items-center justify-center px-4 py-8 shrink-0 cursor-pointer"
                >

                  <div className="relative aspect-[16/9] w-52 sm:w-64 overflow-hidden rounded-md bg-black/5 border border-(--blackbean)/15 shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.id}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-(--blackbean)/20 pointer-events-none" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      <section
        id="featured"
        className="py-24 font-space min-h-full w-full text-(--blackbean)"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2">
              Admit One · 2024–2026
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-redact text-(--blackbean) leading-none">
              featured projects
            </h2>
          </div>

          <div className="mb-14">
            <FilterBar tags={tags} active={active} setActive={setActive} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <Link
                  key={project.title}
                  href={project.link}
                  className="projectCard ticketCard group flex flex-col justify-between p-6 sm:p-7 select-none cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-(--blackbean)/10 pb-3 text-[11px] font-dot tracking-widest uppercase text-(--blackbean)/70">
                      <span className="flex items-center gap-1.5 font-bold text-(--cornell)">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--cornell)" />
                        ADMIT ONE
                      </span>
                      <span>{project.passNo}</span>
                    </div>

                    <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-(--blackbean)/10 bg-white/70 p-2 shadow-inner">
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-(--blackbean)/5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md border border-dashed border-(--cornell)/30 bg-(--cornell) px-2.5 py-0.5 font-dot text-[10px] tracking-wider uppercase text-(--ivory)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-3 font-space text-2xl font-bold tracking-tight text-(--blackbean) transition-colors group-hover:text-(--cornell)">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-dot tracking-wide leading-relaxed text-(--blackbean)/80 line-clamp-3">
                      {project.descriptor}
                    </p>
                  </div>

                  <div className="mt-8 pt-5">
                    <div className="grid grid-cols-3 gap-2 font-dot text-[10px] sm:text-[11px] tracking-wider uppercase text-(--blackbean)/75">
                      <div>
                        <span className="block text-[9px] text-(--cornell) font-bold">
                          DATE
                        </span>
                        <span>{project.date}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-(--cornell) font-bold">
                          HALL
                        </span>
                        <span>{project.section}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] text-(--cornell) font-bold">
                          GATE
                        </span>
                        <span>BOARDING ↗</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-(--blackbean)/10 pt-3">
                      <div className="flex items-center gap-0.5 opacity-65 group-hover:opacity-100 transition-opacity">
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-1 bg-(--blackbean)" />
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-1.5 bg-(--blackbean)" />
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-2 bg-(--blackbean)" />
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-1 bg-(--blackbean)" />
                        <span className="h-5 w-1.5 bg-(--blackbean)" />
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-2 bg-(--blackbean)" />
                        <span className="h-5 w-0.5 bg-(--blackbean)" />
                        <span className="h-5 w-1 bg-(--blackbean)" />
                        <span className="h-5 w-1.5 bg-(--blackbean)" />
                      </div>

                      <span className="font-dot text-[10px] tracking-[0.2em] uppercase text-(--blackbean)/60 group-hover:text-(--cornell) transition-colors">
                        SCAN // ENTER ↗
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-(--blackbean)/25 bg-white/50">
                <p className="font-dot text-lg text-(--blackbean)">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>


      <section id="demo-reel" className="">

      </section>

    </main>


  );
}



// PRINT STRIP FOR CAROUSEL