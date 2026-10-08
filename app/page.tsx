'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FilterBar from "../components/filters";


export default function Home() {

  const tags = ["favorites", "dev", "design", "art"];
  const projects = [
    {
      title: "CocoCoins",
      descriptor: "beach themed financial tracker.",
      image: "/banner.png",
      tags: ["favorites", "dev"],
      link: "/projects/cococoins",
    },
    {
      title: "Bite Me",
      descriptor: "beach themed financial tracker.",
      image: "/banner.png",
      tags: ["favorites", "art"],
      link: "/projects/bite-me",
    },
  ]

  const [active, setActive] = useState("favorites");
  const filtered =
    active === "favorites"
      ? projects
      : projects.filter((p) => p.tags.includes(active))

  return (
    <main className="font-space min-h-screen max-w-full flex flex-col items-center justify-center text-(--blackbean)">

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


      <section id="featured" className="py-30 font-space min-h-full w-full text-(--blackbean)">

        <div className="mx-auto px-4 ">
                <div className="text-center mb-8 sm:mb-14">
                    <p className="font-dot text-xs tracking-[0.15em] uppercase text-(--cornell) mb-2">
                        some of my favs! · 2024–2026
                    </p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-kiwi text-(--blackbean) leading-none">
                        featured projects
                    </h1>
                    
                </div>
                <div className="mb-12">
                    <FilterBar
                        tags={tags}
                        active={active}
                        setActive={setActive}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-7">
                    {filtered.length > 0 ? (
                        filtered.map((project) =>
                            <Link
                                key={project.title}
                                href={project.link}
                                className="projectCard group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-(--blackbean)/15 bg-(--ivory)/90 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-(--blackbean) hover:bg-(--ivory) hover:shadow-[0_16px_36px_rgba(53,23,16,0.14)]"
                            >
                                <div className="">

                                    <div className="relative aspect-[16/9] w-full rounded-xl border border-(--blackbean)/10 bg-white/60 p-2 shadow-inner">
                                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-(--blackbean)/5">

                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover " />
                                        </div>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex px-3 py-1 pb-2 pt-2 border border-dashed border-1 rounded-lg text-xs font-dot uppercase tracking-[0.15em] bg-(--cornell) text-(--ivory)"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="mt-3 font-space text-2xl font-bold tracking-tight text-(--blackbean) group-hover:text-(--cornell) transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm font-dot tracking-wide leading-relaxed text-(--blackbean)/80 line-clamp-3">
                                        {project.descriptor}
                                    </p>
                                </div>
                                <div className="mt-5 flex items-center justify-between border-t border-(--blackbean)/10 pt-3 text-xs font-medium text-(--blackbean)/70">
                                    <span className="font-dot tracking-widest uppercase text-[11px]">View Project</span>
                                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-(--blackbean) shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-(--blackbean) group-hover:text-(--ivory)">
                                        ↗
                                    </span>
                                </div>

                            </Link>

                        )
                    ) : (
                        <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-(--blackbean)/25 bg-white/50">
                            <p className="md:col-span-2"> No projects in this category yet.</p>
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



