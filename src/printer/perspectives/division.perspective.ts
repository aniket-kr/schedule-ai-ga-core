import { type Chalk } from 'chalk';
import { Perspective } from '.';
import { type Lecture } from '../../lecture';
import { type Division } from '../../models';

export class DivisionPerspective implements Perspective {
    public readonly divisions: Division[];

    constructor(...divisions: Division[]) {
        if (divisions.length === 0) {
            throw new Error('Atleast 1 division must be present');
        }
        this.divisions = divisions.filter(
            (div, i, arr) => arr.indexOf(div) === i,
        );
    }

    label(chalk: Chalk): string {
        const label = this.divisions.length > 1 ? 'Divisions' : 'Division';
        const divs = this.divisions
            .map((div) => chalk.magenta.bold(div.name))
            .join(', ');

        return `${label}: ${divs}`;
    }

    canInclude(lec: Lecture): boolean {
        for (const lecDiv of lec.divisions) {
            if (this.divisions.includes(lecDiv)) {
                return true;
            }
        }
        return false;
    }

    stringify(lec: Lecture, chalk: Chalk): string {
        return [
            `${lec.subject.code} - ${lec.faculty.code}`,
            `${lec.room.code}`,
            `${lec.divisions.map((div) => div.name).join(', ')}`,
        ].join('\n');
    }
}
