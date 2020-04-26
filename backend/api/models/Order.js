const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            require: true,
            amount: {
                type: Number,
                default: 1,
            },
        },
    ],
    bill: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);
