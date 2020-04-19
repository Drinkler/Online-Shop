const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Product = require("../models/Product");

const OrdersController = require("../controllers/orders");

router.get("/", OrdersController.ordersGetAll);

//TODO: Add populate
router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Product.findById(id)
        .select("-__v")
        .exec()
        .then((doc) => {
            res.status(200).json({
                count: docs.length,
                orders: docs,
                request: {
                    type: "GET",
                    url: req.protocol + "://" + req.get("host") + req.originalUrl + doc._id,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post("/", (req, res, next) => {
    // Check if product exists and create new Order
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found.",
                });
            }
            const order = new Order({
                product: req.body.productId,
                quantity: req.body.quantity,
            });
            return order.save();
        })
        // If product exists, save it and return results
        .then((result) => {
            res.status(200).json({
                message: "Order stored.",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
                request: {
                    type: "GET",
                    url: req.protocol + "://" + req.get("host") + req.originalUrl + "/" + result._id,
                },
            });
        })
        // If product doesn't exists, return error
        .catch((err) =>
            res.status(500).json({
                error: err,
            })
        );
});

//TODO: Update order
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOperators = {};
    for (const operator of req.body) {
        updateOperators[operator.propName] = operator.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOperators })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Product updated.",
                request: {
                    type: "GET",
                    url: req.protocol + "://" + req.get("host") + req.originalUrl,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// TODO: Delete order
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Product deleted.",
                product: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
