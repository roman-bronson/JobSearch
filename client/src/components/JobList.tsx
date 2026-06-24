import JobCard from "./JobCard";
import type { Job } from "../types/Job";

interface JobListProps {
    jobs: Job[];
    onDelete: (id: number) => void;
}

export default function JobList ({ jobs, onDelete }: JobListProps) {
    return (
        <>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} onDelete={() => onDelete(job.id)} />
            ))}
        </>
    );
}