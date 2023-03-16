import { type InputModelData } from './models';
import { Population } from './population';
import { type Schedule } from './schedule';
import { BestFitSelection, type Selection } from './selections';

export type EvolutionConfig = {
    selectionStrategy: Selection;
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
        return this.schedules[this.schedules.length - 1];
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
        selectionStrategy: new BestFitSelection(),
        reproductionRate: 0.2,
        mutationRate: 0.1,
        populationSize: 20,
        maxGenerations: 1000,
        earlyStopping: false,
    };

    readonly config: EvolutionConfig;

    private population: Population;
    private result?: EvolutionResult;

    constructor(inputs: InputModelData, config: Partial<EvolutionConfig> = {}) {
        this.config = { ...GeneticAlgorithm.defaultConfig, ...config };
        this.population = new Population(inputs, this.config);
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

            if (gen % 1000 === 0) {
                console.log({
                    generations: gen,
                    fitness: this.population.fitness(),
                });
            }
        }
        this.result = new EvolutionResult([...this.population]);
        return this.result;
    }
}
