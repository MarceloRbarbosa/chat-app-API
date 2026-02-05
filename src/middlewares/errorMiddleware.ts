import { NextFunction, Request, Response } from "express";

const ERRORS = {
    unauthorized: 401,
    conflict: 409,
    not_found: 404,
    bad_request: 400
} as const

type ApplicationError = {
    type: keyof typeof ERRORS;
    message?:string
}

export default function errorHandlerMiddleware(err:ApplicationError, req: Request, res: Response, next: NextFunction){
    const statusCode = ERRORS[err.type] ?? 500;
    return res.status(statusCode).json({
        error: err.message ?? "Unexpected error"
    });
}