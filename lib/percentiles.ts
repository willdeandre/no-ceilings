// lib/percentiles.ts
export type PercentileMethod = "rank" | "ecdf";

// "rank": percentile = rank/(n-1) -> 0..1 inclusive
// "ecdf": percentile = (# <= x)/n -> (0,1] ish
export function computePercentiles<T extends Record<string, any>>(
    rows: T[],
    fields: (keyof T)[],
    method: PercentileMethod = "rank"
): Array<T & { __pct: Partial<Record<keyof T, number>> }> {
    const n = rows.length;

    // pre-collect numeric arrays per field
    const valuesByField = new Map<keyof T, number[]>();

    for (const f of fields) {
        const vals: number[] = [];
        for (const r of rows) {
            const v = r[f];
            if (typeof v === "number" && Number.isFinite(v)) vals.push(v);
        }
        vals.sort((a, b) => a - b);
        valuesByField.set(f, vals);
    }

    const percentileOf = (sorted: number[], x: number) => {
        if (!sorted.length) return null;

        // upper_bound index: count of values <= x
        let lo = 0;
        let hi = sorted.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted[mid] <= x) lo = mid + 1;
            else hi = mid;
        }
        const leq = lo; // count <= x

        if (method === "ecdf") {
            return leq / sorted.length; // (0..1]
        }

        // "rank": map to 0..1 with endpoints
        if (sorted.length === 1) return 1;
        const rank = Math.max(0, leq - 1); // last index <= x
        return rank / (sorted.length - 1);
    };

    return rows.map((r) => {
        const __pct: Partial<Record<keyof T, number>> = {};
        for (const f of fields) {
            const v = r[f];
            if (typeof v === "number" && Number.isFinite(v)) {
                const sorted = valuesByField.get(f)!;
                const p = percentileOf(sorted, v);
                if (p !== null) __pct[f] = p;
            }
        }
        return { ...r, __pct };
    });
}
