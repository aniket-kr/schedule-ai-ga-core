import { type EvolutionConfig } from '../genetic-algo';
import { type Schedule } from '../schedule';

export abstract class Selection {
    abstract select(schedules: Schedule[], config: EvolutionConfig): Schedule[];
}

export * from './best-fit.selection';
export * from './roulette.selection';
