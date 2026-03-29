import { z } from "zod";
import { WORK_EXPERIENCE_ENUM, JOB_TYPE_ENUM, WORK_LOCATION_ENUM, JOB_STATUS_ENUM } from "../constants/jobs.constant.ts";

export const createJobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    experienceLevel: z.enum(WORK_EXPERIENCE_ENUM, {
        message: "Please select a valid experience level",
    }),
    description: z.string(),
    salaryMin: z.number(),
    salaryMax: z.number(),
    salaryCurrency: z.string(),
    jobType: z.enum(JOB_TYPE_ENUM, {
        message: "Please select a valid job type",
    }),
    workLocation: z.enum(WORK_LOCATION_ENUM, {
        message: "Please select a valid work location",
    }),
    openings: z.number(),
    role: z.string(),
    companyId: z.number(),
    postedByRecruiterId: z.number(),
    status: z.enum(JOB_STATUS_ENUM, {
        message: "Please select a valid job status",
    }),
});

export const updateJobSchema = z.object({
    title: z.string().min(1, "Company name is required").optional(),
    experienceLevel: z.enum(WORK_EXPERIENCE_ENUM).optional(),
    description: z.string().optional(),
    salaryMin: z.url().optional(),
    salaryMax: z.number().optional(),
    salaryCurrency: z.string().optional(),
    jobType: z.enum(JOB_TYPE_ENUM).optional(),
    workLocation: z.enum(WORK_LOCATION_ENUM).optional(),
    openings: z.number().optional(),
    role: z.string().optional(),
    companyId: z.number().optional(),
    postedByRecruiterId: z.number().optional(),
    status: z.enum(JOB_STATUS_ENUM).optional(),
})

export type CreateJobDto = z.infer<typeof createJobSchema>;
export type UpdateJobDto = z.infer<typeof updateJobSchema>;