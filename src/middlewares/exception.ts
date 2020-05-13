import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon/modules/http_error';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { COMMON_ERRORS } from '../utils/constant';

export default (err: any, req: Request, res: Response, next: NextFunction): object => {
    const { message, httpStatus = INTERNAL_SERVER_ERROR, name, data, code }: HttpError = err;

    let stack: any = err && err.stack;
    stack = stack ? stack.split('\n').map((item: any): string[] => item.trim()) : null;

    const response = {
        error_name: httpStatus === INTERNAL_SERVER_ERROR ? COMMON_ERRORS.SERVER_ERROR : name,
        error_message: message || null,
        error_data: data || null,
        error_code: code || httpStatus,
        stack
    };

    return res.status(httpStatus).json(response);
};
