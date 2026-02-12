// components/playerMaster.ts
import fs from "node:fs/promises";
import path from "node:path";
import { slugifyName } from "@/lib/slugify";
import { computePercentiles } from "@/lib/percentiles";

export type PlayerMasterRow = {
    name: string;

    // season averages
    ppg: number | null;
    astpg: number | null;
    totalrebpg: number | null;
    spg: number | null;
    bpg: number | null;
    topg: number | null;

    // efficiency
    fgPercent: number | null;
    twoPercent: number | null;
    threePercent: number | null;
    ftPercent: number | null;
    tsPercent: number | null;
    efgPercent: number | null;

    // availability
    gamesPlayed: number | null;
    mpg: number | null;

    // defense
    drating: number | null;
    dws: number | null;
    dbpm: number | null;
    stlrate: number | null;
    blkrate: number | null;

    // rebounding
    orebrate: number | null;
    drebrate: number | null;
    totalrebrate: number | null;

    // creation
    astrate: number | null;
    tovrate: number | null;
    usgrate: number | null;

    // impact
    ws: number | null;
    ortg: number | null;
    ows: number | null;
    obpm: number | null;
};

function toNum(v: unknown): number | null {
    if (v === null || v === undefined) return null;
    const s = String(v).trim();
    if (!s) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
}

// basic csv row split that handles quotes
function splitCsvLine(line: string): string[] {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '"') {
            // handle escaped quotes ("")
            if (inQuotes && line[i + 1] === '"') {
                cur += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (ch === "," && !inQuotes) {
            out.push(cur);
            cur = "";
            continue;
        }

        cur += ch;
    }

    out.push(cur);
    return out.map((x) => x.trim());
}

function normalizeRow(r: Record<string, string>): PlayerMasterRow {
    // keys MUST match your CSV header exactly (case-sensitive)
    return {
        name: String(r.name ?? ""),

        ppg: toNum(r.ppg),
        astpg: toNum(r.astpg),
        totalrebpg: toNum(r.totalrebpg),
        spg: toNum(r.spg),
        bpg: toNum(r.bpg),
        topg: toNum(r.topg),

        fgPercent: toNum(r.fgPercent),
        twoPercent: toNum(r.twoPercent),
        threePercent: toNum(r.threePercent),
        ftPercent: toNum(r.ftPercent),
        tsPercent: toNum(r.tsPercent),
        efgPercent: toNum(r.efgPercent),

        gamesPlayed: toNum(r.gamesPlayed),
        mpg: toNum(r.mpg),

        drating: toNum(r.drating),
        dws: toNum(r.dws),
        dbpm: toNum(r.dbpm),
        stlrate: toNum(r.stlrate),
        blkrate: toNum(r.blkrate),

        orebrate: toNum(r.orebrate),
        drebrate: toNum(r.drebrate),
        totalrebrate: toNum(r.totalrebrate),

        astrate: toNum(r.astrate),
        tovrate: toNum(r.tovrate),
        usgrate: toNum(r.usgrate),

        ws: toNum(r.ws),
        ortg: toNum(r.ortg),
        ows: toNum(r.ows),
        obpm: toNum(r.obpm),
    };
}

// --------------------
// loading + caching
// --------------------
let _bySlugCache: Record<string, PlayerMasterRow> | null = null;

export async function getPlayerMasterBySlug(): Promise<Record<string, PlayerMasterRow>> {
    if (_bySlugCache) return _bySlugCache;

    // expects: /components/playerMaster.csv
    const csvPath = path.join(process.cwd(), "components", "playerMaster.csv");
    const raw = await fs.readFile(csvPath, "utf8");

    const lines = raw
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

    if (lines.length < 2) {
        _bySlugCache = {};
        return _bySlugCache;
    }

    const headers = splitCsvLine(lines[0]);

    const rows = lines.slice(1).map((line) => {
        const cells = splitCsvLine(line);
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
            obj[h] = cells[i] ?? "";
        });
        return normalizeRow(obj);
    });

    _bySlugCache = Object.fromEntries(rows.map((r) => [slugifyName(r.name), r]));
    return _bySlugCache;
}

// --------------------
// percentiles
// --------------------
export type PlayerMasterPercentiles = Partial<Record<keyof PlayerMasterRow, number>>;

export type PlayerMasterBundle = {
    rows: PlayerMasterRow[];
    bySlug: Record<string, PlayerMasterRow>;
    pctBySlug: Record<string, PlayerMasterPercentiles>;
};

let _bundleCache: PlayerMasterBundle | null = null;

export async function getPlayerMasterBundle(): Promise<PlayerMasterBundle> {
    if (_bundleCache) return _bundleCache;

    const bySlug = await getPlayerMasterBySlug();
    const rows = Object.values(bySlug);

    const PCT_FIELDS: (keyof PlayerMasterRow)[] = [
        "ppg",
        "astpg",
        "totalrebpg",
        "spg",
        "bpg",
        "topg",

        "fgPercent",
        "twoPercent",
        "threePercent",
        "ftPercent",
        "tsPercent",
        "efgPercent",

        "gamesPlayed",
        "mpg",

        "drating",
        "dws",
        "dbpm",
        "stlrate",
        "blkrate",

        "orebrate",
        "drebrate",
        "totalrebrate",

        "astrate",
        "tovrate",
        "usgrate",

        "ws",
        "ortg",
        "ows",
        "obpm",
    ];

    // make "higher percentile = better" for these by inverting after compute
    const LOWER_BETTER: (keyof PlayerMasterRow)[] = ["topg", "tovrate", "drating"];

    const withPct = computePercentiles(rows, PCT_FIELDS, "rank");

    const pctBySlug: Record<string, PlayerMasterPercentiles> = {};
    for (const r of withPct) {
        const slug = slugifyName(r.name);
        const raw = (r as any).__pct as PlayerMasterPercentiles;

        const adjusted: PlayerMasterPercentiles = { ...raw };
        for (const f of LOWER_BETTER) {
            const p = adjusted[f];
            if (typeof p === "number") adjusted[f] = 1 - p;
        }

        pctBySlug[slug] = adjusted;
    }

    _bundleCache = { rows, bySlug, pctBySlug };
    return _bundleCache;
}

export type StatMode = "raw" | "pct";

/**
 * returns raw numeric value (mode="raw") or percentile as an integer percent 0..100 (mode="pct")
 * ex: 0.541 -> 54
 */
export function getStat(
    bundle: PlayerMasterBundle,
    slug: string,
    field: keyof PlayerMasterRow,
    mode: StatMode
): number | null {
    if (mode === "raw") {
        const row = bundle.bySlug[slug];
        const v = row?.[field];
        return typeof v === "number" && Number.isFinite(v) ? v : null;
    }

    const p = bundle.pctBySlug[slug]?.[field];
    if (typeof p !== "number" || !Number.isFinite(p)) return null;

    // p is 0..1; convert to whole percent (no decimals)
    const whole = Math.round(p * 100);

    // clamp just in case
    return Math.max(0, Math.min(100, whole));
}

/**
 * convenience: returns "54%" (no decimals) for percentile mode.
 * returns null for raw mode (so you don't accidentally render raw as percent).
 */
export function getStatPctLabel(
    bundle: PlayerMasterBundle,
    slug: string,
    field: keyof PlayerMasterRow
): string | null {
    const v = getStat(bundle, slug, field, "pct");
    if (v === null) return null;
    return `${v}%`;
}
