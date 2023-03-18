import { Mutation } from '.';
import { Lecture } from '../lecture';
import { type Faculty } from '../models';
import { rnd } from '../utils';

export class FacultyMutation extends Mutation {
    mutate(lec: Lecture): Lecture {
        const possibles = lec.subject.faculties();

        let newFac: Faculty;
        while ((newFac = rnd.choice(possibles)).id === lec.faculty.id);
        return lec.with({ faculty: newFac });
    }
}
