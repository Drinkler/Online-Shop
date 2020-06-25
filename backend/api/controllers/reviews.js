//* --- Models ---
const Review = require("../models/Review");

//* --- Methods ---
// Create review
exports.createReview = async (req, res, next) => {
    const userId = req.params.userId;

    const title = req.body.title;
    const message = req.body.message;
    const rating = req.body.rating;

    // Create new review
    const review = new Review({
        user: userId,
        title: title,
        message: message,
        rating: rating,
    });

    // Save review
    try {
        const savedReview = await review.save();
        return res.status(200).json({
            message: "Review successfully created.",
            savedReview: {
                _id: savedReview._id,
                title: savedReview.title,
                message: savedReview.message,
                rating: savedReview.rating,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get review
exports.getReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    // Get review by reviewId
    try {
        var review = await Review.findOne({ _id: reviewId })
            .populate("user", "-__v -admin -password")
            .select("-__v")
            .exec();
        if (!review) throw new Error();
    } catch (err) {
        return res.status(500).json({ error: "No Review found" });
    }

    return res.status(200).json(review);
};

// Get all reviews
exports.getAllReviews = async (req, res, next) => {
    try {
        var reviews = await Review.find().populate("user", "-__v -admin -password").select("-__v").exec();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return all reviews
    return res.status(200).json({
        amount: reviews.length,
        reviews: reviews,
    });
};

// Update review
exports.updateReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    const parameters = {};
    const allowedKeys = ["title", "message", "rating"];

    // Get parameters of body
    Object.assign(parameters, req.body);

    // Get keys
    const keys = Object.keys(parameters);

    // Remove keys which are not valid
    keys.forEach((key) => {
        if (!allowedKeys.includes(key)) delete parameters[key];
    });

    // Update review information
    try {
        const result = await Review.updateOne({ _id: reviewId }, { $set: parameters }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Review successfully updated.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Review not found" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
};

// Delete review
exports.deleteReview = async (req, res, next) => {
    const reviewId = req.params.reviewId;

    // Delete review by reviewId
    try {
        const result = await Review.deleteOne({ _id: reviewId }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Review successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return no review
    return res.status(409).json({
        message: "No Review was found to delete.",
        ok: 0,
    });
};

// Delete all reviews
exports.deleteAllReviews = async (req, res, next) => {
    try {
        const result = await Review.deleteMany({}).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "All Reviews successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return no product
    return res.status(409).json({
        message: "No Reviews were found to delete.",
        ok: 0,
    });
};
