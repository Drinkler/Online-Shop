const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 100,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
        maxlength: 300,
    },
    // productImage: {
    //     type: String,
    //     require: true,
    // },
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Product", productSchema);
