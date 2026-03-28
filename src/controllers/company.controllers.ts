import type { NextFunction, Request, Response } from "express";
import type { ICompanyController } from "../interfaces/company.interface.ts";
import type { CompanyService } from "../services/company.service.ts";

export class CompanyController implements ICompanyController {
    constructor(private readonly companyService: CompanyService) { }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const company = await this.companyService.createCompanyService(req.body);
            res.success(company, "Company created successfully", 201);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const company = await this.companyService.updateCompanyService(id, req.body);
            res.success(company, "Company updated successfully");
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const result = await this.companyService.deleteCompanyService(id);
            res.success(result, "Company deleted successfully");
        } catch (error) {
            next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const company = await this.companyService.getCompanyByIdService(id);
            res.success(company, "Company fetched successfully");
        } catch (error) {
            next(error);
        }
    };

    all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const companies = await this.companyService.getAllCompaniesService();
            res.success(companies, "Companies fetched successfully");
        } catch (error) {
            next(error);
        }
    };

    getByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const name = req.params.name as string;
            const company = await this.companyService.getCompanyByNameService(name);
            res.success(company, "Company fetched successfully");
        } catch (error) {
            next(error);
        }
    };
}