'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FilterBar from "../components/filters";


export default function Home() {

  const tags = ["favorites", "dev", "design", "art"];
  const projects = [
    {
      id: 1,
      title: "CocoCoins",
      descriptor: "beach themed financial tracker.",
      image: "/banner.png",
      tags: ["favorites", "dev"],
      link: "/projects/cococoins",
    },
  ]

  const [active, setActive] = useState("favorites");
  const filtered =
    active === "favorites"
      ? projects
      : projects.filter((p) => p.tags.includes(active))

  return (
    <main className="font-space min-h-screen max-w-full flex flex-col items-center justify-center">

      <section id="hero" className="py-90 h-50 max-w-full flex items-center">
        <div className="flex flex-col items-center justify-center m-10">
          <h3 className="font-dot text-2xl mt-7 text-left ">hi, I'm</h3>
          <h1 className="lg:text-7xl text-4xl font-kiwi m-2">dawniqueca steele</h1>
          <h3 className="text-lg mt-7 font-dot tracking-[0.15em] text-center">An Atlanta-based multidiscplinary designer, focusing on storytelling and interaction ⋆˚꩜｡</h3>
        </div>
        <div className=" justify-center mt-10 w-200">
          <img className="aspect-auto object-contain m-auto" src="/hero-animation.png" />
        </div>

      </section>

      <section id="gallery" className="min-h-120 w-full flex flex-col items-center">

        <div className="carouselContainer">
          <div className="carousel">
            <div className="carouselCard">1</div>
            <div className="carouselCard">2</div>
            <div className="carouselCard">3</div>
            <div className="carouselCard">4</div>
            <div className="carouselCard">5</div>
            <div className="carouselCard">6</div>
          </div>
          <div aria-hidden className="carousel">
            <div className="carouselCard">1</div>
            <div className="carouselCard">2</div>
            <div className="carouselCard">3</div>
            <div className="carouselCard">4</div>
            <div className="carouselCard">5</div>
            <div className="carouselCard">6</div>
          </div>
        </div>
      </section>


      <section id="featured" className="min-h-screen max-w-screen items-center text-center">

        <h1 className="text-3xl"> featured projects</h1>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          role="tablist"
          aria-label="project categories"
        >
          <FilterBar
            tags={tags}
            active={active}
            setActive={setActive}
          />
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <div key={project.title} className="projectCard overflow-hidden p-6 text-left transition hover:scale-105">


                <img src={project.image} alt={project.title} className="rounded" />


                <h3 className="mt-2 font-space text-lg"> {project.title} </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 pb-2 pt-2 border border-dashed border-1 rounded-lg text-xs font-dot tracking-[0.15em] bg-(--cornell) text-(--ivory)"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="m-2 text-slate-700 font-dot tracking-[0.15em]">{project.descriptor}</p>

                <a
                  href={project.link}
                  target="_self"
                  className="mt-4 inline-block underline underline-offset-4"
                >
                  View project →
                </a>


              </div>
            ))
          ) : (
            <p className="md:col-span-2"> No projects in this category yet.</p>
          )}
        </div>
      </section>


      <section id="demo-reel" className="">

      </section>

    </main>


  );
}



