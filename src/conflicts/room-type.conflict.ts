import { ScheduleConflict } from '.';
import { Lecture } from '../lecture';

export class RoomTypeConflict extends ScheduleConflict {
    numConflicts(lectures: Lecture[]): number {
        let conflicts = 0;
        for (const lec of lectures) {
            if (lec.room.type !== lec.subject.type) {
                conflicts++;
            }
        }
        return conflicts;
    }

    report(lectures: Lecture[]): [string, number][] {
        const result: [string, number][] = [];
        for (const lec of lectures) {
            if (lec.room.type !== lec.subject.type) {
                const subExpectation = `${lec.subject.code} (expects: ${lec.subject.type.name})`;
                const roomActual = `${lec.room.code} (is: ${lec.room.type.name})`;
                const msg = `${subExpectation} is scheduled in ${roomActual}`;
                result.push([msg, 1]);
            }
        }
        return result;
    }
}
