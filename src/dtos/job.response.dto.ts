import type { IJob } from "../interfaces/jobs.interface.ts";
import type { ExperienceLevel, JobStatus, JobType, WorkLocation } from "../constants/jobs.constant.ts";

/**
 * Response DTO for Job entity.
 * 
 * This is the public contract — only fields that clients should see.
 * Internal fields like `id`, `companyId`, `postedByRecruiterId` are excluded.
 * 
 * Uses a static factory `fromEntity()` to map the raw DB entity into this shape,
 * ensuring no internal data leaks even if the entity has extra fields.
 */
export class JobResponseDto {
    id: string;
    title: string;
    description: string;
    experienceLevel: ExperienceLevel;
    salary: {
        min: string | null;
        max: string | null;
        currency: string | null;
    };
    location: string;
    jobType: JobType;
    workLocation: WorkLocation;
    openings: number;
    role: string;
    status: JobStatus;

    private constructor(job: IJob) {
        this.id = job.uuid;
        this.title = job.title;
        this.description = job.description;
        this.experienceLevel = job.experienceLevel;
        this.salary = {
            min: job.salaryMin,
            max: job.salaryMax,
            currency: job.salaryCurrency,
        };
        this.location = job.location;
        this.jobType = job.jobType;
        this.workLocation = job.workLocation;
        this.openings = job.openings;
        this.role = job.role;
        this.status = job.status;
    }

    /**
     * Maps a raw DB entity (IJob) to the public-facing DTO.
     * This is the ONLY way to create a JobResponseDto — guaranteeing
     * that all mapping logic is centralized here.
     */
    static fromEntity(job: IJob): JobResponseDto {
        return new JobResponseDto(job);
    }

    /**
     * Maps an array of entities to DTOs. 
     * Useful for list endpoints like getAllJobs.
     */
    static fromEntities(jobs: IJob[]): JobResponseDto[] {
        return jobs.map((job) => JobResponseDto.fromEntity(job));
    }
}
