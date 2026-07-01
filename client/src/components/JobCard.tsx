import { useState } from 'react';
import type { Job } from '../types/Job';
import type { updateJobRequest } from '../api/jobs';
import { statusMapping } from '../types/statusMap';

interface JobCardProps {
    job: Job;
    handleDelete: () => void;
    handleUpdate: (id: number, payload: updateJobRequest) => void;
}

function formatSalary(salaryMin: number, salaryMax: number | null ): string {
    if (salaryMax === null || salaryMax === 0) {
        return `~${salaryMin}k`;
    }

    return `${salaryMin}k - ${salaryMax}k`;
}

export default function JobCard({ job, handleDelete, handleUpdate }: JobCardProps) {
    const { id, companyName, positionTitle, location, salaryMin, salaryMax = null, status, notes = null } = job;
    const [isEditing, setIsEditing] = useState(false);
    const [editableJobCard, setEditableJobCard] = useState({
        "companyName": companyName,
        "positionTitle": positionTitle,
        "location": location,
        "salaryMin": salaryMin,
        "salaryMax": salaryMax,
        "status": status,
        "notes": notes
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditableJobCard((prev) => ({
                ...prev,
                [name]: value,
        }));
    }

    const handleSave = (id: number, payload: updateJobRequest) => {
        payload.salaryMin = payload.salaryMin ? Number(payload.salaryMin) : 0;
        payload.salaryMax = payload.salaryMax? Number(payload.salaryMax) : 0;
        handleUpdate(id, payload)
        setIsEditing((current) => !current);
    };

    if (isEditing === true) {
        return (
        <div className='job-card'>
            <div className='job-card-header'>
                <div className="job-card-header-details">
                    <input 
                        id="companyName" 
                        name="companyName"
                        value={editableJobCard.companyName} 
                        onChange={handleChange}/>
                    <div className="job-card-header-buttons">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            <i className="bi bi-trash2-fill"></i>
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => handleSave(id, editableJobCard)}>
                            Save
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={() => setIsEditing((current) => !current)}>
                            Cancel
                        </button>
                    </div>
                </div>
                <input 
                        id="positionTitle" 
                        name="positionTitle"
                        value={editableJobCard.positionTitle} 
                        onChange={handleChange}/>
        </div>
        <div className="card-body">
            <div className="card-details">
                <div className="details-items">
                    <i className="bi bi-geo-fill"> </i>
                    <input
                        id="location"
                        name="location"
                        value={editableJobCard.location}
                        onChange={handleChange}/>
                </div>
                <div className="details-items">
                    <i className="bi bi-cash-stack"> </i> 
                    <label htmlFor="salaryMin" className="form-label">Salary Min (Per Year)</label>
                    <input
                        id="salaryMin"
                        name="salaryMin"
                        type="number"
                        value={editableJobCard.salaryMin ?? 0}
                        onChange={handleChange}/>
                    <label htmlFor="salaryMax" className="form-label">Salary Max (Per Year)</label>
                    <input 
                        id="salaryMax" 
                        name="salaryMax"
                        type='number'
                        value={editableJobCard.salaryMax ?? 0} 
                        onChange={handleChange}/>
                </div>
            </div>
                <div className='card-status'>
                    <select 
                        className="form-select"
                        id="status"
                        name="status"
                        value={editableJobCard.status}
                        onChange={handleChange}
                    > 
                        <option value="APPLIED">Applied</option>
                        <option value="RECRUITER_SCREEN">Recruiter Screen</option>
                        <option value="TECHNICAL_INTERVIEW">Technical Interview</option>
                        <option value="FINAL_INTERVIEW">Final Interview</option>
                        <option value="OFFER">Offer</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="WITHDRAWN">Withdrawn</option>
                    </select>
                </div>
                <div className='card-notes'>
                    <textarea 
                        className="form-control" 
                        id="notes"
                        name='notes'
                        rows={3}
                        value={editableJobCard.notes ?? ''}
                        onChange={handleChange}>
                        </textarea>
                </div>
            </div>
        </div>
        );
    }
    else {
        return (
            <div className="job-card">
                <div className='job-card-header'>
                    <div className="job-card-header-details">
                        <p className='company-name'>{companyName || "Untitled Job"}</p>
                        <button type='button' className='btn btn-secondary btn-sm' onClick={() => setIsEditing((current) => !current)}>
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
}