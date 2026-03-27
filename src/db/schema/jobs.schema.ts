import { boolean, index, integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps, uuidColumn } from "./baseColumns.schema.ts";

export const jobTypeEnum = pgEnum("job_type", ["full_time", "part_time", "contract", "temporary", "internship", "other"]);

export const workLocationEnum = pgEnum("work_location", ["remote", "on_site", "hybrid"]);

export const company = pgTable("companies", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    logo: text("logo"),
    description: text("description"),
    website: text("website"),
    recruiterId: integer("recruiter_id").notNull(),
    ...timestamps()
}, (table) => [
    index("name_index").on(table.name)
]
);

export const jobsTable = pgTable("jobs", {
    id: serial("id").primaryKey(),
    ...uuidColumn(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    salary: text("salary").notNull(),
    location: text("location").notNull(),
    jobType: jobTypeEnum("job_type").default("full_time").notNull(),
    openings: integer("openings").default(1).notNull(),
    role: text("role").notNull(),
    workLocation: workLocationEnum("work_location").default("on_site").notNull(),
    companyId: integer("company_id").notNull().references(() => company.id, { onDelete: "cascade" }),
    postedByRecruiterId: integer("posted_by_recruiter_id").notNull(),
    isActive: boolean("is_active").default(true),
    ...timestamps()
});


