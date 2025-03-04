import Joi from 'joi';

const donationMiddleware = (req, res, next) => {
    const donationSchema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(15)
            .trim()
            .required()
            .pattern(/^[a-zA-Z\s]+$/),
        phone_number: Joi.string() 
            .pattern(/^\d{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Phone number must be exactly 10 digits'
            }),
        message: Joi.string()
            .max(500)
            .trim()
            .optional()
    }).strict();

    const { error } = donationSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }
    next();
};

export default donationMiddleware;