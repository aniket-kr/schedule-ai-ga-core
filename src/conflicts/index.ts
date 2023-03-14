import { type Lecture } from '../lecture';

export abstract class LecturePairConflict {
    abstract numConflicts(lec1: Lecture, lec2: Lecture): number;
}

export abstract class ScheduleConflict {
    abstract numConflicts(lectures: Lecture[]): number;
}

export * from './bounded-faculty-time';
export * from './no-same-faculty';
export * from './no-same-room';
