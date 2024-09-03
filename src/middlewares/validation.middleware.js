export function validate(schema) {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details,
            });
        }

        next();
    };
};