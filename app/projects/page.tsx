'use client'

import { useState } from "react";
import FilterBar from "../../components/filters";
import Link from "next/link";
import Image from "next/image"
import ProjectCard, { ToploaderProject } from "../../components/projectCard";

export default function Projects() {

    const [active, setActive] = useState("all")

    const tags = ["all", "animation", "brand design", "game dev", "software dev", "ui/ux design", "visual dev"];

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

    const filtered =
        active === "all"
            ? projects
            : projects.filter((p) => p.tags.includes(active))


    return (
        <main className="py-40 font-space min-h-full w-full text-(--blackbean)">
            <div className="mx-auto max-w-8xl px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-14">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-redact text-(--blackbean) leading-none">
                        Project Archive
                    </h1>
                    <p className="font-dot text-xs tracking-[0.15em] uppercase text-(--cornell) mb-2 mt-5">
                       Woah. How did you find this page?? While you're here, filter out the projects to your most nich-iest niche. I guess.
                    </p>

                </div>
                <div className="mb-12">
                    <FilterBar
                        tags={tags}
                        active={active}
                        setActive={setActive}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16 mt-30">
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