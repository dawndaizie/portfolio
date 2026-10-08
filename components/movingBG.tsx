'use client'

import { useEffect, useState } from "react";



export default function MovingBG() {

     const letter = "a";
        const color = "var(--ivory)";
    const fontVar = "var(--font-pixel-emoji), sans-serif";
    const size = 80;
    const speed = 30;
    const [bgDataUrl, setBgDataUrl] = useState<string>("");

    useEffect(() => {
        const tempEl = document.createElement("div");
        tempEl.style.color = color;
        tempEl.style.fontFamily = fontVar;
        document.body.appendChild(tempEl);

        const computedStyle = getComputedStyle(tempEl);
        const resolvedColor = getComputedStyle(tempEl).color;
        const resolvedFontFamily = computedStyle.fontFamily || "sans-serif";
        document.body.removeChild(tempEl);



        document.fonts.ready.then(() => {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            const half = size / 2;
            const fontSize = Math.floor(size * 0.3);

            ctx.fillStyle = resolvedColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `${fontSize}px ${resolvedFontFamily}`;

           
            ctx.fillText(letter, half / 2, half / 2);
            ctx.fillText(letter, size - half / 2, size - half / 2);

            setBgDataUrl(canvas.toDataURL());
        });
    }, [letter, color, fontVar, size]);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10  min-h-screen w-screen overflow-hidden bg-(--sky)"
        >
            <div
                className="pointer-events-none absolute -inset-[100px] opacity-55"
                style={{
                    backgroundImage: bgDataUrl ? `url(${bgDataUrl})` : undefined,
                    backgroundRepeat: "repeat",
                    backgroundSize: `${size}px ${size}px`,
                    animation: `movingLetterBg ${speed}s linear infinite`,
                }}
            />

            <style jsx global>{`
        @keyframes movingLetterBg {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -200px -200px;
          }
        }
      `}</style>
        </div>
    );
}