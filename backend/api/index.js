const express = require("express");
const router = express.Router();

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
