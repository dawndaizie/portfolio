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
        { href: "/", label: "work" },
        { href: "/art", label: "art" },
        { href: "/play", label: "play" },
        { href: "/about", label: "about" },
    ];


    return (
        <div
            className={`navShadow fixed top-0 z-50 w-full transition-[translate,visibility] duration-500 motion-reduce:transition-none ${isVisible
                    ? 'visible translate-y-0'
                    : 'invisible -translate-y-[calc(100%+3rem)]'
                }`}
        >
            <nav className="nav relative w-full font-dot text-sm tracking-[0.2em]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-23">
                        <div className="flex items-center">
                            <Link href="/">
                                <img className="aspect-auto object-contain max-w-full m-auto max-h-100 pb-2 transition-transform duration-200 hover:rotate-7 hover:scale-105" src="/logopng.png" alt="logo depicting bear stuck in apple (my logo!)" width="65" height="65" />
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={pathname === link.href ? 'page' : undefined}
                                    className="navLink px-3 py-2"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>


                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={
                                    isMobileMenuOpen
                                        ? 'Close navigation menu'
                                        : 'Open navigation menu'
                                }
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-navigation"
                                className="navMenuButton inline-flex items-center justify-center p-2"
                            >
                                {!isMobileMenuOpen ? (
                                    <BiMenu aria-hidden="true" className="text-3xl" />
                                ) : (
                                    <BiX aria-hidden="true" className="text-3xl" />
                                )}

                                <div
                                    id="mobile-navigation"
                                    className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                                        ? 'max-h-64 opacity-100'
                                        : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}
                                ></div>
                            </button>
                        </div>
                    </div>

                    <div className={`md:hidden transition-all duration-300 ease-in-out 
                        ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                        <div className="px-2 pt-2 pb-7 mb-5 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-current={pathname === link.href ? 'page' : undefined}
                                    tabIndex={isMobileMenuOpen ? 0 : -1}
                                    className="navLink block px-3 py-2 text-base font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                    </div>

                </div>
            </nav>
        </div>
    )
}

