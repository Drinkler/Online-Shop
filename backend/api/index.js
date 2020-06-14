const express = require("express");
const router = express.Router();

const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

// Routes
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
