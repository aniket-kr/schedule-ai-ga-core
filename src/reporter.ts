import { ConflictMap, Conflicts } from './config';
import { Schedule } from './schedule';
import { pairwise } from './utils';

export type Violation = {
    reporter: string;
    report: string;
    penalty: number;
    conflictType: 'hard' | 'soft';
    conflictLevel: 'scheduleLevel' | 'pairLevel';
};

export class ViolationReporter {
    private cache?: Violation[];

    constructor(readonly schedule: Schedule, readonly conflicts: Conflicts) {}

    violations(): Violation[] {
        if (!this.cache) {
            this.cache = this.generate();
        }
        return this.cache;
    }

    private generate(): Violation[] {
        const hardVio = this.generateViolations('hard', this.conflicts.hard);
        const softVio = this.generateViolations('soft', this.conflicts.soft);
        return [...hardVio, ...softVio];
    }

    private generateViolations(
        conflictType: Violation['conflictType'],
        conflictMap: ConflictMap,
    ): Violation[] {
        const lectures = [...this.schedule];
        const violations: Violation[] = [];

        // schedule level
        for (const strategy of conflictMap.scheduleLevel) {
            const reports = strategy.report(lectures);
            violations.push(
                ...reports.map(([report, penalty]) => {
                    return {
                        report,
                        penalty,
                        conflictType,
                        reporter: strategy.label(),
                        conflictLevel: 'scheduleLevel',
                    } as Violation;
                }),
            );
        }

        // pair level
        for (const strategy of conflictMap.pairLevel) {
            for (const [lec1, lec2] of pairwise(lectures)) {
                const reports = strategy.report(lec1, lec2);
                violations.push(
                    ...reports.map(([report, penalty]) => {
                        return {
                            report,
                            penalty,
                            conflictType,
                            reporter: strategy.label(),
                            conflictLevel: 'pairLevel',
                        } as Violation;
                    }),
                );
            }
        }

        return violations;
    }
}
