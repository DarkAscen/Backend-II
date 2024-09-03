import Joi from "joi";

export const userDto = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    role: Joi.string().required(),
    cart: Joi.array().required(),
});