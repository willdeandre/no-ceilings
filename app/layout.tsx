import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import {
  FaYoutube,
  FaSpotify,
  FaPodcast,
  FaXTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";
import "./globals.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Ceilings",
  description: "NBA Draft Coverage",
};

const socials = [
  {
    icon: <FaYoutube />,
    href: "https://www.youtube.com/@noceilingsnba",
    hover: "hover:text-red-500",
  },
  {
    icon: <FaPodcast />,
    href: "https://podcasts.apple.com/us/podcast/no-ceilings/id1595712943",
    hover: "hover:text-purple-400",
  },
  {
    icon: <FaSpotify />,
    href: "https://open.spotify.com/show/1uonUntTi8IgoMMLx1KydM?si=2dcb9da173c442fc",
    hover: "hover:text-green-500",
  },
  {
    icon: <FaXTwitter />,
    href: "https://twitter.com/noceilingsnba",
    hover: "hover:text-white",
  },
  {
    icon: <FaInstagram />,
    href: "https://instagram.com/noceilingsnba",
    hover: "hover:text-pink-400",
  },
  {
    icon: <FaTiktok />,
    href: "https://tiktok.com/@noceilingsnba",
    hover: "hover:text-cyan-400",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <header className="bg-brand-orange text-white shadow-md">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between gap-6">

            {/* Logo */}
            <Link href="/" className="shrink-0 transition hover:opacity-80">
              <Image
                src="/written_logo.png"
                alt="No Ceilings"
                width={140}
                height={40}
                priority
              />
            </Link>

            {/* Nav */}
            <nav className={`flex items-center gap-6 text-xl md:text-2xl ${bebas.className}`}>
              <Link href="https://www.noceilingsnba.com/s/big-boards" className="hover:text-black transition">Big Boards</Link>
              <Link href="https://www.noceilingsnba.com/s/mock-drafts" className="hover:text-black transition">Mock Drafts</Link>
              <Link href="https://www.noceilingsnba.com/s/nc" className="hover:text-black transition">No Ceilings+</Link>
              <a
                href="https://noceilingsnba.bigcartel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
              >
                Shop
              </a>
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-orange text-lg transition hover:bg-black ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
