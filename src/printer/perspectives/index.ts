import { type Chalk } from 'chalk';
import { type Lecture } from '../../lecture';

export abstract class Perspective {
    abstract label(chalk: Chalk): string;
    abstract canInclude(lec: Lecture): boolean;
    abstract stringify(lec: Lecture, chalk: Chalk): string;
}

export * from './division.perspective';
export * from './faculty.perspective';
export * from './room.perspective';
