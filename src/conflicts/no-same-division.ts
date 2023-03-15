import { LecturePairConflict } from '.';
import { Lecture } from '../lecture';

export class NoSameDivision implements LecturePairConflict {
    numConflicts(lec1: Lecture, lec2: Lecture): number {
        if (lec1.timeSlot === lec2.timeSlot) {
            const set2 = new Set([...lec2.divisions]);
            return lec1.divisions.filter((div) => set2.has(div)).length;
        }
        return 0;
    }
}
