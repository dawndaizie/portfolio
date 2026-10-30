'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import FilterBar from "../components/filters";
import Spline from "@splinetool/react-spline";
import ProjectCard, { ToploaderProject } from "../components/projectCard";
import { motion } from 'framer-motion';
import RotateTypewriter from "../components/rotateTypewriter";
import DitherEffect from "../components/ditherEffect";

export default function Home() {

  const sections = ["favorites", "dev", "design", "art"];
  const projects: ToploaderProject[] = [
    {
      title: "Bite Me",
      image: "/banner.png",
      sections: ["art"],
      tags: ["animation", "visual dev"],
      link: "/projects/bite-me",
      descriptor: "Animation pitch about an out-of-control vampire prince sentenced to military school.",
      stickerDeco: '⋆˚🐾｡ delinquents',
      locked: false,

    },

    {
      title: "Blue",
      image: "/banner.png",
      sections: ["art"],
      tags: ["animation", "visual dev"],
      link: "/projects/blue",
      descriptor: "Short animated film about a mermaid attending a night carnival.",
      stickerDeco: '⋆˚🐾｡  mermaid carnival',
      locked: true,
    },

    {
      title: "Charm",
      image: "/banner.png",
      sections: ["design"],
      tags: ["brand design"],
      link: "/projects/charm",
      descriptor: "Branding for a mature, elegant, yet modern tea company.",
      stickerDeco: '⋆˚🐾｡ I <3 TEA',
      locked: false,
    },

    {
      title: "CocoCoins",
      image: "/banner.png",
      sections: ["dev", "design"],
      tags: ["ui/ux design", "software dev"],
      link: "/projects/cococoins",
      descriptor: "A fun, beach themed financial tracker web application.",
      stickerDeco: '⋆˚🐾｡ sand dollars',
      locked: false,
    },

    {
      title: "Forget Me Not",
      image: "/banner.png",
      sections: ["art"],
      tags: ["visual dev"],
      link: "/projects/fmn",
      descriptor: "A dungeon-crawler rpg game where a girl in a post-apocalyptic dream world searches for her missing sister.",
      stickerDeco: '⋆˚🐾｡ dream scapes',
      locked: false,
    },

    {
      title: "Haunt My Heart",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev", "visual dev"],
      link: "/projects/hmh",
      descriptor: "Play (and fall in love) as an “exorcist” who handles malicious spirits in a world where ghosts and humans coexist.",
      stickerDeco: '⋆˚🐾｡ ghostly love',
      locked: true,
    },

    {
      title: "Javapaws",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev", "visual dev"],
      link: "/projects/javapaws",
      descriptor: "A cozy cafe management and character interaction game.",
      stickerDeco: '⋆˚🐾｡ bunny boba',
      locked: true,

    },

    {
      title: "mariposa",
      image: "/banner.png",
      sections: ["dev", "favorites"],
      tags: ["software dev"],
      link: "/projects/mariposa",
      descriptor: "An interactive music transposer and scale visualization utility.",
      stickerDeco: '⋆˚🐾｡ flowery tunes',
      locked: false,
    },

    {
      title: "Minimax",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev"],
      link: "/projects/minimax",
      descriptor: "A repertoire of playful mini-games built for quick rounds.",
      stickerDeco: '⋆˚🐾｡ mini games galore',
      locked: true,
    },

    {
      title: "Perle",
      image: "/banner.png",
      sections: ["design"],
      tags: ["brand design"],
      link: "/projects/perle",
      descriptor: "Brand identity and packaging design for an artsy nail sticker company.",
      stickerDeco: '⋆˚🐾｡ deco nails',
      locked: true,
    },


    {
      title: "Pippokey",
      image: "/banner.png",
      sections: ["art", "favorites"],
      tags: ["animation", "visual dev"],
      link: "/projects/pippokey",
      descriptor: "Cutesy duck and friends have to work for the rest of their lives!!",
      stickerDeco: '⋆˚🐾｡ stupid duck',
      locked: false,

    },

    {
      title: "Skin to Skin",
      image: "/banner.png",
      sections: ["design"],
      tags: ["ui/ux design"],
      link: "/projects/skin-to-skin",
      descriptor: "Mobile UX case study focused on mindful self-care routines.",
      stickerDeco: '⋆˚🐾｡ self care routines',
      locked: false,
    },

    {
      title: "Smart Evaluator",
      image: "/banners/smartEvaluatorBanner.svg",
      sections: ["dev"],
      tags: ["software dev"],
      link: "/projects/smart-evaluator",
      descriptor: "here are a bunch of words...",
      stickerDeco: '⋆˚🐾｡ MRO analysis',
      locked: false,
    },

    {
      title: "This Stupid Fish Ruined My Life!",
      image: "/banner.png",
      sections: ["art"],
      tags: ["visual dev"],
      link: "/projects/tsfrml",
      descriptor: "After the worst 17th birthday, Kaia vents her frustrations to a fish, only to strike a deal with a fish demon.",
      stickerDeco: '⋆˚🐾｡ accidental pacts',
      locked: true,
    },

    {
      title: "Twee Bakehouse",
      image: "/banner.png",
      sections: ["design", "favorites"],
      tags: ["brand design"],
      link: "/projects/twee-bakehouse",
      descriptor: "Playful artisan brand identity and menu system for a boutique home bakery.",
      stickerDeco: '⋆˚🐾｡ homemade sweets',
      locked: false,
    },

  ]

  const carouselItems = [
    { id: '1', image: '/works/calico.png', },
    { id: '2', image: '/works/Cecil Iteration Sequence.png', },
    { id: '3', image: '/banner.png', },
    { id: '4', image: '/banner.png', },
    { id: '5', image: '/works/calico.png', },
    { id: '6', image: '/works/Cecil Iteration Sequence.png', },
  ];

  const [active, setActive] = useState("favorites");
  const [nameComplete, setNameComplete] = useState(false);

  const filtered =
    active === ""
      ? projects
      : projects.filter((p) => p.sections.includes(active))

  return (
    <main className="font-space min-h-screen max-w-full flex flex-col items-center justify-center text-(--blackbean)">

      <section id="hero" className="py-10 max-w-full flex flex-col md:flex-row items-center border-b border-(--blackbean)/10 pb-6">
        <div>
          <h3 className="font-dot text-2xl mt-7 text-center">
            hi, im
          </h3>

          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-redact m-2 text-center">
            <DitherEffect
              text="dawniqueca steele"
              startDelay={600}
              stagger={75}
              scrambleDuration={200}
              swapInterval={70}
              onComplete={() => setNameComplete(true)}
            />
          </h1>

          <h3 className="text-lg mt-7 font-dot tracking-[0.15em] text-center"
          >
            {nameComplete ? (
              <RotateTypewriter
                array={[
                  'An ATL-based multidisciplinary designer',
                  'focusing on storytelling and interaction',
                  'animator',
                  ' ⋆˚꩜｡',
                  'interaction designer',
                ]}
              />
            ) : (<></>)}

          </h3>
        </div>

        <motion.div
          className="hero-chibi flex justify-center mt-10 w-full max-w-[640px]"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            data-hero-image="true"
            src="/hero-animation.png"
            alt="An animated chibi illustration of Dawniqueca"
            width={800}
            height={800}
            priority
            sizes="(max-width: 768px) 90vw, 640px"
            className="h-auto w-full max-w-[640px] object-contain"
          />
        </motion.div>

      </section>


      <section
        id="featured"
        className="featured-section py-24 font-space min-h-full w-full text-(--blackbean) border-b border-(--blackbean)/10"
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2">
              archive · 2024–2026
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-redact text-(--blackbean) leading-none">
              featured projects
            </h2>
          </div>

          <div className="mb-14">
            <FilterBar tags={sections} active={active} setActive={setActive} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            ) : (
              <div className="artPage__empty">
                <span
                  className="artPage__emptyMark font-dot"
                  aria-hidden="true"
                >
                  ⋆.𐙚 ̊
                </span>

                <h3 className="font-redact">
                  there's... nothing here??
                </h3>

                <p>
                  There are no projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="gallery" className="w-full py-20 flex flex-col items-center select-none overflow-hidden">
        
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-redact text-(--blackbean) leading-none">
              gallery
            </h2>
            <p className="font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2 mt-5">
              view some of my art !
            </p>
          </div>
        
        <div className="carouselContainer w-full overflow-hidden relative">
          <div className="carousel flex items-center">
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="carouselFrame group relative flex flex-col items-center justify-center px-4 py-8 shrink-0 cursor-pointer"
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

            {carouselItems.map((item) => (
              <div
                key={`clone-${item.id}`}
                className="carouselFrame group relative flex flex-col items-center justify-center px-4 py-8 shrink-0 cursor-pointer"
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
        <Link href="/art" className="mt-10 rounded-lg px-10 py-2 font-dot tracking-[0.15em] transition bg-(--ivory) hover:bg-(--cornell)/75 text-(--blackbean) hover:scale-105">
          View more art</Link>
      </section>

      {/*
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
      */}

    </main>


  );
}
