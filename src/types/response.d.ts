import { Response } from 'express';

declare global {
    namespace Express {
        interface Response {
            success(data: any, message?: string, statusCode?: number): Response;
            error(message: string, statusCode?: number, errors?: Record<string, string>): Response;
        }
    }
}
