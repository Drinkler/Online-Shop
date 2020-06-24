require("dotenv").config({ path: "../../" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//* --- Models ---
const User = require("../models/User");
const Order = require("../models/Order");

//* --- Methods ---
exports.signUpUser = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;

    // Check if email already exists
    try {
        const emailExists = await User.findOne({ email: email }).exec();
        if (emailExists) return res.status(409).json({ message: "E-Mail already exists." });
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Hash password
    try {
        const salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        return res.status(500).json({ error: "Ups, something went wrong." });
    }

    // Create new Order
    const order = new Order();

    try {
        var savedOrder = await order.save();
    } catch (err) {
        return res.status(500).json({ message: "Couldn't create order" });
    }

    // Create a new user with created order
    const user = new User({
        name: {
            first: name,
            last: surname,
        },
        email: email,
        password: hashedPassword,
        order: savedOrder._id,
    });

    // Save user
    try {
        const savedUser = await user.save();
        return res.status(200).json({
            message: "User successfully created.",
            createdUser: {
                _id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name.first + " " + savedUser.name.last,
                orderId: savedUser.order,
            },
        });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Get user by email
    try {
        var user = await User.findOne({ email: email }).select("-__v").exec();
        if (!user) return res.status(400).json({ message: "Email not found." });
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Check password
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Password doesn't match." });
    }

    // Create jwt token
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.JWT_KEY,
        {
            expiresIn: "30 days",
        }
    );

    return res.status(200).json({
        message: "Successfully signed in.",
        user: {
            _id: user._id,
            email: user.email,
            name: {
                first: user.name.first,
                last: user.name.last,
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        orderId: user.order,
        token: token,
    });
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;

    // Get user by userId
    try {
        var user = await User.findOne({ _id: userId }).populate("order", "-__v").select("-__v -admin -password").exec();
        if (!user) throw new Error();
    } catch (err) {
        return res.status(500).json({ error: "No User found or Internal Error." });
    }

    // Return user data
    return res.status(200).json(user);
};

exports.getAllUser = async (req, res, next) => {
    // Get all users
    try {
        var users = await User.find().populate("order", "-__v").select("-__v -admin -password").exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return all user data
    return res.status(200).json({
        count: users.length,
        users: users,
    });
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;

    const parameters = {};
    const allowedKeys = ["email", "name", "admin", "password"];
    const allowedSubKeys = ["first", "last"];

    // Get old user information
    try {
        var userOld = await User.findOne({ _id: userId }).exec();
        if (!userOld) return res.status(400).json({ message: "User not found." });
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Get parameters which will be updated
    Object.assign(parameters, req.body);

    // Get keys
    const keys = Object.keys(parameters);

    for (const key of keys) {
        // Remove keys which are not valid
        if (!allowedKeys.includes(key)) delete parameters[key];

        // Hash password
        if (key === "password") {
            try {
                const salt = await bcrypt.genSalt(10);
                parameters[key] = await bcrypt.hash(parameters[key], salt);
            } catch (error) {
                return res.status(500).json({ error: "Ups, something went wrong." });
            }
        }
    }

    // Check subKeys of "name" if "name" is given
    if ("name" in parameters) {
        const subKeys = Object.keys(parameters.name);

        // Remove subKeys which are not valid
        subKeys.forEach((subKey) => {
            if (!allowedSubKeys.includes(subKey)) delete parameters["name"][subKey];
        });

        // If first name isn't given, replace with old one
        if (!("first" in parameters.name)) {
            parameters["name"]["first"] = userOld.name.first;
        }

        // If last name isn't given, replace with old one
        if (!("last" in parameters.name)) {
            parameters["name"]["last"] = userOld.name.last;
        }
    }

    // Update user information
    try {
        const result = await User.updateOne({ _id: userId }, { $set: parameters }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "User successfully updated.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    return res.status(400).json({ error: "User not found, or couldn't update user." });
};

exports.addOrder = async (req, res, next) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    // Add order to user
    try {
        const result = await User.updateOne({ _id: userId }, { order: orderId }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Order added to User successfully.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order or User not found or Internal Error" });
    }

    return res.status(400).json({ error: "Order not found, or couldn't update user." });
};

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;

    // Delete user by userId
    try {
        const result = await User.deleteOne({ _id: userId }).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "User successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return no user
    return res.status(409).json({
        message: "No User was found to delete.",
        ok: 0,
    });
};

exports.deleteAllUsers = async (req, res, next) => {
    // Delete all users
    try {
        const result = await User.deleteMany({}).exec();
        if (result.n != 0 && result.deletedCount != 0) {
            return res.status(200).json({
                message: "Users successfully deleted.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error." });
    }

    // Return no user
    return res.status(409).json({
        message: "No Users were found to delete.",
        ok: 0,
    });
};

exports.removeOrder = async (req, res, next) => {
    const userId = req.params.userId;

    // Remove order from user
    try {
        const result = await User.updateOne({ _id: userId }, { order: undefined }).exec();
        if (result.n != 0 && result.nModified != 0) {
            return res.status(200).json({
                message: "Order removed from User successfully.",
                ok: result.ok,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Order or User not found or Internal Error" });
    }

    return res.status(400).json({ error: "Order not found, or couldn't update user." });
};
