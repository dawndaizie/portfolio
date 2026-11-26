'use client'

import Image from 'next/image';
import { useState } from 'react';

const games = [
    'Stardew Valley',
    'Breath of the Wild',
    'Wuthering Waves',
];

const artists = [
    'BTS',
    'Sadder Days',
    'Bad Omens',
    'EVAN',
];

const books = [
    "Heaven Official’s Blessing",
    'Iron Widow',
    'Apothecary Diaries',
];

const disciplines = [
    'game development',
    'animation',
    'visual development',
    'UI/UX',
    'branding',
];

const personalPhotos = [
    {
        src: '/aboutSection/winter.jpg',
        alt: 'chiikawa',
        caption: 'ya ha ha!',
    },
    {
        src: '/aboutSection/winter.jpg',
        alt: 'chiikawa',
        caption: 'ya ha ha!',
    },
    {
        src: '/aboutSection/winter.jpg',
        alt: 'chiikawa',
        caption: 'ya ha ha!',
    },
];

export default function About() {
    const [photoIndex, setPhotoIndex] = useState(0);

    const currentPhoto = personalPhotos[photoIndex];

    const previousPhoto = () => {
        setPhotoIndex(
            (current) =>
                (current - 1 + personalPhotos.length) %
                personalPhotos.length
        );
    };

    const nextPhoto = () => {
        setPhotoIndex(
            (current) => (current + 1) % personalPhotos.length
        );
    };

    return (
        <main className="py-40 min-h-screen min-w-full justify-center max-w-6xl px-5 pb-24 pt-28 font-space text-(--blackbean)">


            <header className="mb-8 max-w-2xl sm:mb-10">
                <p className="mb-3 font-dot text-xs uppercase tracking-[0.2em] text-(--wisteria)">
                    am i... an open book???
                </p>

                <h1 className="text-4xl leading-tight sm:text-5xl font-redact ">
                    hey there!
                </h1>

                <p className="mt-4 text-sm leading-7">
                    artist heart, engineer brain, same ol' me.
                </p>
            </header>

            <div className="flex-row items-center">

                <section
                    id="aboutme"
                    aria-labelledby="bio-heading"
                    className="relative overflow-hidden rounded-xl border border-(--blackbean)/20 bg-(--ivory) shadow-[5px_6px_0_rgba(53,23,16,0.10)]"
                >

                    <div className="flex items-center justify-between gap-4 border-b border-(--blackbean)/15 px-6 py-4 font-dot text-[10px] uppercase tracking-[0.15em] sm:px-8">
                        <span>personal field notes</span>
                        <span>01 / about</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left page */}
                        <div className="relative flex min-w-0 flex-col items-center border-b border-(--blackbean)/15 px-6 py-8 text-center sm:px-8 lg:border-r lg:border-b-0 lg:py-10">
                            <div className="relative w-40 -rotate-3 border border-(--blackbean)/15 bg-white p-2 pb-6 shadow-sm transition-transform duration-200 hover:-rotate-6 motion-reduce:transition-none sm:w-48">
                                <div
                                    aria-hidden="true"
                                    className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-6 bg-(--tea)/70"
                                />

                                <Image
                                    src="/aboutSection/me.jpg"
                                    alt="Portrait of Dawniqueca"
                                    width={400}
                                    height={400}
                                    sizes="(min-width: 640px) 176px, 144px"
                                    className="aspect-square w-full object-cover"
                                />

                                <p className="absolute right-0 bottom-1 left-0 font-dot text-[9px]">
                                    :P
                                </p>
                            </div>

                            <p className="mt-7 font-dot text-[10px] uppercase tracking-[0.12em] text-(--wisteria)">
                                this notebook belongs to
                            </p>

                            <h2 className="mt-2 text-2xl sm:text-3xl">
                                Dawniqueca
                            </h2>

                            <div className="mt-6 w-full max-w-sm">
                                <h3 className="font-dot text-[10px] uppercase tracking-[0.12em]">
                                    things i like making
                                </h3>

                                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                                    {disciplines.map((discipline) => (
                                        <li
                                            key={discipline}
                                            className="rounded-sm border border-(--blackbean)/20 px-2.5 py-1.5 text-[11px] leading-5"
                                        >
                                            {discipline}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-7 flex w-full flex-col items-center gap-3 border-t border-dashed border-(--blackbean)/20 pt-5">
                                <a
                                    href="mailto:dawniqsteele@gmail.com"
                                    className="break-all text-xs text-(--wisteria) underline decoration-dashed underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                                >
                                    dawniqsteele@gmail.com
                                </a>

                                <a
                                    href="/#featured"
                                    className="font-dot text-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                                >
                                    explore my projects →
                                </a>
                            </div>
                        </div>

                        {/* Right page */}
                        <div className="flex min-w-0 flex-col px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                            <p className="mb-4 font-dot text-[10px] uppercase tracking-[0.15em] text-(--blackbean)/60">
                                a short introduction
                            </p>

                            <h2
                                id="bio-heading"
                                className="mb-5 font-dot text-3xl text-(--wisteria)"
                            >
                                hi again!
                            </h2>

                            <div className="max-w-prose space-y-5 text-sm leading-7">
                                <p>
                                    I'm Dawniqueca, a multidisciplinary designer
                                    who likes bringing art and technology into the
                                    same conversation.
                                </p>

                                <p>
                                    I studied Software Engineering for my
                                    bachelor's degree and Digital Animation for
                                    my master's at Kennesaw State University.
                                    My work lives somewhere between those two worlds:
                                    making things that look expressive and feel good
                                    to use.
                                </p>

                                <p>
                                    Whether I'm developing a game, animating a
                                    character, or designing an interface, I care about
                                    creating experiences with personality.
                                </p>
                            </div>

                            <div className="mt-8 border-t border-dashed border-(--blackbean)/20 pt-5">
                                <p className="text-xs leading-6">
                                    Have something in mind? Let's make it.
                                </p>
                            </div>

                            <p className="mt-auto pt-8 text-right font-dot text-[10px] leading-5 text-(--blackbean)/60">
                                a work in progress, just like me :P
                            </p>
                        </div>
                    </div>
                </section>
                {/*
                <section
                    id="inventory"
                    aria-labelledby="inventory-heading"
                    className="mt-14 w-full sm:mt-16"
                >
                    <header className="mx-auto mb-9 w-full max-w-4xl">
                        <div className="flex items-center justify-between gap-3">
                            <h2
                                id="inventory-heading"
                                className="font-dot text-xl"
                            >
                                my inventory
                            </h2>

                            <span className="font-dot text-[10px] tracking-wider">
                                03 items
                            </span>
                        </div>

                        <p className="mt-3 max-w-lg text-xs leading-6">
                            A few things I'd probably have in my bag.
                          
                        </p>
                    </header>

                    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center justify-items-center gap-x-10 gap-y-12 px-2 py-3 md:grid-cols-2 sm:px-4">

                        <article

                            className="relative mx-auto w-full max-w-sm rounded-[1.75rem] border-2 border-(--blackbean)/65 bg-(--tea) p-4 shadow-[3px_5px_0_rgba(53,23,16,0.15)] sm:-rotate-2"
                        >
                            <div className="mb-3 flex items-center justify-between px-2 font-dot text-[9px] uppercase tracking-[0.12em]">
                                <h3 id="games-heading">01 / game console</h3>

                                <span className="flex items-center gap-1.5">
                                    <span
                                        aria-hidden="true"
                                        className="h-1.5 w-1.5 rounded-full bg-(--wisteria)"
                                    />
                                    on
                                </span>
                            </div>

                            <div className="rounded-xl border-2 border-(--blackbean)/60 bg-(--blackbean) p-3">
                                <div className="rounded-sm bg-(--ivory) px-4 py-4">
                                    <p className="mb-3 font-dot text-[10px] uppercase tracking-widest text-(--wisteria)">
                                        favorite save files
                                    </p>

                                    <ul className="space-y-2.5">
                                        {games.map((game, index) => (
                                            <li
                                                key={game}
                                                className="flex gap-3 text-xs leading-5"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="font-dot text-(--wisteria)"
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>

                                                <span>{game}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className="mt-4 flex items-center justify-between px-4"
                            >
                                <div className="relative h-10 w-10">
                                    <div className="absolute top-0 left-3.5 h-10 w-3 rounded-sm bg-(--blackbean)/80" />
                                    <div className="absolute top-3.5 left-0 h-3 w-10 rounded-sm bg-(--blackbean)/80" />
                                </div>

                                <span className="font-dot text-[8px] tracking-[0.15em]">
                                    just one more quest
                                </span>

                                <div className="flex -rotate-25 gap-2">
                                    <span className="h-5 w-5 rounded-full bg-(--wisteria)" />
                                    <span className="h-5 w-5 rounded-full bg-(--wisteria)" />
                                </div>
                            </div>

                            <p className="mt-3 text-center text-[10px] leading-5">
                                Wuthering Waves: yes, I am a sweat.
                            </p>
                        </article>


                        <article
                            className="mx-auto w-full max-w-[19rem] rounded-[1.75rem] border border-(--blackbean)/35 bg-(--ivory) p-5 shadow-[3px_5px_0_rgba(53,23,16,0.12)] sm:rotate-3"
                        >
                            <h3
                                className="mb-3 text-center font-dot text-[10px] uppercase tracking-[0.15em]"
                            >
                                02 / mp3 player
                            </h3>

                            <div className="rounded-md border-2 border-(--blackbean)/70 bg-(--tea)/40 p-4">
                                <p className="mb-3 font-dot text-[10px] uppercase tracking-wider text-(--wisteria)">
                                    on repeat
                                </p>

                                <ol className="space-y-2 text-xs">
                                    {artists.map((artist, index) => (
                                        <li
                                            key={artist}
                                            className="flex justify-between gap-3 border-b border-(--blackbean)/15 pb-2"
                                        >
                                            <span>{artist}</span>

                                            <span className="font-dot text-[10px] text-(--blackbean)/60">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </li>
                                    ))}
                                </ol>

                                <p className="mt-3 font-dot text-[9px] tracking-wider">
                                    repeat: all
                                </p>
                            </div>


                            <div
                                aria-hidden="true"
                                className="relative mx-auto mt-5 flex h-25 w-25 items-center justify-center rounded-full border border-(--blackbean)/20 bg-white/50"
                            >
                                <span className="absolute top-3 font-dot text-[8px]">
                                    MENU
                                </span>

                                <span className="absolute left-2.5 text-xs">
                                    ‹
                                </span>

                                <div className="h-9 w-9 rounded-full border border-(--blackbean)/20 bg-(--ivory)" />

                                <span className="absolute right-2.5 text-xs">
                                    ›
                                </span>

                                <span className="absolute bottom-2.5 text-[9px]">
                                    ▷
                                </span>
                            </div>
                        </article>


                        <article
                            className="relative mx-auto w-full max-w-sm rounded-md border border-(--blackbean)/35 bg-(--ivory) p-5 shadow-[3px_4px_0_rgba(53,23,16,0.12)] sm:-rotate-2"
                        >
                            <div className="flex items-start justify-between gap-3 border-b-2 border-(--wisteria)/65 pb-3">
                                <div>
                                    <p className="font-dot text-[9px] uppercase tracking-[0.15em]">
                                        personal collection
                                    </p>

                                    <h3
                                        id="books-heading"
                                        className="mt-1 font-dot text-xl text-(--wisteria)"
                                    >
                                        library card
                                    </h3>
                                </div>

                                <span className="border border-(--wisteria)/55 px-2 py-1 font-dot text-[9px] text-(--wisteria)">
                                    NO. 003
                                </span>
                            </div>

                            <p className="mt-4 border-b border-(--blackbean)/25 pb-2 text-[11px]">
                                issued to: Dawniqueca
                            </p>

                            <p className="mt-4 font-dot text-[9px] uppercase tracking-[0.12em]">
                                books i keep close
                            </p>

                            <ul className="mt-2">
                                {books.map((book, index) => (
                                    <li
                                        key={book}
                                        className="flex gap-3 border-b border-(--blackbean)/20 py-2.5 text-xs leading-5"
                                    >
                                        <span className="font-dot text-[10px] text-(--wisteria)">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span>{book}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-4 text-right font-dot text-[9px] tracking-wider text-(--wisteria)">
                                no due dates
                            </p>
                        </article>

                        <article
                            aria-labelledby="digicam-heading"
                            className="relative mx-auto w-full max-w-sm rounded-[1.75rem] border-2 border-(--blackbean)/55 bg-[#d9d5ce] p-4 shadow-[4px_6px_0_rgba(53,23,16,0.15)] sm:rotate-2"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute -top-2 right-10 h-2 w-12 rounded-t-md border border-(--blackbean)/40 bg-[#aaa59c]"
                            />

                            <div className="mb-4 flex items-center justify-between gap-3 px-1">
                                <h3
                                    id="digicam-heading"
                                    className="font-dot text-[10px] uppercase tracking-[0.12em]"
                                >
                                    04 / digicam
                                </h3>

                                <span className="flex items-center gap-2 font-dot text-[9px] uppercase tracking-wider">
                                    <span
                                        aria-hidden="true"
                                        className="h-1.5 w-1.5 rounded-full bg-(--wisteria)"
                                    />
                                    playback
                                </span>
                            </div>

                            <div className="flex items-stretch gap-3">
                                <figure
                                    id="digicam-photo"
                                    className="min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-(--blackbean)/75 bg-(--blackbean) p-2"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#242824]">
                                        <Image
                                            src={currentPhoto.src}
                                            alt={currentPhoto.alt}
                                            fill
                                            sizes="(min-width: 768px) 260px, 75vw"
                                            className="object-contain"
                                        />

                                     
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/65 to-transparent px-2 py-2 font-dot text-[9px] text-white"
                                        >
                                            <span>PLAY ▷</span>

                                            <span>
                                                {String(photoIndex + 1).padStart(2, '0')}
                                                {' / '}
                                                {String(personalPhotos.length).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    <figcaption className="min-h-12 px-1 pt-2 text-center font-dot text-[10px] leading-5 text-(--ivory)">
                                        {currentPhoto.caption}
                                    </figcaption>
                                </figure>

                               
                                <div className="flex w-12 shrink-0 flex-col items-center justify-between py-2">
                                    
                                    <div
                                        aria-hidden="true"
                                        className="flex flex-col gap-1"
                                    >
                                        <span className="h-0.5 w-6 rounded-full bg-(--blackbean)/35" />
                                        <span className="h-0.5 w-6 rounded-full bg-(--blackbean)/35" />
                                        <span className="h-0.5 w-6 rounded-full bg-(--blackbean)/35" />
                                    </div>

                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={previousPhoto}
                                            aria-label="Show previous personal photo"
                                            aria-controls="digicam-photo"
                                            disabled={personalPhotos.length < 2}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-(--blackbean)/40 bg-(--ivory)/75 text-xl shadow-[0_2px_0_rgba(53,23,16,0.2)] transition-colors hover:bg-(--ivory) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--wisteria) active:bg-(--tea) disabled:cursor-default disabled:opacity-40"
                                        >
                                            <span aria-hidden="true">‹</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={nextPhoto}
                                            aria-label="Show next personal photo"
                                            aria-controls="digicam-photo"
                                            disabled={personalPhotos.length < 2}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-(--blackbean)/40 bg-(--ivory)/75 text-xl shadow-[0_2px_0_rgba(53,23,16,0.2)] transition-colors hover:bg-(--ivory) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--wisteria) active:bg-(--tea) disabled:cursor-default disabled:opacity-40"
                                        >
                                            <span aria-hidden="true">›</span>
                                        </button>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="font-dot text-[8px] uppercase tracking-wider"
                                    >
                                        DISP
                                    </span>
                                </div>
                            </div>

                       
                            <div className="mt-4 flex items-center justify-between gap-3 px-1">
                                <p className="font-dot text-[9px] tracking-wider">
                                    little life archives
                                </p>

                                <span
                                    aria-hidden="true"
                                    className="-rotate-6 rounded-sm border border-(--wisteria)/35 bg-(--ivory) px-2 py-1 font-dot text-[9px] text-(--wisteria)"
                                >
                                    keep this one.
                                </span>
                            </div>

                            
                            <p
                                className="sr-only"
                                role="status"
                                aria-atomic="true"
                            >
                                Photo {photoIndex + 1} of {personalPhotos.length}.
                                {' '}
                                {currentPhoto.alt}.
                                {' '}
                                {currentPhoto.caption}
                            </p>
                        </article>
                    </div>
                </section>
            */}
            </div>

        </main>
    );
}