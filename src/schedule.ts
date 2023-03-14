import {
    type ConflictMap,
    conflicts,
    reproductions,
    mutations,
} from './config';
import { Reproduction } from './reproductions';
import { rooms, timeSlots } from './data';
import { Lecture } from './lecture';
import { Division, Subject } from './models/models';
import { pairwise, rnd } from './utils';

export class Schedule {
    private readonly lectures: Lecture[];
    private hardConflicts = 0;
    private softConflicts = 0;
    private isStale = true;

    constructor(lecturePairs: [Subject, Division[]][]);
    constructor(original: Lecture[], replaceWith: { [key: number]: Lecture });
    constructor(
        first: (Lecture | [Subject, Division[]])[],
        replaceWith?: { [key: number]: Lecture },
    ) {
        if (!replaceWith) {
            const lecturePairs = first as [Subject, Division[]][];

            this.lectures = lecturePairs.map((pair) => new Lecture(...pair));
            this.lectures.forEach((lecture) => {
                const { type: roomType } = lecture.subject;
                const validRooms = rooms.filter(
                    ({ type }) => type === roomType,
                );
                lecture.set({
                    room: rnd.choice(validRooms),
                    faculty: rnd.choice(lecture.subject.faculties()),
                    timeSlot: rnd.choice(timeSlots),
                });
            });
        } else {
            // new Schedule(this.lectures, { 0: lec2, 1: lec5 });
            const original = [...(first as Lecture[])];
            Object.keys(replaceWith).forEach(
                (idx) => (original[Number(idx)] = replaceWith[Number(idx)]),
            );
            this.lectures = original;
        }
    }

    fitness() {
        if (this.isStale) {
            this.hardConflicts = this.findScore(conflicts.hard);
            this.softConflicts = this.findScore(conflicts.soft);
            this.isStale = false;
        }
        return -(this.hardConflicts * 20) - this.softConflicts;
    }

    conflicts(type?: 'soft' | 'hard' | 'both'): number {
        type = type ?? 'both';
        this.fitness();

        return {
            soft: this.softConflicts,
            hard: this.hardConflicts,
            both: this.softConflicts + this.hardConflicts,
        }[type];
    }

    private findScore(conflictMap: ConflictMap) {
        let count = 0;
        for (const strategy of conflictMap.scheduleLevel) {
            count += strategy.numConflicts(this.lectures);
        }

        for (const strategy of conflictMap.pairLevel) {
            for (const [lec1, lec2] of pairwise(this.lectures)) {
                count += strategy.numConflicts(lec1, lec2);
            }
        }
        return count;
    }

    private getReproductionSize(rate: number) {
        if (rate < 0 || rate > 1) {
            throw new Error(`invalid reproduction rate: ${rate} not in [0, 1]`);
        }
        let count = Math.round(rate * this.lectures.length);
        return count % 2 === 0 ? count : count + 1;
    }

    reproduce(reproductionRate: number): Schedule {
        const size = this.getReproductionSize(reproductionRate);
        const indices = rnd.uniqueInts(0, this.lectures.length, size);
        const replacements: { [key: number]: Lecture } = {};

        for (let i = 1; i < indices.length; i += 2) {
            const [lec1, lec2] = [
                this.lectures[indices[i - 1]],
                this.lectures[indices[i]],
            ];
            let strategy: Reproduction;
            while (!(strategy = rnd.choice(reproductions)).isValid(lec1, lec2));
            const [newLec1, newLec2] = strategy.reproduce(lec1, lec2);
            replacements[indices[i - 1]] = newLec1;
            replacements[indices[i]] = newLec2;
        }

        return new Schedule(this.lectures, replacements);
    }

    mutate(): Schedule {
        const iLec = rnd.int(0, this.lectures.length);
        const mutatedLec = rnd.choice(mutations).mutate(this.lectures[iLec]);
        return new Schedule(this.lectures, { [iLec]: mutatedLec });
    }

    *[Symbol.iterator]() {
        for (const lec of this.lectures) {
            yield lec;
        }
    }
}
