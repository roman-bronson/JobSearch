export interface Job {
    id: number;
    companyName: string;
    positionTitle: string;
    location: string;
    salaryMin: number;
    salaryMax?: number | null;
    status: string;
    notes?: string | null;
}