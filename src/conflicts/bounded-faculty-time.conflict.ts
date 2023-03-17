import { type Lecture } from '../lecture';
import { type TimeSlot } from '../models';
import { ScheduleConflict } from '.';

function duration(timeSlot: TimeSlot) {
    return timeSlot.endMins - timeSlot.startMins + 1;
}

export class BoundedFacultyTimeConflict extends ScheduleConflict {
    constructor(private readonly upperMins: number) {
        super();
    }

    numConflicts(lectures: Lecture[]): number {
        const load: { [key: string]: number } = {};
        for (const lec of lectures) {
            load[lec.faculty.code] =
                (load[lec.faculty.code] ?? 0) + duration(lec.timeSlot);
        }

        return Object.keys(load).filter((key) => load[key] > this.upperMins)
            .length;
    }

    report(lectures: Lecture[]): [string, number][] {
        const load: { [key: string]: number } = {};
        for (const lec of lectures) {
            load[lec.faculty.code] =
                (load[lec.faculty.code] ?? 0) + duration(lec.timeSlot);
        }

        return Object.keys(load)
            .filter((code) => load[code] > this.upperMins)
            .map((code) => {
                const diff = load[code] - this.upperMins;
                const msg = `'${code}' exceeds max faculty time by ${diff} mins`;
                return [msg, 1];
            });
    }
}
