import Image from "next/image";
import Link from "next/link";
import Top10Overall from "@/components/top10overall";
import ScrollBanner from "@/components/ScrollBanner"; // <- if you made it
import TopRisers from "@/components/topRisers";


export default function Home() {
  return (
    <main className="min-h-screen bg-black pb-20">
      <div className="w-full px-14 py-12">
        {/* Main | Right rail */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6">
          {/* MAIN */}
          <div className="mx-auto w-full max-w-5xl">
            {/* Featured Section - Hero */}
            <section className="relative aspect-[20/9] md:aspect-[26/9] overflow-hidden rounded-[3rem] bg-zinc-900 shadow-2xl">
              <Image
                src="/v4_logo_cropped.png"
                alt="Big Board featured image"
                fill
                className="object-cover"
                priority
              />

              <div className="pointer-events-none absolute inset-0 to-transparent" />

              {/* centered horizontally, low vertically */}
              <div className="absolute inset-0 flex justify-center items-end pb-10">
                <Link
                  href="https://www.noceilingsnba.com/p/2026-nba-draft-big-board-v4"
                  className="block w-[260px] sm:w-[320px] rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/15 p-5 text-white shadow-2xl transition-transform hover:scale-105 hover:border-brand-orange"
                >
                  <h1 className="text-center text-2xl font-bold leading-tight">
                    2026 Big Board: <span className="text-brand-orange">V.4</span>
                  </h1>
                </Link>
              </div>
            </section>

            {/* Recent Section */}
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white italic tracking-tight">
                  RECENT ARTICLES
                </h2>
                <Link
                  href="https://www.noceilingsnba.com/archive"
                  className="text-sm font-bold text-zinc-400 hover:text-brand-orange transition uppercase tracking-widest"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Respect Jaden Bradley | The Prospect Overview",
                    tag: "Maxwell Baumbach",
                    href: "https://www.noceilingsnba.com/p/respect-jaden-bradley-the-prospect?utm_source=profile&utm_medium=reader2",
                    img: "/jaden_bradley_respect.png",
                    authorImg: "/maxwell_baumbach.png"
                  },
                  {
                    title: "Sleepers of the Week | Week 13",
                    tag: "Stephen Gillaspie",
                    href: "https://www.noceilingsnba.com/p/sleeper-prospects-of-the-week-week-b4f?utm_source=profile&utm_medium=reader2",
                    img: "/week_13_sleepers.png",
                    authorImg: "/stephen_gillaspie.png"
                  },
                  {
                    title: "Labaron Philon: The Sophomore Surge",
                    tag: "Rowan Kent",
                    href: "https://www.noceilingsnba.com/p/labaron-philon-the-sophomore-surge?utm_source=profile&utm_medium=reader2",
                    img: "/labaron_philon_surge.png",
                    authorImg: "/rowan_kent.png"
                  },
                  {
                    title: "Far Morez than Meets the Eye",
                    tag: "Tyler Metcalf",
                    href: "https://www.noceilingsnba.com/p/morez-johnson-jr-far-more-than-meets?utm_source=profile&utm_medium=reader2",
                    img: "/morez_than_meets_the_eye.png",
                    authorImg: "/tyler_metcalf.png"
                  },
                  {
                    title: "The Ice Cream Truck Class of Point Guards",
                    tag: "Tyler Rucker",
                    href: "https://www.noceilingsnba.com/p/the-ice-cream-truck-class-of-point",
                    img: "/pg_ice_cream.png",
                    authorImg: "/tyler_rucker.png"
                  },
                  {
                    title: "Nate Ament and Resetting Expectations",
                    tag: "Maxwell Baumbach",
                    href: "https://www.noceilingsnba.com/p/nate-ament-and-resetting-expectations",
                    img: "/nate_ament_flag.png",
                    authorImg: "/maxwell_baumbach.png",
                  },
                ].map((a) => (
                  <Link
                    key={a.title}
                    href={a.href}
                    className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 aspect-[4/5] transition-all hover:-translate-y-2 border border-white/5 hover:border-white/15"
                  >
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 transform-gpu will-change-transform"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-black tracking-widest text-brand-orange uppercase">
                          {a.tag}
                        </p>

                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                          <Image
                            src={a.authorImg}
                            alt={a.tag}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="mt-3 text-2xl font-bold text-white leading-tight">
                        {a.title}
                      </h3>

                      {/* NO OPACITY HOVER — always visible */}
                      <div className="mt-4 inline-flex items-center text-xs font-bold text-white uppercase tracking-tighter">
                        Read Article{" "}
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT RAIL: Top 10 + Risers */}
          <aside className="hidden lg:block sticky top-8 h-fit">
            <div className="flex flex-col gap-4">
              <Top10Overall />
              <TopRisers />
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom banner appears after scroll */}
      <ScrollBanner />
    </main>
  );
}
