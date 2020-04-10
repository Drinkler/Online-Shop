const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
});
