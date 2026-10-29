'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
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
      stickerDeco: '⋆˚🐾｡ SAND DOLLARS',
      locked: false,

    },

    {
      title: "Blue",
      image: "/banner.png",
      sections: ["art"],
      tags: ["animation", "visual dev"],
      link: "/projects/blue",
      descriptor: "Short animated film about a mermaid attending a night carnival.",
      stickerDeco: '⋆˚🐾｡  MERMAID CARNIVAL',
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
      stickerDeco: '⋆˚🐾｡ SAND DOLLARS',
      locked: false,
    },

    {
      title: "Forget Me Not",
      image: "/banner.png",
      sections: ["art"],
      tags: ["visual dev"],
      link: "/projects/fmn",
      descriptor: "A dungeon-crawler rpg game where a girl in a post-apocalyptic dream world searches for her missing sister.",
      stickerDeco: '⋆˚🐾｡ DREAM SCAPES',
      locked: false,
    },

    {
      title: "Haunt My Heart",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev", "visual dev"],
      link: "/projects/hmh",
      descriptor: "Play (and fall in love) as an “exorcist” who handles malicious spirits in a world where ghosts and humans coexist.",
      stickerDeco: '⋆˚🐾｡ GHOSTLY LOVE',
      locked: false,
    },

    {
      title: "Javapaws",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev", "visual dev"],
      link: "/projects/javapaws",
      descriptor: "A cozy cafe management and character interaction game.",
      stickerDeco: '⋆˚🐾｡ BUNNY BOBA',
      locked: false,

    },

    {
      title: "mariposa",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["software dev"],
      link: "/projects/mariposa",
      descriptor: "An interactive music transposer and scale visualization utility.",
      stickerDeco: '⋆˚🐾｡ FLOWERY TUNES',
      locked: false,
    },

    {
      title: "Minimax",
      image: "/banner.png",
      sections: ["dev"],
      tags: ["game dev"],
      link: "/projects/minimax",
      descriptor: "A repertoire of playful mini-games built for quick rounds.",
      stickerDeco: '⋆˚🐾｡ MINI GAMES GALORE',
      locked: false,
    },

    {
      title: "Perle",
      image: "/banner.png",
      sections: ["design"],
      tags: ["brand design"],
      link: "/projects/perle",
      descriptor: "Brand identity and packaging design for an artsy nail sticker company.",
      stickerDeco: '⋆˚🐾｡ DECO NAILS',
      locked: true,
    },


    {
      title: "Pippokey",
      image: "/banner.png",
      sections: ["art"],
      tags: ["animation", "visual dev"],
      link: "/projects/pippokey",
      descriptor: "Cutesy duck and friends have to work for the rest of their lives!!",
      stickerDeco: '⋆˚🐾｡ STUPID DUCK',
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
      stickerDeco: '⋆˚🐾｡ ACCIDENTAL PACTS',
      locked: true,
    },

    {
      title: "Twee Bakehouse",
      image: "/banner.png",
      sections: ["design"],
      tags: ["brand design"],
      link: "/projects/twee-bakehouse",
      descriptor: "Playful artisan brand identity and menu system for a boutique home bakery.",
      stickerDeco: '⋆˚🐾｡ HOMEMADE SWEETS',
      locked: false,
    },

  ]

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
        className="featured-section py-24 font-space min-h-full w-full text-(--blackbean)"
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-dot text-xs tracking-[0.2em] uppercase text-(--cornell) mb-2">
              archive · 2024–2026
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-redact text-(--blackbean) leading-none">
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
              <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-(--blackbean)/25 bg-white/50">
                <p className="font-dot text-lg text-(--blackbean)">
                  No projects in this category yet.
                </p>

              </div>
            )}
          </div>
        </div>
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
