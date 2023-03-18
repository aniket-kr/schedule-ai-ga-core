import { type Lecture } from '../lecture';
import { type InputModelData } from '../models';

export abstract class Mutation {
    abstract mutate(lec: Lecture, inputs: InputModelData): Lecture;
}

export * from './faculty.mutation';
export * from './room.mutation';
