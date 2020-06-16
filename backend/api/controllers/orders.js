//* --- Models ---
const Order = require("../models/Order");

//* --- Methods ---
exports.createOrder = async (req, res, next) => {
    // Create a new order
    const order = new Order();

    // Save order
    try {
        const savedOrder = await order.save();
        return res.status(200).json({
            message: "Order successfully created.",
            createdOrder: {
                _id: savedOrder._id,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    // Get order
    try {
        var order = await Order.findOne({ _id: orderId }).populate("products", "-__v").select("-__v").exec();
        if (!order) throw new Error();
    } catch (err) {
        return res.status(500).json({ error: "No Order found or Internal Error." });
    }

    return res.status(200).json(order);
};

exports.getAllOrders = async (req, res, next) => {
    // Get all products
    try {
        var orders = await Order.find().populate("products", "-__v").select("-__v").exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return all products
    return res.status(200).json({
        amount: orders.length,
        orders: orders,
    });
};

exports.addProduct = async (req, res, next) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    // TODO: Add amount if same product is added

    // Add product to order
    try {
        const result = await Order.updateOne({ _id: orderId }, { $push: { products: productId } }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Product added to Order successfully.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order or Product not found or Internal Error" });
    }

    return res.status(400).json({ error: "Product not found, or couldn't update order." });
};

exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;

    // Delete order by orderId
    try {
        const result = await Order.deleteOne({ _id: orderId }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Order successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order not found or Internal Error." });
    }

    // Return no order
    return res.status(409).json({
        message: "No Order was found to delete.",
    });
};

exports.deleteAllOrders = async (req, res, next) => {
    // Delete all orders
    try {
        const result = await Order.deleteMany({}).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Orders successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error." });
    }

    // Return no orders
    return res.status(409).json({
        message: "No Orders were found to delete.",
    });
};

exports.removeProduct = async (req, res, next) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;

    // Remove product from order
    try {
        const result = await Order.updateOne({ _id: orderId }, { $pull: { products: productId } }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Product successfully removed from order.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order or Product not found or Internal Error" });
    }

    // Return no product or order
    return res.status(409).json({
        message: "No Product or order was found to modify.",
    });
};

exports.removeAllProducts = async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const result = await Order.updateOne({ _id: orderId }, { $set: { products: [] } }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Products successfully removed from order.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order or Product not found or Internal Error" });
    }

    // Return no product or order
    return res.status(409).json({
        message: "No Product or order was found to modify.",
    });
};
