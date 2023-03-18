import { type TimeSlot } from '.././models';

export enum Day {
    MONDAY = 'MON',
    TUESDAY = 'TUE',
    WEDNESDAY = 'WED',
    THURSDAY = 'THU',
    FRIDAY = 'FRI',
    SATURDAY = 'SAT',
    SUNDAY = 'SUN',
}

export function timeToMins(time: string): number {
    const [hours, mins] = time.split(':', 2);
    return parseInt(hours) * 60 + parseInt(mins);
}

export function minsToTime(minutes: number): string {
    const hoursStr = String(Math.floor(minutes / 60)).padStart(2, '0');
    const minsStr = String(minutes % 60).padStart(2, '0');
    return `${hoursStr}:${minsStr}`;
}

export function stringifySlot(timeSlot: TimeSlot): string {
    const day = timeSlot.day.toString();
    const start = minsToTime(timeSlot.startMins);
    const end = minsToTime(timeSlot.endMins);
    return `${day}, ${start} - ${end}`;
}

export function* pairwise<T>(items: T[]): Generator<[T, T], void> {
    for (let i = 0; i < items.length; ++i) {
        for (let j = i + 1; j < items.length; ++j) {
            yield [items[i], items[j]];
        }
    }
}

export function linspace(lo: number, hi: number, count: number): number[] {
    if (count < 2) throw new Error('count must be 2 or more');

    const step = (hi - lo) / (count - 1);
    const nums = [];

    for (let i = 0; i < count; ++i) {
        nums.push(lo + i * step);
    }
    return nums;
}

export function genify<TFunc extends (...args: any[]) => any>(
    fn: TFunc,
    ...args: Parameters<TFunc>
) {
    return (function* () {
        while (true) {
            yield fn(...args) as ReturnType<TFunc>;
        }
    })();
}

type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> };
export function* zip<T extends unknown[]>(...toZip: Iterableify<T>) {
    const iters = toZip.map((i) => i[Symbol.iterator]());

    while (true) {
        const results = iters.map((i) => i.next());
        if (results.some(({ done }) => done ?? false)) {
            break;
        }
        yield results.map(({ value }) => value) as T;
    }
}

export function argsort<T>(
    arr: T[],
    compareFn?: (a: T, b: T) => number,
): number[] {
    const comparator = compareFn
        ? (i: number, j: number) => compareFn(arr[i], arr[j])
        : undefined;
    return arr.map((_, i) => i).sort(comparator);
}

export * as rnd from './random';
