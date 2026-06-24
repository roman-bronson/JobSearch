import './App.css'
import JobList from './components/JobList.tsx';
import AddJobCard from './components/AddJobForm.tsx';
import type { Job } from './types/Job.tsx'
import { useState, useEffect } from 'react'
import { getAllJobs, deleteJob, createJob, editJob, type CreateJobRequest, type updateJobRequest } from './api/jobs.ts';

function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [renderAddJobForm, setRenderAddJobForm] = useState(false);
    
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

    const addJob = async (job: CreateJobRequest) => {
        try {
            const newJob = await createJob(job);
            setJobs((prevJobs) => [...prevJobs, newJob]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteJob(id);

            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id: number, payload: updateJobRequest) => {
        try {
            const updatedJob = await editJob(id, payload);
            setJobs((jobs) => jobs.map((job) => job.id === updatedJob.id ? updatedJob : job));
        } catch(error) {
            console.log(error);
        }
    }

    const toggleRenderAddJobForm = () => {
        setRenderAddJobForm((current) => !current)
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Jobs</h2>

            <button type="button" className="btn btn-success" onClick={toggleRenderAddJobForm}>Add a Job</button>
            { renderAddJobForm && (<AddJobCard addJob={addJob} toggleRenderJobCardForm={toggleRenderAddJobForm}/>)}
            <JobList jobs={jobs} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
        </div>
    );
}

export default App;