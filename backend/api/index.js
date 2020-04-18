const express = require("express");
const router = express.Router();

const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
