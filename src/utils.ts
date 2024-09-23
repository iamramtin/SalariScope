import { PayCycleEnum, type PayCycleRange } from './types.js';

/**
 * @param from the start date of the pay cycle
 * @param to the end date of the pay cycle
 * @param workingDays the days of the week that are considered working days, default: Monday to Friday
 * @return the number of working days in the date range, inclusive
 */
function countWorkingDays(
    from: Date,
    to: Date,
    workingDays: number[] = [1, 2, 3, 4, 5]
): number {
    let count = 0;
    const current = new Date(from.getTime());

    while (current <= to) {
        if (workingDays.includes(current.getDay())) {
            count++
        };
        current.setDate(current.getDate() + 1);
    }

    return count;
}

/**
 * 
 * @param from the start date of the pay cycle
 * @param payCycle the pay cycle
 * @returns the start date of the current pay cycle
 */
function getStartOfCurrentPayCycle(from: Date, payCycleEnum: PayCycleEnum): Date {
    let startOfCurrentPayCycle = new Date(from.getTime());
    
    switch (payCycleEnum) {
        case PayCycleEnum.WEEKLY:
            // Calculate the start of the current week (Monday)
            const dayOfWeek = startOfCurrentPayCycle.getDay();
            const daysUntilStartOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            startOfCurrentPayCycle.setDate(startOfCurrentPayCycle.getDate() - daysUntilStartOfWeek);
            break;
        case PayCycleEnum.FORTNIGHTLY:
            // Calculate the start of the current fortnight
            const dayOfFortnight = Math.floor((startOfCurrentPayCycle.getDate() - 1) % 14);
            const daysUntilStartOfFortnight = dayOfFortnight;
            startOfCurrentPayCycle.setDate(startOfCurrentPayCycle.getDate() - daysUntilStartOfFortnight);
            break;
        case PayCycleEnum.MONTHLY:
            // Calculate the start of the current month
            startOfCurrentPayCycle.setDate(1);
            break;
        default:
            throw new Error(`Unsupported pay cycle: ${payCycleEnum}`);
    }

    return startOfCurrentPayCycle;
}

/**
 * 
 * @param from the start date of the pay cycle
 * @param payCycle the pay cycle
 * @returns the end date of the current pay cycle
 */
function getEndOfCurrentPayCycle(from: Date, payCycleEnum: PayCycleEnum): Date {
    let endOfCurrentPayCycle = new Date(from.getTime());
    
    switch (payCycleEnum) {
        case PayCycleEnum.WEEKLY:
            // Calculate the end of the current week (Sunday)
            const dayOfWeek = endOfCurrentPayCycle.getDay();
            const daysUntilEndOfWeek = 7 - dayOfWeek;
            endOfCurrentPayCycle.setDate(endOfCurrentPayCycle.getDate() + daysUntilEndOfWeek);
            break;
        case PayCycleEnum.FORTNIGHTLY:
            // Calculate the end of the current fortnight
            const dayOfFortnight = Math.floor((endOfCurrentPayCycle.getDate() - 1) % 14);
            const daysUntilEndOfFortnight = 14 - dayOfFortnight;
            endOfCurrentPayCycle.setDate(endOfCurrentPayCycle.getDate() + daysUntilEndOfFortnight);
            break;
        case PayCycleEnum.MONTHLY:
            // Calculate the end of the current month
            endOfCurrentPayCycle.setDate(new Date(endOfCurrentPayCycle.getFullYear(), endOfCurrentPayCycle.getMonth() + 1, 0).getDate());
            break;
        default:
            throw new Error(`Unsupported pay cycle: ${payCycleEnum}`);
    }

    return endOfCurrentPayCycle;
}

/**
 * @param from the start date of the pay cycle
 * @param payCycle the pay cycle
 * @param workingDays the days of the week that are considered working days, default: Monday to Friday
 * @returns the number of working days in the pay cycle
 */
function getTotalWorkingDaysInPayCycle(from: Date, payCycleEnum: PayCycleEnum, workingDays: number[]): number {
    let startOfPayCycle = getStartOfCurrentPayCycle(from, payCycleEnum);
    let endOfPayCycle = getEndOfCurrentPayCycle(from, payCycleEnum);
    
    return countWorkingDays(startOfPayCycle, endOfPayCycle, workingDays);
}

/**
 * Type guard to check if the value is of type PayCycleEnum
 * @param value the value to check
 * @returns true if the value is of type PayCycleEnum, false otherwise
 */
function isPayCycleEnum(value: any): value is PayCycleEnum {
    return Object.values(PayCycleEnum).includes(value);
}

/**
 * Type guard to check if the value is of type PayCycleRange
 * @param value the value to check
 * @returns true if the value is of type PayCycleRange, false otherwise
 */
function isPayCycleRange(value: any): value is PayCycleRange {
    return (value as PayCycleRange).endDate !== undefined && (value as PayCycleRange).startDate !== undefined;
}

export { countWorkingDays, getStartOfCurrentPayCycle, getEndOfCurrentPayCycle, getTotalWorkingDaysInPayCycle, isPayCycleEnum, isPayCycleRange };
