const express = require("express");
const router = express.Router();

// Middlewares
const checkAuth = require("../middleware/check-auth");
const upload = require("../middleware/upload-image");

// Controllers
const ProductsController = require("../controllers/products");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Managing Products
 */

// TODO : Check Auth

/**
 * @swagger
 * path:
 *  /products/:
 *   get:
 *    summary:
 *    tags: [Products]
 *    responses:
 *     "200":
 *      description: All Products
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Product'
 */
// Get all products
router.get("/", ProductsController.getAllProducts);

/**
 * @swagger
 * path:
 *  /products/{productId}:
 *   get:
 *    summary: Get a product by id
 *    tags: [Products]
 *    parameters:
 *     - in: path
 *       name: productId
 *       schema:
 *        type: String
 *       required: true
 *       description: Id of a product
 *    responses:
 *     "200":
 *      description: One Product
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Product'
 */
router.get("/:productId", ProductsController.getProduct);

/**
 * @swagger
 * path:
 *  /products/:productId:
 *   post:
 *    summary:
 *    tags: [Products]
 *
 */
router.post("/", upload.single("productImage"), ProductsController.saveProduct);

/**
 * @swagger
 * path:
 *  /products/:
 *   patch:
 *    summary:
 *    tags: [Products]
 *
 */
router.patch("/:productId", ProductsController.updateProduct);

/**
 * @swagger
 * path:
 *  /products/:productId:
 *   delete:
 *    summary:
 *    tags: [Products]
 *
 */
router.delete("/:productId", ProductsController.deleteProduct);

// Delete all products
router.delete("/", ProductsController.deleteAllProducts);

// Add review to product
router.patch("/:productId/reviews/:reviewId", ProductsController.addReview);

// Remove review from product
router.delete("/:productId/reviews/:reviewId", ProductsController.removeReview);

// Remove all reviews from product
router.delete("/:productId/reviews", ProductsController.removeAllReviews);

module.exports = router;
