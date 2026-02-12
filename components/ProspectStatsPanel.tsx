// components/ProspectStatsPanel.tsx

"use client";

import { useState } from "react";
import type { PlayerMasterRow, PlayerMasterPercentiles } from "@/components/playerMaster";

type Props = {
    p: any; // keep loose for now (base prospect fields like measurements, prevRankText, teamColor)
    master: PlayerMasterRow | null; // raw stats row
    pct: PlayerMasterPercentiles | null; // percentile map (0..1)
};

type Mode = "stats" | "pct";

export default function ProspectStatsPanel({ p, master, pct }: Props) {
    const [mode, setMode] = useState<Mode>("stats");

    // ---- formatters ----
    const fmt1 = (n: number | null | undefined) =>
        typeof n === "number" && Number.isFinite(n) ? n.toFixed(1) : "—";

    const fmt0 = (n: number | null | undefined) =>
        typeof n === "number" && Number.isFinite(n) ? Math.round(n).toString() : "—";

    // raw % fields might be 0..1 or 0..100, so handle both
    const fmtPctRaw = (n: number | null | undefined) => {
        if (typeof n !== "number" || !Number.isFinite(n)) return "—";
        const pctVal = n > 0 && n <= 1 ? n * 100 : n;
        return `${pctVal.toFixed(1)}%`;
    };

    // percentile is expected 0..1 -> show whole percent like "54%"
    const fmtPctile = (n: number | null | undefined) => {
        if (typeof n !== "number" || !Number.isFinite(n)) return "—";
        const whole = Math.round(n * 100);
        return `${whole}%`;
    };

    // ---- getter: returns a string to display for a given field ----
    const display = (field: keyof PlayerMasterRow, rawFmt: (v: any) => string) => {
        if (mode === "stats") return rawFmt(master?.[field]);
        return fmtPctile(pct?.[field]);
    };

    // ---- UI helpers ----
    const StatBox = ({ value, label }: { value: string; label: string }) => (
        <div>
            <div className="text-3xl font-black text-white">{value}</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{label}</div>
        </div>
    );

    const MiniStat = ({ value, label }: { value: string; label: string }) => (
        <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{value}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mt-1">
                {label}
            </span>
        </div>
    );

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{title}</h3>
            </div>

            {children}
        </div>
    );

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* LEFT: main stats */}
            <div className="md:col-span-2 rounded-[2.5rem] border border-white/5 bg-zinc-950/40 p-8">
                {/* Season Averages */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                            Season Averages
                        </h3>

                        {/* global toggle */}
                        <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
                            <button
                                type="button"
                                onClick={() => setMode("stats")}
                                aria-pressed={mode === "stats"}
                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest transition ${mode === "stats" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                Stats
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode("pct")}
                                aria-pressed={mode === "pct"}
                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest transition ${mode === "pct" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                Percentiles
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
                        <StatBox value={display("ppg", fmt1)} label="PPG" />
                        <StatBox value={display("astpg", fmt1)} label="AST" />
                        <StatBox value={display("totalrebpg", fmt1)} label="REB" />
                        <StatBox value={display("spg", fmt1)} label="STL" />
                        <StatBox value={display("bpg", fmt1)} label="BLK" />
                        <StatBox value={display("topg", fmt1)} label="TOV" />
                    </div>
                </div>

                {/* Efficiency Splits */}
                <div className="mt-10 border-t border-white/5 pt-8">
                    <Section title="Efficiency Splits">
                        <div className="flex flex-wrap gap-8">
                            <MiniStat value={display("fgPercent", fmtPctRaw)} label="FG%" />
                            <MiniStat value={display("twoPercent", fmtPctRaw)} label="2P%" />
                            <MiniStat value={display("threePercent", fmtPctRaw)} label="3P%" />
                            <MiniStat value={display("ftPercent", fmtPctRaw)} label="FT%" />
                            <MiniStat value={display("tsPercent", fmtPctRaw)} label="TS%" />
                            <MiniStat value={display("efgPercent", fmtPctRaw)} label="eFG%" />
                        </div>
                    </Section>
                </div>

                {/* Defense */}
                <div className="mt-10 border-t border-white/5 pt-8">
                    <Section title="Defense">
                        <div className="flex flex-wrap gap-8">
                            <MiniStat value={display("drating", fmt1)} label="DRTG" />
                            <MiniStat value={display("dws", fmt1)} label="DWS" />
                            <MiniStat value={display("dbpm", fmt1)} label="DBPM" />
                            <MiniStat value={display("stlrate", fmtPctRaw)} label="STL%" />
                            <MiniStat value={display("blkrate", fmtPctRaw)} label="BLK%" />
                        </div>
                    </Section>
                </div>

                {/* Rebounding */}
                <div className="mt-10 border-t border-white/5 pt-8">
                    <Section title="Rebounding">
                        <div className="flex flex-wrap gap-8">
                            <MiniStat value={display("orebrate", fmtPctRaw)} label="OREB%" />
                            <MiniStat value={display("drebrate", fmtPctRaw)} label="DREB%" />
                            <MiniStat value={display("totalrebrate", fmtPctRaw)} label="TREB%" />
                        </div>
                    </Section>
                </div>

                {/* Creation */}
                <div className="mt-10 border-t border-white/5 pt-8">
                    <Section title="Creation">
                        <div className="flex flex-wrap gap-8">
                            <MiniStat value={display("astrate", fmtPctRaw)} label="AST%" />
                            <MiniStat value={display("tovrate", fmtPctRaw)} label="TOV%" />
                            <MiniStat value={display("usgrate", fmtPctRaw)} label="USG%" />
                        </div>
                    </Section>
                </div>

                {/* Overall Impact */}
                <div className="mt-10 border-t border-white/5 pt-8">
                    <Section title="Overall Impact">
                        <div className="flex flex-wrap gap-8">
                            <MiniStat value={display("ws", fmt1)} label="WS" />
                            <MiniStat value={display("ortg", fmt1)} label="ORTG" />
                            <MiniStat value={display("drating", fmt1)} label="DRTG" />
                            <MiniStat value={display("ows", fmt1)} label="OWS" />
                            <MiniStat value={display("dws", fmt1)} label="DWS" />
                            <MiniStat value={display("obpm", fmt1)} label="OBPM" />
                            <MiniStat value={display("dbpm", fmt1)} label="DBPM" />
                        </div>
                    </Section>
                </div>
            </div>

            {/* RIGHT: physicals + trend */}
            <div className="flex flex-col gap-4">
                <div className="flex-1 rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8">
                    <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        Physicals
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Height / Weight</div>
                            <div className="text-lg font-bold">{p.measurements}</div>
                        </div>

                        <div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Availability</div>
                            <div className="text-lg font-bold">
                                {mode === "stats"
                                    ? `${fmt0(master?.gamesPlayed)} GP / ${fmt1(master?.mpg)} MPG`
                                    : `${fmtPctile(pct?.gamesPlayed)} GP / ${fmtPctile(pct?.mpg)} MPG`}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                                Quick Profile
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-300">
                                {p.bio}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-brand-orange/20 bg-brand-orange/5 p-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange mb-2">Trend</p>
                    <div className="text-2xl font-black italic">{p.prevRankText}</div>
                </div>
            </div>
        </div>
    );
}
