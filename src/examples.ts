import { calculateApportionedSalary } from './index.js';
import { EmploymentContract, PayCycleRange, PayCycleEnum } from './types.js';

// Helper function to format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Example 1: Custom pay cycle range
const example4 = () => {
    console.log("Example 4: Custom pay cycle range");
    const contract: EmploymentContract = {
        salary: 6000,
        workingDays: [1, 2, 3, 4, 5], // Monday to Friday
        startDate: new Date('2023-06-20'),
    };
    const payCycleRange: PayCycleRange = {
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-06-30'),
    };
    const result = calculateApportionedSalary(contract, payCycleRange);
    console.log(`Apportioned salary: ${formatCurrency(result)}\n`);
};

// Example 2: Monthly salary, starting mid-month
const example1 = () => {
    console.log("Example 1: Monthly salary, starting mid-month");
    const contract: EmploymentContract = {
        salary: 5000,
        workingDays: [1, 2, 3, 4, 5], // Monday to Friday
        startDate: new Date('2023-06-15'), // Starting mid-month
    };
    const result = calculateApportionedSalary(contract, PayCycleEnum.MONTHLY);
    console.log(`Apportioned salary: ${formatCurrency(result)}\n`);
};

// Example 3: Weekly salary, starting mid-week
const example2 = () => {
    console.log("Example 2: Weekly salary, starting mid-week");
    const contract: EmploymentContract = {
        salary: 1000,
        workingDays: [1, 2, 3, 4, 5], // Monday to Friday
        startDate: new Date('2023-06-07'), // A Wednesday
    };
    const result = calculateApportionedSalary(contract, PayCycleEnum.WEEKLY);
    console.log(`Apportioned salary: ${formatCurrency(result)}\n`);
};

// Example 4: Fortnightly salary, starting at the beginning of the pay period
const example3 = () => {
    console.log("Example 3: Fortnightly salary, starting at the beginning of the pay period");
    const contract: EmploymentContract = {
        salary: 2000,
        workingDays: [1, 2, 3, 4, 5], // Monday to Friday
        startDate: new Date('2023-06-05'), // A Monday, start of a fortnight
    };
    const result = calculateApportionedSalary(contract, PayCycleEnum.FORTNIGHTLY);
    console.log(`Apportioned salary: ${formatCurrency(result)}\n`);
};

// Example 5: Part-time worker with non-standard working days
const example5 = () => {
    console.log("Example 5: Part-time worker with non-standard working days");
    const contract: EmploymentContract = {
        salary: 3000,
        workingDays: [1, 3, 5], // Monday, Wednesday, Friday
        startDate: new Date('2023-06-07'), // A Wednesday
    };
    const result = calculateApportionedSalary(contract, PayCycleEnum.MONTHLY);
    console.log(`Apportioned salary: ${formatCurrency(result)}\n`);
};

// Run all examples
const runExamples = () => {
    example1();
    example2();
    example3();
    example4();
    example5();
};

runExamples();