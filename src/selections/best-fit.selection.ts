import { Selection } from '.';
import { type Schedule } from '../schedule';

export class BestFitSelection implements Selection {
    private static argsort<T>(
        arr: T[],
        compareFn: (a: T, b: T) => number,
    ): number[] {
        const comparator = (i: number, j: number) => compareFn(arr[i], arr[j]);
        return arr.map((_, i) => i).sort(comparator);
    }

    select(schedules: Schedule[]): Schedule[] {
        const sortDesc = (s1: Schedule, s2: Schedule) =>
            s2.fitness() - s1.fitness();

        return BestFitSelection.argsort(schedules, sortDesc)
            .slice(0, schedules.length / 2)
            .map((i) => schedules[i]);
    }
}
