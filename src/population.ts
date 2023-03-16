import { Schedule } from './schedule';
import { lecturePairs } from './data';
import { genify, linspace, rnd, zip } from './utils';
import { EvolutionConfig } from './genetic-algo';

export class Population {
    private schedules: Schedule[] = [];
    private readonly config: EvolutionConfig;

    constructor(schedules: Schedule[], config: EvolutionConfig);
    constructor(
        lecPairs: typeof lecturePairs,
        size: number,
        config: EvolutionConfig,
    );
    constructor(
        first: typeof lecturePairs | Schedule[],
        second: number | EvolutionConfig,
        config?: EvolutionConfig,
    ) {
        if (config) {
            const lecPairs = first as typeof lecturePairs;
            const size = second as number;

            this.schedules.length = size;
            for (let i = 0; i < size; ++i) {
                this.schedules[i] = new Schedule(lecPairs);
            }
            this.config = config;
        } else {
            this.schedules = first as Schedule[];
            this.config = second as EvolutionConfig;
        }
    }

    get size() {
        return this.schedules.length;
    }

    fitness() {
        return this.schedules.map((s) => s.fitness());
    }

    reproduce(rate: number): Population {
        const newSchedules = this.schedules.map((s) => s.reproduce(rate));
        return new Population(
            [...this.schedules, ...newSchedules],
            this.config,
        );
    }

    mutate(rate: number): Population {
        if (rate <= 0) {
            return this;
        }

        const newSchedules: Schedule[] = [];
        const gen = zip(this, genify(rnd.uniform), linspace(0, 1, this.size));
        for (const [sch, u, prob] of gen) {
            newSchedules.push(u * prob > 1 - rate ? sch.mutate() : sch);
        }
        return new Population(newSchedules, this.config);
    }

    select(): Population {
        const selected = this.config.selectionStrategy.select(
            this.schedules,
            this.config,
        );

        return new Population(selected, this.config);
    }

    *[Symbol.iterator]() {
        for (const schedule of this.schedules) {
            yield schedule;
        }
    }
}
