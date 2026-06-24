import JobCard from "./JobCard";
import type { Job } from "../types/Job";
import type { updateJobRequest } from "../api/jobs";

interface JobListProps {
    jobs: Job[];
    handleDelete: (id: number) => void;
    handleUpdate: (id: number, payload: updateJobRequest) => Promise<void>;
}

export default function JobList ({ jobs, handleDelete, handleUpdate }: JobListProps) {
    return (
        <>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} handleDelete={() => handleDelete(job.id)} handleUpdate={handleUpdate}/>
            ))}
        </>
    );
}