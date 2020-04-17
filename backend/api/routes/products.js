const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post("/", (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Product saved.",
                product: result,
                ok: 1,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOperators = {};
    for (const operator of req.body) {
        updateOperators[operator.propName] = operator.value;
    }
    Product.update({ _id: id }, { $set: updateOperators })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

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
