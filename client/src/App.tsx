import './App.css'
import JobList from './components/JobList.tsx';
import AddJobCard from './components/AddJobForm.tsx';
import type { Job } from './types/Job.tsx'
import { useState, useEffect } from 'react'
import { getAllJobs, deleteJob, createJob } from './api/jobs.ts';

function App() {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsData = await getAllJobs();
                setJobs(jobsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    const addJob = async (job: Job) => {
        try {
            const newJob = await createJob(job);
            setJobs((prevJobs) => [...prevJobs, newJob]);
        } catch (error) {
            console.error(error);
        }
    };

    const onDelete = async (id: number) => {
        try {
            await deleteJob(id);

            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error(error);
        }
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