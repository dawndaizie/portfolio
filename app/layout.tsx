import type { Metadata } from "next";
import { Space_Mono, DotGothic16 } from "next/font/google";
import "./globals.scss";
import Nav from "../components/nav";
import CornerWidgets from "../components/cornerWidgets";
import Footer from "../components/footer"
import Loader from "../components/loader";
import Transition from "../components/transition";
import localFont from "next/font/local";
import MovingBG from "../components/movingBG";

const space = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const dot = DotGothic16({
  variable: "--font-dotgothic16",
  subsets: ["latin"],
  weight: ["400"],
})

const redact = localFont({
  variable: "--font-redaction35",
  src: "../public/fonts/Redaction35.woff2"
})


const kiwi = localFont({
  variable: "--font-kiwi-soda",
  src: "../public/fonts/KiwiSoda.woff2",
})

const emoji = localFont({
  variable: "--font-pixel-emoji",
  src: "../public/fonts/PixelEmoji.woff2"
})



export const metadata: Metadata = {
  title: "dawniqueca steele ⋆˚ೀ",
  description: "Portfolio of Dawniqueca Steele: game/swe development, animation, graphic design, and UI/UX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${space.variable} ${dot.variable} ${kiwi.variable} ${emoji.variable} ${redact.variable}`}>
      <body
        className={`relative min-h-dvh w-full overflow-x-hidden antialiased`}
      >
          <MovingBG/>

          {/*<Loader>*/}
          <div className="relative z-10 min-h-dvh w-full items-center justify-between">


            <Nav />
            <main className="overlay relative min-w-0">
              <Transition>
                <div className="">
                {children}
                
                </div>
              </Transition>
            </main>

            <Footer />
            <CornerWidgets />
          </div>

        {/*</Loader>*/}

      </body>
    </html>
  );
}