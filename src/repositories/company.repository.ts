import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { company } from "../db/schema/jobs.schema.ts";
import type { ICompanyRepository, ICompany } from "../interfaces/company.interface.ts";
import type { CreateCompanyDto, UpdateCompanyDto } from "../validators/company.validator.ts";

export class CompanyRepository implements ICompanyRepository {
    async createCompany(data: CreateCompanyDto): Promise<ICompany> {
        const [createdCompany] = await db.insert(company).values(data as any).returning();
        if (!createdCompany) throw new Error("Failed to create company");
        return createdCompany as ICompany;
    }

    async updateCompany(id: number, updateData: UpdateCompanyDto): Promise<ICompany | null> {
        const [updatedCompany] = await db.update(company)
            .set(updateData as any)
            .where(eq(company.id, id))
            .returning();

        return (updatedCompany as ICompany) || null;
    }

    async deleteCompany(id: number): Promise<boolean> {
        const [deleted] = await db.update(company).set({ deletedAt: new Date() }).where(eq(company.id, id)).returning();
        return !!deleted;
    }

    async getCompanyById(id: number): Promise<ICompany | null> {
        const [found] = await db.select().from(company).where(eq(company.id, id));
        return found as ICompany || null;
    }

    async getAllCompanies(): Promise<{ companies: ICompany[], count: number }> {
        const companiesList = await db.select().from(company);
        return {
            companies: companiesList as ICompany[],
            count: companiesList.length
        };
    }

    async getCompanyByName(name: string): Promise<ICompany> {
        const [found] = await db.select().from(company).where(eq(company.name, name));
        if (!found) throw new Error("Company not found");
        return found as ICompany;
    }
}