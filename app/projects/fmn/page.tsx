'use client'

import Link from "next/link";
import ProjectNav from "../../../components/projectNav";

const navSections = [
    { id: "overview", label: "Overview" },
    { id: "process", label: "Process" },
    { id: "final", label: "Final" },
    { id: "thoughts", label: "Thoughts" },
];

export default function ForgetMeNot() {
    return (

        <main className="font-space relative flex w-full flex-col items-center">

            <section id="hero" className="mx-auto mt-12 w-full max-w-6xl px-4 pb-12 pt-8 text-(--blackbean) sm:mt-16 sm:px-6 md:pb-16 md:pt-12">
                <div className="flex flex-col md:flex-row gap-12 items-center py-20 md:py-10">

                    <div className="min-w-0 lg:col-span-6">
                        <div className="mb-5 flex flex-wrap gap-2">

                            <span className="inline-flex items-center rounded-md border bg-(--blackbean) px-3 py-1.5 font-dot text-[10px] uppercase tracking-[0.1em] text-(--ivory) sm:text-xs">
                                Visual Development
                            </span>
                        </div>

                        <h1 className="break-words font-redact text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
                            Forget Me Not
                        </h1>

                        <p className="mt-5 max-w-[38ch] font-dot text-base leading-relaxed tracking-[0.06em] sm:text-lg">
                            A dungeon crawler rpg game where a girl in a post apocalyptic dream world seraches for her missing sister.
                        </p>

                        <dl className="mt-7 grid grid-cols-1 gap-5 border-t border-(--blackbean)/15 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                            <div className="min-w-0">
                                <dt className="mb-1.5 font-dot text-[10px] uppercase tracking-[0.15em] text-(--cornell)">
                                    Role
                                </dt>

                                <dd className="m-0 font-space text-xs leading-relaxed sm:text-sm">
                                    Solo Development Artist
                                </dd>
                            </div>

                            <div>
                                <dt className="mb-1.5 font-dot text-[10px] uppercase tracking-[0.15em] text-(--cornell)">
                                    Est.
                                </dt>

                                <dd className="m-0 font-space text-xs leading-relaxed sm:text-sm">
                                    2025
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mx-auto w-full min-w-0 max-w-[32rem] lg:col-span-6 lg:justify-self-end">

                        <div className="aspect-square w-full overflow-hidden rounded-lg ring ring-(--blackbean) duration-400 hover:-rotate-2">
                            <img
                                src="/banner.png"
                                alt="FMN project artwork"
                                width={1000}
                                height={1000}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="block h-full w-full object-contain"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section id="tools" className="w-full max-w-6xl px-4 pb-14 sm:px-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border border-(--blackbean)/15 bg-(--ivory)/60 p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col justify-start">
                        <h3 className="font-dot text-xs font-bold tracking-[0.15em] uppercase text-(--cornell)">
                            Tools
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-(--blackbean)/90">
                            Clip Studio EX
                        </p>
                    </div>


                    <div className="flex flex-col justify-start border-t border-(--blackbean)/10 pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6">
                        <h3 className="font-dot text-xs font-bold tracking-[0.15em] uppercase text-(--cornell)">
                            Deliverables
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-(--blackbean)/90">
                            Concept Art · Pitch Bible
                        </p>
                    </div>


                    <div className="flex flex-col justify-start border-t border-(--blackbean)/10 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
                        <h3 className="font-dot text-xs font-bold tracking-[0.15em] uppercase text-(--cornell)">
                            Key Skills
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-(--blackbean)/90">
                            Character Design · Narrative/Worldbuilding · Prop Design · Environment Design
                        </p>
                    </div>
                </div>
            </section>






            <ProjectNav
                tags={navSections} />


            <section id="overview" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">Overview</h1>
                <div className="text-md">
                    <a href="https://www.figma.com/proto/bLALJOqspBhWxFizv4sJcO/Forget-Me-Not-Pitch-Book?node-id=233-2&t=mqa3vVNfShNSo7IT-1"
                        target="_blank" rel="noopener noreferrer">Link to Main Project File</a>

                    In a world where dreams and reality blend, a young woman named Cecil wishes to find her sister who disappeared months ago.

                </div>

            </section>


            <section id="res" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">RESEARCH</h1>
            </section>

            <section id="process" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">PROCESS</h1>
            </section>

            <section id="final" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">FINAL</h1>
            </section>

            <section id="final" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">THOUGHTS</h1>
            </section>

        </main>

    );
}