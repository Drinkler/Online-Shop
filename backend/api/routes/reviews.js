const express = require("express");
const router = express.Router();

//* --- Controllers ---
const ReviewController = require("../controllers/reviews");

//* --- Routes ---
// Create review
// TODO: get userId by token
// TODO: add review validation
// TODO: remove reference if review is deleted
router.post("/:userId", ReviewController.createReview);

// Get review
router.get("/:reviewId", ReviewController.getReview);

// Get all reviews
router.get("/", ReviewController.getAllReviews);

// Update review
router.patch("/:reviewId", ReviewController.updateReview);

// Delete review
router.delete("/:reviewId", ReviewController.deleteReview);

// Delete all reviews
router.delete("/", ReviewController.deleteAllReviews);

module.exports = router;
