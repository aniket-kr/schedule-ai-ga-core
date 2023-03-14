import { type Lecture } from '../lecture';
import { type TimeSlot } from '../models/models';
import { ScheduleConflict } from '.';

function duration(timeSlot: TimeSlot) {
    return timeSlot.endMins - timeSlot.startMins + 1;
}

export class BoundedFacultyTime implements ScheduleConflict {
    constructor(private readonly upperMins: number) {}

    numConflicts(lectures: Lecture[]): number {
        const load: { [key: string]: any } = {};
        for (const lec of lectures) {
            load[lec.faculty.id] =
                (load[lec.faculty.id] ?? 0) + duration(lec.timeSlot);
        }

        return Object.keys(load).filter((key) => load[key] > this.upperMins)
            .length;
    }
}
