import {
    type ConflictMap,
    conflicts,
    reproductions,
    mutations,
} from './config';
import { type Reproduction } from './reproductions';
import { Lecture } from './lecture';
import { type InputModelData } from './models';
import { pairwise, rnd } from './utils';

export class Schedule {
    private readonly inputs: InputModelData;
    private readonly lectures: Lecture[];
    private hardConflicts = 0;
    private softConflicts = 0;
    private isStale = true;

    constructor(inputs: InputModelData);
    constructor(
        origLectures: Lecture[],
        replacements: { [key: number]: Lecture },
        inputs: InputModelData,
    );
    constructor(
        first: InputModelData | Lecture[],
        replacements?: { [key: number]: Lecture },
        inputs?: InputModelData,
    ) {
        if (inputs && replacements) {
            const origLectures = first as Lecture[];
            this.inputs = inputs;

            for (const key in replacements) {
                if (!replacements.hasOwnProperty(key)) continue;
                origLectures[key] = replacements[key];
            }
            this.lectures = origLectures;
        } else {
            this.inputs = first as InputModelData;

            this.lectures = this.inputs.lecturePairs.map(
                ([sub, divs]) =>
                    new Lecture({
                        subject: sub,
                        divisions: divs,
                        room: rnd.choice(
                            this.inputs.rooms.filter(
                                (room) => room.type === sub.type,
                            ),
                        ),
                        faculty: rnd.choice(sub.faculties()),
                        timeSlot: rnd.choice(this.inputs.timeSlots),
                    }),
            );
        }
    }

    with(replacements: { [key: number]: Lecture }): Schedule {
        // constructor expects a copy of lectures
        return new Schedule([...this.lectures], replacements, this.inputs);
    }

    fitness(): number {
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

    private findScore(conflictMap: ConflictMap): number {
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

    private getReproductionSize(rate: number): number {
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

        return this.with(replacements);
    }

    mutate(): Schedule {
        const iLec = rnd.int(0, this.lectures.length);
        const mutatedLec = rnd
            .choice(mutations)
            .mutate(this.lectures[iLec], this.inputs);

        return this.with({ [iLec]: mutatedLec });
    }

    *[Symbol.iterator]() {
        for (const lec of this.lectures) {
            yield lec;
        }
    }
}
