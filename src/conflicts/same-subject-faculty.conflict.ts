import { ScheduleConflict } from '.';
import { Lecture } from '../lecture';
import type { Subject, Division, Faculty } from '../models';

type VariationMapper = { [key: string]: Faculty[] };
export class SameSubjectFacultyConflict extends ScheduleConflict {
    private static makeKey(lec: Lecture): string {
        // key: subCode;div1Name,div2Name,div3Name
        const divs = lec.divisions.map((div) => `${div.name}`).join(',');
        return `${lec.subject.code};${divs}`;
    }

    private static breakKey(key: string): [string, string[]] {
        // key: subCode;div1Name,div2Name,div3Name
        const [subCode, divsStr] = key.split(';');
        const divNames = divsStr.split(',');
        return [subCode, divNames];
    }

    private static makeVariationMap(lectures: Lecture[]): VariationMapper {
        const pairs = {} as VariationMapper;
        for (const lec of lectures) {
            const key = SameSubjectFacultyConflict.makeKey(lec);
            pairs[key] = pairs[key] ?? [];
            pairs[key].includes(lec.faculty) || pairs[key].push(lec.faculty);
        }
        return pairs;
    }

    numConflicts(lectures: Lecture[]): number {
        const pairs = SameSubjectFacultyConflict.makeVariationMap(lectures);

        let cost = 0;
        for (const key in pairs) {
            if (!pairs.hasOwnProperty(key)) continue;

            const len = pairs[key].length - 1;
            cost += len ? Math.pow(2, len) : 0;
        }
        return cost;
    }

    report(lectures: Lecture[]): [string, number][] {
        const pairs = SameSubjectFacultyConflict.makeVariationMap(lectures);

        const result: [string, number][] = [];
        for (const key in pairs) {
            if (!pairs.hasOwnProperty(key)) continue;
            if (pairs[key].length === 1) continue;

            const [sub, divs] = SameSubjectFacultyConflict.breakKey(key);
            const faculties = pairs[key].map((fac) => fac.code).join(',');
            const divsStr = divs.join(',');
            const msg = `multiple faculties (${faculties}) teach ${sub} to ${divsStr}`;

            const penalty = Math.pow(2, pairs[key].length - 1);
            result.push([msg, penalty]);
        }
        return result;
    }
}
