'use client'

import { useState } from "react";
import FilterBar from "../../components/filters";
import Link from "next/link";

export default function Projects() {

    const [active, setActive] = useState("all")

    const tags = ["all", "animation", "brand design", "game dev", "software dev", "ui/ux design", "visual dev"];

    const projects = [
        {
            title: "Bite Me",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/bite-me",
            descriptor:"A selfish vampire prince is banished to a reform school for supernatural delinquents, where he and his misfit friends navigate choatic and dangerous school antics while uncovering a long-hidden conspiracy in the magical world.",
        },

        {
            title: "Blue",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/blue",
            descriptor:"Short animated film about a mermaid attending a night carnival."
        },

        {
            title: "Charm",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/charm",
            descriptor:"Branding for a mature, elegant, yet modern tea company.",
        },

        {
            title: "CocoCoins",
            image: "/banner.png",
            tags: ["ui/ux design", "software dev"],
            link: "/projects/cococoins",
            descriptor:"A fun, beach themed financial tracker.",
        },

        {
            title: "Forget Me Not",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/fmn",
            descriptor:"A dungeon-crawler rpg game where a girl in a post apocalyptic dream world searches for her missing ssiter.",
        },

        { 
            title: "Haunt My Heart",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/hmh",
            descriptor: "Play (and fall in love) as a newly hired “exorcist” who handles malicious spirits in a world where ghosts and humans live together."

        },

        { 
            title: "Javapaws",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/javapaws",
            descriptor: "Cafe game."

        },

        { 
            title: "mariposa",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/mariposa",
            descriptor: "Music transposer"

        },

        { 
            title: "Minimax",
            image: "/banner.png",
            tags: ["game dev"],
            link: "/projects/minimax",
            descriptor: "Mini games galore!"

        },

        {
            title: "Perle",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/perle",
            descriptor:"Brand design for an artsy nail sticker compnay.",
        },


        { 
            title: "Pippoke",
            image: "/banner.png",
            tags: ["ui/ux design", "software dev"],
            link: "/projects/pippoke",
            descriptor: "Reminder app"

        },

        {
            title: "Skin to Skin",
            image: "/banner.png",
            tags: ["ui/ux design"],
            link: "/projects/skin-to-skin",
            descriptor:"here are a bunch of words...",
        },

        {
            title: "Smart Evaluator",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/smart-evaluator",
            descriptor:"here are a bunch of words...",
        },

        {
            title: "This Stupid Fish Ruined My Life",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/tsfrml",
            descriptor:"After the worst 17th birthday, Kaia Aquino vents her frustrations to a random fish off the town pier, only to accidentally strike a deal with a powerful fish demon.",
        },

        {
            title: "Twee Bakery",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/twee-bakery",
            descriptor:"Brand design for home bakery",
        },

    ]

    const filtered =
        active === "all"
            ? projects
            : projects.filter((p) => p.tags.includes(active))


    return (
        <main className="py-20 font-space min-h-full max-w-full">
            <div className="mx-auto max-w-7xl">
                <h1 className="py-10 m-10 mb-5 text-6xl font-kiwi text-center text-(--blackbean)">All Projects</h1>
                <FilterBar
                    tags={tags}
                    active={active}
                    setActive={setActive}
                />

                <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
                    {filtered.length > 0 ? (
                        filtered.map((project) => (
                            <Link href={project.link} key={project.title} className="projectCard overflow-hidden p-6 text-left transition hover:scale-105">


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

                            </Link>
                        ))
                    ) : (
                        <p className="md:col-span-2"> No projects in this category yet.</p>
                    )}
                </div>
            </div>
        </main>

    )
}