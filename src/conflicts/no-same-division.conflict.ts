import { LecturePairConflict } from '.';
import { type Lecture } from '../lecture';
import { type TimeSlot } from '../models';
import { minsToTime, stringifySlot } from '../utils';

export class NoSameDivisionConflict extends LecturePairConflict {
    numConflicts(lec1: Lecture, lec2: Lecture): number {
        if (lec1.timeSlot === lec2.timeSlot) {
            const set2 = new Set([...lec2.divisions]);
            return lec1.divisions.filter((div) => set2.has(div)).length;
        }
        return 0;
    }

    report(lec1: Lecture, lec2: Lecture): [string, number][] {
        if (lec1.timeSlot !== lec2.timeSlot) {
            return [];
        }

        const set2 = new Set([...lec2.divisions]);
        return lec1.divisions
            .filter((div) => set2.has(div))
            .map((div) => {
                const lecSubs = `'${lec1.subject.code}' & '${lec2.subject.code}'`;
                const slot = stringifySlot(lec1.timeSlot);
                const msg = `${div.name} has ${lecSubs} lecture at same time: ${slot}`;
                return [msg, 1];
            });
    }
}
