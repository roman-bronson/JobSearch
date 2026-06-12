import './App.css'
import JobList from './components/JobList.tsx';
import AddJobCard from './components/AddJobForm.tsx';
import type { Job } from './types/Job.tsx'
import { useState, useEffect } from 'react'

function App() {
    const [jobs, setJobs] = useState<Job[]>(() => {
        const saved = localStorage.getItem('jobs')
        return saved ? (JSON.parse(saved) as Job[]) : []
    });

    useEffect(() => {
        localStorage.setItem('jobs', JSON.stringify(jobs))
    }, [jobs])

    const addJob = (job: Job) => {
        const newJob = {
            ...job,
            id: crypto.randomUUID()
        }

        setJobs((prevJobs) => [...prevJobs, newJob]);
    };

    const onDelete = (id: string) => {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    };

    const [renderAddJobForm, setRenderAddJobForm] = useState(false)

    const toggleRenderAddJobForm = () => {
        setRenderAddJobForm((current) => !current)
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Jobs</h2>

            <button type="button" className="btn btn-success" onClick={toggleRenderAddJobForm}>Add a Job</button>
            { renderAddJobForm && (<AddJobCard addJob={addJob} toggleRenderJobCardForm={toggleRenderAddJobForm}/>)}
            <JobList jobs={jobs} onDelete={onDelete} />
        </div>
    );
}

export default App;