import { type Schedule } from '../schedule';
import { minsToTime, Day } from '../utils';
import { type TimeSlot } from '../models/models';
import { type Lecture } from '../lecture';
import { timeSlots } from '../data';
import chalk from 'chalk';
import Table, { VerticalTableRow, type Cell } from 'cli-table3';
import * as data from '../data';
import { Perspective } from './perspectives';

export type ScheduleBuffer<TKey extends keyof any> = {
    [key in TKey]?: { [key: string]: string };
};

function timeSlotStringify(slot: TimeSlot) {
    return `${minsToTime(slot.startMins)} - ${minsToTime(slot.endMins)}`;
}

export class Printer {
    constructor(
        public readonly schedule: Schedule,
        private readonly printFn: (msg: string) => any = console.log,
        useColorsIfSupported = true,
    ) {
        chalk.level = useColorsIfSupported ? chalk.level : 0;
    }

    private makeBuffer(persp: Perspective, lectures: Lecture[]) {
        const buffer: ScheduleBuffer<Day> = {};
        for (const lec of lectures) {
            const inner = (buffer[lec.timeSlot.day] ??= {});
            const timeSlotRepr = timeSlotStringify(lec.timeSlot);
            inner[timeSlotRepr] = persp.stringify(lec, chalk);
        }
        return buffer;
    }

    print(persp: Perspective, shrink = true): Printer {
        const lecs = [...this.schedule].filter((lec) => persp.canInclude(lec));
        const buffer = this.makeBuffer(persp, lecs);

        const usedTimeSlots = shrink
            ? new Set(Object.values(buffer).flatMap((obj) => Object.keys(obj)))
            : new Set(data.timeSlots.map((slot) => timeSlotStringify(slot)));

        const sortedSlots = timeSlots
            .slice()
            .sort((slot1, slot2) => slot1.startMins - slot2.startMins)
            .map((slot) => timeSlotStringify(slot))
            .filter((repr, idx, arr) => arr.indexOf(repr) === idx)
            .filter((repr) => usedTimeSlots.has(repr));

        const table = new Table({
            head: ['', ...sortedSlots].map((val) => ({
                content: chalk.yellow.bold(val),
                hAlign: 'center',
            })),
        });

        for (const day of Object.values(Day)) {
            if (!shrink || buffer[day]) {
                const values: Cell[] = sortedSlots
                    .map((slotRepr) => buffer[day]?.[slotRepr] ?? '')
                    .map((value) => ({ content: value, hAlign: 'center' }));

                table.push([
                    { content: chalk.yellow.bold(day), vAlign: 'center' },
                    ...values,
                ]);
            }
        }
        table.push([
            {
                content: persp.label(chalk),
                colSpan: sortedSlots.length + 1,
                hAlign: 'right',
            },
        ]);

        this.printFn(table.toString());
        return this;
    }
}
