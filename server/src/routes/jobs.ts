import express from "express";
import { getJobs } from "../controllers/jobsController";

const router = express.Router();

router.get('/:id', (req, res) => {
    res.send(`Get the job with the specifid id: ${req.params.id}`)
})

router.get('/', getJobs);

router.post('/:id', (req, res) => {
    res.send(`Create a job with the specifid id: ${req.params.id}`)
})

router.put('/:id', (req, res) => {
    res.send(`Get the job with the specifid id: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`Get the job with the specifid id: ${req.params.id}`)
})

export default router;