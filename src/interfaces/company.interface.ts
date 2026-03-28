import type { Request, Response, NextFunction } from "express";
import type { CreateCompanyDto, UpdateCompanyDto } from "../validators/company.validator.ts";

export interface ICompany {
    id: number;
    name: string;
    logo?: string | null;
    description?: string | null;
    website?: string | null;
    recruiterId: number;
    industry: string;
    size: "1_10" | "11_50" | "51_200" | "201_500" | "501_1000" | "1000_plus";
    foundedYear: number;
    headquartersLocation: string;
    isVerified: boolean;
}


export interface ICompanyRepository {
    createCompany(data: CreateCompanyDto): Promise<ICompany>;
    updateCompany(id: number, updateData: UpdateCompanyDto): Promise<ICompany | null>;
    deleteCompany(id: number): Promise<boolean>;
    getCompanyById(id: number): Promise<ICompany | null>;
    getAllCompanies(): Promise<{ companies: ICompany[], count: number }>;
    getCompanyByName(name: string): Promise<ICompany>;
}

export interface ICompanyService {
    createCompanyService(data: CreateCompanyDto): Promise<ICompany>;
    updateCompanyService(id: number, updateData: UpdateCompanyDto): Promise<ICompany | null>;
    deleteCompanyService(id: number): Promise<boolean>;
    getCompanyByIdService(id: number): Promise<ICompany | null>;
    getAllCompaniesService(): Promise<{ companies: ICompany[], count: number }>;
    getCompanyByNameService(name: string): Promise<ICompany>;
}

export interface ICompanyController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    show(req: Request, res: Response, next: NextFunction): Promise<void>;
    all(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByName(req: Request, res: Response, next: NextFunction): Promise<void>;
}