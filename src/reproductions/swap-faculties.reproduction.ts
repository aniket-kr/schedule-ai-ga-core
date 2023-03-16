import { Lecture } from '../lecture';
import { Reproduction } from './index';

export class SwapFacultiesReproduction implements Reproduction {
    isValid(lec1: Lecture, lec2: Lecture) {
        const { subject: sub1 } = lec1;
        const { subject: sub2 } = lec2;
        const canTeach1 =
            sub1.faculties().findIndex((x) => x === lec2.faculty) > 0;
        const canTeach2 =
            sub2.faculties().findIndex((x) => x === lec1.faculty) > 0;
        return canTeach1 && canTeach2;
    }

    reproduce(lec1: Lecture, lec2: Lecture): [Lecture, Lecture] {
        return [
            lec1.with({ faculty: lec2.faculty }),
            lec2.with({ faculty: lec1.faculty }),
        ];
    }
}
