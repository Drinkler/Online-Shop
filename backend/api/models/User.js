const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            require: true,
            maxlength: 25,
        },
        last: {
            type: String,
            require: true,
            maxlength: 25,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.virtual("fullName").get(() => {
    return this.name.first + " " + this.name.last;
});

module.exports = mongoose.model("User", userSchema);
