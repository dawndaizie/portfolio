'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenu, BiX } from "react-icons/bi";

export default function Nav() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", controlNavbar)
        return () => window.removeEventListener("scroll", controlNavbar)

    }, []);

    const navLinks = [
        { href: "/", label: "home" },
        { href: "/projects", label: "projects" },
        { href: "/art", label: "art" },
        { href: "/play", label: "play" },
        { href: "/about", label: "about" },
    ];


    return (
        <nav className={`nav fixed w-full bg-white font-space text-(--blackbean) text-sm shadow-md transition-transform duration-300 z-50 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-25">
                    <div className="flex items-center">
                        <Link href="/">
                            <img className="aspect-auto object-contain max-w-full m-auto max-h-100 pb-2 transition-transform duration-200 hover:rotate-7 hover:scale-105" src="/logopng.png" alt="logo depicting bear stuck in apple (my logo!)" width="65" height="65" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}
                                className={`px-3 py-2 rounded-md font-semibold hover:text-(--cornell) transition-colors ${pathname === link.href ? "border border-(--cornell) border-dashed" : ""}`} >
                                {link.label}
                            </Link>
                        ))}
                    </div>


                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-(--blackbean)
                            hover:text-(--cornell) hover-bg-(--cornell) focus:outline-none focus:ring-2 focus:ring-inset
                            focus:ring-(--cornell)">
                            {!isMobileMenuOpen ? (
                                <BiMenu className="text-3xl" />
                            ) : (
                                <BiX className="text-3xl" />
                            )}
                        </button>
                    </div>
                </div>

                <div className={`md:hidden transition-all duration-300 ease-in-out 
                        ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <div className="px-2 pt-2 pb-7 mb-5 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() =>
                                setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium 
                                        ${pathname === link.href ? "text-(--ivory) bg-(--cornell)/75 border-dashed border-2 rounded-lg" : "text-(--blackbean) hover:text-(--cornell) hover:bg-(--ivory)"}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                </div>

            </div>
        </nav>
    )
}

