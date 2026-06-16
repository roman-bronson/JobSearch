import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAllJobs = async ( req: Request, res: Response ) => {
    try {
        const jobs = await prisma.job.findMany();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch jobs."
        });
    }
};

export const createJob = async (req: Request, res: Response) => {
    try {
        const newJob = req.body;

        const requiredFields = [
            "companyName",
            "positionTitle",
            "location",
            "salaryMin",
            "status"
        ];

        const missingFields = requiredFields.filter(
            (field) => 
                newJob[field] === undefined ||
                newJob[field] === null
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Missing required fields",
                missingFields
            });
        }

        const job = await prisma.job.create({
            data: {
                companyName: newJob.companyName,
                positionTitle: newJob.positionTitle,
                location: newJob.location,
                salaryMin: newJob.salaryMin,
                salaryMax: newJob.salaryMax ?? null,
                status: newJob.status,
                notes: newJob.notes ?? null
            }
        });

        res.status(201).json(job);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create job"
        });
    }
};

export const getOneJob = async ( req: Request, res: Response ) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid job id"
            });
        }

        const job = await prisma.job.findUnique({ where: { id: id }});
        if (!job) {
            return res.status(404).json({
                message: `Specified job with id:${id} could not be found.`
            });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve job."
        });
    }
};

export const patchJob = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid job id"
            });
        }

        const existingJob = await prisma.job.findUnique({
            where: { id }
        });

        if (!existingJob) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const updateBody = req.body;

        const job = await prisma.job.update({
            where: {
                id
            },
            data: {
                ...(updateBody.companyName !== undefined && {
                    companyName: updateBody.companyName
                }),

                ...(updateBody.positionTitle !== undefined && {
                    positionTitle: updateBody.positionTitle
                }),

                ...(updateBody.location !== undefined && {
                    location: updateBody.location
                }),

                ...(updateBody.salaryMin !== undefined && {
                    salaryMin: updateBody.salaryMin
                }),

                ...(updateBody.salaryMax !== undefined && {
                    salaryMax: updateBody.salaryMax
                }),

                ...(updateBody.status !== undefined && {
                    status: updateBody.status
                }),

                ...(updateBody.notes !== undefined && {
                    notes: updateBody.notes
                }),
            }
        });

        res.status(200).json(job);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update job."
        });
    }
};

export const deleteJob = async ( req: Request, res: Response ) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "Invalid job id"
            });
        }

        const job = await prisma.job.delete({ where: { id: id }});

        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete job."
        });
    }
}