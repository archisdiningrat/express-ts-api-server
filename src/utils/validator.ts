import * as Joi from '@hapi/joi';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from './constant';

const schemas: { [s: string]: Joi.ObjectSchema } = {
    login: Joi.object({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).required()
    }),
    createPost: Joi.object({
        body: Joi.object({
            title: Joi.string().min(4).max(50).required(),
            content: Joi.string().min(10).required()
        }).required()
    })
};

const defaultOptions: object = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export default (input: object, schema: string, options: object = defaultOptions): any => {
    const scheme: Joi.ObjectSchema = schemas[schema];

    return Joi.validate(input, scheme, options).catch((err): void => {
        const details = err.details.reduce((detail: any, item: any): object => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw new HttpError.HttpError({
            message: 'error validating fields',
            http_status: 422,
            name: COMMON_ERRORS.VALIDATION_ERROR,
            data: details
        });
    });
};