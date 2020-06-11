// Models
const Product = require("../models/Product");

exports.saveProduct = async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;

    // Create a new Product
    const product = new Product({
        name: name,
        price: price,
        description: description,
        productImage: req.protocol + "://" + req.get("host") + "/" + image.path,
    });

    // Save product
    try {
        const savedProduct = await product.save();
        return res.status(200).json({
            message: "Product successfully created.",
            createdProduct: {
                _id: savedProduct._id,
                name: savedProduct.name,
                price: savedProduct.price,
                description: savedProduct.description,
                productImage: req.protocol + "://" + req.get("host") + "/" + image.path,
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

exports.getAllProducts = async (req, res, next) => {
    // Get all products
    try {
        var products = await Product.find().select("-__v").exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return all products
    return res.status(200).json({
        amount: products.length,
        products: products,
    });
};

exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;

    // Get product by productId
    try {
        var product = await Product.findOne({ _id: productId }).select("-__v").exec();
    } catch (err) {
        return res.status(500).json({ error: "No Product found or Internal Error." });
    }

    // Return product data
    return res.status(200).json(product);
};

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    // Delete product by productId
    try {
        const result = await Product.deleteOne({ _id: productId }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Product successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return no product
    return res.status(409).json({
        message: "No Product was found to delete.",
        ok: 0,
    });
};

exports.updateProduct = async (req, res, next) => {
    const productId = req.params.productId;

    const parameters = {};
    const allowedKeys = ["name", "price", "description"];

    // Get parameters of body
    Object.assign(parameters, req.body);

    // Get keys
    const keys = Object.keys(parameters);

    // Remove keys which are not valid
    keys.forEach((key) => {
        if (!allowedKeys.includes(key)) delete parameters[key];
    });

    // Update product information
    try {
        const result = await Product.updateOne({ _id: productId }, { $set: parameters }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Product successfully updated.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    return res.status(400).json({ error: "Product not found, or couldn't update product." });
};
