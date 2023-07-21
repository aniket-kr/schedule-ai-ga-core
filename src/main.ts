import fs from 'node:fs';
import { conflicts } from './config';
import * as data from './data';
import { GeneticAlgorithm } from './genetic-algo';
import { Printer } from './printer';
import {
    DivisionPerspective,
    FacultyPerspective,
    RoomPerspective,
} from './printer/perspectives';
import { ViolationReporter } from './reporter';

const ga = new GeneticAlgorithm(data, {
    populationSize: 50,
    maxGenerations: 25,
    mutationRate: 0.4,
    reproductionRate: 0.2,
});

const result = ga.evolve();
const reporter = new ViolationReporter(result.best(), conflicts);
console.log(reporter.violations());

// const file = fs.openSync('timetable.txt', 'w');
const printer = new Printer(
    data,
    result.best(),
    (msg) => {
        // fs.writeSync(file, msg);
        // fs.writeSync(file, '\n\n');
        console.log(msg);
    },
    true,
);
// const printer = new Printer(data, result.best());

console.log({
    hard: result.best().conflicts('hard'),
    soft: result.best().conflicts('soft'),
});

data.divisions.forEach((div) => printer.print(new DivisionPerspective(div)));
data.faculties.forEach((fac) => printer.print(new FacultyPerspective(fac)));
data.rooms.forEach((room) => printer.print(new RoomPerspective(room)));
// fs.closeSync(file);
