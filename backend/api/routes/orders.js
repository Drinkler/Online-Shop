const express = require("express");
const router = express.Router();

//* --- Middlewares ---
const { checkOrder, checkAdmin } = require("../middleware/check-auth");

//* --- Controllers ---
const OrdersController = require("../controllers/orders");

//* --- Methods ---
// Create order
router.post("/", OrdersController.createOrder);

// Get order
router.get("/:orderId", checkOrder, OrdersController.getOrder);

// Get all orders
router.get("/", checkAdmin, OrdersController.getAllOrders);

// Add products to order
router.patch("/:orderId/products/:productId", checkOrder, OrdersController.addProduct);

// Delete order
router.delete("/:orderId", checkOrder, OrdersController.deleteOrder);

// Delete all orders
router.delete("/", checkAdmin, OrdersController.deleteAllOrders);

// Remove product from order
router.delete("/:orderId/products/:productId", checkOrder, OrdersController.removeProduct);

// Remove all products from order
router.delete("/:orderId/products", checkOrder, OrdersController.removeAllProducts);

module.exports = router;
