import { type Chalk } from 'chalk';
import { Perspective } from '.';
import { type Lecture } from '../../lecture';
import { type Faculty } from '../../models';

export class FacultyPerspective implements Perspective {
    constructor(private readonly faculty: Faculty) {}

    label(chalk: Chalk): string {
        const code = chalk.bold.magenta(this.faculty.code);
        const name = chalk.magenta(this.faculty.name);
        return `Faculty: ${name} [${code}]`;
    }

    canInclude(lec: Lecture): boolean {
        return lec.faculty === this.faculty;
    }

    stringify(lec: Lecture, chalk: Chalk): string {
        const divs = lec.divisions.map((div) => div.name).join(', ');

        return [divs, lec.subject.code, lec.room.code].join('\n');
    }
}
