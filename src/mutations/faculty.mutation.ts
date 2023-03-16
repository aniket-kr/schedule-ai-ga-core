import { Mutation } from '.';
import { Lecture } from '../lecture';
import { type Faculty } from '../models/models';
import { rnd } from '../utils';
import * as data from '../data';

export class FacultyMutation implements Mutation {
    mutate(lec: Lecture): Lecture {
        const possibles = data.subjects[0].faculties();
        let newFac: Faculty;
        while ((newFac = rnd.choice(possibles)).id === lec.faculty.id);
        return lec.copyWith({ faculty: newFac });
    }
}
