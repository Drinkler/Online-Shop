const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
