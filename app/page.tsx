'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import FilterBar from "../components/filters";
import Spline from "@splinetool/react-spline";
import ProjectCard, { ToploaderProject } from "../components/projectCard";


export default function Home() {

  const router = useRouter();
  const [tearingLink, setTearingLink] = useState<string | null>(null);

  const tags = ["favorites", "dev", "design", "art"];
  const projects: ToploaderProject[] = [
    {
      title: "CocoCoins",
      descriptor: "beach themed budget and finance tracker using MERN stack.",
      image: "/banner.png",
      tags: ["favorites", "dev"],
      link: "/projects/cococoins",
      cardNo: 'NO. 008 // HOLO',
      rarity: 'SECRET RARE ★★★',
      hp: 'HP 120',
      typeBadge: 'DEV',
      stickerDeco: '⋆˚🐾｡ BEACH EDITION',
    },
    {
      title: "Bite Me",
      descriptor: "Animation pitch about an out-of-control vampire prince sentenced to military school.",
      image: "/banner.png",
      tags: ["favorites", "art"],
      link: "/projects/bite-me",
      cardNo: 'NO. 010 // ULTRA',
      rarity: 'FIRST EDITION ★★★',
      hp: 'HP 180', 
      typeBadge: 'VISDEV / 2D',
      stickerDeco: '⋆˚🩸｡ VAMPIRE ACADEMY',
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

      <section id="hero" className="py-10 max-w-full flex flex-col md:flex-row items-center border-b border-(--blackbean)/10 pb-6">
        <div className="flex flex-col items-center text-center justify-center m-10">
          <h3 className="font-dot text-2xl mt-7 text-left ">hi, I'm</h3>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-redact m-2">dawniqueca steele</h1>
          <h3 className="text-lg mt-7 font-dot tracking-[0.15em] text-center">An Atlanta-based multidiscplinary designer, focusing on storytelling and interaction ⋆˚꩜｡</h3>
        </div>
        <div className=" justify-center mt-10 w-200">
          <img className="aspect-auto object-contain m-auto" src="/hero-animation.png" />
        </div>

      </section>

       <section
        id="featured"
        className="py-24 font-space min-h-full w-full text-(--blackbean)"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2">
              archive · 2024–2026
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-redact text-(--blackbean) leading-none">
              featured projects
            </h2>
          </div>

          <div className="mb-14">
            <FilterBar tags={tags} active={active} setActive={setActive} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-(--blackbean)/25 bg-white/50">
                <p className="font-dot text-lg text-(--blackbean)">
                  No projects in this category yet.
                </p>
                
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="demo-reel" className=" min-h-full pb-15 items-center gap-2 flex flex-col md:flex-row">
            <div className="md:w-[50%]">
               <p className="text-center font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2">
              work in action!
            </p>
<h2 className="font-redact text-5xl text-center">demo reel</h2>

            </div>
            <div className="md:w-[65%]">
              <img src="/banner.png" />
            </div>
        
      </section>

    </main>


  );
}
