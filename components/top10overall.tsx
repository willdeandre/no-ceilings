// components/top10overall.tsx
import Image from "next/image";
import Link from "next/link";

export type OverallProspect = {
  id: string;
  name: string;
  team: string;
  pos: string;
  posHeight: string;
  rank: number; // 1..10
  logoSrc: string;
  href?: string;

  // extra info (for later use in a modal / tooltip / detail page)
  prevRankText: string; // e.g. "1st (↔)" or "6th (↑ 1)"
  measurements: string; // e.g. "6’6”, 205"
  yearAge: string; // e.g. "Freshman (18)"
  asOf: string; // e.g. "2/2/26"
  statsLine: string; // e.g. "21.3 PTS | 4.5 REB | ..."
  splitsLine: string; // e.g. "50.6 FG% | 43.2 3P% | ..."
  gamesMinsLine: string; // e.g. "11 Games | 26.6 MIN"
};

type Top10OverallProps = {
  title?: string;
  items?: OverallProspect[];
  className?: string;
};

function movementClass(prevRankText: string) {
  const t = prevRankText.toLowerCase();

  // stayed the same
  if (t.includes("↔")) {
    return "text-white/60"; // your current neutral color
  }

  // improved
  if (t.includes("↑")) {
    return "text-emerald-400";
  }

  // dropped
  if (t.includes("↓")) {
    return "text-red-400";
  }

  // fallback
  return "text-white/60";
}

/**
 * HARD-CODED TOP 10 (as provided by you)
 * NOTE: I left href as "#" placeholders — swap these to real pages later.
 * NOTE: For logoSrc, put real images in /public/logos/... or update paths.
 */
const TOP_10_OVERALL: OverallProspect[] = [
  {
    id: "overall-1",
    rank: 1,
    name: "Darryn Peterson",
    pos: "Guard",
    posHeight: "Guard - 6'6",
    team: "Kansas",
    logoSrc: "/kansas_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’6”, 205",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "21.3 PTS | 4.5 REB | 1.8 AST | 1.2 STL | 0.6 BLK",
    splitsLine: "50.6 FG% | 43.2 3P% | 81.5 FT%",
    gamesMinsLine: "11 Games | 26.6 MIN",
  },
  {
    id: "overall-2",
    rank: 2,
    name: "Cameron Boozer",
    pos: "Forward",
    posHeight: "Forward - 6'9",
    team: "Duke",
    logoSrc: "/duke_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’9”, 250",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "23.5 PTS | 9.8 REB | 4.1 AST | 1.8 STL | 0.6 BLK",
    splitsLine: "58.6 FG% | 38.1 3P% | 75.8 FT%",
    gamesMinsLine: "21 Games | 32.4 MIN",
  },
  {
    id: "overall-3",
    rank: 3,
    name: "AJ Dybantsa",
    pos: "Forward",
    posHeight: "Forward - 6'9",
    team: "BYU",
    logoSrc: "/byu_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’9”, 210",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "23.3 PTS | 6.4 REB | 3.5 AST | 1.2 STL | 0.4 BLK",
    splitsLine: "52.9 FG% | 32.9 3P% | 76.1 FT%",
    gamesMinsLine: "21 Games | 32.3 MIN",
  },
  {
    id: "overall-4",
    rank: 4,
    name: "Caleb Wilson",
    pos: "Forward",
    posHeight: "Forward - 6'10",
    team: "North Carolina",
    logoSrc: "/unc_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’10”, 215",
    yearAge: "Freshman (19)",
    asOf: "2/2/26",
    statsLine: "20.0 PTS | 9.9 REB | 2.9 AST | 1.6 STL | 1.4 BLK",
    splitsLine: "58.9 FG% | 26.1 3P% | 69.9 FT%",
    gamesMinsLine: "21 Games | 31.1 MIN",
  },
  {
    id: "overall-5",
    rank: 5,
    name: "Kingston Flemings",
    pos: "Guard",
    posHeight: "Guard - 6'4",
    team: "Houston",
    logoSrc: "/houston_logo.png",
    href: "#",
    prevRankText: "(↑1)",
    measurements: "6’4”, 190",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "17.0 PTS | 3.4 REB | 5.4 AST | 1.8 STL | 0.3 BLK",
    splitsLine: "51.4 FG% | 39.1 3P% | 82.5 FT%",
    gamesMinsLine: "21 Games | 31.1 MIN",
  },
  {
    id: "overall-6",
    rank: 6,
    name: "Mikel Brown Jr.",
    pos: "Guard",
    posHeight: "Guard - 6'5",
    team: "Louisville",
    logoSrc: "/louisville_logo.png",
    href: "#",
    prevRankText: "(↑1)",
    measurements: "6’5”, 190",
    yearAge: "Freshman (19)",
    asOf: "2/2/26",
    statsLine: "16.4 PTS | 2.9 REB | 5.0 AST | 0.8 STL | 0.1 BLK",
    splitsLine: "38.5 FG% | 28.3 3P% | 80.7 FT%",
    gamesMinsLine: "13 Games | 27.8 MIN",
  },
  {
    id: "overall-7",
    rank: 7,
    name: "Keaton Wagler",
    pos: "Guard",
    posHeight: "Guard - 6'6",
    team: "Illinois",
    logoSrc: "/illinois_logo.png",
    href: "#",
    prevRankText: "(↑12)",
    measurements: "6’6”, 180",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "17.7 PTS | 5.0 REB | 4.2 AST | 0.8 STL | 0.2 BLK",
    splitsLine: "48.0 FG% | 43.7 3P% | 81.5 FT%",
    gamesMinsLine: "21 Games | 32.0 MIN",
  },
  {
    id: "overall-8",
    rank: 8,
    name: "Darius Acuff Jr.",
    pos: "Guard",
    posHeight: "Guard - 6'3",
    team: "Arkansas",
    logoSrc: "/arkansas_logo.png",
    href: "#",
    prevRankText: "(↑4)",
    measurements: "6’3”, 190",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "20.3 PTS | 2.9 REB | 6.2 AST | 0.8 STL | 0.5 BLK",
    splitsLine: "49.1 FG% | 40.8 3P% | 77.2 FT%",
    gamesMinsLine: "22 Games | 33.6 MIN",
  },
  {
    id: "overall-9",
    rank: 9,
    name: "Jayden Quaintance",
    pos: "Big",
    posHeight: "Big - 6'10",
    team: "Kentucky",
    logoSrc: "/kentucky_logo.png",
    href: "#",
    prevRankText: "(↓4)",
    measurements: "6’10”, 255",
    yearAge: "Sophomore (18)",
    asOf: "2/2/26",
    statsLine: "5.0 PTS | 5.0 REB | 0.5 AST | 0.5 STL | 0.8 BLK",
    splitsLine: "57.1 FG% | 0 3P% | 30.8 FT%",
    gamesMinsLine: "4 Games | 16.8 MIN",
  },
  {
    id: "overall-10",
    rank: 10,
    name: "Labaron Philon",
    pos: "Guard",
    posHeight: "Guard - 6'4",
    team: "Alabama",
    logoSrc: "/bama_logo.png",
    href: "#",
    prevRankText: "(↓2)",
    measurements: "6’4”, 185",
    yearAge: "Sophomore (20)",
    asOf: "2/2/26",
    statsLine: "22.0 PTS | 3.5 REB | 5.1 AST | 1.4 STL | 0.2 BLK",
    splitsLine: "51.6 FG% | 37.0 3P% | 76.1 FT%",
    gamesMinsLine: "19 Games | 29.4 MIN",
  },
];

export default function Top10Overall({
  title = "Top 10 Prospects",
  items = TOP_10_OVERALL,
  className = "",
}: Top10OverallProps) {
  return (
    <section
      className={[
        "rounded-[1.5rem] bg-zinc-950/60 border border-white/10 p-2",
        className,
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-white font-black tracking-widest text-lg uppercase">
          {title}
        </h3>
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
          2/4/26
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {items.slice(0, 10).map((p) => {
          const Row = (
            <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:border-brand-orange transition">
              <div className="w-6 text-center text-[14px] font-black text-brand-orange">
                {p.rank}
              </div>

                  <div className="relative h-8 w-8 shrink-0">
                      <Image
                          src={p.logoSrc}
                          alt={`${p.team} logo`}
                          fill
                          className="object-contain"
                      />
                  </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-bold text-white">
                  {p.name}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                  <span className="truncate">{p.posHeight}</span>
                  <span className="text-white/20">•</span>
                </div>
              </div>

              {/* previous ranking movement */}
              <span
                className={[
                  "text-[10px] font-black tracking-widest",
                  movementClass(p.prevRankText),
                ].join(" ")}
              >
                {p.prevRankText}
              </span>
            </div>
          );

          return p.href ? (
            <Link key={p.id} href={p.href} className="block">
              {Row}
            </Link>
          ) : (
            <div key={p.id}>{Row}</div>
          );
        })}
      </div>
    </section>
  );
}
