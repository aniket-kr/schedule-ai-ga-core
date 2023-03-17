import {
    BoundedFacultyTimeConflict,
    LecturePairConflict,
    NoSameDivisionConflict,
    NoSameFacultyConflict,
    NoSameRoomConflict,
    SameSubjectFacultyConflict,
    ScheduleConflict,
} from './conflicts';
import { FacultyMutation, type Mutation } from './mutations';
import {
    type Reproduction,
    SwapFacultiesReproduction,
    SwapRoomsReproduction,
    SwapTimeSlotsReproduction,
} from './reproductions';

export type ConflictMap = {
    pairLevel: LecturePairConflict[];
    scheduleLevel: ScheduleConflict[];
};

export type Conflicts = { hard: ConflictMap; soft: ConflictMap };

export const conflicts: Conflicts = {
    hard: {
        pairLevel: [
            new NoSameFacultyConflict(),
            new NoSameRoomConflict(),
            new NoSameDivisionConflict(),
        ],
        scheduleLevel: [],
    },
    soft: {
        pairLevel: [],
        scheduleLevel: [
            new BoundedFacultyTimeConflict(10 * 60),
            new SameSubjectFacultyConflict(),
        ],
    },
};

export const reproductions: Reproduction[] = [
    new SwapFacultiesReproduction(),
    new SwapRoomsReproduction(),
    new SwapTimeSlotsReproduction(),
];

export const mutations: Mutation[] = [new FacultyMutation()];
