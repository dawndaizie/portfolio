'use client'

import Link from "next/link";
import { useState, useEffect } from "react"

export default function ScrollUp() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className={`${visible ? "" : "pointer-events-none"}`}>
        <div className="fixed bottom-0 right-0 m-8 font-space">
            
            <div className={`transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <button onClick={scrollToTop}
                    className="flower bg-(--blackbean)/85 h-[55px] md:h-[75px] shadow-lg transition text-(--ivory) hover:scale-110 hover:-rotate-5 hover:cursor-pointer">
                    ↑
                </button>
            </div>
           
        </div>
        </div>
    )
}



