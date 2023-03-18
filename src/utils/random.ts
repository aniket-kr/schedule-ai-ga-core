const BIG_PRIME_NUM = Math.pow(2, 31) - 1;

export function uniform(): number {
    return Math.random();
}

export function int(lo: number, hi: number): number {
    const rand = Math.round(Math.random() * BIG_PRIME_NUM);
    return lo + (rand % (hi - lo));
}

export function uniqueInts(lo: number, hi: number, size: number): number[] {
    const set = new Set<number>();
    while (set.size < size) {
        const num = int(lo, hi);
        set.add(num);
    }
    return [...set];
}

export function choice<T>(arr: T[]): T {
    return arr[int(0, arr.length)];
}

export function shuffle<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; ++i) {
        const j = int(i + 1, arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function weightedChoices<T>(
    arr: T[],
    weights: number[],
    numChoices = 1,
): T[] {
    const total = weights.reduce((acc, wt) => acc + wt, 0);
    const normalized = weights.map((wt) => wt / total);

    const cummulative = [normalized[0]];
    for (let i = 1; i < weights.length; ++i) {
        cummulative[i] = cummulative[i - 1] + normalized[i];
    }

    const result: T[] = [];
    while (result.length < numChoices) {
        const r = uniform();
        let i = 0;
        while (cummulative[i++] < r);
        result.push(arr[i - 1]);
    }
    return result;
}
