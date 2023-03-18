import { Selection } from '.';
import { type Schedule } from '../schedule';
import { argsort } from '../utils';

export class BestFitSelection implements Selection {
    select(schedules: Schedule[]): Schedule[] {
        const sortDesc = (s1: Schedule, s2: Schedule) =>
            s2.fitness() - s1.fitness();

        return argsort(schedules, sortDesc)
            .slice(0, schedules.length / 2)
            .map((i) => schedules[i]);
    }
}
