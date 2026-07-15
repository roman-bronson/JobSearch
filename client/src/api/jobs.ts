import type { Job } from "../types/Job";

export interface CreateJobRequest {
    companyName: string;
    positionTitle: string;
    location: string;
    salaryMin: number;
    salaryMax?: number | null;
    status: string;
    notes?: string | null;
}

export interface UpdateJobRequest {
    companyName?: string;
    positionTitle?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number | null;
    status?: string;
    notes?: string | null;
}

const API_URL = "http://localhost:3000/jobs";

export const getAllJobs = async (): Promise<Job[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
};

export const deleteJob = async (id: number): Promise<Job> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete job");
    }

    return response.json();
}

export const createJob = async (job: CreateJobRequest): Promise<Job> => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to create job");
    }

    return response.json();
}

export const editJob = async (id: number, payload: UpdateJobRequest): Promise<Job> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to update job");
    }

    return response.json();
}