import { Lecture } from '../lecture';
import { Reproduction } from './index';

export class SwapTimeSlots implements Reproduction {
    isValid() {
        return true;
    }

    reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture] {
        return [
            lec1.copyWith({ timeSlot: lec2.timeSlot }),
            lec2.copyWith({ timeSlot: lec1.timeSlot }),
        ];
    }
}
