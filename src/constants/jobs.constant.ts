export const WORK_EXPERIENCE_ENUM = [
    "entry",
    "0-1",
    "1-3",
    "3-5",
    "5-10",
    "10+"
] as const;

export const JOB_TYPE_ENUM = [
    "full_time",
    "part_time",
    "contract",
    "temporary",
    "internship",
    "other"
] as const;

export const WORK_LOCATION_ENUM = [
    "remote",
    "on_site",
    "hybrid"
] as const;

export const JOB_STATUS_ENUM = [
    "draft",
    "active",
    "paused",
    "closed",
    "expired"
] as const;



export type ExperienceLevel = typeof WORK_EXPERIENCE_ENUM[number];
export type JobType = typeof JOB_TYPE_ENUM[number];
export type WorkLocation = typeof WORK_LOCATION_ENUM[number];
export type JobStatus = typeof JOB_STATUS_ENUM[number];