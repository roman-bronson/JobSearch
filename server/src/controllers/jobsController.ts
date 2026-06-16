import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getJobs = async ( req: Request, res: Response ) => {
    try {
        const jobs = await prisma.job.findMany();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch jobs."
        });
    }
};
