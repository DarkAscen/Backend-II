import Joi from "joi";

export const productDto = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().positive().required(),
    code: Joi.string().required(),
    status: Joi.boolean().required(),
    stock: Joi.number().integer().positive().required(),
    category: Joi.string().required(),
});