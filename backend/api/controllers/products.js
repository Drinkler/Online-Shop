const fs = require("fs");

//* --- Models ---
const Product = require("../models/Product");

//* --- Methods ---
// Create product
exports.createProduct = async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;

    // Create a new Product
    const product = new Product({
        name: name,
        price: price,
        description: description,
        image: {
            data: fs.readFileSync(image.path),
            contentType: image.mimetype,
        },
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
            },
        });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// Get product
exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;

    // Get product by productId
    try {
        var product = await Product.findOne({ _id: productId })
            .populate({
                path: "reviews",
                select: "-__v",
                populate: {
                    path: "user",
                    select: "-__v -password -admin",
                },
            })
            .select("-__v")
            .exec();
        if (!product) throw new Error();
    } catch (err) {
        return res.status(500).json({ error: "No Product found or Internal Error." });
    }

    return res.status(200).json({
        product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            reviews: product.reviews,
            image: "/rest/api/products/" + product._id + "/image",
        },
        quantity: 1,
    });
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
    // Get all products
    try {
        var docs = await Product.find()
            .populate({
                path: "reviews",
                select: "-__v",
                populate: {
                    path: "user",
                    select: "-__v -password -admin",
                },
            })
            .select("-__v")
            .exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return all products
    return res.status(200).json({
        amount: docs.length,
        products: docs.map((product) => {
            return {
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    reviews: product.reviews,
                    image: "/rest/api/products/" + product._id + "/image",
                },
                quantity: 1,
            };
        }),
    });
};

// Get image of product
exports.getImage = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        var result = await Product.find({ _id: productId }).select("image").exec();
    } catch (err) {
        return res.status(500).json({ error: "Internal Error." });
    }

    const img = Buffer.from(result[0].image.data, "base64");

    res.writeHead(200, {
        "Content-Type": result[0].image.contentType,
        "Content-Length": result[0].image.data.length,
    });
    return res.end(img);
};

// Update product
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

// Add review to product
exports.addReview = async (req, res, next) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    // Add review to product
    try {
        const result = await Product.updateOne({ _id: productId }, { $push: { reviews: reviewId } }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Review added to Product successfully.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Review or Product not found or Internal Error" });
    }

    return res.status(400).json({ error: "Review not found, or couldn't update product." });
};

// Delete product
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

// Delete all products
exports.deleteAllProducts = async (req, res, next) => {
    // Delete all products
    try {
        const result = await Product.deleteMany({}).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Products successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error" });
    }

    // Return no product
    return res.status(409).json({
        message: "No Products were found to delete.",
        ok: 0,
    });
};

// Remove review from product
exports.removeReview = async (req, res, next) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    // Remove review from product
    try {
        const result = await Product.updateOne({ _id: productId }, { $pull: { reviews: reviewId } }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Review successfully removed from product.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Review or Product not found or Internal Error" });
    }

    // Return no product or review
    return res.status(409).json({
        message: "No Review or order was found to modify.",
    });
};

// Remove all reviews from product
exports.removeAllReviews = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const result = await Product.updateOne({ _id: productId }, { $set: { reviews: [] } }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Reviews successfully removed from product.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Review or Product not found or Internal Error" });
    }

    // Return no product or reviews
    return res.status(409).json({
        message: "No Review or order was found to modify.",
    });
};
