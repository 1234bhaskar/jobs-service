import type { Request, Response, NextFunction } from "express";
import type { ExperienceLevel, JobStatus, JobType, WorkLocation } from "../constants/jobs.constant.ts";
import type { JobResponseDto } from "../dtos/job.response.dto.ts";
import type { CreateJobDto, UpdateJobDto } from "../validators/job.validator.ts";

export interface IJob {
    id: number;
    uuid: string;
    title: string;
    description: string;
    experienceLevel: ExperienceLevel;
    salaryMin: string | null;
    salaryMax: string | null;
    salaryCurrency: string | null;
    location: string;
    jobType: JobType;
    workLocation: WorkLocation;
    openings: number;
    role: string;
    companyId: number;
    postedByRecruiterId: number;
    status: JobStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IJobRepository {
    createJob(job: Partial<IJob>): Promise<IJob>;
    updateJob(updateJob: Partial<IJob>): Promise<IJob | null>;
    deleteJob(id: string): Promise<boolean>;
    getJobByUuid(id: string): Promise<IJob | null>;
    getAllJobs(): Promise<IJob[]>;
    findJobById(id: number): Promise<IJob | null>;
}

export interface IJobService {
    createJobService(data: CreateJobDto): Promise<JobResponseDto>;
    updateJobService(id: string, updateData: UpdateJobDto): Promise<JobResponseDto>;
    deleteJobService(id: string): Promise<boolean>;
    getJobService(id: string): Promise<JobResponseDto>;
    getAllJobsService(): Promise<JobResponseDto[]>;
}


export interface IJobController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    show(req: Request, res: Response, next: NextFunction): Promise<void>;
    all(req: Request, res: Response, next: NextFunction): Promise<void>;
}