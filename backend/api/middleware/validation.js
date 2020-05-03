const Joi = require("@hapi/joi");

const signUpValidation = (req, res, next) => {
    const signUpSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
    });

    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

module.exports = {
    signUpValidation: signUpValidation,
};
