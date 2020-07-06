const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 200,
        },
        price: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 500,
        },
        image: {
            data: {
                type: Buffer,
                require: true,
            },
            contentType: {
                type: String,
                require: true,
            },
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
