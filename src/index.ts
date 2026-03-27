import express from 'express';
import { serverConfig } from './config/index.ts';
import { appErrorHandler, genericErrorHandler } from './middleware/error.middleware.ts';
import router from './routes/jobs.routes.ts';
const app = express();

app.use(express.json());
app.use("/api/jobs", router);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, () => {
    console.log(`Jobs service is running on Port ${serverConfig.PORT}`);
});
