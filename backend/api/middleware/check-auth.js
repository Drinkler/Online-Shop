const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../" });

// Models
const User = require("../models/User");

function checkToken(req, res, next) {
    // Check if token is given
    try {
        // If given, get user data
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }

    return req.userData;
}

const checkAuth = (req, res, next) => {
    const userId = req.params.userId;

    const reqUser = checkToken(req, res, next);

    // Check if user is authorized
    if (reqUser.userId != userId) {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }

    next();
};

const checkAdmin = async (req, res, next) => {
    const reqUser = checkToken(req, res, next);

    try {
        var user = await User.findOne({ _id: reqUser.userId }).exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Check if user is admin
    if (user.admin !== null && !user.admin) {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }

    next();
};

module.exports = {
    checkAdmin: checkAdmin,
    checkAuth: checkAuth,
};
