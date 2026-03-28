import express from 'express';
import { serverConfig } from './config/index.ts';
import { appErrorHandler, genericErrorHandler } from './middleware/error.middleware.ts';
import router from './routes/jobs.routes.ts';
import companyRouter from './routes/company.routes.ts';
import { responseTemplate } from './middleware/response.middleware.ts';
const app = express();

app.use(express.json());
app.use(responseTemplate);

app.use("/api/jobs", router);
app.use("/api/companies", companyRouter);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, () => {
    console.log(`Jobs service is running on Port ${serverConfig.PORT}`);
});
