import {
    Department,
    Division,
    Faculty,
    Room,
    RoomType,
    Subject,
    TimeSlot,
} from './models';
import { Day, timeToMins } from './utils';

export const roomTypes: RoomType[] = [
    { id: 0, name: 'LAB' },
    { id: 1, name: 'CLASSROOM' },
];

export const departments: Department[] = [{ id: 0, name: 'SCET' }];

export const rooms: Room[] = [
    {
        id: 0,
        code: 'H201',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 1,
        code: 'H202',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 2,
        code: 'H203',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 3,
        code: 'H301',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 4,
        code: 'H302',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 5,
        code: 'H303',
        department: departments[0],
        capacity: 50,
        type: roomTypes[1],
    },
    {
        id: 6,
        code: 'CL-I',
        department: departments[0],
        capacity: 15,
        type: roomTypes[0],
    },
    {
        id: 7,
        code: 'CL-II',
        department: departments[0],
        capacity: 15,
        type: roomTypes[0],
    },
    {
        id: 8,
        code: 'CL-III',
        department: departments[0],
        capacity: 20,
        type: roomTypes[0],
    },
];

export const timeSlots: TimeSlot[] = [
    {
        id: 0,
        startMins: timeToMins('08:30'),
        endMins: timeToMins('09:25'),
        day: Day.MONDAY,
    },
    {
        id: 1,
        startMins: timeToMins('9:25'),
        endMins: timeToMins('10:25'),
        day: Day.MONDAY,
    },
    {
        id: 2,
        startMins: timeToMins('10:30'),
        endMins: timeToMins('11:25'),
        day: Day.MONDAY,
    },
    {
        id: 3,
        startMins: timeToMins('12:20'),
        endMins: timeToMins('13:15'),
        day: Day.MONDAY,
    },
    {
        id: 4,
        startMins: timeToMins('13:15'),
        endMins: timeToMins('14:10'),
        day: Day.MONDAY,
    },
    {
        id: 5,
        startMins: timeToMins('08:30'),
        endMins: timeToMins('09:25'),
        day: Day.TUESDAY,
    },
    {
        id: 6,
        startMins: timeToMins('9:25'),
        endMins: timeToMins('10:25'),
        day: Day.TUESDAY,
    },
    {
        id: 7,
        startMins: timeToMins('10:30'),
        endMins: timeToMins('11:25'),
        day: Day.TUESDAY,
    },
    {
        id: 8,
        startMins: timeToMins('12:20'),
        endMins: timeToMins('13:15'),
        day: Day.TUESDAY,
    },
    {
        id: 9,
        startMins: timeToMins('13:15'),
        endMins: timeToMins('14:10'),
        day: Day.TUESDAY,
    },
    {
        id: 10,
        startMins: timeToMins('08:30'),
        endMins: timeToMins('09:25'),
        day: Day.WEDNESDAY,
    },
    {
        id: 11,
        startMins: timeToMins('9:25'),
        endMins: timeToMins('10:25'),
        day: Day.WEDNESDAY,
    },
    {
        id: 12,
        startMins: timeToMins('10:30'),
        endMins: timeToMins('11:25'),
        day: Day.WEDNESDAY,
    },
    {
        id: 13,
        startMins: timeToMins('12:20'),
        endMins: timeToMins('13:15'),
        day: Day.WEDNESDAY,
    },
    {
        id: 14,
        startMins: timeToMins('13:15'),
        endMins: timeToMins('14:10'),
        day: Day.WEDNESDAY,
    },
    {
        id: 15,
        startMins: timeToMins('08:30'),
        endMins: timeToMins('09:25'),
        day: Day.FRIDAY,
    },
    {
        id: 16,
        startMins: timeToMins('9:25'),
        endMins: timeToMins('10:25'),
        day: Day.FRIDAY,
    },
    {
        id: 17,
        startMins: timeToMins('10:30'),
        endMins: timeToMins('11:25'),
        day: Day.FRIDAY,
    },
    {
        id: 18,
        startMins: timeToMins('12:20'),
        endMins: timeToMins('13:15'),
        day: Day.FRIDAY,
    },
    {
        id: 19,
        startMins: timeToMins('13:15'),
        endMins: timeToMins('14:10'),
        day: Day.FRIDAY,
    },
];

const joinSubjectFaculty: [number, number][] = [
    // [subjectId, facultyId]
    [0, 0],
    [0, 4],
    [0, 5],
    [0, 8],
    [1, 2],
    [1, 6],
    [2, 1],
    [2, 4],
    [2, 9],
    [3, 0],
    [3, 5],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 6],
    [5, 0],
    [5, 8],
    [5, 9],
    [6, 5],
    [6, 8],
    [6, 9],
];

function fetchFaculties(subjectId: number) {
    return joinSubjectFaculty
        .filter(([subId]) => subId === subjectId)
        .map(([_, facultyId]) => faculties[facultyId]);
}
function fetchSubjects(facultyId: number) {
    return joinSubjectFaculty
        .filter(([_, facId]) => facId === facultyId)
        .map(([subjectId]) => subjects[subjectId]);
}

export const subjects: Subject[] = [
    {
        id: 0,
        code: 'DAA [T]',
        name: 'Design & Analysis of Algorithms - Theory',
        type: roomTypes[1],
        faculties: () => fetchFaculties(0),
    },
    {
        id: 1,
        code: 'SE [T]',
        name: 'Software Engineering - Theory',
        type: roomTypes[1],
        faculties: () => fetchFaculties(1),
    },
    {
        id: 2,
        code: 'CD [T]',
        name: 'Compiler Design - Theory',
        type: roomTypes[1],
        faculties: () => fetchFaculties(2),
    },
    {
        id: 3,
        code: 'DAA [L]',
        name: 'Design & Analysis of Algorithms - Lab',
        type: roomTypes[0],
        faculties: () => fetchFaculties(3),
    },
    {
        id: 4,
        code: 'SE [L]',
        name: 'Software Engineering - Lab',
        type: roomTypes[0],
        faculties: () => fetchFaculties(4),
    },
    {
        id: 5,
        code: 'DBMS [T]',
        name: 'Database Management Systems - Theory',
        type: roomTypes[1],
        faculties: () => fetchFaculties(5),
    },
    {
        id: 6,
        code: 'DBMS [L]',
        name: 'Database Management System - Lab',
        type: roomTypes[0],
        faculties: () => fetchFaculties(6),
    },
];

export const faculties: Faculty[] = [
    {
        id: 0,
        code: 'NPH',
        name: 'Neha Hazare',
        subjects: () => fetchSubjects(0),
    },
    {
        id: 1,
        code: 'BA',
        name: 'Bagyashree Alhat',
        subjects: () => fetchSubjects(1),
    },
    {
        id: 2,
        code: 'MBG',
        name: 'Manish Giri',
        subjects: () => fetchSubjects(2),
    },
    {
        id: 3,
        code: 'STW',
        name: 'Santosh Warpe',
        subjects: () => fetchSubjects(3),
    },
    {
        id: 4,
        code: 'PPN',
        name: 'Padma Nimbhore',
        subjects: () => fetchSubjects(4),
    },
    {
        id: 5,
        code: 'KS',
        name: 'Kavitha S',
        subjects: () => fetchSubjects(5),
    },
    {
        id: 6,
        code: 'SAJ',
        name: 'Shitalkumar Jain',
        subjects: () => fetchSubjects(6),
    },
    {
        id: 7,
        code: 'CHN',
        name: 'Chetana Nemade',
        subjects: () => fetchSubjects(7),
    },
    {
        id: 8,
        code: 'PVU',
        name: 'Prajakta Ugale',
        subjects: () => fetchSubjects(8),
    },
    {
        id: 9,
        code: 'VG',
        name: 'Vinodini Gupta',
        subjects: () => fetchSubjects(9),
    },
];

export const divisions: Division[] = [
    { id: 0, name: 'A1', strength: 14 },
    { id: 1, name: 'A2', strength: 14 },
    { id: 2, name: 'A3', strength: 13 },
    { id: 3, name: 'B1', strength: 12 },
    { id: 4, name: 'B2', strength: 18 },
    { id: 5, name: 'B3', strength: 10 },
    { id: 6, name: 'C1', strength: 13 },
    { id: 7, name: 'C2', strength: 15 },
    { id: 8, name: 'C3', strength: 14 },
];

export const lecturePairs: [Subject, Division[]][] = [
    [subjects[0], [0, 1, 2].map((i) => divisions[i])],
    [subjects[0], [0, 1, 2].map((i) => divisions[i])],
    [subjects[0], [3, 4, 5].map((i) => divisions[i])],
    [subjects[0], [3, 4, 5].map((i) => divisions[i])],
    [subjects[0], [6, 7, 8].map((i) => divisions[i])],
    [subjects[0], [6, 7, 8].map((i) => divisions[i])],

    [subjects[1], [0, 1, 2].map((i) => divisions[i])],
    [subjects[1], [0, 1, 2].map((i) => divisions[i])],
    [subjects[1], [3, 4, 5].map((i) => divisions[i])],
    [subjects[1], [3, 4, 5].map((i) => divisions[i])],
    [subjects[1], [6, 7, 8].map((i) => divisions[i])],
    [subjects[1], [6, 7, 8].map((i) => divisions[i])],

    [subjects[2], [0, 1, 2].map((i) => divisions[i])],
    [subjects[2], [0, 1, 2].map((i) => divisions[i])],
    [subjects[2], [3, 4, 5].map((i) => divisions[i])],
    [subjects[2], [3, 4, 5].map((i) => divisions[i])],
    [subjects[2], [6, 7, 8].map((i) => divisions[i])],
    [subjects[2], [6, 7, 8].map((i) => divisions[i])],

    [subjects[5], [0, 1, 2].map((i) => divisions[i])],
    [subjects[5], [3, 4, 5].map((i) => divisions[i])],
    [subjects[5], [6, 7, 8].map((i) => divisions[i])],

    [subjects[3], [0].map((i) => divisions[i])],
    [subjects[3], [0].map((i) => divisions[i])],
    [subjects[3], [1].map((i) => divisions[i])],
    [subjects[3], [1].map((i) => divisions[i])],
    [subjects[3], [2].map((i) => divisions[i])],
    [subjects[3], [2].map((i) => divisions[i])],

    [subjects[4], [0].map((i) => divisions[i])],
    [subjects[4], [1].map((i) => divisions[i])],
    [subjects[4], [2].map((i) => divisions[i])],

    [subjects[6], [0].map((i) => divisions[i])],
    [subjects[6], [0].map((i) => divisions[i])],
    [subjects[6], [1].map((i) => divisions[i])],
    [subjects[6], [1].map((i) => divisions[i])],
    [subjects[6], [2].map((i) => divisions[i])],
    [subjects[6], [2].map((i) => divisions[i])],
];
