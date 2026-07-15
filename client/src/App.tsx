import './App.css'
import JobList from './components/JobList.tsx';
import type { Job } from './types/Job.tsx'
import { useState, useEffect } from 'react'
import { getAllJobs, deleteJob, createJob, editJob, type CreateJobRequest, type UpdateJobRequest } from './api/jobs.ts';
import Header from './components/Header.tsx';

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

    const handleAddJob = async (job: CreateJobRequest) => {
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

    const handleUpdate = async (id: number, payload: UpdateJobRequest) => {
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
        <div>
            <Header renderAddJobForm={renderAddJobForm} onAddJob={handleAddJob} toggleRenderJobCardForm={toggleRenderAddJobForm}/>
            <JobList jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate}/>
        </div>
    );
}

export default App;