const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
