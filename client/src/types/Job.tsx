export interface Job {
    id: string;
    companyName: string;
    positionTitle: string;
    location: string;
    salary: { min: number; max: number };
    status: string;
}