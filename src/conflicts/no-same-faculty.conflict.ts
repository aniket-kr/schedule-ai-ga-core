import { LecturePairConflict } from '.';
import { Lecture } from '../lecture';
import { stringifySlot } from '../utils';

export class NoSameFacultyConflict extends LecturePairConflict {
    numConflicts(lec1: Lecture, lec2: Lecture) {
        if (lec1.timeSlot === lec2.timeSlot) {
            return lec1.faculty === lec2.faculty ? 1 : 0;
        }
        return 0;
    }

    report(lec1: Lecture, lec2: Lecture): [string, number][] {
        if (lec1.timeSlot !== lec2.timeSlot) {
            return [];
        }

        const lecs = `'${lec1.subject.code}' & '${lec2.subject.code}'`;
        const slot = stringifySlot(lec1.timeSlot);
        const msg = `${lec1.faculty.code} has lectures ${lecs} at the same time: ${slot}`;
        return lec1.faculty === lec2.faculty ? [[msg, 1]] : [];
    }
}
