import { Router } from "express";
import { createCompanySchema, updateCompanySchema } from "../validators/company.validator.ts";
import { validateRequestBody } from "../validators/index.validator.ts";
import { CompanyRepository } from "../repositories/company.repository.ts";
import { CompanyService } from "../services/company.service.ts";
import { CompanyController } from "../controllers/company.controllers.ts";

const companyRouter = Router();
const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);
const companyController = new CompanyController(companyService);

companyRouter.post("/", validateRequestBody(createCompanySchema), companyController.create);
companyRouter.get("/", companyController.all);
companyRouter.get("/name/:name", companyController.getByName);
companyRouter.get("/:id", companyController.show);
companyRouter.put("/:id", validateRequestBody(updateCompanySchema), companyController.update);
companyRouter.delete("/:id", companyController.delete);

export default companyRouter;
