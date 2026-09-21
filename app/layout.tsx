import type { Metadata } from "next";
import { Space_Mono, Funnel_Display, DotGothic16 } from "next/font/google";
import "./globals.scss";
import Nav from "../components/nav";
import ScrollUp from "../components/scrollUp";
import Footer from "../components/footer"
import Loader from "../components/loader";
import Transition from "../components/transition";
import localFont from "next/font/local";
import MovingBG from "../components/movingBG";
import CustomCursor from "../components/customCursor";


const space = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const funnel = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
})

const dot = DotGothic16({
  variable: "--font-dotgothic16",
  subsets: ["latin"],
  weight: ["400"],
})

const cozy = localFont({
  variable: "--font-cozy-quill",
  src: "../public/fonts/CozyQuill.woff2",
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
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${space.variable} ${funnel.variable} ${dot.variable} ${cozy.variable} ${kiwi.variable} ${emoji.variable}`}>
      <body
        className={`relative min-h-screen w-full overflow-x-hidden antialiased`}
      >
          <MovingBG
            letter="a"
            color="var(--ivory)"
            fontVar="var(--font-pixel-emoji)"
            speed={30} />

            <Loader>
          <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between">


            <Nav />
            <main className="overlay relative min-h-[60vh] min-w-0 flex-1">
              <Transition>
                {children}
                {/* <CustomCursor /> */}
              </Transition>
            </main>

            <Footer />
            <ScrollUp />
          </div>

        </Loader>

      </body>
    </html>
  );
}