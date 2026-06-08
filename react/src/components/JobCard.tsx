import type { Job } from '../types/Job';
import { FaTrash } from "react-icons/fa";

interface JobCardProps {
    job: Job;
    onDelete: () => void;
}

function formatSalary(salary: number | { min: number; max: number }): string {
    if (typeof salary === 'number') {
        return `${salary}k`;
    }

    const { min, max } = salary;
    
    // If max is 0 or not provided, display just min as a flat number
    if (!max || max === 0) {
        return `${min}k`;
    }

    // If both min and max exist, display range
    return `${min}k - ${max}k`;
}

export default function JobCard({ job, onDelete }: JobCardProps) {
    const { companyName, positionTitle, location, salary, status } = job;

    return (
        <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
            <div className="card-header">{companyName}</div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{positionTitle}</li>
                <li className="list-group-item">{location}</li>
                <li className="list-group-item">{formatSalary(salary)}</li>
                <li className="list-group-item">{status}</li>
                <li className="list-group-item"><button type="button" className="btn btn-danger" onClick={onDelete}><FaTrash/></button></li>
            </ul>
        </div>
    );
}