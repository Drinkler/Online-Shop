const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const ProductsController = require("../controllers/products");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Managing Products
 */

// Where and how to store product Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

// Filter image by type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error("Image upload failed."), false);
    }
};

// Set upload configurations
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2 MB
    },
    fileFilter: fileFilter,
});

// TODO : Check Auth
// TODO : Add image code to middleware

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

module.exports = router;
