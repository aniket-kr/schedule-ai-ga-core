import { Schedule } from './schedule';
import { genify, linspace, rnd, zip } from './utils';
import { EvolutionConfig } from './genetic-algo';
import { InputModelData } from './models';

export class Population {
    private schedules: Schedule[] = [];
    private readonly config: EvolutionConfig;
    private readonly inputs: InputModelData;

    constructor(inputs: InputModelData, config: EvolutionConfig);
    constructor(
        schedules: Schedule[],
        inputs: InputModelData,
        config: EvolutionConfig,
    );
    constructor(
        first: Schedule[] | InputModelData,
        second: InputModelData | EvolutionConfig,
        config?: EvolutionConfig,
    ) {
        if (config) {
            this.schedules = first as Schedule[];
            this.inputs = second as InputModelData;
            this.config = config;
        } else {
            this.inputs = first as InputModelData;
            this.config = second as EvolutionConfig;

            const size = this.config.populationSize;
            for (let i = 0; i < size; ++i) {
                this.schedules[i] = new Schedule(this.inputs);
            }
        }
    }

    makePopulation(schedules: Schedule[]): Population {
        return new Population(schedules, this.inputs, this.config);
    }

    get size() {
        return this.schedules.length;
    }

    fitness() {
        return this.schedules.map((s) => s.fitness());
    }

    reproduce(rate: number): Population {
        const newSchedules = this.schedules.map((s) => s.reproduce(rate));
        return this.makePopulation([...this.schedules, ...newSchedules]);
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
        return this.makePopulation(newSchedules);
    }

    select(): Population {
        const selected = this.config.selectionStrategy.select(
            this.schedules,
            this.config,
        );

        return this.makePopulation(selected);
    }

    *[Symbol.iterator]() {
        for (const schedule of this.schedules) {
            yield schedule;
        }
    }
}
