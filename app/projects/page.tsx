'use client'

import { useState } from "react";
import FilterBar from "../../components/filters";
import Link from "next/link";
import Image from "next/image"

export default function Projects() {

    const [active, setActive] = useState("all")

    const tags = ["all", "animation", "brand design", "game dev", "software dev", "ui/ux design", "visual dev"];

    const projects = [
        {
            title: "Bite Me",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/bite-me",
            descriptor: "A selfish vampire prince is banished to a reform school for supernatural delinquents, where he and his misfit friends navigate choatic and dangerous school antics while uncovering a long-hidden conspiracy in the magical world.",

        },

        {
            title: "Blue",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/blue",
            descriptor: "Short animated film about a mermaid attending a night carnival.",

        },

        {
            title: "Charm",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/charm",
            descriptor: "Branding for a mature, elegant, yet modern tea company.",

        },

        {
            title: "CocoCoins",
            image: "/banner.png",
            tags: ["ui/ux design", "software dev"],
            link: "/projects/cococoins",
            descriptor: "A fun, beach themed financial tracker web application.",

        },

        {
            title: "Forget Me Not",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/fmn",
            descriptor: "A dungeon-crawler rpg game where a girl in a post apocalyptic dream world searches for her missing ssiter.",

        },

        {
            title: "Haunt My Heart",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/hmh",
            descriptor: "Play (and fall in love) as a newly hired “exorcist” who handles malicious spirits in a world where ghosts and humans coexist.",

        },

        {
            title: "Javapaws",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/javapaws",
            descriptor: "A cozy cafe management and character interaction game.",


        },

        {
            title: "mariposa",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/mariposa",
            descriptor: "An interactive music transposer and scale visualization utility.",

        },

        {
            title: "Minimax",
            image: "/banner.png",
            tags: ["game dev"],
            link: "/projects/minimax",
            descriptor: "A collection of playful retro mini-games built for quick rounds.",


        },

        {
            title: "Perle",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/perle",
            descriptor: "Brand identity and packaging design for an artsy nail sticker compnay.",

        },


        {
            title: "Pippoke",
            image: "/banner.png",
            tags: ["ui/ux design", "software dev"],
            link: "/projects/pippoke",
            descriptor: "Reminder app",


        },

        {
            title: "Skin to Skin",
            image: "/banner.png",
            tags: ["ui/ux design"],
            link: "/projects/skin-to-skin",
            descriptor: "Mobile UX case study focused on mindful self-care routines.",

        },

        {
            title: "Smart Evaluator",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/smart-evaluator",
            descriptor: "here are a bunch of words...",

        },

        {
            title: "This Stupid Fish Ruined My Life",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/tsfrml",
            descriptor: "After the worst 17th birthday, Kaia vents her frustrations to a random fish off the pier—only to strike a deal with a fish demon.",

        },

        {
            title: "Twee Bakery",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/twee-bakery",
            descriptor: "Playful artisan brand identity and menu system for a boutique home bakery.",

        },

    ]

    const filtered =
        active === "all"
            ? projects
            : projects.filter((p) => p.tags.includes(active))


    return (
        <main className="py-30 font-space min-h-full w-full text-(--blackbean)">
            <div className="mx-auto px-4 ">
                <div className="text-center mb-8 sm:mb-14">
                    <p className="font-dot text-xs tracking-[0.15em] uppercase text-(--cornell) mb-2">
                        Selected Works · 2024–2026
                    </p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-kiwi text-(--blackbean) leading-none">
                        All Projects
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
                                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
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
        </main>

    )
}