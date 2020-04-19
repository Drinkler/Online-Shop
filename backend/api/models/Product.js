const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    productImage: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Product", productSchema);
