'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterBar from "../../components/filters";

export default function Projects() {

    const [active, setActive] = useState("all")

    const tags = ["all", "animation", "brand design", "product design", "software dev", "visual dev"];

    const projects = [
        {
            title: "Bite Me",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/bite-me"
        },

        {
            title: "Charm",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/charm"
        },

        {
            title: "CocoCoins",
            image: "/banner.png",
            tags: ["product design", "software dev"],
            link: "/projects/cococoins"
        },

        {
            title: "Forget Me Not",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/fmn"
        },

        {
            title: "Perle",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/perle"
        },

        {
            title: "Skin to Skin",
            image: "/banner.png",
            tags: ["product design"],
            link: "/projects/skin-to-skin"
        },

        {
            title: "Smart Evaluator",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/smart-evaluator"
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
                            <div key={project.title} className="projectCard overflow-hidden p-6 text-left transition hover:scale-105">


                                <img src={project.image} alt={project.title} className="rounded" />


                                <h3 className="mt-2 font-space text-lg"> {project.title} </h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block px-3 py-1 border border-(--blackbean) rounded-full text-xs font-dot tracking-[0.15em] bg-(--cornell) text-(--ivory)"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
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
            </div>
        </main>

    )
}