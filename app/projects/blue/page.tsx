'use client'

import Link from "next/link";
import ProjectNav from "../../../components/projectNav";

const navSections = [
    { id: "problem", label: "Problem" },
    { id: "process", label: "Process" },
    { id: "final", label: "Final" },
    { id: "thoughts", label: "Thoughts" },
];


export default function Blue() {
    return (
<main className="font-space relative flex w-full flex-col items-center">

            <section id="hero" className="py-40 pb-10 max-w-full items-center flex flex-col">

                <div className="p-5 pb-20 flex flex-col items-center overflow-hidden  w-[90%] ">
                    <h1 className="text-6xl font-space m-2 text-(--blackbean)/75 text-center pb-4 pt-4">Bite Me</h1>
                    <div>
                        <p className="m-2 inline-block overflow-hidden rounded-lg bg-(--cornell) p-2 text-(--ivory) font-space text-sm">Visual Development</p>
                        <p className="m-2 inline-block overflow-hidden rounded-lg bg-(--cornell) p-2 text-(--ivory) font-space text-sm">Animation</p>
                    </div>
                </div>

                <div className="w-[90%]">
                    <img className="object-contain aspect-auto rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.18)] ring ring-(--blackbean)" src="/banner.png" />
                </div>


            </section>

            <section id="overview" className="flex flex-row mt-0 p-5 pt-0 gap-10 pb-10">
                <div>
                    <div className="overflow-hidden p-2">
                        <h3 className="text-bold text-xl text-(--cornell)">Tools</h3>
                        <p className="text-md">React.js/Vite, Express.js, MongoDB, ChatGPT 4.0, ScrapingBee</p>

                    </div>
                    <div className="overflow-hidden p-2">
                        <h3 className="text-bold text-xl text-(--cornell)">Deliverables</h3>
                        <p className="text-md"> Web Application, Documentation, Pitch Deck</p>

                    </div>
                </div>

                <div className="text-md">
                    A selfish vampire prince is banished to a reform school for supernatural deliquents, where
                    he and his misfit friends navigate chaotic and dangerous school antics while uncovering a long-hidden
                    conspiracy in the magical world.

                </div>



            </section>

            <ProjectNav
                tags={navSections} />


            <section id="problem" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">PROBLEM</h1>
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

            <section id="thoughts" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">THOUGHTS</h1>
            </section>

        </main>
    )
}