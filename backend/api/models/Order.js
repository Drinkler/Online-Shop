const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                // amount: {
                //     type: Number,
                //     default: 1,
                // },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
