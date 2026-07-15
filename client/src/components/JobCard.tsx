import { useState } from 'react';
import type { Job } from '../types/Job';
import type { CreateJobRequest, UpdateJobRequest } from '../api/jobs';
import JobCardView from './JobCardView';
import JobForm from './JobForm';

interface JobCardProps {
    job: Job;
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, payload: UpdateJobRequest) => Promise<void>;
}

export default function JobViewCard({ job, onDelete, onUpdate }: JobCardProps) {
    const { id } = job;
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (payload: CreateJobRequest) => {
        payload.salaryMin = payload.salaryMin ? Number(payload.salaryMin) : 0;
        payload.salaryMax = payload.salaryMax? Number(payload.salaryMax) : 0;
        onUpdate(id, payload)
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await onDelete(job.id);
    };

    if (isEditing === true) {
        return (
            <div className="job-card">
                <JobForm
                mode='edit'
                initialValues={job}
                onCancel={() => setIsEditing(false)}
                onDelete={handleDelete}
                onSubmit={handleSave}/>
            </div>
        );
    }
    else {
        return (
            <JobCardView job={job} onEdit={() => setIsEditing(true)}/>
        );
    }
}