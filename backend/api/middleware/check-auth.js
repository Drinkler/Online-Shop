require("dotenv").config({ path: "../../" });
const jwt = require("jsonwebtoken");

//* --- Models ---
const Review = require("../models/Review");
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

const checkAuth = async (req, res, next) => {
    const userId = req.params.userId;

    const reqUser = checkToken(req, res, next);

    // check if admin
    try {
        var user = await User.findOne({ _id: reqUser.userId }).exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Check if user is authorized
    if (user.admin || reqUser.userId == userId) {
        next();
    } else {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }
};

const checkAdmin = async (req, res, next) => {
    const reqUser = checkToken(req, res, next);

    try {
        var user = await User.findOne({ _id: reqUser.userId }).exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Check if user is admin
    if (user.admin) {
        next();
    } else {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }
};

const checkReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    const reqUser = checkToken(req, res, next);

    try {
        var review = await Review.findOne({ _id: reviewId }).populate("user").exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // check if admin
    try {
        var user = await User.findOne({ _id: reqUser.userId }).exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (user.admin || reqUser.userId == review.user.userId) {
        next();
    } else {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }
};

const checkOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    const reqUser = checkToken(req, res, next);

    // check if admin
    try {
        var user = await User.findOne({ _id: reqUser.userId }).exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (user.admin || user.order == orderId) {
        next();
    } else {
        return res.status(401).json({
            message: "User not authorized.",
        });
    }
};

module.exports = {
    checkAdmin,
    checkAuth,
    checkReview,
    checkOrder,
};
