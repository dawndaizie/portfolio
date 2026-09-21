'use client'

import { useState } from 'react';
import GalleryModal from "../../components/galleryModal";
import FilterBar from '../../components/filters';

type Artwork = {
    name: string;
    image: string;
    descriptor: string;
    tags: string[];
};

export default function Art() {

    const [active, setActive] = useState("all")
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const tags = ["all", "studies", "characters", "illustrations", "environments", "3D", "2D animation"];

    const works: Artwork[] = [
        {
            name: "calico",
            image: "/works/calico.png",
            descriptor: "nice place",
            tags: ["illustrations"],
        },

        {
            name: "cecil iteration",
            image: "/works/Cecil Iteration Sequence.png",
            descriptor: "nice place",
            tags: ["illustrations", "characters"],
        },

    ]

    const filtered =
        active === "all"
            ? works
            : works.filter((p) => p.tags.includes(active));


    const closeModal = () => {
        setSelectedIndex(null);
    };

    const showNext = () => {
        setSelectedIndex((currentIndex) => {
            if (currentIndex === null) return 0;

            return (currentIndex + 1) % filtered.length;
        });
    };

    const showPrevious = () => {
        setSelectedIndex((currentIndex) => {
            if (currentIndex === null) return 0;

            return (currentIndex - 1 + filtered.length) % filtered.length;
        });
    };

    const changeFilter = (tag: string) => {
        setActive(tag);
        setSelectedIndex(null);
    };


    return (
        <main className="py-20 font-space min-h-full max-w-full">
            <div className="mx-auto max-w-7xl">
                <h1 className="py-10 m-10 mb-5 text-6xl font-kiwi text-center text-(--blackbean)">Gallery</h1>
                <FilterBar
                    tags={tags}
                    active={active}
                    setActive={changeFilter}
                />

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
                    {filtered.length > 0 ? (
                        filtered.map((work, index) => (
                            <button
                                key={work.name}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                aria-label={`Open ${work.name}`}
                                className="group overflow-hidden rounded-xl text-left focus:outline-none focus:ring-1 focus:ring-(--sky) focus:ring-offset-4"
                            >
                                <img
                                    src={work.image}
                                    alt={work.name}
                                    width={600}
                                    height={400}
                                    className="h-auto w-full rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                            </button>
                        ))) : (
                        <p className="md:col-span-2 text-center font-dot tracking-[0.15em]"> No projects in this category yet.</p>
                    )}
                </div>
            </div>


            {selectedIndex !== null && filtered[selectedIndex] && (
                <GalleryModal
                    work={filtered[selectedIndex]}
                    currentIndex={selectedIndex}
                    totalImages={filtered.length}
                    onClose={closeModal}
                    onPrevious={showPrevious}
                    onNext={showNext}
                />
            )}
        </main>
    )
}