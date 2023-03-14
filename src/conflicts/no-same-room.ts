import { LecturePairConflict } from '.';
import { Lecture } from '../lecture';

export class NoSameRoom implements LecturePairConflict {
    numConflicts(lec1: Lecture, lec2: Lecture) {
        if (lec1.timeSlot === lec2.timeSlot) {
            return lec1.room === lec2.room ? 1 : 0;
        }
        return 0;
    }
}
