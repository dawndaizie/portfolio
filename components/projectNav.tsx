'use client'

import { useState } from "react";
import { BiX } from "react-icons/bi";
import Link from "next/link";

export default function ProjectNav({
  tags,
}: {
  tags: { id: string; label: string; }[]
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed top-1/3 z-40 flex items-center transition-transform duration-300 xl:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-[calc(100%-2.5rem)]"
          } left-0`}
      >

        <div className="relative w-44 rounded-r-lg bg-(--ivory) p-4 text-(--blackbean) shadow-xl ring-1 ring-(--sky)/50">

          <div className="absolute -top-3 right-4 h-6 w-6 rounded-full bg-(--cornell) shadow-md ring-2 ring-rose-700">
            <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-(--ivory)/70" />
          </div>

          <p className="mb-2 font-space text-xs font-bold uppercase tracking-wider text-(--cornell)">
            Sections
          </p>
          <ul className="space-y-2 font-dot tracking-[0.15em] text-sm font-medium">
            {tags.map((tag) => (
              <li key={tag.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(tag.id)}
                  className="w-full text-left transition-colors hover:text-(--cornell) active:scale-95"
                >
                  ᝰ {tag.label}
                </button>
              </li>
            ))}
          </ul>
           <Link href="/projects" className="mt-5 font-space text-xs flex font-bold uppercase text-(--blackbean) ring ring-2 ring-(--cornell)/20 rounded-lg p-2 hover:text-(--cornell) hover:scale-105 transform duration-200 hover:shadow-sm hover:ring-(--cornell)"> 
            ↩ Back to Projects</Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="project nav toggle"
          className="flex h-14 w-10 items-center justify-center rounded-r-md bg-(--ivory) text-xs font-bold text-(--blackbean) shadow-md"
        >
          <span className="[writing-mode:vertical-lr]">{mobileOpen ? <BiX className="text-3xl" /> : "NAV"}</span>
        </button>
      </div>





      <aside
        className="pointer-events-none sticky top-28 z-30 hidden h-0 w-full justify-start xl:flex"
      >
        <div className="pointer-events-auto relative -left-20 w-44 -rotate-2 rounded-xl  text-(--blackbean) shadow-[0_10px_25px_rgba(53,23,16,0.12)] transition-transform duration-200 hover:rotate-0">
          <ul className="space-y-2 font-dot tracking-[0.15em] text-base bg-(--ivory) p-7 ring-1 ring-(--sky) rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
            <div className="absolute -top-3.5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-(--cornell) shadow-[0_4px_6px_rgba(0,0,0,0.3)] ring-2 ring-rose-700">
              <div className="absolute top-1 left-1.5 h-2 w-2 rounded-full bg-(--ivory)/80"></div>
            </div>
            <p className="mb-2 font-space text-xs font-bold uppercase text-(--cornell)">
              Navigation
            </p>
            {tags.map((tag) => (
              <li key={tag.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(tag.id)}
                  className="group flex w-full items-center gap-1.5 text-left text-(--blackbean) transition-colors hover:text-(--cornell)"
                >
                  <span className="text-xs transition-transform group-hover:translate-x-1">
                    ⤷
                  </span>
                  {tag.label}
                </button>
              </li>
            ))}

            <Link href="/projects" className="mt-5 font-space text-xs flex font-bold uppercase text-(--blackbean) ring ring-2 ring-(--cornell)/20 rounded-lg p-2 hover:text-(--cornell) hover:scale-105 transform duration-200 hover:shadow-sm hover:ring-(--cornell)"> 
            ↩ Back to Projects</Link>
          </ul>
        </div>
      </aside>
    </>
  );
}