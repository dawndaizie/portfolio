'use client'

import Link from "next/link";
import ProjectNav from "../../../components/projectNav";

const navSections = [
    { id: "problem", label: "Problem" },
    { id: "process", label: "Process" },
    { id: "final", label: "Final" },
    { id: "thoughts", label: "Thoughts" },
];

export default function ForgetMeNot() {
    return (

        <main className="font-space relative flex w-full flex-col items-center">

            <section id="hero" className="py-40 pb-10 max-w-full items-center flex flex-col">

                <div className="p-5 pb-20 flex flex-col items-center overflow-hidden  w-[90%] ">
                    <h1 className="text-6xl font-space m-2 text-(--blackbean)/75 text-center pb-4 pt-4">Forget Me Not</h1>
                    <div>
                        <p className="inline-block overflow-hidden rounded-lg bg-(--cornell) p-2 text-(--ivory) font-space text-sm">Visual Development</p>
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
                    <a href="https://www.figma.com/proto/bLALJOqspBhWxFizv4sJcO/Forget-Me-Not-Pitch-Book?node-id=233-2&t=mqa3vVNfShNSo7IT-1"
                        target="_blank" rel="noopener noreferrer">Link to Main Project File</a>

                    In a world where dreams and reality blend, a young woman named Cecil wishes to find her sister who disappeared months ago.

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

            <section id="final" className="min-h-screen max-w-screen items-center text-center">
                <h1 className="text-4xl font-space m-2">THOUGHTS</h1>
            </section>

        </main>

    );
}