const Product = require("../models/Product");

exports.saveProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });

    product
        .save()
        .then((product) => {
            console.log("save");
            res.status(200).json({
                message: "Product saved successfully.",
                ok: 1,
                createdProduct: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    created: product.created,
                    request: {
                        type: "GET",
                        url: req.protocol + "://" + req.get("host") + req.originalUrl + product._id,
                    },
                },
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select("-__v -created")
        .exec()
        .then((docs) => {
            res.status(200).json({
                amount: docs.length,
                products: docs,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.getProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.productId })
        .select("-__v -created")
        .exec()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.productId })
        .exec()
        .then((result) => {
            if (result.n == 0 || result.deletedCount == 0) {
                res.status(202).json({
                    message: "Product not found or already deleted.",
                    result: result,
                });
            } else {
                res.status(200).json({
                    message: "Product deleted.",
                    result: result,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.updateProduct = (req, res, next) => {
    /**
     * Doesn't need all parameters of a product.
     * Only parameters who are defined in the model can be changed.
     * Parameters who aren't defined in the model are getting ignored.
     */
    const updateOperators = {};
    for (const operator of req.body) {
        updateOperators[operator.propName] = operator.value;
    }

    Product.updateOne({ _id: req.params.productId }, { $set: updateOperators })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Product updated.",
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};
