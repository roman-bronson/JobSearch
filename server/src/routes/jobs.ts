import express from "express";

const router = express.Router();

router.get('/:id', (req, res) => {
    res.send("Get the job with the specifid id: ")
})

router.get('/', (req, res) => {
    res.send("Get all jobs")
})

router.post('/:id', (req, res) => {
    res.send("Create a job with the specifid id: ")
})

router.put('/:id', (req, res) => {
    res.send("Update the job with the specifid id: ")
})

router.delete('/:id', (req, res) => {
    res.send("Get the job with the specifid id: ")
})

export default router;