'use client'

import { useState } from 'react';

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


    return (
        <div className="footer w-full flex flex-col font-space mt-16 px-4 pb-8 sm:px-8 sm:flex-row">

            <div className="max-w-6xl text-sm p-6 sm:p-10 mt-3">
                <div className="flex-row gap-8 items-end justify-between">
                    <div className="space-y-3 mb-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-(--blackbean)/10 bg-white/60 px-3 py-1 text-xs font-dot tracking-wider text-(--blackbean)">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
                            </span>
                            available for work!
                        </div>

                        <h2 className="font-space text-3xl font-bold sm:text-4xl text-(--blackbean) pb-3">
                            interested in working together?
                        </h2>
                    </div>


                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                        <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm" href="https://linkedin.com/in/dawniquecasteele" target="_blank" rel="noreferrer">
                            LinkedIn
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-(--blackbean)/60">
                                ↗
                            </span>
                        </a>
                        <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm" href="https://github.com/dawniquecasteele" target="_blank" rel="noreferrer">
                            Github
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-(--blackbean)/60">
                                ↗
                            </span>
                        </a>

                        <a className="text-(--blackbean) group flex items-center gap-1.5 rounded-lg border border-(--blackbean)/15 bg-white/70 px-4 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-(--blackbean) hover:text-(--cornell) hover:shadow-sm" href="https://www.artstation.com/dawnstelay" target="_blank" rel="noreferrer">
                            Artstation
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-(--blackbean)/60">
                                ↗
                            </span>

                        </a>
                        <div className="group relative flex items-center overflow-hidden rounded-lg border border-(--blackbean)/15 bg-white/80 p-0.5 transition-all duration-300 hover:border-(--blackbean) hover:bg-white hover:shadow-sm">
                            <a className="text-(--blackbean) flex items-center gap-1.5 px-3.5 py-1.5 font-semibold transition-colors hover:text-(--cornell)" href={`mailto:${email}`}>
                                Email<span className="text-(--blackbean)/60">↗</span>
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


            <div className="items-center justify-between mx-auto">
                <img className="aspect-auto object-contain max-w-full m-auto max-h-100 " src="/applebear.svg" alt="logo depicting bear stuck in apple (my logo!)" width="100" height="100" />

            </div>

        </div>

    )
}