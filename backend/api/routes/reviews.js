const express = require("express");
const router = express.Router();

//* --- Middlewares ---
const { checkAuth, checkAdmin, checkReview } = require("../middleware/check-auth");
const { reviewValidation } = require("../middleware/validation");

//* --- Controllers ---
const ReviewController = require("../controllers/reviews");

//* --- Routes ---
// Create review
router.post("/:userId", checkAuth, reviewValidation, ReviewController.createReview);

// Get review
router.get("/:reviewId", ReviewController.getReview);

// Get all reviews
router.get("/", ReviewController.getAllReviews);

// Update review
router.patch("/:reviewId", checkReview, ReviewController.updateReview);

// Delete review
router.delete("/:reviewId", checkReview, ReviewController.deleteReview);

// Delete all reviews
router.delete("/", checkAdmin, ReviewController.deleteAllReviews);

module.exports = router;
