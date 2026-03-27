CREATE TYPE "public"."job_type" AS ENUM('full_time', 'part_time', 'contract', 'temporary', 'internship', 'other');--> statement-breakpoint
CREATE TYPE "public"."work_location" AS ENUM('remote', 'on_site', 'hybrid');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"description" text,
	"website" text,
	"recruiter_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"salary" text NOT NULL,
	"location" text NOT NULL,
	"job_type" "job_type" DEFAULT 'full_time' NOT NULL,
	"openings" integer DEFAULT 1 NOT NULL,
	"role" text NOT NULL,
	"work_location" "work_location" DEFAULT 'on_site' NOT NULL,
	"company_id" integer NOT NULL,
	"posted_by_recruiter_id" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jobs_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "name_index" ON "companies" USING btree ("name");