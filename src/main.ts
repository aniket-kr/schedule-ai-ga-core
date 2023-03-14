import * as data from './data';
import { GeneticAlgorithm } from './genetic-algo';
import { Printer } from './printer';
import {
    DivisionPerspective,
    FacultyPerspective,
    RoomPerspective,
} from './printer/perspectives';

const ga = new GeneticAlgorithm(data.lecturePairs, {
    populationSize: 10,
    maxGenerations: 500,
});

const result = ga.evolve();
const printer = new Printer(result.best());

console.log({
    hard: result.best().conflicts('hard'),
    soft: result.best().conflicts('soft'),
});

printer
    .print(new DivisionPerspective(data.divisions[2]))
    .print(new FacultyPerspective(data.faculties[0]))
    .print(new RoomPerspective(data.rooms[0]));
