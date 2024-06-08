import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { RoutesHandler } from '../../utils/ErrorHandler';
import { ResponseCodes } from '../../utils/response-codes';


export const Register_user = (req: any, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return RoutesHandler.sendError(res, req, errors.array(), ResponseCodes.inputError)
        }

        return RoutesHandler.sendSuccess(res, req, 'User Registered Successfully', ResponseCodes.success)
    } catch (error) {
        return RoutesHandler.sendError(res, req, 'Internal Server Error', ResponseCodes.serverError)
    }
}