import { type Lecture } from '../lecture';

export abstract class Reproduction {
    abstract isValid(lec1: Lecture, lec2: Lecture): boolean;
    abstract reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture];
}

export * from './swap-faculties.reproduction';
export * from './swap-rooms.reproduction';
export * from './swap-time-slots.reproduction';
