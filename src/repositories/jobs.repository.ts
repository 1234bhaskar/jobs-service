import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { jobsTable } from "../db/schema/jobs.schema.ts";
import type { IJobRepository, IJob } from "../interfaces/jobs.interface.ts";

export class JobsRepository implements IJobRepository {
    async createJob(data: Partial<IJob> | any): Promise<IJob> {
        const [createdJob] = await db.insert(jobsTable).values(data).returning();
        if (!createdJob) throw new Error("Failed to create job");
        return createdJob as IJob;
    }

    async updateJob(updateJob: Partial<IJob>): Promise<IJob | null> {
        const [updatedJob] = await db.update(jobsTable).set(updateJob).where(eq(jobsTable.uuid, updateJob.uuid!)).returning();
        if (!updatedJob) throw new Error("Failed to update job");
        return updatedJob as IJob;
    }
    async deleteJob(id: string): Promise<boolean> {
        const [deletedJob] = await db.delete(jobsTable).where(eq(jobsTable.uuid, id)).returning();
        if (!deletedJob) throw new Error("Failed to delete job");
        return true;
    }

    async getJobByUuid(id: string): Promise<IJob | null> {
        const [job] = await db.select().from(jobsTable).where(eq(jobsTable.uuid, id));
        if (!job) return null;
        return job as IJob;
    }

    async findJobById(id: number): Promise<IJob | null> {
        const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, id));
        if (!job) return null;
        return job as IJob;
    }

    async getAllJobs(): Promise<IJob[]> {
        const jobs = await db.select().from(jobsTable);
        return jobs as IJob[];
    }
}