const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Product side get",
    });
});

router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    res.status(200).json({
        message: "Product side post",
        product: product,
    });
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Product side get and id = " + id,
        id: id,
    });
});

module.exports = router;
