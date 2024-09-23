import { type EmploymentContract, type PayCycleRange, PayCycleEnum } from './types.js';
import { countWorkingDays, getEndOfCurrentPayCycle, getTotalWorkingDaysInPayCycle, isPayCycleEnum, isPayCycleRange } from './utils.js';

/**
 * @param contract the details of specific employee's contract
 * @param payCycleRange the date range of the pay cycle
 * @return total apportioned salary, min: 0, max: full salary defined in `contract` (inclusive)
 */
function apportionedSalaryWithPayCycleRange(contract: EmploymentContract, payCycleRange: PayCycleRange): number {
    if (contract.startDate < payCycleRange.startDate) {
        return contract.salary;
    }

    if (contract.startDate > payCycleRange.endDate) {
        return 0;
    }

    const numDaysWorked = countWorkingDays(contract.startDate, payCycleRange.endDate, contract.workingDays);
    const totalWorkingDaysInPayCycle = countWorkingDays(payCycleRange.startDate, payCycleRange.endDate, contract.workingDays);
    
    return contract.salary * (numDaysWorked / totalWorkingDaysInPayCycle);
}

/**
 * @param contract the details of specific employee's contract
 * @param payCycle the pay cycle
 * @return total apportioned salary, min: 0, max: full salary defined in `contract` (inclusive)
 */
function apportionedSalaryWithPayCycleEnum(contract: EmploymentContract, payCycle: PayCycleEnum): number {
    const endOfPayCycle = getEndOfCurrentPayCycle(contract.startDate, payCycle);
    const numDaysWorked = countWorkingDays(contract.startDate, endOfPayCycle, contract.workingDays);
    const totalWorkingDaysInPayCycle = getTotalWorkingDaysInPayCycle(contract.startDate, payCycle, contract.workingDays);
    
    return contract.salary * (numDaysWorked / totalWorkingDaysInPayCycle);
}

/**
 * @param contract the details of specific employee's contract
 * @param payCycle the date range of the pay cycle or the pay cycle enum
 * @return total apportioned salary, min: 0, max: full salary defined in `contract` (inclusive)
 */
function calculateApportionedSalary(contract: EmploymentContract, payCycle: PayCycleRange | PayCycleEnum): number {
    if (isPayCycleEnum(payCycle)) {
        return apportionedSalaryWithPayCycleEnum(contract, payCycle);
    } else if (isPayCycleRange(payCycle)) {
        return apportionedSalaryWithPayCycleRange(contract, payCycle);
    } else {
        throw new Error(`Unsupported pay cycle: ${payCycle}`);
    }
}

export { calculateApportionedSalary };