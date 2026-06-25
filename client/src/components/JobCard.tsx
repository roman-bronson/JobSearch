import { useState } from 'react';
import type { Job } from '../types/Job';
import { FaTrash, FaEdit } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
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
        <div className='card' style={{ width: '18rem', marginBottom: '1rem' }}>
            <div className='card-header'>
                <input 
                    id="companyName" 
                    name="companyName"
                    value={editableJobCard.companyName} 
                    onChange={handleChange}/>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <input 
                        id="positionTitle" 
                        name="positionTitle"
                        value={editableJobCard.positionTitle} 
                        onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                    <input 
                        id="location" 
                        name="location"
                        value={editableJobCard.location} 
                        onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="salaryMin" className="form-label">Salary Min (Per Year)</label>
                    <input 
                        id="salaryMin" 
                        name="salaryMin"
                        type="number"
                        value={editableJobCard.salaryMin ?? 0} 
                        onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="salaryMax" className="form-label">Salary Max (Per Year)</label>
                    <input 
                        id="salaryMax" 
                        name="salaryMax"
                        type='number'
                        value={editableJobCard.salaryMax ?? 0} 
                        onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                    <textarea 
                        className="form-control" 
                        id="notes"
                        name='notes'
                        rows={3}
                        value={editableJobCard.notes ?? ''}
                        onChange={handleChange}>
                        </textarea>
                </li>
                <li className="list-group-item">
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
                </li>
                <li className="list-group-item">
                    <button type="button" className="btn btn-primary" onClick={() => handleSave(id, editableJobCard)}>
                        Save
                    </button>
                    <button type='button' className='btn btn-secondary' onClick={() => setIsEditing((current) => !current)}>
                        Cancel
                    </button>
                </li>

            </ul>
        </div>
        );
    }
    else {
        return (
            <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                <div className="card-header company-name">{companyName}</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item position-title">{positionTitle}</li>
                    <li className="list-group-item card-details"><IoLocationOutline className='details-icon'/>{location}</li>
                    <li className="list-group-item card-details"><TbMoneybag className='details-icon'/>{formatSalary(salaryMin, salaryMax)}</li>
                    { notes && <li className="list-group-item card-notes">{notes}</li> }
                    <li className="list-group-item card-notes">{statusMapping[status].displayName}</li>
                    <li className="list-group-item">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            <FaTrash/>
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={() => setIsEditing((current) => !current)}>
                            <FaEdit/>
                        </button>
                    </li>

                </ul>
            </div>
        );
    }
}