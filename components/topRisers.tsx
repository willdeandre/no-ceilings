// components/topRisers.tsx
import Image from "next/image";
import Link from "next/link";

export type RiserProspect = {
    id: string;
    name: string;
    team: string;
    posHeight: string;
    rank: number; // current rank (optional if you want to show it)
    logoSrc: string;
    href?: string;
    prevRankText: string;
};

type TopRisersProps = {
    title?: string;
    items?: RiserProspect[];
    className?: string;
};

function movementClass(prevRankText: string) {
    if (prevRankText.includes("↑")) return "text-emerald-400";
    if (prevRankText.includes("↓")) return "text-red-400";
    return "text-white/60";
}

/**
 * HARD-CODED TOP RISERS
 * Fill in team, logoSrc, posHeight, rank, and href when ready.
 */
const TOP_RISERS: RiserProspect[] = [
    {
        id: "riser-1",
        name: "Amari Allen",
        team: "Alabama",
        posHeight: "Forward - 6'8",
        rank: 0,
        logoSrc: "/bama_logo.png",
        href: "#",
        prevRankText: "(↑36)",
    },
    {
        id: "riser-2",
        name: "Morez Johnson Jr.",
        team: "Michigan",
        posHeight: "Big - 6'9",
        rank: 0,
        logoSrc: "/michigan_logo.png",
        href: "#",
        prevRankText: "(↑17)",
    },
    {
        id: "riser-3",
        name: "Brayden Burries",
        team: "Arizona",
        posHeight: "Guard - 6'4",
        rank: 0,
        logoSrc: "/arizona_logo.png",
        href: "#",
        prevRankText: "(↑14)",
    },
    {
        id: "riser-4",
        name: "Keaton Wagler",
        team: "Illinois",
        posHeight: "Guard - 6'6",
        rank: 0,
        logoSrc: "/illinois_logo.png",
        href: "#",
        prevRankText: "(↑12)",
    },
    {
        id: "riser-5",
        name: "Ebuka Okorie",
        team: "Stanford",
        posHeight: "Guard - 6'2",
        rank: 0,
        logoSrc: "/stanford_logo.png",
        href: "#",
        prevRankText: "(↑11)",
    },
];

export default function TopRisers({
    title = "Top Risers",
    items = TOP_RISERS,
    className = "",
}: TopRisersProps) {
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
                {items.slice(0, 5).map((p, i) => {
                    const Row = (
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:border-brand-orange transition">

                            {/* list index instead of rank for risers */}
                            <div className="w-6 text-center text-[14px] font-black text-brand-orange">
                                {i + 1}
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
                                </div>
                            </div>

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
