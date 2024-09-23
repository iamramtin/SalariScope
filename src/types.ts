export enum PayCycleEnum {
    WEEKLY = 'WEEKLY',
    FORTNIGHTLY = 'FORTNIGHTLY',
    MONTHLY = 'MONTHLY',
}


export interface PayCycleRange {
    startDate: Date,
    endDate: Date,
}

export interface EmploymentContract {
    salary: number,
    workingDays: number[],
    startDate: Date,
}