import Joi from "joi";

const adoptionMiddleware = (req, res, next) =>{
    const adoptionSchema = Joi.object({
        userName: Joi.string().min(5).max(15).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        message: Joi.string().min(5).max(1000).required(),
        address: Joi.string().min(5).max(100).required()
    });

    const { error } = adoptionSchema.validate(req.body);
    if(!error){
        return res.status(400).json({
            success: false,
            message: "Enter details correctly"
        });
    }
    next();
};

export default adoptionMiddleware;