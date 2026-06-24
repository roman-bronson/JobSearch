import type { Job } from '../types/Job';
import { FaTrash } from "react-icons/fa";

interface JobCardProps {
    job: Job;
    onDelete: () => void;
}

function formatSalary(salaryMin: number, salaryMax: number | null ): string {
    if (salaryMax === null || salaryMax === 0) {
        return `~${salaryMin}k`;
    }

    return `${salaryMin}k - ${salaryMax}k`;
}

export default function JobCard({ job, onDelete }: JobCardProps) {
    const { companyName, positionTitle, location, salaryMin, salaryMax = null, status, notes = null } = job;

    return (
        <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
            <div className="card-header">{companyName}</div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{positionTitle}</li>
                <li className="list-group-item">{location}</li>
                <li className="list-group-item">{formatSalary(salaryMin, salaryMax)}</li>
                <li className="list-group-item">{status}</li>
                { notes && <li className="list-group-item">{notes}</li> }
                <li className="list-group-item"><button type="button" className="btn btn-danger" onClick={onDelete}><FaTrash/></button></li>
            </ul>
        </div>
    );
}