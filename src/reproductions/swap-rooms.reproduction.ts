import { Lecture } from '../lecture';
import { Reproduction } from './index';

export class SwapRoomsReproduction implements Reproduction {
    isValid(lec1: Lecture, lec2: Lecture) {
        return lec1.room.type === lec2.room.type;
    }

    reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture] {
        return [lec1.with({ room: lec2.room }), lec2.with({ room: lec1.room })];
    }
}
