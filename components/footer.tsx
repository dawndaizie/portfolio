'use client'

import { useState } from 'react';
import Image from 'next/image';
import { showNotice } from './notice';

const DANCES = [
    "/footer/dance-1.webp",
    "/footer/dance-2.webp",
    "/footer/dance-3.webp",
];
const POUT = "/footer/pout.webp";
const PLACEHOLDER = "/applebear.svg";


export default function Footer() {
    const [copied, setCopied] = useState(false);
    const email = 'dawniqsteele@gmail.com';

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const [danceIndex, setDanceIndex] = useState(0);
    const [isPouting, setIsPouting] = useState(false);
    const animationsReady = false;

    const currentAnimation = animationsReady
        ? isPouting
            ? POUT
            : DANCES[danceIndex]
        : PLACEHOLDER;

    const handleDanceClick = () => {
        if (!isPouting) {
            setIsPouting(true);

            showNotice(
                "didn't like my dance?? hmph... lemme think of a new one..."
            );

            return;
        }

        setDanceIndex((current) => (current + 1) % DANCES.length);
        setIsPouting(false);

        showNotice('okay, got it!');
    };
    return (
        <div className="footer mt-16 w-full px-4 pb-8 pt-10 font-dot tracking-[0.15em] sm:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center lg:flex-row md:items-center md:justify-start gap-17">
                <div className="flex w-full max-w-[200px] shrink-0 flex-col items-center justify-center px-5 ">
                    <button
                        type="button"
                        onClick={handleDanceClick}
                        className="relative flex aspect-square w-full items-center justify-center p-2 transition-transform duration-150 hover:cursor-pointer active:scale-[0.97] "
                    >
                        <Image
                            key={currentAnimation}
                            src={currentAnimation}
                            alt=""
                            width={320}
                            height={320}
                            unoptimized
                            className="h-full w-full object-contain"
                            draggable={false}
                        />
                    </button>

                    <p className="mt-2 text-center font-dot text-[10px] leading-relaxed tracking-[0.06em] text-(--blackbean)">
                        {isPouting ? 'another chance?' : 'a little footer dance'}
                    </p>
                </div>

                <div className="w-full text-sm p-6 pl-10 md:max-w-2xl md:flex-1 text-center">
                    <div className="flex-row items-end justify-between">
                        <div className="space-y-3 mb-4">

                            <h2 className="font-redact text-3xl font-semibold sm:text-4xl text-(--blackbean) pb-3">
                                interested in working together?
                            </h2>
                        </div>


                        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                            <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm hover:font-semibold" href="https://linkedin.com/in/dawniquecasteele" target="_blank" rel="noreferrer">
                                LinkedIn
                            </a>
                            <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm hover:font-semibold " href="https://github.com/dawndaizie" target="_blank" rel="noreferrer">
                                Github
                            </a>

                            <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm hover:font-semibold " href="https://www.artstation.com/dawndaizie" target="_blank" rel="noreferrer">
                                Artstation
                            </a>
                            <div className="group relative flex items-center overflow-hidden rounded-lg border border-(--blackbean)/15 bg-white/80 p-0.5 transition-all duration-300 hover:border-(--blackbean) hover:bg-white hover:shadow-sm">
                                <a className="text-(--blackbean) flex items-center gap-1.5 px-3.5 py-1.5 hover:font-semibold transition-colors hover:text-(--cornell)" href={`mailto:${email}`}>
                                    Email
                                </a>


                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    aria-label="Copy email address"
                                    className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap rounded-lg bg-(--blackbean) px-0 py-1.5 font-dot text-[11px] tracking-wide text-(--ivory) transition-all duration-300 ease-out group-hover:max-w-[80px] group-hover:opacity-100 group-hover:px-3 hover:bg-(--cornell) active:scale-95"
                                >
                                    {copied ? 'copied! ✓' : 'copy'}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 flex-row text-xs items-center sm:flex-row sm:items-center text-(--blackbean) font-dot tracking-[0.15em]">
                        <p className="">© 2026 code + design by dawniqueca steele</p>
                        <p className=""> made with love and enough coffee to crash out ⋆˚ೀ
                        </p>
                    </div>
                </div>



            </div>
        </div>

    )
}