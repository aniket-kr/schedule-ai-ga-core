import Table from 'cli-table3';
import chalk from 'chalk';
import { ScheduleBuffer } from './printer';
import { Day } from './utils';

const table = new Table({
    head: ['', '11:00 - 11:30', '12:00 - 01:30'],
});

const buffer: ScheduleBuffer<Day> = {
    MON: {
        '11:00 - 11:30': 'TOC - PVU\nRoom H203\nA1 A2 A3',
        '12:00 - 01:30': 'DBMS - PVU\nRoom H303\nA1 B2',
    },
    TUE: {
        '11:00 - 11:30': 'TOC - PVU\nRoom H203\nA1 A2 A3',
        '12:00 - 01:30': 'DBMS - PVU\nRoom H303\nA1 B2',
    },
    WED: {
        '11:00 - 11:30': 'TOC - PVU\nRoom H203\nA1 A2 A3',
        '12:00 - 01:30': 'DBMS - PVU\nRoom H303\nA1 B2',
    },
    THU: {
        '11:00 - 11:30': 'TOC - PVU\nRoom H203\nA1 A2 A3',
        '12:00 - 01:30': 'DBMS - PVU\nRoom H303\nA1 B2',
    },
};

table.push([
    { content: 'MON', vAlign: 'center' },
    {
        content: `DBMS - PVU\nRoom: ${chalk.bold.green('H203')}\nA1 A2 A3`,
        hAlign: 'center',
    },
    {
        content: `DBMS - PVU\nRoom: ${chalk.bold.green('H203')}\nA1 A2 A3`,
        hAlign: 'center',
    },
]);

table.push([
    { content: 'TUE', vAlign: 'center' },
    {
        content: chalk.red(''),
        hAlign: 'center',
    },
    {
        content: `DBMS - PVU\nRoom: ${chalk.bold.green('H203')}\nA1 A2 A3`,
        hAlign: 'center',
    },
]);

console.log(table.toString());
