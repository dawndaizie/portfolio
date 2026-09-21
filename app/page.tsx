'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const tabs = ["favorites", "dev", "design", "art"];
const projects = [
  {
    id: 1,
    title: "CocoCoins",
    description: "beach themed financial tracker.",
    image: "/banner.png",
    categories: ["favorites", "dev"],
    link: "/projects/cococoins",
  },
]

export default function Home() {

  const [activeTab, setActiveTab] = useState("favorites");
  const visibleProjects = projects.filter((project) => project.categories.includes(activeTab));

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
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-10 py-2 font-dot tracking-[0.15em]  transition ${
                isActive
                  ? "bg-(--cornell) border-dashed border-2 text-(--ivory)"
                  : "bg-(--ivory) hover:bg-(--cornell)/75 text-(--blackbean) hover:scale-105 hover:border-dashed hover:border-2 hover:border-(--cornell)"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2"
      >
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
            <div key={project.id} className="projectCard overflow-hidden p-6 text-left transition hover:scale-105">
              <h3 className="mb-3 text-xl font-bold">{project.title}</h3>

              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="h-56 w-full rounded-lg object-cover"
              />

              <div className="mt-2 flex flex-wrap gap-2">
                                {project.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-block px-3 py-1 border border-(--blackbean) rounded-full text-xs font-dot tracking-[0.15em] bg-(--cornell) text-(--ivory)"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>

              <p className="mt-4">{project.description}</p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block underline underline-offset-4"
                >
                  View project →
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="md:col-span-2 font-dot tracking-[0.15em]"> No projects in this category yet.</p>
        )}
      </div>
      </section>


      <section id="demo-reel" className="">

      </section>

    </main>


  );
}


// interchanging projects -> gallery like, or carousel.. rough
