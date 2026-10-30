'use client'

import { useState } from 'react';
import Image from 'next/image';
import GalleryModal, { type Artwork, } from '../../components/galleryModal';
import FilterBar from '../../components/filters';


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

    const selectedWork =
        selectedIndex !== null
            ? filtered[selectedIndex]
            : undefined;

    const closeModal = () => {
        setSelectedIndex(null);
    };

    const showNext = () => {
        if (filtered.length < 2) return;

        setSelectedIndex((index) => {
            if (index === null) return null;

            return (index + 1) % filtered.length;
        });
    };

    const showPrevious = () => {
        if (filtered.length < 2) return;

        setSelectedIndex((index) => {
            if (index === null) return null;

            return (
                (index - 1 + filtered.length) %
                filtered.length
            );
        });
    };

    const changeFilter = (tag: string) => {
        setActive(tag);
        setSelectedIndex(null);
    };

    const artworkCount = filtered.length;

    return (
        <main className="artPage font-space py-40">
            <div className="artPage__container">
                <header className="artPage__header ">

                    <h1 className="artPage__title font-redact text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
                        art archive
                    </h1>

                    <p className="artPage__intro">
                        a collection of my drawings, studies, and animation
                    </p>
                </header>

                <section
                    className="artPage__collection"
                    aria-label="Browse artwork"
                >
                    <div className="artPage__filters">
                        <FilterBar
                            tags={tags}
                            active={active}
                            setActive={changeFilter}
                        />
                    </div>

                    <div className="artPage__collectionHeader">
                        <h2 className="artPage__collectionTitle font-dot">
                            {active === 'all' ? 'All artwork' : active}
                        </h2>

                        <p
                            className="artPage__count font-dot"
                            role="status"
                            aria-atomic="true"
                        >
                            {artworkCount}{' '}
                            {artworkCount === 1 ? 'piece' : 'pieces'}
                        </p>
                    </div>

                    {artworkCount > 0 ? (
                        <ul className="artPage__grid">
                            {filtered.map((work, index) => (
                                <li
                                    key={work.image}
                                    className="artPage__item"
                                >
                                    <button
                                        type="button"
                                        className="artCard"
                                        onClick={() => setSelectedIndex(index)}
                                        aria-label={`View ${work.name}`}
                                        aria-haspopup="dialog"
                                    >
                                        <span className="artCard__preview">
                                            <Image
                                                src={work.image}
                                                alt=""
                                                fill
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, (max-width: 1500px) 28vw, 420px"
                                                className="artCard__image"
                                            />
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="artPage__empty">
                            <span
                                className="artPage__emptyMark font-dot"
                                aria-hidden="true"
                            >
                                ⋆.𐙚 ̊
                            </span>

                            <h3 className="font-redact">
                                there's... nothing here??
                            </h3>

                            <p>
                                There are no artworks in this category yet.
                            </p>

                            <button
                                type="button"
                                onClick={() => changeFilter('all')}
                                className="mt-5 rounded-lg px-10 py-2 font-dot tracking-[0.15em]  transition font-dot bg-(--ivory) hover:bg-(--cornell)/75 text-(--blackbean) hover:scale-105"
                            >
                                Back to all artwork →
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {selectedIndex !== null && selectedWork && (
                <GalleryModal
                    work={selectedWork}
                    currentIndex={selectedIndex}
                    totalImages={filtered.length}
                    onClose={closeModal}
                    onPrevious={showPrevious}
                    onNext={showNext}
                />
            )}
        </main>
    );
}