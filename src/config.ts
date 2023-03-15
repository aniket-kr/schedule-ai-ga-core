import {
    BoundedFacultyTime,
    LecturePairConflict,
    NoSameDivision,
    NoSameFaculty,
    NoSameRoom,
    SameSubjectFaculty,
    ScheduleConflict,
} from './conflicts';
import { MutateFaculty, type Mutation } from './mutations';
import {
    type Reproduction,
    SwapFaculties,
    SwapRooms,
    SwapTimeSlots,
} from './reproductions';

export type ConflictMap = {
    pairLevel: LecturePairConflict[];
    scheduleLevel: ScheduleConflict[];
};

export type Conflicts = { hard: ConflictMap; soft: ConflictMap };

export const conflicts: Conflicts = {
    hard: {
        pairLevel: [
            new NoSameFaculty(),
            new NoSameRoom(),
            new NoSameDivision(),
        ],
        scheduleLevel: [],
    },
    soft: {
        pairLevel: [],
        scheduleLevel: [new BoundedFacultyTime(10), new SameSubjectFaculty()],
    },
};

export const reproductions: Reproduction[] = [
    new SwapFaculties(),
    new SwapRooms(),
    new SwapTimeSlots(),
];

export const mutations: Mutation[] = [new MutateFaculty()];
