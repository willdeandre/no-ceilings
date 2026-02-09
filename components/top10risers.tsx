// components/top10risers.tsx
import Image from "next/image";
import Link from "next/link";

export type Prospect = {
    id: string;
    name: string;
    team: string;
    pos: string;
    rank: number;
    delta: number; // + = rising, - = falling
    logoSrc: string; // e.g. "/logos/duke.png"
    href?: string; // optional link to player/profile
};

type Top10RisersProps = {
    title?: string;
    items?: Prospect[];
    className?: string;
};

const PLACEHOLDER_RISERS: Prospect[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `riser-${i + 1}`,
    name: "Prospect Name",
    team: "School/Team",
    pos: "G",
    rank: i + 1,
    delta: 6 - i, // just to show variety
    logoSrc: "/placeholder-logo.png",
    href: "#",
}));

function DeltaPill({ delta }: { delta: number }) {
    const isUp = delta > 0;
    const isDown = delta < 0;
    const label = isUp ? `+${delta}` : isDown ? `${delta}` : "—";

    return (
        <span
            className={[
                "inline-flex items-center justify-center rounded-full px-2 py-1 text-[10px] font-black tracking-widest",
                isUp ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25" : "",
                isDown ? "bg-rose-500/15 text-rose-300 border border-rose-500/25" : "",
                !isUp && !isDown ? "bg-white/10 text-white/70 border border-white/10" : "",
            ].join(" ")}
            aria-label={`Rank change ${label}`}
            title={`Rank change ${label}`}
        >
            {label}
        </span>
    );
}

export default function Top10Risers({
    title = "Top 10 Risers",
    items = PLACEHOLDER_RISERS,
    className = "",
}: Top10RisersProps) {
    return (
        <section
            className={[
                "rounded-[1.5rem] bg-zinc-950/60 border border-white/10 p-4",
                className,
            ].join(" ")}
        >
            <div className="flex items-baseline justify-between">
                <h3 className="text-white font-black tracking-widest text-xs uppercase">
                    {title}
                </h3>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    Placeholder
                </span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {items.slice(0, 10).map((p) => {
                    const Row = (
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:border-white/20 transition">
                            <div className="w-6 text-center text-[11px] font-black text-brand-orange">
                                {p.rank}
                            </div>

                            <div className="relative h-6 w-6 overflow-hidden rounded-md bg-white/10 border border-white/10 shrink-0">
                                <Image src={p.logoSrc} alt={`${p.team} logo`} fill className="object-cover" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="truncate text-[12px] font-bold text-white">
                                    {p.name}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-wider">
                                    <span className="truncate">{p.team}</span>
                                    <span className="text-white/20">•</span>
                                    <span>{p.pos}</span>
                                </div>
                            </div>

                            <DeltaPill delta={p.delta} />
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
