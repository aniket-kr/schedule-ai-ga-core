import fs from 'node:fs';
import * as data from './data';
import { GeneticAlgorithm } from './genetic-algo';
import { Printer } from './printer';
import {
    DivisionPerspective,
    FacultyPerspective,
    RoomPerspective,
} from './printer/perspectives';

const ga = new GeneticAlgorithm(data.lecturePairs, {
    populationSize: 25,
    maxGenerations: 30000,
    mutationRate: 0.4,
    reproductionRate: 0.2,
});

const result = ga.evolve();

const file = fs.openSync('timetables.txt', 'w');
const printer = new Printer(
    result.best(),
    (msg) => {
        fs.writeSync(file, msg);
        fs.writeSync(file, '\n\n');
        console.log(msg);
    },
    false,
);

console.log({
    hard: result.best().conflicts('hard'),
    soft: result.best().conflicts('soft'),
});

data.divisions.forEach((div) => printer.print(new DivisionPerspective(div)));
data.faculties.forEach((fac) => printer.print(new FacultyPerspective(fac)));
data.rooms.forEach((room) => printer.print(new RoomPerspective(room)));
fs.closeSync(file);
