const express = require("express");
const router = express.Router();

//* --- Controllers ---
const OrdersController = require("../controllers/orders");

//* --- Methods ---
// Create order
router.post("/", OrdersController.createOrder);

// Get order including products
router.get("/:orderId", OrdersController.getOrder);

// Get all orders including products
router.get("/", OrdersController.getAllOrders);

// Add products to order
router.patch("/:orderId/products/:productId", OrdersController.addProduct);

// Delete order
router.delete("/:orderId", OrdersController.deleteOrder);

// Delete all orders
router.delete("/", OrdersController.deleteAllOrders);

// Remove product from order
router.delete("/:orderId/products/:productId", OrdersController.removeProduct);

// Remove all products from order
router.delete("/:orderId/products", OrdersController.removeAllProducts);

module.exports = router;
