import type { Metadata } from "next";
import { Space_Mono, DotGothic16 } from "next/font/google";
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

const dot = DotGothic16({
  variable: "--font-dotgothic16",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className={`${space.variable} ${dot.variable} ${kiwi.variable} ${emoji.variable}`}>
      <body
        className={`relative min-h-dvh w-full overflow-x-hidden antialiased`}
      >
          <MovingBG/>

            <Loader>
          <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-between">


            <Nav />
            <main className="overlay relative min-w-0 flex-1">
              <Transition>
                <div className="flex-1 w-full flex flex-col">
                {children}
                {/* <CustomCursor /> */}
                </div>
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