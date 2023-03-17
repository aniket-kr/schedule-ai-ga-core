import { LecturePairConflict } from '.';
import { Lecture } from '../lecture';
import { stringifySlot } from '../utils';

export class NoSameRoomConflict extends LecturePairConflict {
    numConflicts(lec1: Lecture, lec2: Lecture) {
        if (lec1.timeSlot === lec2.timeSlot) {
            return lec1.room === lec2.room ? 1 : 0;
        }
        return 0;
    }

    report(lec1: Lecture, lec2: Lecture): [string, number][] {
        if (lec1.timeSlot !== lec2.timeSlot) {
            return [];
        }
        if (lec1.room !== lec2.room) {
            return [];
        }

        const lecs = `'${lec1.subject.code}' & '${lec2.subject.code}'`;
        const slot = stringifySlot(lec1.timeSlot);
        const msg = `Room '${lec1.room.code}' has lectures ${lecs} at the same time: ${slot}`;
        return [[msg, 1]];
    }
}
