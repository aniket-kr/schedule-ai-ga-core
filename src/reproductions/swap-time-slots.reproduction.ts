import { Lecture } from '../lecture';
import { Reproduction } from './index';

export class SwapTimeSlotsReproduction implements Reproduction {
    isValid() {
        return true;
    }

    reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture] {
        return [
            lec1.with({ timeSlot: lec2.timeSlot }),
            lec2.with({ timeSlot: lec1.timeSlot }),
        ];
    }
}
