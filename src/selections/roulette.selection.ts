import { Selection } from '.';
import { type EvolutionConfig } from '../genetic-algo';
import { type Schedule } from '../schedule';
import { argsort, rnd } from '../utils';

export class RouletteSelection extends Selection {
    select(schedules: Schedule[], config: EvolutionConfig): Schedule[] {
        const indices = argsort(
            schedules,
            (s1, s2) => s2.fitness() - s1.fitness(),
        );

        const selectedIndices = rnd.weightedChoices(
            indices,
            indices.map((i) => schedules[i].fitness()),
            schedules.length / 2,
        );
        return selectedIndices
            .map((i) => schedules[i])
            .sort((s1, s2) => s2.fitness() - s1.fitness());
    }
}
