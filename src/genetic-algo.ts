import { lecturePairs } from './data';
import { Population } from './population';
import { Schedule } from './schedule';

export type EvolutionConfig = {
    reproductionRate: number;
    mutationRate: number;
    populationSize: number;
    maxGenerations: number;
    earlyStopping: boolean;
};

class EvolutionResult {
    constructor(private readonly schedules: Schedule[]) {
        schedules.sort((s1, s2) => s2.fitness() - s1.fitness());
    }

    best(): Schedule {
        return this.schedules[0];
    }

    worst(): Schedule {
        return this.schedules[0];
    }

    firstN(n: number): Schedule[] {
        return this.schedules.slice(0, n);
    }

    lastN(n: number): Schedule[] {
        return this.schedules.slice(this.schedules.length - n);
    }

    withoutConflicts(conflictType?: 'soft' | 'hard' | 'both'): Schedule[] {
        return this.schedules.filter((s) => s.conflicts(conflictType) === 0);
    }
}

export class GeneticAlgorithm {
    private static readonly defaultConfig: EvolutionConfig = {
        reproductionRate: 0.2,
        mutationRate: 0.1,
        populationSize: 20,
        maxGenerations: 1000,
        earlyStopping: false,
    };

    readonly config: EvolutionConfig;

    private population: Population;
    private result?: EvolutionResult;

    constructor(
        lecPairs: typeof lecturePairs,
        config: Partial<EvolutionConfig> = {},
    ) {
        this.config = { ...GeneticAlgorithm.defaultConfig, ...config };
        this.population = new Population(lecPairs, this.config.populationSize);
    }

    evolved(): boolean {
        return Boolean(this.result);
    }

    evolve(): EvolutionResult {
        if (this.result) {
            return this.result;
        }

        for (let gen = 0; gen < this.config.maxGenerations; ++gen) {
            this.population = this.population
                .reproduce(this.config.reproductionRate)
                .mutate(this.config.mutationRate)
                .select();
        }
        this.result = new EvolutionResult([...this.population]);
        return this.result;
    }
}