import { useState } from "react";
import type { Job } from "../types/Job";

interface JobFormProps {
    mode: "create" | "edit";
    initialValues?: JobFormData;
    onSubmit: (data: JobFormData) => void | Promise<void>;
    onCancel?: () => void;
    onDelete?: () => void;
}

interface JobFormData {
    companyName: string;
    positionTitle: string;
    location: string;
    salaryMin: number;
    salaryMax?: number | null;
    status: string;
    notes?: string | null;
}

const emptyFormData: JobFormData = {
    companyName: '',
    positionTitle: '',
    location: '',
    salaryMin: 0,
    salaryMax: 0,
    status: 'APPLIED',
    notes: ''
}

interface FormErrors {
    companyName?: string;
    positionTitle?: string;
    location?: string;
    salaryMin?: string;
    salaryMax?: string;
}

export default function JobForm ( {mode, initialValues, onCancel, onDelete, onSubmit}: JobFormProps) {
    const [form, setForm] = useState<JobFormData>(initialValues ?? emptyFormData)
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    }

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
    
        if (!form.companyName.trim()) {
            errors.companyName = "Company name is required.";
        }

        if (!form.positionTitle.trim()) {
            errors.positionTitle = "Position title is required.";
        }

        if (!form.location.trim()) {
            errors.location = "Location is required.";
        }

        if (form.salaryMin <= 0) {
            errors.salaryMin = "Salary must be greater than 0.";
        }

        if (form.salaryMax && form.salaryMax < form.salaryMin) {
            errors.salaryMax = "Salary Max must be greater than Salary Min"
        }

        return errors;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const newJob = {
            companyName: form.companyName,
            positionTitle: form.positionTitle,
            location: form.location,
            salaryMin: Number(form.salaryMin),
            salaryMax: Number(form.salaryMax),
            status: form.status,
            notes: form.notes
        }

        onSubmit(newJob as Job)
        setForm(emptyFormData)
    }

    return(
        <div className="job-form" onSubmit={handleSubmit}>
            { mode === "edit" &&                     
                <div className="job-card-header-buttons">
                        <button type="button" className="btn btn-danger" onClick={onDelete}>
                            <i className="bi bi-trash2-fill"></i>
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Save
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={onCancel}>
                            Cancel
                        </button>
                    </div> }
            <div className='field'>
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <input 
                        className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                        id="companyName" 
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                    />
                    {errors.companyName && (
                        <div className="invalid-feedback">
                            {errors.companyName}
                        </div>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="positionTitle" className="form-label">Position Title</label>
                    <input
                        className={`form-control ${errors.positionTitle ? "is-invalid" : ""}`}
                        id="positionTitle"
                        name="positionTitle"
                        value={form.positionTitle}
                        onChange={handleChange}
                    />
                    {errors.positionTitle && (
                        <div className="invalid-feedback">
                            {errors.positionTitle}
                        </div>
                    )}
                </div>
            
                <div className="field">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        className={`form-control ${errors.location ? "is-invalid" : ""}`}
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                    />
                    {errors.location && (
                        <div className="invalid-feedback">
                            {errors.location}
                        </div>
                    )}
                </div>

                <div className="field">
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
                </div>

                <div className="field">
                    <label htmlFor="salaryMin" className="form-label">Salary Min (Per Year)</label>
                    <input
                        className={`form-control ${errors.salaryMin ? "is-invalid" : ""}`}
                        id="salaryMin"
                        name="salaryMin"
                        type="number"
                        value={form.salaryMin || 0}
                        onChange={handleChange}
                        onFocus={(e) => e.target.value = ''}
                    />
                    {errors.salaryMin && (
                        <div className="invalid-feedback">
                            {errors.salaryMin}
                        </div>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="salaryMax" className="form-label">Salary Max (Per Year)</label>
                    <input
                        className={`form-control ${errors.salaryMax ? "is-invalid" : ""}`}
                        id="salaryMax"
                        name="salaryMax"
                        type="number"
                        value={form.salaryMax || 0}
                        onChange={handleChange}
                        onFocus={(e) => e.target.value = ''}
                    />
                    {errors.salaryMax && (
                        <div className="invalid-feedback">
                            {errors.salaryMax}
                        </div>
                    )}
                </div>

                <div className="notes-field">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea
                        className="form-control"
                        id="notes"
                        name="notes"
                        value={form.notes ?? ""} // React doesn't like null as an input value, translate to empty string
                        onChange={handleChange}>
                    </textarea>                    
                </div>

                { mode === "create" && 
                        <div className="submit-row">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div> }
        </div>
        
    );
}