import { ScheduleConflict } from '.';
import { type Lecture } from '../lecture';
import { type Division } from '../models';

export class NoRoomOverflowConflict extends ScheduleConflict {
    private static neededCapacity(divisions: Division[]): number {
        return divisions.reduce((acc, div) => acc + div.strength, 0);
    }

    numConflicts(lectures: Lecture[]): number {
        let overflows = 0;
        for (const lec of lectures) {
            const need = NoRoomOverflowConflict.neededCapacity(lec.divisions);

            if (need > lec.room.capacity) {
                ++overflows;
            }
        }
        return overflows;
    }

    report(lectures: Lecture[]): [string, number][] {
        const result: [string, number][] = [];
        for (const lec of lectures) {
            const need = NoRoomOverflowConflict.neededCapacity(lec.divisions);
            if (need <= lec.room.capacity) continue;

            const divs = lec.divisions.map((div) => div.name).join(',');
            const overflow = `(overflow: ${need - lec.room.capacity})`;
            const msg = `Room ${lec.room.code} cannot accomodate ${divs} ${overflow}`;
            result.push([msg, 1]);
        }
        return result;
    }
}
