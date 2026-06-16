import express from "express";
import { getAllJobs, createJob, getOneJob, deleteJob, patchJob } from "../controllers/jobsController";

const router = express.Router();

router.get('/:id', getOneJob);

router.get('/', getAllJobs);

router.post('/', createJob);

router.patch('/:id', patchJob)

router.delete('/:id', deleteJob);

export default router;