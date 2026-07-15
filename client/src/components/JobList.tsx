import JobCard from "./JobCard";
import type { Job } from "../types/Job";
import type { UpdateJobRequest } from "../api/jobs";

interface JobListProps {
    jobs: Job[];
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, payload: UpdateJobRequest) => Promise<void>;
}

export default function JobList ({ jobs, onDelete, onUpdate }: JobListProps) {
    return (
        <div className="job-list">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} onDelete={onDelete} onUpdate={onUpdate}/>
            ))}
        </div>
    );
}