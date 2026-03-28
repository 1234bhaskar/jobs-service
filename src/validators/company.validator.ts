import { z } from "zod";
import { COMPANY_SIZE_ENUM, INDUSTRY_ENUM } from "../constants/company.constant.ts";

export const createCompanySchema = z.object({
    name: z.string().min(1, "Company name is required"),
    logo: z.url().optional(),
    description: z.string(),
    website: z.url().optional(),
    recruiterId: z.number(),
    industry: z.enum(INDUSTRY_ENUM, {
        message: "Please select a valid industry",
    }),
    size: z.enum(COMPANY_SIZE_ENUM, {
        message: "Please select a valid size",
    }),
    foundedYear: z.number(),
    headquartersLocation: z.string(),
});

export const updateCompanySchema = z.object({
    name: z.string().min(1, "Company name is required").optional(),
    logo: z.url().optional(),
    description: z.string().optional(),
    website: z.url().optional(),
    industry: z.enum(INDUSTRY_ENUM, {
        message: "Please select a valid industry",
    }).optional(),
    size: z.enum(COMPANY_SIZE_ENUM, {
        message: "Please select a valid size",
    }).optional(),
    foundedYear: z.number().optional(),
    headquartersLocation: z.string().optional(),
})

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
export type UpdateCompanyDto = z.infer<typeof updateCompanySchema>;