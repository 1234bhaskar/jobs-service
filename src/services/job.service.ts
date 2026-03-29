import type { IJobRepository, IJobService } from "../interfaces/jobs.interface.ts";
import { JobResponseDto } from "../dtos/job.response.dto.ts";
import { NotFoundError } from "../utils/errors/app.error.ts";
import type { CreateJobDto, UpdateJobDto } from "../validators/job.validator.ts";

export class JobService implements IJobService {
    private jobRepository: IJobRepository;

    constructor(jobRepository: IJobRepository) {
        this.jobRepository = jobRepository;
    }

    async createJobService(data: CreateJobDto): Promise<JobResponseDto> {
        const job = await this.jobRepository.createJob(data as any);
        return JobResponseDto.fromEntity(job);
    }

    async updateJobService(uuid: string, updateData: UpdateJobDto): Promise<JobResponseDto> {
        const jobExists = await this.jobRepository.getJobByUuid(uuid);
        if (!jobExists) {
            throw new NotFoundError("Job not found");
        }
        const updatedJob = await this.jobRepository.updateJob({ ...updateData, uuid } as any);
        if (!updatedJob) {
            throw new Error("Failed to update job");
        }
        return JobResponseDto.fromEntity(updatedJob);
    }

    async deleteJobService(id: string): Promise<boolean> {
        const jobExists = await this.jobRepository.getJobByUuid(id);
        if (!jobExists) {
            throw new NotFoundError("Job not found");
        }
        return this.jobRepository.deleteJob(id);
    }

    async getJobService(id: string): Promise<JobResponseDto> {
        const job = await this.jobRepository.getJobByUuid(id);
        if (!job) {
            throw new NotFoundError("Job not found");
        }
        return JobResponseDto.fromEntity(job);
    }

    async getAllJobsService(): Promise<JobResponseDto[]> {
        const result = await this.jobRepository.getAllJobs();
        return JobResponseDto.fromEntities(result);
    }
}