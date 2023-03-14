export enum Day {
    MONDAY = 'MON',
    TUESDAY = 'TUE',
    WEDNESDAY = 'WED',
    THURSDAY = 'THU',
    FRIDAY = 'FRI',
    SATURDAY = 'SAT',
    SUNDAY = 'SUN',
}

export function timeToMins(time: string) {
    const [hours, mins] = time.split(':', 2);
    return parseInt(hours) * 60 + parseInt(mins);
}

export function minsToTime(minutes: number) {
    const hoursStr = String(Math.floor(minutes / 60)).padStart(2, '0');
    const minsStr = String(minutes % 60).padStart(2, '0');
    return `${hoursStr}:${minsStr}`;
}

const BIG_PRIME_NUM = Math.pow(2, 31) - 1;
export const rnd = {
    uniform: () => Math.random(),
    int: (lo: number, hi: number) => {
        const rand = Math.round(Math.random() * BIG_PRIME_NUM);
        return lo + (rand % (hi - lo));
    },
    uniqueInts: (lo: number, hi: number, size: number) => {
        const set = new Set<number>();
        while (set.size < size) {
            const num = rnd.int(lo, hi);
            set.add(num);
        }
        return [...set];
    },
    choice: <T>(arr: T[]) => arr[rnd.int(0, arr.length)],
    shuffle: <T>(arr: T[]) => {
        for (let i = 0; i < arr.length; ++i) {
            const j = rnd.int(i + 1, arr.length);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },
};

export function* pairwise<T>(items: T[]): Generator<[T, T], void> {
    for (let i = 0; i < items.length; ++i) {
        for (let j = i + 1; j < items.length; ++j) {
            yield [items[i], items[j]];
        }
    }
}

export function argsort<T>(arr: T[], compareFn?: (a: T, b: T) => number) {
    const indices = arr.map((_, i) => i);
    indices.sort(compareFn ? (i, j) => compareFn(arr[i], arr[j]) : undefined);
    return indices;
}
