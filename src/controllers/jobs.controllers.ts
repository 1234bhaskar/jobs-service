import type { NextFunction, Request, Response } from "express";
import type { IJobController } from "../interfaces/jobs.interface.ts";
import type { JobService } from "../services/job.service.ts";

export class JobController implements IJobController {
    constructor(private readonly jobService: JobService) { }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const job = await this.jobService.createJobService(req.body);
            res.success(job, "Job created successfully", 201);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const job = await this.jobService.updateJobService(id, req.body);
            res.success(job, "Job updated successfully");
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const result = await this.jobService.deleteJobService(id);
            res.success(result, "Company deleted successfully");
        } catch (error) {
            next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = String(req.params.id);
            const company = await this.jobService.getJobService(id);
            res.success(company, "Company fetched successfully");
        } catch (error) {
            next(error);
        }
    };

    all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const companies = await this.jobService.getAllJobsService();
            res.success(companies, "Companies fetched successfully");
        } catch (error) {
            next(error);
        }
    };
}