const express = require("express");
const router = express.Router();

//* --- Middlewares ---
const { checkAuth, checkAdmin, checkReview } = require("../middleware/check-auth");

//* --- Controllers ---
const ReviewController = require("../controllers/reviews");

//* --- Routes ---
// Create review
// TODO : Remove reference when review is deleted
router.post("/:userId", checkAuth, ReviewController.createReview); // TODO: add review validation

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
