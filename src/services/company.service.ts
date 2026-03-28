import type { ICompany, ICompanyRepository, ICompanyService } from "../interfaces/company.interface.ts";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error.ts";
import type { CreateCompanyDto, UpdateCompanyDto } from "../validators/company.validator.ts";

export class CompanyService implements ICompanyService {
    private companyRepository: ICompanyRepository;
    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository
    }

    async createCompanyService(data: CreateCompanyDto): Promise<ICompany> {
        const companyExists = await this.companyRepository.getCompanyByName(data.name);
        if (companyExists) {
            throw new BadRequestError("Company already exists");
        }
        return this.companyRepository.createCompany(data);
    }

    async updateCompanyService(id: number, updateData: UpdateCompanyDto): Promise<ICompany | null> {
        const companyExists = await this.companyRepository.getCompanyById(id);
        if (!companyExists) {
            throw new NotFoundError("Company not found");
        }
        return this.companyRepository.updateCompany(id, updateData);
    }

    async deleteCompanyService(id: number): Promise<boolean> {
        const companyExists = await this.companyRepository.getCompanyById(id);
        if (!companyExists) {
            throw new NotFoundError("Company not found");
        }
        return this.companyRepository.deleteCompany(id);
    }

    async getCompanyByIdService(id: number): Promise<ICompany | null> {
        return this.companyRepository.getCompanyById(id);
    }

    async getAllCompaniesService(): Promise<{ companies: ICompany[], count: number }> {
        return this.companyRepository.getAllCompanies();
    }

    async getCompanyByNameService(name: string): Promise<ICompany> {
        return this.companyRepository.getCompanyByName(name);
    }
}