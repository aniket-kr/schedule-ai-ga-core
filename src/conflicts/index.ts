import { type Lecture } from '../lecture';

export abstract class LecturePairConflict {
    label() {
        return this.constructor.name;
    }

    abstract numConflicts(lec1: Lecture, lec2: Lecture): number;
    abstract report(lec1: Lecture, lec2: Lecture): [string, number][];
}

export abstract class ScheduleConflict {
    label() {
        return this.constructor.name;
    }

    abstract numConflicts(lectures: Lecture[]): number;
    abstract report(lectures: Lecture[]): [string, number][];
}

export * from './bounded-faculty-time.conflict';
export * from './same-subject-faculty.conflict';
export * from './no-same-faculty.conflict';
export * from './no-same-room.conflict';
export * from './no-same-division.conflict';
export * from './no-room-overflow.conflict';
export * from './room-type.conflict';
