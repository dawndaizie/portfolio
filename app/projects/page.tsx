'use client'

import { useState } from "react";
import FilterBar from "../../components/filters";
import Link from "next/link";
import Image from "next/image"
import ProjectCard, { ToploaderProject } from "../../components/projectCard";

export default function Projects() {

    const [active, setActive] = useState("all")

    const tags = ["all", "animation", "brand design", "game dev", "software dev", "ui/ux design", "visual dev"];

    // ADJUST PROJECT STICKERS!!!!
    const projects: ToploaderProject[] = [
        {
            title: "Bite Me",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/bite-me",
            descriptor: "Visual development project for a animated show about an out-of-control teenage vampire prince sentenced to military school.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',

        },

        {
            title: "Blue",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/blue",
            descriptor: "Short animated film about a mermaid attending a night carnival.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Charm",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/charm",
            descriptor: "Branding for a mature, elegant, yet modern tea company.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "CocoCoins",
            image: "/banner.png",
            tags: ["ui/ux design", "software dev"],
            link: "/projects/cococoins",
            descriptor: "A fun, beach themed financial tracker web application.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Forget Me Not",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/fmn",
            descriptor: "A dungeon-crawler rpg game where a girl in a post apocalyptic dream world searches for her missing ssiter.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Haunt My Heart",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/hmh",
            descriptor: "Play (and fall in love) as a newly hired “exorcist” who handles malicious spirits in a world where ghosts and humans coexist.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Javapaws",
            image: "/banner.png",
            tags: ["game dev", "visual dev"],
            link: "/projects/javapaws",
            descriptor: "A cozy cafe management and character interaction game.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',

        },

        {
            title: "mariposa",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/mariposa",
            descriptor: "An interactive music transposer and scale visualization utility.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Minimax",
            image: "/banner.png",
            tags: ["game dev"],
            link: "/projects/minimax",
            descriptor: "A collection of playful mini-games built for quick rounds.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',

        },

        {
            title: "Perle",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/perle",
            descriptor: "Brand identity and packaging design for an artsy nail sticker compnay.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },


        {
            title: "Pippokey",
            image: "/banner.png",
            tags: ["animation", "visual dev"],
            link: "/projects/pippokey",
            descriptor: "cutesy duck faces life!",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',

        },

        {
            title: "Skin to Skin",
            image: "/banner.png",
            tags: ["ui/ux design"],
            link: "/projects/skin-to-skin",
            descriptor: "Mobile UX case study focused on mindful self-care routines.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Smart Evaluator",
            image: "/banner.png",
            tags: ["software dev"],
            link: "/projects/smart-evaluator",
            descriptor: "here are a bunch of words...",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "This Stupid Fish Ruined My Life",
            image: "/banner.png",
            tags: ["visual dev"],
            link: "/projects/tsfrml",
            descriptor: "After the worst 17th birthday, Kaia vents her frustrations to a random fish off the pier—only to strike a deal with a fish demon.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
        },

        {
            title: "Twee Bakehouse",
            image: "/banner.png",
            tags: ["brand design"],
            link: "/projects/twee-bakehouse",
            descriptor: "Playful artisan brand identity and menu system for a boutique home bakery.",
            cardNo: 'NO. 008 // HOLO',
            rarity: 'SECRET RARE ★★★',
            hp: 'HP 120',
            typeBadge: 'DEV',
            stickerDeco: '⋆˚🐾｡ BEACH EDITION',
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
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-redact text-(--blackbean) leading-none">
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
        </main>

    )
}