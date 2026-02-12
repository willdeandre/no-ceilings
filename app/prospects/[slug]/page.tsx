import Image from "next/image";
import SmartLink from "@/components/SmartLink";
import { TOP_10_OVERALL } from "@/components/top10overall-data";
import { Target, Zap, Hand, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { getPlayerMasterBundle, type PlayerMasterRow, type PlayerMasterPercentiles } from "@/components/playerMaster";
import ProspectStatsPanel from "@/components/ProspectStatsPanel";
import { slugifyName } from "@/lib/slugify";

type ProspectBase = (typeof TOP_10_OVERALL)[number];

// p has identity/design from TOP_10_OVERALL + stats from playerMaster
type ProspectFull = ProspectBase & Partial<PlayerMasterRow>;


const BADGE_MAP = {
    shooter: { label: "Shooter", Icon: Target },
    dimer: { label: "Dimer", Icon: Hand },
    athlete: { label: "Athlete", Icon: Zap },
    disruptor: { label: "Disruptor", Icon: ShieldAlert },
    "rim protector": { label: "Rim Protector", Icon: ShieldCheck },
    "unlimited potential": { label: "Unlimited Potential", Icon: Sparkles },
  };

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ProspectPage({ params }: PageProps) {
    const { slug } = await params; // ✅ unwrap Promise
    const decodedSlug = decodeURIComponent(slug);

    const base = TOP_10_OVERALL.find((x) => slugifyName(x.name) === decodedSlug);

    if (!base) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white text-2xl font-black uppercase">Prospect Not Found</h1>
                    <SmartLink
                        href="/"
                        className="text-brand-orange mt-4 inline-block uppercase text-xs font-bold tracking-widest"
                    >
                        ← Back to Board
                    </SmartLink>
                </div>
            </main>
        );
    }

    const bundle = await getPlayerMasterBundle();
    const master = bundle.bySlug[decodedSlug] ?? null;
    const pct = bundle.pctBySlug[decodedSlug] ?? null;

    const p: ProspectFull = { ...base, ...(master ?? {}) };

    const headshotSrc = `/${slugifyName(p.name)}.png`;
    const backgroundGraphicSrc = `/${slugifyName(p.name)}-full.png`;

    const parts = p.name.split(" ");
    const first = parts[0] ?? p.name;
    const rest = parts.slice(1).join(" ");

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <div className="mx-auto max-w-5xl px-6 py-12">
                {/* 1. Header Navigation */}
                <div className="mb-12 flex items-center justify-between">
                    <SmartLink
                        href="/"
                        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition"
                    >
                        <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to Big Board
                    </SmartLink>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                        Class of 2026 <span className="mx-2">/</span>{" "}
                        <span className="text-zinc-400">Ref: {p.asOf}</span>
                    </div>
                </div>

                <section className="relative mb-8 overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-950/50 p-8 md:p-12">
                    {/* subtle neutral glow */}
                    <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-white/[0.02] blur-[100px]" />

                    {/* RIGHT RAIL: full-height, fixed width */}
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[120px] sm:w-[140px] md:w-[170px]">
                        <div
                            className="relative h-full w-full overflow-hidden border-l border-white/10 rounded-l-none rounded-r-[3rem]"
                            style={{ backgroundColor: p.teamColor }}
                        >
                            {/* depth */}
                            <div className="absolute inset-0" />

                            {/* cutout */}
                            <div className="relative h-full w-full">
                                <Image
                                    src={backgroundGraphicSrc}
                                    alt=""
                                    fill
                                    className="object-contain object-center scale-125"
                                    priority={false}
                                />
                            </div>

                            {/* inner frame */}
                            <div className="pointer-events-none absolute inset-3 rounded-l-none rounded-r-[2.5rem]" />
                        </div>
                    </div>

                    {/* CONTENT: padded so it never overlaps the rail */}
                    <div className="relative z-10 pr-[140px] sm:pr-[170px] md:pr-[210px]">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-[340px_1fr] md:items-stretch">
                            {/* LEFT: headshot + badges */}
                            <div className="flex flex-col items-center md:items-start">
                                <div className="relative aspect-square w-64 shrink-0 md:w-80 overflow-visible flex items-center justify-center">
                                    <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none transform scale-160">
                                        <Image src={p.logoSrc} alt="" fill className="object-contain" />
                                    </div>
                                    <div className="absolute h-48 w-48 rounded-full blur-[80px] -z-10" />
                                    <div className="relative z-10 w-full h-full scale-125">
                                        <Image
                                            src={headshotSrc}
                                            alt={p.name}
                                            fill
                                            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                                            priority
                                        />
                                    </div>
                                </div>

                                <div
                                    className="z-20 -mt-6 self-center flex gap-2 rounded-2xl border border-white/10 p-1.5 shadow-2xl"
                                    style={{ backgroundColor: p.teamColor }}
                                >
                                    {p.badges?.map((badgeKey) => {
                                        const badge = BADGE_MAP[badgeKey as keyof typeof BADGE_MAP];
                                        if (!badge) return null;
                                        const Icon = badge.Icon;

                                        return (
                                            <div
                                                key={badgeKey}
                                                className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-black shadow-sm"
                                            >
                                                <Icon size={16} style={{ color: p.teamColor }} />
                                                <span className="text-[10px] font-black uppercase tracking-tighter">
                                                    {badge.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* RIGHT: identity */}
                            <div className="flex flex-col justify-center gap-6 text-center md:text-left">
                                <div className="flex items-center justify-center gap-4 md:justify-start">
                                    <span className="text-6xl font-black italic tracking-tighter text-white/10">
                                        #{p.rank}
                                    </span>
                                </div>

                                {(() => {
                                    const parts = p.name.split(" ");
                                    const first = parts[0] ?? p.name;
                                    const rest = parts.slice(1).join(" ");
                                    return (
                                        <h1 className="text-5xl font-black uppercase tracking-tight md:text-7xl leading-[0.95]">
                                            {first}
                                            <br />
                                            <span className="text-brand-orange">{rest}</span>
                                        </h1>
                                    );
                                })()}

                                <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-8 w-8">
                                            <Image src={p.logoSrc} alt={p.team} fill className="object-contain" />
                                        </div>
                                        <span className="text-sm font-bold tracking-widest uppercase">{p.team}</span>
                                    </div>

                                    <div className="h-4 w-px bg-white/10" />
                                    <span className="text-sm text-zinc-400 font-medium">{p.posHeight}</span>
                                    <div className="h-4 w-px bg-white/10" />
                                    <span className="text-sm text-zinc-400 font-medium">{p.yearAge}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ProspectStatsPanel p={p} master={master} pct={pct} />

                {/* 5. Player Article (Full Width Version) */}
                {p.article && (
                    <section className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-white italic tracking-tight uppercase">
                                FEATURED SCOUTING REPORT
                            </h2>
                            <SmartLink
                                href="https://www.noceilingsnba.com/archive"
                                className="text-sm font-bold text-zinc-400 hover:text-brand-orange transition uppercase tracking-widest"
                            >
                                View Archive
                            </SmartLink>
                        </div>

                        <SmartLink
                            href={p.article.href}
                            className="group relative block w-full overflow-hidden rounded-[3rem] bg-zinc-900 aspect-[16/9] md:aspect-[21/9] transition-all hover:-translate-y-2 border border-white/5"
                        >
                            <Image
                                src={p.article.img}
                                alt={p.article.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-orange">
                                        <Image src={p.article.authorImg} alt={p.article.tag} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black tracking-widest text-brand-orange uppercase">
                                            Written By
                                        </p>
                                        <p className="text-sm font-bold text-white uppercase">{p.article.tag}</p>
                                    </div>
                                </div>

                                <h3 className="mt-6 text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
                                    {p.article.title}
                                </h3>

                                <div className="mt-8 inline-flex items-center text-xs font-black text-white uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md w-fit px-6 py-3 rounded-full border border-white/10 group-hover:bg-brand-orange group-hover:border-brand-orange transition-colors">
                                    Read Full Report
                                    <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </SmartLink>
                    </section>
                )}
            </div>
        </main>
    );
}
