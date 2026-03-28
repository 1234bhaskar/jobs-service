import type { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

/**
 * Formats ZodError issues into a clean, readable structure.
 * Each error becomes { field, message } instead of a raw Zod issue blob.
 */
const formatZodErrors = (error: ZodError) => {
    return error.issues.map((issue) => ({
        field: issue.path.join(".") || "(root)",
        message: issue.message,
        code: issue.code,
    }));
};

/**
 * @param schema - Zod schema to validate the request body
 * @returns Middleware function that validates req.body against the schema
 */
export const validateRequestBody = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: formatZodErrors(error),
                });
                return;
            }

            res.status(400).json({
                success: false,
                message: "Invalid request body",
            });
        }
    };
};

/**
 * @param schema - Zod schema to validate the request query params
 * @returns Middleware function that validates req.query against the schema
 */
export const validateQueryParams = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errorCount: error.issues.length,
                    errors: formatZodErrors(error),
                });
                return;
            }

            res.status(400).json({
                success: false,
                message: "Invalid query params",
            });
        }
    };
};
