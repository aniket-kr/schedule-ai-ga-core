import { ScheduleConflict } from '.';
import { Lecture } from '../lecture';
import type { Subject, Division, Faculty } from '../models/models';

export class SameSubjectFaculty implements ScheduleConflict {
    private static makeKey(lec: Lecture) {
        // key: subId-div1Id,div2Id,div3Id
        const divs = lec.divisions.map((div) => `${div.id}`).join(',');
        return `${lec.subject.id}-${divs}`;
    }

    numConflicts(lectures: Lecture[]): number {
        const pairs: { [key: string]: Faculty[] } = {};
        for (const lec of lectures) {
            const key = SameSubjectFaculty.makeKey(lec);
            pairs[key] = pairs[key] ?? [];
            pairs[key].includes(lec.faculty) || pairs[key].push(lec.faculty);
        }

        let cost = 0;
        for (const key in pairs) {
            if (!pairs.hasOwnProperty(key)) continue;

            const len = pairs[key].length - 1;
            cost += len ? Math.pow(2, len) : 0;
        }
        return cost;
    }
}
