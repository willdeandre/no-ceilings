// components/top10overall.tsx
import Image from "next/image";
import Link from "next/link";

export type BadgeType = 'shooter' | 'dimer' | 'athlete' | 'disruptor' | 'rim protector' | 'unlimited potential';

export interface PlayerArticle {
  title: string;
  tag: string;     // The author name
  href: string;    // Link to the actual article
  img: string;     // Cover image path
  authorImg: string;
}

export type OverallProspect = {
  id: string;
  name: string;
  team: string;
  pos: string;
  posHeight: string;
  rank: number; // 1..10
  logoSrc: string;
  href?: string;
  logoScale?: number;

  // extra info (for later use in a modal / tooltip / detail page)
  prevRankText: string; // e.g. "1st (↔)" or "6th (↑ 1)"
  measurements: string; // e.g. "6’6”, 205"
  yearAge: string; // e.g. "Freshman (18)"
  asOf: string; // e.g. "2/2/26"
  statsLine: string; // e.g. "21.3 PTS | 4.5 REB | ..."
  splitsLine: string; // e.g. "50.6 FG% | 43.2 3P% | ..."
  gamesMinsLine: string; // e.g. "11 Games | 26.6 MIN"
  bio: string;
  article: PlayerArticle;
  badges: BadgeType[];
  teamColor: string;
};

type Top10OverallProps = {
  title?: string;
  items?: OverallProspect[];
  className?: string;
};

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    teamColor: "#0051ba",
    logoSrc: "/kansas_logo.png",
    logoScale: 1.5,
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’6”, 205",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "21.3 PTS | 4.5 REB | 1.8 AST | 1.2 STL | 0.6 BLK",
    splitsLine: "50.6 FG% | 43.2 3P% | 81.5 FT%",
    gamesMinsLine: "11 Games | 26.6 MIN",
    bio: "Peterson is nothing short of the clear number one prospect in an all-time draft. He shoots with elite efficiency despite high volume and high shot difficulty. He throws down dunks over defenders in traffic. Physically, he has a strong frame and seems to glide over the floor when he runs. On the court, Peterson is flawless. Off the court, it remains to be seen.",
    article: {
      title: "Darryn Peterson's Draft Stock",
      tag: "Tyler Metcalf",
      href: "https://www.noceilingsnba.com/i/183874573/darryn-peterson-kansas-66-205-pound-freshman-guard",
      img: "/darryn_peterson_article.png",
      authorImg: "/tyler_metcalf.png"
    },
    badges: ["shooter", "unlimited potential"],
  },
  {
    id: "overall-2",
    rank: 2,
    name: "Cameron Boozer",
    pos: "Forward",
    posHeight: "Forward - 6'9",
    team: "Duke",
    teamColor: "#00539B",
    logoSrc: "/duke_logo.png",
    logoScale: 0.9,
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’9”, 250",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "23.5 PTS | 9.8 REB | 4.1 AST | 1.8 STL | 0.6 BLK",
    splitsLine: "58.6 FG% | 38.1 3P% | 75.8 FT%",
    gamesMinsLine: "21 Games | 32.4 MIN",
    bio: "Boozer is every coach's dream player. His game really has no weaknesses. His massive frame, feel for the game, and fluidity make him a lock to be a successful NBA player who will contribute to winnning. The only real questions surrounding Boozer relate to his developmental arc and how much potential for growth still remains.",
    article: {
      title: "Cam Boozer, AJ Dybantsa, and Darryn Peterson are a Historic Prospect Trio",
      tag: "Nathan Grubel",
      href: "https://www.noceilingsnba.com/i/183874573/darryn-peterson-kansas-66-205-pound-freshman-guard",
      img: "/big_three.png",
      authorImg: "/nathan_grubel.png"
    },
    badges: ["dimer", "disruptor"]
  },
  {
    id: "overall-3",
    rank: 3,
    name: "AJ Dybantsa",
    pos: "Forward",
    posHeight: "Forward - 6'9",
    team: "BYU",
    teamColor: "#0047BA",
    logoSrc: "/byu_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’9”, 210",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "23.3 PTS | 6.4 REB | 3.5 AST | 1.2 STL | 0.4 BLK",
    splitsLine: "52.9 FG% | 32.9 3P% | 76.1 FT%",
    gamesMinsLine: "21 Games | 32.3 MIN",
    bio: "",
    article: {
      title: "Cam Boozer, AJ Dybantsa, and Darryn Peterson are a Historic Prospect Trio",
      tag: "Nathan Grubel",
      href: "https://www.noceilingsnba.com/i/183372040/aj-dybantsa-w-byu-69-210-lbs",
      img: "/big_three.png",
      authorImg: "/nathan_grubel.png"
    },
    badges: ["athlete", "unlimited potential"]
  },
  {
    id: "overall-4",
    rank: 4,
    name: "Caleb Wilson",
    pos: "Forward",
    posHeight: "Forward - 6'10",
    team: "North Carolina",
    teamColor: "#4B9CD3",
    logoSrc: "/unc_logo.png",
    href: "#",
    prevRankText: "(↔)",
    measurements: "6’10”, 215",
    yearAge: "Freshman (19)",
    asOf: "2/2/26",
    statsLine: "20.0 PTS | 9.9 REB | 2.9 AST | 1.6 STL | 1.4 BLK",
    splitsLine: "58.9 FG% | 26.1 3P% | 69.9 FT%",
    gamesMinsLine: "21 Games | 31.1 MIN",
    bio: "Wilson is simply the kind of player you want on your team. He is an athletic freak with a great motor and a nose for the ball. He is not the most skilled player, but he is a natural passer and leads the nation in dunks. Plus, he has shown flashes of mid-range scoring. Wilson has showcased unlimited defensive potential, but he will need to apply himself more consistently before he is known as an elite defender.",
    article: {
      title: "Caleb Wilson: To Doubt, or To Believe?",
      tag: "Stephen Gillaspie",
      href: "https://www.noceilingsnba.com/p/caleb-wilson-to-doubt-or-to-believe?utm_source=publication-search",
      img: "/caleb_wilson_doubt.png",
      authorImg: "/stephen_gillaspie.png"
    },
    badges: ["athlete", "unlimited potential"]
  },
  {
    id: "overall-5",
    rank: 5,
    name: "Kingston Flemings",
    pos: "Guard",
    posHeight: "Guard - 6'4",
    team: "Houston",
    teamColor: "#C8102E",
    logoSrc: "/houston_logo.png",
    logoScale: 1.25,
    href: "#",
    prevRankText: "(↑1)",
    measurements: "6’4”, 190",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "17.0 PTS | 3.4 REB | 5.4 AST | 1.8 STL | 0.3 BLK",
    splitsLine: "51.4 FG% | 39.1 3P% | 82.5 FT%",
    gamesMinsLine: "21 Games | 31.1 MIN",
    bio: "Flemings is an athletic two-way guard who has the versatility to play on and off the ball. He is an elite passer, a great inside-the-arc scorer, and a tenacious defender. While Flemings' quickness allows him to get to the bucket easily at this level, time will tell if he will be able to create his own shot in the NBA. The only other potential weakness is his outside shot, which shows promise despite his unconventional release and low volume.",
    article: {
      title: "The Ice Cream Truck Class of Point Guards",
      tag: "Tyler Rucker",
      href: "https://www.noceilingsnba.com/i/186643718/kingston-flemings-g-houston",
      img: "/pg_ice_cream.png",
      authorImg: "/tyler_rucker.png"
    },
    badges: ["dimer", "disruptor"]
  },
  {
    id: "overall-6",
    rank: 6,
    name: "Mikel Brown Jr.",
    pos: "Guard",
    posHeight: "Guard - 6'5",
    team: "Louisville",
    teamColor: "#AD0000",
    logoSrc: "/louisville_logo.png",
    href: "#",
    prevRankText: "(↑1)",
    measurements: "6’5”, 190",
    yearAge: "Freshman (19)",
    asOf: "2/2/26",
    statsLine: "16.4 PTS | 2.9 REB | 5.0 AST | 0.8 STL | 0.1 BLK",
    splitsLine: "38.5 FG% | 28.3 3P% | 80.7 FT%",
    gamesMinsLine: "13 Games | 27.8 MIN",
    bio: "Brown is a ",
    article: {
      title: "The Ice Cream Truck Class of Point Guards",
      tag: "Tyler Rucker",
      href: "https://www.noceilingsnba.com/i/186643718/mikel-brown-jr-g-louisville",
      img: "/pg_ice_cream.png",
      authorImg: "/tyler_rucker.png"
    },
    badges: ["dimer", "unlimited potential"]
  },
  {
    id: "overall-7",
    rank: 7,
    name: "Keaton Wagler",
    pos: "Guard",
    posHeight: "Guard - 6'6",
    team: "Illinois",
    teamColor: "#E84A27",
    logoSrc: "/illinois_logo.png",
    logoScale: 0.85,
    href: "#",
    prevRankText: "(↑12)",
    measurements: "6’6”, 180",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "17.7 PTS | 5.0 REB | 4.2 AST | 0.8 STL | 0.2 BLK",
    splitsLine: "48.0 FG% | 43.7 3P% | 81.5 FT%",
    gamesMinsLine: "21 Games | 32.0 MIN",
    bio: "Wagler is a lanky guard who knocks down shots from the logo and always makes the right play. Despite being an underrecruited freshman, Wagler's dependable, unfazed nature and ability to protect the ball make him a leader on Illinois. Wagler is super skinny and may get bullied in his NBA adolescence but will doubtlessly be a productive player on his own schedule.",
    article: {
      title: "Keaton Wagler: Prospect Spotlight",
      tag: "Stephen Gillaspie",
      href: "https://www.noceilingsnba.com/p/keaton-wagler-not-even-supposed-to?utm_source=publication-search",
      img: "/keaton_wagler_article.png",
      authorImg: "/stephen_gillaspie.png"
    },
    badges: ["shooter", "unlimited potential"]
  },
  {
    id: "overall-8",
    rank: 8,
    name: "Darius Acuff Jr.",
    pos: "Guard",
    posHeight: "Guard - 6'3",
    team: "Arkansas",
    teamColor: "#9D2235",
    logoSrc: "/arkansas_logo.png",
    href: "#",
    prevRankText: "(↑4)",
    measurements: "6’3”, 190",
    yearAge: "Freshman (18)",
    asOf: "2/2/26",
    statsLine: "20.3 PTS | 2.9 REB | 6.2 AST | 0.8 STL | 0.5 BLK",
    splitsLine: "49.1 FG% | 40.8 3P% | 77.2 FT%",
    gamesMinsLine: "22 Games | 33.6 MIN",
    bio: "Acuff is a well-rounded true point guard. He is a relentless offensive engine both for himself and his teammates. He tries hard on defense, but is very limited. Despite his strong build, Acuff falls into the small, ball-dominant guard archetype that is becoming less valuable in the NBA.",
    article: {
      title: "The Ice Cream Truck Class of Point Guards",
      tag: "Tyler Rucker",
      href: "https://www.noceilingsnba.com/i/186643718/darius-acuff-jr-g-arkansas",
      img: "/pg_ice_cream.png",
      authorImg: "/tyler_rucker.png"
    },
    badges: ["shooter", "dimer"]
  },
  {
    id: "overall-9",
    rank: 9,
    name: "Jayden Quaintance",
    pos: "Big",
    posHeight: "Big - 6'10",
    team: "Kentucky",
    teamColor: "#0033a0",
    logoSrc: "/kentucky_logo.png",
    href: "#",
    prevRankText: "(↓4)",
    measurements: "6’10”, 255",
    yearAge: "Sophomore (18)",
    asOf: "2/2/26",
    statsLine: "5.0 PTS | 5.0 REB | 0.5 AST | 0.5 STL | 0.8 BLK",
    splitsLine: "57.1 FG% | 0 3P% | 30.8 FT%",
    gamesMinsLine: "4 Games | 16.8 MIN",
    bio: "Quaintance is the most physically dominant athlete in this class. Unfortunately, that is about all that he has proven thus far. He cannot shoot at all and is extremely uncoordinated. He has shown close to zero offensive skill. That said, he might be the best defender available this year. He is a roaming paint protector who seems to contest every shot and deter even more.",
    article: {
      title: "A Wounded Wondering on Jayden Quaintance",
      tag: "Rowan Kent",
      href: "https://www.noceilingsnba.com/p/magic-8-ballers-a-wounded-wondering?utm_source=publication-search",
      img: "/jayden_quaintance_wounded.png",
      authorImg: "/rowan_kent.png"
    },
    badges: ["rim protector", "unlimited potential"]
  },
  {
    id: "overall-10",
    rank: 10,
    name: "Labaron Philon",
    pos: "Guard",
    posHeight: "Guard - 6'4",
    team: "Alabama",
    teamColor: "#9e1b32",
    logoSrc: "/bama_logo.png",
    href: "#",
    prevRankText: "(↓2)",
    measurements: "6’4”, 185",
    yearAge: "Sophomore (20)",
    asOf: "2/2/26",
    statsLine: "22.0 PTS | 3.5 REB | 5.1 AST | 1.4 STL | 0.2 BLK",
    splitsLine: "51.6 FG% | 37.0 3P% | 76.1 FT%",
    gamesMinsLine: "19 Games | 29.4 MIN",
    bio: "Philon is a shifty, high-IQ lead guard who excels at manipulating defenses with his combination of scoring and passing. On the defensive end, he is a tenacious perimeter defender with quick hands and good instincts. His biggest weaknesses are his slender frame and unproven outside shooting, though he has shot the three well this season.",
    article: {
      title: "Labaron Philon: The Sophomore Surge",
      tag: "Rowan Kent",
      href: "https://www.noceilingsnba.com/p/labaron-philon-the-sophomore-surge",
      img: "/labaron_philon_surge.png",
      authorImg: "/rowan_kent.png"
    },
    badges: ["dimer", "disruptor"]
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
                          style={{ transform: `scale(${p.logoScale ?? 1})` }}
                      />
                  </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-bold text-white">
                  {p.name}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                  <span className="truncate">{p.posHeight}</span>
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

          const href = `/prospects/${slugifyName(p.name)}`;

          return (
            <Link key={p.id} href={href} className="block">
              {Row}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
