const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                require: true,
                minlength: 1,
                maxlength: 50,
            },
            last: {
                type: String,
                require: true,
                minlength: 1,
                maxlength: 50,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 100,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 72,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        admin: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("fullName").get(() => {
    return this.name.first + " " + this.name.last;
});

module.exports = mongoose.model("User", userSchema);
