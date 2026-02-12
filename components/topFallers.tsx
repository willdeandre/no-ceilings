// components/topFallers.tsx
import Image from "next/image";
import Link from "next/link";

export type FallerProspect = {
    id: string;
    name: string;
    team: string;
    pos: string;
    posHeight: string;
    rank: number; // current rank
    logoSrc: string;
    href?: string;

    // movement (should be ↓...)
    prevRankText: string;

    // optional extra info (keep for later parity with your modals/tooltips)
    measurements?: string;
    yearAge?: string;
    asOf?: string;
    statsLine?: string;
    splitsLine?: string;
    gamesMinsLine?: string;
};

type TopFallersProps = {
    title?: string;
    items?: FallerProspect[];
    className?: string;
};

function movementClass(prevRankText: string) {
    const t = prevRankText.toLowerCase();
    if (t.includes("↔")) return "text-white/60";
    if (t.includes("↑")) return "text-emerald-400";
    if (t.includes("↓")) return "text-red-400";
    return "text-white/60";
}

/**
 * PLACEHOLDER TOP 5 FALLERS
 * Replace with your real hard-coded list.
 */
const TOP_FALLERS: FallerProspect[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `faller-${i + 1}`,
    rank: i + 1,
    name: "",
    team: "School",
    pos: "Forward",
    posHeight: "Forward - 6'8",
    logoSrc: "/placeholder-logo.png",
    href: "#",
    prevRankText: "(↓2)",
    measurements: "6’8”, 215",
    yearAge: "Freshman (19)",
    asOf: "2/4/26",
    statsLine: "—",
    splitsLine: "—",
    gamesMinsLine: "—",
}));

export default function TopFallers({
    title = "Top Fallers",
    items = TOP_FALLERS,
    className = "",
}: TopFallersProps) {
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
                {items.slice(0, 5).map((p) => {
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
