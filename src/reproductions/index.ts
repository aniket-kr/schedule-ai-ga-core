/* eslint-disable no-unused-vars */
import { type Lecture } from '../lecture';

export abstract class Reproduction {
    abstract isValid(lec1: Lecture, lec2: Lecture): boolean;
    abstract reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture];
}

export * from './swap-faculties';
export * from './swap-rooms';
export * from './swap-time-slots';
