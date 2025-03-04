import Joi from 'joi';

const signupMiddleware = (req, res, next) =>{
    const signupSchema = Joi.object({
        profileImage: Joi.string().optional(),
        name: Joi.string().min(5).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required()
    });

    const { error } = signupSchema.validate(req.body);
    if(error){
        res.status(400).json({
            success: false,
            message: "Please enter correctly"
        });
    };
    next();
}

const loginMiddleware = (req, res, next) =>{
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string-email' : 'Invalid email type',
            'any.required' : 'Email is required'
        }),
        password: Joi.string().min(8).max(20).required().messages({
            'string-password' : 'Invalid password type',
            'any.required' : 'Password is required'
        })
    });

    const { error } = loginSchema.validate(req.body);
    if(error){
        res.status(400).json({
            success: false,
            message: "Please enter correctly"
        });
    };
    next();
}

export { loginMiddleware, signupMiddleware };
