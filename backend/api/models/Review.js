const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    title: {
        type: String,
        require: true,
        maxlength: 50,
    },
    message: {
        type: String,
        require: true,
        maxlength: 300,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 10,
    },
});

module.exports = mongoose.model("Review", reviewSchema);
