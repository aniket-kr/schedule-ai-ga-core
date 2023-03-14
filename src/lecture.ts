import { Division, Faculty, Room, Subject, TimeSlot } from './models/models';

type Optionals = { room: Room; faculty: Faculty; timeSlot: TimeSlot };
type DataFields = 'room' | 'faculty' | 'timeSlot';
export class Lecture {
    readonly divisions: Division[];
    readonly subject: Subject;
    room!: Room;
    faculty!: Faculty;
    timeSlot!: TimeSlot;

    constructor(subject: Subject, divisions: Division[]) {
        this.subject = subject;
        this.divisions = divisions;
    }

    set({ room, faculty, timeSlot }: Optionals) {
        this.room = room;
        this.faculty = faculty;
        this.timeSlot = timeSlot;
    }

    copyWith(lecOpts: Partial<Pick<Lecture, DataFields>>) {
        const lec = new Lecture(this.subject, this.divisions);
        lec.set({ ...this, ...lecOpts });
        return lec;
    }
}
