import { boolean, check, index, integer, numeric, pgEnum, pgTable, serial, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { softDelete, timestamps, uuidColumn } from "./baseColumns.schema.ts";
import { sql } from "drizzle-orm";

export const jobTypeEnum = pgEnum("job_type", ["full_time", "part_time", "contract", "temporary", "internship", "other"]);

export const jobStatusEnum = pgEnum("job_status", [
    "draft", "active", "paused", "closed", "expired"
]);

export const companySizeEnum = pgEnum("company_size", [
    "1_10", "11_50", "51_200", "201_500", "501_1000", "1000_plus"
]);

export const experienceLevelEnum = pgEnum("experience_level", [
    "entry", "0-1", "1-3", "3-5", "5-10", "10+"
]);

export const workLocationEnum = pgEnum("work_location", ["remote", "on_site", "hybrid"]);

export const company = pgTable("companies", {
    id: serial("id").primaryKey(),
    ...uuidColumn(),
    name: varchar("name", { length: 255 }).notNull(),
    logo: text("logo"),
    description: text("description"),
    website: text("website"),
    industry: varchar("industry", { length: 100 }),              // e.g. "fintech", "healthtech"
    size: companySizeEnum("size"),
    foundedYear: smallint("founded_year"),
    headquartersLocation: text("headquarters_location"),
    isVerified: boolean("is_verified").default(false).notNull(), // verified employer badge
    recruiterId: integer("recruiter_id").notNull(),
    ...softDelete(),
    ...timestamps()
}, (table) => [
    index("name_index").on(table.name),
    index("company_recruiter_idx").on(table.recruiterId)
]
);

export const jobsTable = pgTable("jobs", {
    id: serial("id").primaryKey(),
    ...uuidColumn(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    experienceLevel: experienceLevelEnum("experience_level").notNull(),

    salaryMin: numeric("salary_min", { precision: 12, scale: 2 }),
    salaryMax: numeric("salary_max", { precision: 12, scale: 2 }),
    salaryCurrency: varchar("salary_currency", { length: 3 }).default("INR"),

    jobType: jobTypeEnum("job_type").default("full_time").notNull(),
    workLocation: workLocationEnum("work_location").default("on_site").notNull(),

    // skills: text("skills").array(),                              // ["React", "Node.js", "AWS"]
    // benefits: text("benefits").array(),                          // ["health insurance", "401k"]
    openings: integer("openings").default(1).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    companyId: integer("company_id").notNull().references(() => company.id, { onDelete: "cascade" }),
    postedByRecruiterId: integer("posted_by_recruiter_id").notNull(),
    status: jobStatusEnum("status").default("draft").notNull(),
    ...timestamps()
}, (table) => [
    index("job_company_idx").on(table.companyId),
    index("job_status_idx").on(table.status),
    index("job_type_idx").on(table.jobType),
    index("job_work_location_idx").on(table.workLocation),
    index("job_experience_idx").on(table.experienceLevel)
]);


