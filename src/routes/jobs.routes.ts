import { Router } from "express";
import { JobController } from "../controllers/jobs.controllers.ts";
import { JobService } from "../services/job.service.ts";
import { JobsRepository } from "../repositories/jobs.repository.ts";
import { validateRequestBody } from "../validators/index.validator.ts";
import { createJobSchema, updateJobSchema } from "../validators/job.validator.ts";

const jobRouter = Router();
const jobRepository = new JobsRepository();
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);

jobRouter.get("/health", (req, res) => {
    res.send("health check");
});

jobRouter.post("/", validateRequestBody(createJobSchema), jobController.create);
jobRouter.put("/:id", validateRequestBody(updateJobSchema), jobController.update);
jobRouter.delete("/:id", jobController.delete);
jobRouter.get("/:id", jobController.show);
jobRouter.get("/", jobController.all);






export default jobRouter;
