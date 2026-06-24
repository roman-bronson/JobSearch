import express from "express";
import { getAllJobs, createJob, getOneJob, deleteJob, patchJob } from "../controllers/jobsController";

/*
|--------------------------------------------------------------------------
| Job Routes
|--------------------------------------------------------------------------
| GET    /jobs       -> Get all jobs
| GET    /jobs/:id   -> Get a single job
| POST   /jobs       -> Create a job
| PATCH  /jobs/:id   -> Update a job
| DELETE /jobs/:id   -> Delete a job
|--------------------------------------------------------------------------
*/

const router = express.Router();

router.get('/:id', getOneJob);

router.get('/', getAllJobs);

router.post('/', createJob);

router.patch('/:id', patchJob)

router.delete('/:id', deleteJob);

export default router;