import Joi from "joi";

export const cartDto = Joi.object({
    products: Joi.array().required(),
});