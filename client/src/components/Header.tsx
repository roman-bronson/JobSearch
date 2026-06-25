import type { CreateJobRequest } from "../api/jobs";
import AddJobCard from "./AddJobForm.tsx";

interface HeaderProps {
    toggleRenderJobCardForm: () => void;
    addJob: (job: CreateJobRequest) => void;
    renderAddJobForm: boolean;
}

export default function Header ( { toggleRenderJobCardForm, addJob, renderAddJobForm }: HeaderProps) {
    console.log(toggleRenderJobCardForm);
    return (
        <div className="header">
            <h2>Jobs</h2>

            <button type="button" className="btn btn-success" onClick={toggleRenderJobCardForm}>Add a Job</button>
            { renderAddJobForm && (<AddJobCard addJob={addJob} toggleRenderJobCardForm={toggleRenderJobCardForm}/>)}
        </div>
    );
}