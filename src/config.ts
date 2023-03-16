import {
    BoundedFacultyTime,
    LecturePairConflict,
    NoSameDivision,
    NoSameFaculty,
    NoSameRoom,
    SameSubjectFaculty,
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
    new SwapFacultiesReproduction(),
    new SwapRoomsReproduction(),
    new SwapTimeSlotsReproduction(),
];

export const mutations: Mutation[] = [new FacultyMutation()];
