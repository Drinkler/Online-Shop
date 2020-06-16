const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
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
