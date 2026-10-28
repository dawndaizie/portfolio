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

export default function Home() {

  const router = useRouter();
  const tags = ["favorites", "dev", "design", "art"];
  const projects: ToploaderProject[] = [
    {
      title: "CocoCoins",
      descriptor: "beach themed budget and finance tracker using MERN stack.",
      image: "/banner.png",
      tags: ["favorites", "dev"],
      link: "/projects/cococoins",
      stickerDeco: '⋆˚🐾｡ SAND DOLLARS',
      locked: false,
    },
    {
      title: "Bite Me",
      descriptor: "Animation pitch about an out-of-control vampire prince sentenced to military school.",
      image: "/banner.png",
      tags: ["favorites", "art"],
      link: "/projects/bite-me",
      stickerDeco: '⋆˚🩸｡ DELIQUENTS',
      locked: false,
    },
  ]

  const [active, setActive] = useState("favorites");
  const filtered =
    active === "favorites"
      ? projects
      : projects.filter((p) => p.tags.includes(active))

  
  const [isSiteReady, setIsSiteReady] = useState(false);

useEffect(() => {
  const handleReady = () => setIsSiteReady(true);

  if (document.documentElement.dataset.loaderDone === 'true') {
    setIsSiteReady(true);
    return;
  }

  window.addEventListener('portfolio:ready', handleReady);

  return () => {
    window.removeEventListener('portfolio:ready', handleReady);
  };
}, []);

  return (
    <main className="font-space min-h-screen max-w-full flex flex-col items-center justify-center text-(--blackbean)">

      <section id="hero" className="py-10 max-w-full flex flex-col md:flex-row items-center border-b border-(--blackbean)/10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-[520px] flex-col items-center text-center justify-center m-10">
          <h3 className="font-dot text-2xl mt-7 text-left">
            hi, im
          </h3>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-redact m-2"
          >
            dawniqueca steele
          </motion.h1>

          <h3 className="text-lg mt-7 font-dot tracking-[0.15em] text-center"
          >
            <RotateTypewriter
              array={[
                'An Atlanta-based multidisciplinary designer',
                'focusing on storytelling and interaction',
                'animator',
                ' ⋆˚꩜｡"',
                'interaction designer',
              ]}
            />

          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-10 w-full max-w-[640px]"
        >
          <img
            data-hero-image="true"
            className="aspect-auto object-contain m-auto"
            src="/hero-animation.png"
            alt="An animated chibi illustration of Dawniqueca"
            width={800}
            height={800}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

      </section>


      <section
        id="featured"
        className="py-24 font-space min-h-full w-full text-(--blackbean)"
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
