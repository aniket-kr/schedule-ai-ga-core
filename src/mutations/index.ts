import { type Lecture } from '../lecture';

export abstract class Mutation {
    abstract mutate(lec: Lecture): Lecture;
}

export * from './mutate-faculty';
