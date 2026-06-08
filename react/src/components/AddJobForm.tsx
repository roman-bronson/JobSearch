import type { Job } from '../types/Job'
import { useState } from 'react'

interface AddJobCardProps {
    addJob: (job: Job) => void;
}

interface FormData {
    companyName: string
    positionTitle: string
    location: string
    salary: { min: number, max: number }
    status: string
}

const initialFormData: FormData = {
    companyName: '',
    positionTitle: '',
    location: '',
    salary: { min: 0, max: 0 },
    status: 'Applied'
}

export default function AddJobForm({ addJob }: AddJobCardProps) {
    const [ form, setForm ] = useState<FormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === 'salaryMin' || name === 'salaryMax') {
            setForm((prev) => ({
                ...prev,
                salary: {
                    ...prev.salary,
                    [name === 'salaryMin' ? 'min' : 'max']: Number(value),
                }
            }))
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(form)

        const newJob = {
            companyName: form.companyName,
            positionTitle: form.positionTitle,
            location: form.location,
            salary: form.salary,
            status: form.status
        }

        addJob(newJob as Job)
        setForm(initialFormData)
    }

    return (
        <form onSubmit={handleSubmit}>
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

            <label htmlFor="salaryMin" className="form-label">Salary Min</label>
            <input 
                className="form-control" 
                id="salaryMin"
                name="salaryMin"
                type="number"
                value={form.salary.min || ''}
                onChange={handleChange}
                onFocus={(e) => e.target.value = ''}
            />

            <label htmlFor="salaryMax" className="form-label">Salary Max</label>
            <input 
                className="form-control" 
                id="salaryMax"
                name="salaryMax"
                type="number"
                value={form.salary.max || ''}
                onChange={handleChange}
                onFocus={(e) => e.target.value = ''}
            />

            <label htmlFor="status" className="form-label">Status</label>
            <select 
                className="form-select"
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
            > 
                <option value="Applied">Applied</option>
                <option value="Recruiter Screen">Recruiter Screen</option>
                <option value="Technical Interview">Technical Interview</option>
                <option value="Final Interview">Final Interview</option>
                <option value="Offer">Offer</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
            </select>
            <button type="submit" className="btn btn-primary">Add a Job</button>
        </form>
    );
}