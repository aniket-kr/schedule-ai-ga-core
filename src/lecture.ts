import { Division, Faculty, Room, Subject, TimeSlot } from './models';

export type OptionalLectureFields = {
    room: Room;
    faculty: Faculty;
    timeSlot: TimeSlot;
};

export type RequiredLectureFields = {
    subject: Subject;
    divisions: Division[];
};
export class Lecture {
    readonly divisions: Division[];
    readonly subject: Subject;
    readonly room: Room;
    readonly faculty: Faculty;
    readonly timeSlot: TimeSlot;

    constructor(fields: OptionalLectureFields & RequiredLectureFields) {
        this.divisions = fields.divisions;
        this.subject = fields.subject;
        this.room = fields.room;
        this.faculty = fields.faculty;
        this.timeSlot = fields.timeSlot;
    }

    with(fields: Partial<OptionalLectureFields>): Lecture {
        return new Lecture({ ...this, ...fields });
    }
}
