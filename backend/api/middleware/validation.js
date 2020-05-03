const Joi = require("@hapi/joi");

const signUpValidation = (req, res, next) => {
    const signUpSchema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        name: Joi.string().min(1).max(50).required(),
        surname: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(8).max(72).required(),
    });

    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

module.exports = {
    signUpValidation: signUpValidation,
};
