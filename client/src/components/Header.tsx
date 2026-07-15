import type { CreateJobRequest } from "../api/jobs";
import JobForm from "./JobForm.tsx";

interface HeaderProps {
    toggleRenderJobCardForm: () => void;
    onAddJob: (job: CreateJobRequest) => void;
    renderAddJobForm: boolean;
}

export default function Header ( { toggleRenderJobCardForm, onAddJob, renderAddJobForm }: HeaderProps) {
    console.log(toggleRenderJobCardForm);
    return (
        <>
            <div className="header">
                <h2>Jobs</h2>

                <button type="button" className="btn btn-success" onClick={toggleRenderJobCardForm}>Add a Job</button>
            </div>
            { renderAddJobForm && (<JobForm mode="create" onSubmit={onAddJob}/>)}
        </>
    );
}