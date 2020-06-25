const Joi = require("@hapi/joi");

const loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).max(72).required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

const signUpValidation = (req, res, next) => {
    const signUpSchema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        name: Joi.string().alphanum().min(1).max(50).required(),
        surname: Joi.string().alphanum().min(1).max(50).required(),
        password: Joi.string().min(8).max(72).required(),
    });

    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

const reviewValidation = (req, res, next) => {
    const reviewSchema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        message: Joi.string().min(5).max(500).required(),
        rating: Joi.number().integer().min(0).max(10).required(),
    });

    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    next();
};

module.exports = {
    loginValidation,
    signUpValidation,
    reviewValidation,
};
