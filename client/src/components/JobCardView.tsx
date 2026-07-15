import type { Job } from "../types/Job";
import { statusMapping } from "../types/statusMap";

interface JobCardViewProps {
    job: Job;
    onEdit?: () => void;
}

function formatSalary(salaryMin: number, salaryMax: number | null ): string {
    if (salaryMax === null || salaryMax === 0) {
        return `~${salaryMin}k`;
    }

    return `${salaryMin}k - ${salaryMax}k`;
}

export default function JobCardView({ job, onEdit }: JobCardViewProps) {
    const {companyName, positionTitle, location, salaryMin, salaryMax = null, status, notes = null } = job;

    return (
        <div className="job-card">
            <div className='job-card-header'>
                <div className="job-card-header-details">
                    <p className='company-name'>{companyName || "Untitled Job"}</p>
                    <button type='button' className='btn btn-secondary btn-sm' onClick={onEdit}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                </div>
                <p className='position-title'>{positionTitle || "Position not Specified"}</p>
            </div>
            <div className="card-body">
                <div className="card-details">
                    <div className='details-items'>
                        <i className="bi bi-geo-fill"></i> {location || "Location not Specified"}
                    </div>
                    <div className='details-items'>
                        <i className="bi bi-cash-stack"></i> {formatSalary(salaryMin, salaryMax)}
                    </div>
                </div>
                <div className="card-status" style={{backgroundColor: statusMapping[status].color}}>{statusMapping[status].displayName}</div>
                { notes && <div className="card-notes">{notes}</div> }
            </div>
        </div>
    );
}