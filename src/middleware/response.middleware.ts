import type { Request, Response, NextFunction } from 'express';

export const responseTemplate = (req: Request, res: Response, next: NextFunction) => {
    res.success = function (data: any, message = 'success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    };

    res.error = function (message = 'Internal Server Error', statusCode = 500, details = undefined) {
        return res.status(statusCode).json({
            success: false,
            message,
            error: details,
        });
    };

    next();
};