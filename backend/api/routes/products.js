const express = require("express");
const router = express.Router();

//* --- Middlewares ----
const { checkReview, checkAdmin } = require("../middleware/check-auth");
const upload = require("../middleware/upload-image");

//* --- Controllers ---
const ProductsController = require("../controllers/products");

//* --- Methods ---
// Create product
router.post("/", checkAdmin, upload.single("productImage"), ProductsController.createProduct);

// Get product
router.get("/:productId", ProductsController.getProduct);

// Get all products
router.get("/", ProductsController.getAllProducts);

// Get image of product
router.get("/:productId/image", ProductsController.getImage);

// Update product
router.patch("/:productId", checkAdmin, ProductsController.updateProduct);

// Add review to product
router.patch("/:productId/reviews/:reviewId", checkReview, ProductsController.addReview);

// Delete product
router.delete("/:productId", checkAdmin, ProductsController.deleteProduct);

// Delete all products
router.delete("/", checkAdmin, ProductsController.deleteAllProducts);

// Remove review from product
router.delete("/:productId/reviews/:reviewId", checkReview, ProductsController.removeReview);

// Remove all reviews from product
router.delete("/:productId/reviews", checkAdmin, ProductsController.removeAllReviews);

module.exports = router;
