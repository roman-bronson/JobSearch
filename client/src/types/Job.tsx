export interface Job {
    id: number;
    companyName: string;
    positionTitle: string;
    location: string;
    salary: { min: number; max: number };
    status: string;
}