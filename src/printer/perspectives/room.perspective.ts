import { type Chalk } from 'chalk';
import { Perspective } from '.';
import { type Lecture } from '../../lecture';
import { type Room } from '../../models';

export class RoomPerspective implements Perspective {
    constructor(private readonly room: Room) {}

    label(chalk: Chalk): string {
        return `Room: ${chalk.magenta.bold(this.room.code)}`;
    }

    canInclude(lec: Lecture): boolean {
        return lec.room === this.room;
    }

    stringify(lec: Lecture, chalk: Chalk): string {
        const divs = lec.divisions.map((div) => div.name).join(', ');

        return [divs, lec.faculty.code, lec.subject.code].join('\n');
    }
}
