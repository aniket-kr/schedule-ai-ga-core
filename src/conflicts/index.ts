import { type Lecture } from '../lecture';

export abstract class LecturePairConflict {
    abstract numConflicts(lec1: Lecture, lec2: Lecture): number;
}

export abstract class ScheduleConflict {
    abstract numConflicts(lectures: Lecture[]): number;
}

export * from './bounded-faculty-time.conflict';
export * from './same-subject-faculty.conflict';
export * from './no-same-faculty.conflict';
export * from './no-same-room.conflict';
export * from './no-same-division.conflict';
