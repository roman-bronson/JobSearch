import type { Job } from '../types/Job'
import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react'

interface AddJobCardProps {
    addJob: (job: Job) => void;
    toggleRenderJobCardForm: () => void;
}

interface FormData {
    companyName: string;
    positionTitle: string;
    location: string;
    salaryMin: number;
    salaryMax?: number | null;
    status: string;
    notes?: string | null;
}

const initialFormData: FormData = {
    companyName: '',
    positionTitle: '',
    location: '',
    salaryMin: 0,
    salaryMax: 0,
    status: 'APPLIED',
    notes: ''
}

export default function AddJobForm({ addJob, toggleRenderJobCardForm }: AddJobCardProps) {
    const [ form, setForm ] = useState<FormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
                ...prev,
                [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newJob = {
            companyName: form.companyName,
            positionTitle: form.positionTitle,
            location: form.location,
            salaryMin: Number(form.salaryMin),
            salaryMax: Number(form.salaryMax),
            status: form.status,
            notes: form.notes
        }

        addJob(newJob as Job)
        setForm(initialFormData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" className="btn btn-danger" onClick={toggleRenderJobCardForm}><FaXmark /></button>
            <label htmlFor="companyName" className="form-label">Company Name</label>
            <input 
                className="form-control" 
                id="companyName" 
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
            />

            <label htmlFor="positionTitle" className="form-label">Position Title</label>
            <input 
                className="form-control" 
                id="positionTitle"
                name="positionTitle"
                value={form.positionTitle}
                onChange={handleChange}
            />

            <label htmlFor="location" className="form-label">Location</label>
            <input 
                className="form-control" 
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
            />

            <label htmlFor="salaryMin" className="form-label">Salary Min (Per Year)</label>
            <input 
                className="form-control" 
                id="salaryMin"
                name="salaryMin"
                type="number"
                value={form.salaryMin || 0}
                onChange={handleChange}
                onFocus={(e) => e.target.value = ''}
            />

            <label htmlFor="salaryMax" className="form-label">Salary Max (Per Year)</label>
            <input 
                className="form-control" 
                id="salaryMax"
                name="salaryMax"
                type="number"
                value={form.salaryMax || 0}
                onChange={handleChange}
                onFocus={(e) => e.target.value = ''}
            />

            <label htmlFor="notes" className="form-label">Notes</label>
            <input 
                className="form-control" 
                id="notes" 
                name="notes"
                value={form.notes ?? ""} // React doesn't like null as an input value, translate to empty string
                onChange={handleChange}
            />

            <label htmlFor="status" className="form-label">Status</label>
            <select 
                className="form-select"
                id="status"
                name="status"
                value={form.status}
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}