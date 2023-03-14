import { Schedule } from './schedule';
import { lecturePairs } from './data';
import { argsort, rnd } from './utils';

export class Population {
    private schedules: Schedule[] = [];

    constructor(schedules: Schedule[]);
    constructor(lecPairs: typeof lecturePairs, size: number);
    constructor(first: typeof lecturePairs | Schedule[], size?: number) {
        if (size) {
            const lecPairs = first as typeof lecturePairs;
            this.schedules.length = size;
            for (let i = 0; i < size; ++i) {
                this.schedules[i] = new Schedule(lecPairs);
            }
        } else {
            this.schedules = first as Schedule[];
        }
    }

    fitness() {
        return this.schedules.map((s) => s.fitness());
    }

    reproduce(rate: number): Population {
        const newSchedules = this.schedules.map((s) => s.reproduce(rate));
        return new Population([...this.schedules, ...newSchedules]);
    }

    mutate(rate: number): Population {
        if (rate <= 0) {
            return this;
        }

        const newSchedules = this.schedules
            .map((sch) => [sch, rnd.uniform()] as [Schedule, number])
            .map(([sch, u]) => (u < rate ? sch.mutate() : sch));

        return new Population(newSchedules);
    }

    select(): Population {
        const indices = argsort(
            this.schedules,
            (s1, s2) => s2.fitness() - s1.fitness(),
        );
        const selected = indices
            .slice(0, this.schedules.length / 2)
            .map((i) => this.schedules[i]);

        return new Population(selected);
    }

    *[Symbol.iterator]() {
        for (const schedule of this.schedules) {
            yield schedule;
        }
    }
}
