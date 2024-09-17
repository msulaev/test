import {test} from "@playwright/test";

export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMethodDecoratorContext
    ) {
        return function replacementMethod(...args: any) {
            let interpolatedName = stepName;

            if (stepName) {
                interpolatedName = stepName.replace(/{(\d+)}/g, (match, index) => {
                    return args[index] !== undefined ? JSON.stringify(args[index]) : match;
                });
            }

            const name = interpolatedName || `${context.name as string} (${this.name})`;

            return test.step(name, async () => {
                return await target.call(this, ...args);
            });
        };
    };
}