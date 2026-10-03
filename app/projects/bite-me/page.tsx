'use client'

import Link from "next/link";
import ProjectNav from "../../../components/projectNav";

const navSections = [
    { id: "overview", label: "Overview" },
    { id: "research", label:"Research"},
    { id: "process", label: "Process" },
    { id: "final", label: "Final" },
    { id: "thoughts", label: "Thoughts" },
];


export default function BiteMe() {
    return (
        <main className="font-space relative flex w-full flex-col items-center text-(--blackbean)">

            <section id="hero" className="w-full max-w-6xl px-4 mt-20 pt-10 pb-12 sm:px-6 md:pt-16 md:pb-16">

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="flex flex-col items-start text-left lg:col-span-7">
                        <div className="mb-4 flex flex-wrap gap-2">
                            <span className="inline-flex pb-2 pt-2 items-center rounded-lg border border-dashed border-1 bg-(--cornell) px-3 py-1 font-dot text-xs tracking-[0.14em] uppercase text-(--ivory) shadow-sm">
                                Animation
                            </span>
                            <span className="inline-flex pb-2 pt-2 items-center rounded-lg border border-dashed border-1 bg-(--cornell) px-3 py-1 font-dot text-xs tracking-[0.14em] uppercase text-(--ivory) shadow-sm">
                                Visual Development
                            </span>
                        </div>

                        <h1 className="font-space text-4xl sm:text-5xl md:text-6xl font-bold text-(--blackbean) leading-[1.5]">
                            BITE ME!
                        </h1>

                        <p className="mt-5 text-base sm:text-lg font-dot leading-relaxed tracking-[0.15em] text-(--blackbean)/85">
                            A selfish vampire prince is banished to a reform school for supernatural delinquents, where he and his misfit friends navigate chaotic school antics while uncovering a long-hidden conspiracy in the magical world.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-(--blackbean)/10 pt-5 text-xs text-(--blackbean)/70">
                            <div>
                                <span className="font-dot uppercase tracking-[0.15em] text-(--cornell) block font-bold">
                                    Role
                                </span>
                                <span className="font-medium text-(--blackbean)">
                                    Solo Artist & Visual Dev
                                </span>
                            </div>
                            <div className="h-6 w-px bg-(--blackbean)/15 hidden sm:block" />
                            <div>
                                <span className="font-dot uppercase tracking-[0.15em] text-(--cornell) block font-bold">
                                    Format
                                </span>
                                <span className="font-medium text-(--blackbean)">
                                    Pitch Bible · 2D Animation Concept
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:col-span-5">
                        <div className="group relative overflow-hidden rounded-2xl border border-(--blackbean)/15 bg-white p-2.5 shadow-[0_12px_32px_rgba(53,23,16,0.12)] transition duration-300 hover:shadow-[0_18px_40px_rgba(53,23,16,0.18)]">
                            <img
                                src="/banner.png"
                                alt="Bite Me project banner"
                                className="h-auto w-full rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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
                            Pitch Deck, Storyboards, Animation, Scripts
                        </p>
                    </div>


                    <div className="flex flex-col justify-start border-t border-(--blackbean)/10 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
                        <h3 className="font-dot text-xs font-bold tracking-[0.15em] uppercase text-(--cornell)">
                            Key Skills
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-(--blackbean)/90">
                            Character Design, Narrative/Worldbuilding, Environment Design
                        </p>
                    </div>
                </div>
            </section>

            <ProjectNav tags={navSections} />

            <section id="overview" className="scroll-mt-28 min-h-[60vh] w-full max-w-4xl px-4 py-16 text-center">
                <h1 className="text-4xl font-space m-2">OVERVIEW</h1>
                <p>In my Ideation and Iteration class, I was tasked with pitching 
                    an animated show aimed at 12-18 year olds. 
                </p>
            </section>


            <section id="research" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">RESEARCH</h1>
            </section>

            <section id="process" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">PROCESS</h1>
            </section>

            <section id="final" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">FINAL</h1>
            </section>

            <section id="thoughts" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">THOUGHTS</h1>
            </section>

        </main>



    )
}