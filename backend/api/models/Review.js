const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        title: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 50,
        },
        message: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 500,
        },
        rating: {
            type: Number,
            require: true,
            min: 0,
            max: 10,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewSchema);
