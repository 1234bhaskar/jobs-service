CREATE TYPE "public"."company_size" AS ENUM('1_10', '11_50', '51_200', '201_500', '501_1000', '1000_plus');--> statement-breakpoint
CREATE TYPE "public"."experience_level" AS ENUM('entry', '0-1', '1-3', '3-5', '5-10', '10+');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('draft', 'active', 'paused', 'closed', 'expired');--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "role" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "industry" varchar(100);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "size" "company_size";--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "founded_year" smallint;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "headquarters_location" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "experience_level" "experience_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_min" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_max" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_currency" varchar(3) DEFAULT 'INR';--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "status" "job_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
CREATE INDEX "company_recruiter_idx" ON "companies" USING btree ("recruiter_id");--> statement-breakpoint
CREATE INDEX "job_company_idx" ON "jobs" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "job_status_idx" ON "jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_type_idx" ON "jobs" USING btree ("job_type");--> statement-breakpoint
CREATE INDEX "job_work_location_idx" ON "jobs" USING btree ("work_location");--> statement-breakpoint
CREATE INDEX "job_experience_idx" ON "jobs" USING btree ("experience_level");--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_uuid_unique" UNIQUE("uuid");