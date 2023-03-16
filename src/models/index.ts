import { Day } from '../utils';

export interface Model {
    id: number;
}

export interface Department extends Model {
    name: string;
}

export interface Subject extends Model {
    code: string;
    name: string;
    type: RoomType;
    faculties: () => Faculty[];
}

export interface Faculty extends Model {
    code: string;
    name: string;
    subjects: () => Subject[];
}

export interface TimeSlot extends Model {
    startMins: number;
    endMins: number;
    day: Day;
}

export interface Room extends Model {
    code: string;
    capacity: number;
    type: RoomType;
    department: Department;
}

export interface RoomType extends Model {
    name: string;
}

export interface Division extends Model {
    name: string;
    strength: number;
}

export type InputModelData = {
    roomTypes: RoomType[];
    departments: Department[];
    rooms: Room[];
    divisions: Division[];
    timeSlots: TimeSlot[];
    subjects: Subject[];
    faculties: Faculty[];
    lecturePairs: [Subject, Division[]][];
};
