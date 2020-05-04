require("dotenv").config({ path: "../../" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User");

exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Get user by email
    try {
        var user = await User.findOne({ email: email }).exec();
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
        token: token,
    });
};

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

    // Create a new user
    const user = new User({
        name: {
            first: name,
            last: surname,
        },
        email: email,
        password: hashedPassword,
    });

    // Save user
    try {
        const savedUser = await user.save();
        return res.status(200).json({
            message: "User successfully created.",
            createdUser: {
                _id: savedUser._id,
                // TODO: Lock up how to do virtuals (fullName)
                email: savedUser.email,
                name: savedUser.name.first + " " + savedUser.name.last,
            },
        });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.deleteUser = async (req, res, next) => {
    // TODO: Check if user is authorized to delete the user
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

    return res.status(409).json({
        message: "No User was found to delete.",
        ok: 0,
    });
};

exports.updateUser = async (req, res, next) => {
    // TODO: Check if user is authorized to update users information
    const userId = req.params.userId;

    const parameters = {};
    const allowedKeys = ["email", "name"];
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

    // Remove keys which are not valid
    keys.forEach((key) => {
        if (!allowedKeys.includes(key)) delete parameters[key];
    });

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

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;

    // Get user by userId
    try {
        var user = await User.findOne({ _id: userId }).exec();
        console.log(user);
        if (!user) return res.status(400).json({ message: "No User found." });
    } catch (err) {
        return res.status(500).json({ error: "No User found or Internal Error." });
    }

    // Return user data
    return res.status(200).json({
        _id: user._id,
        email: user.email,
        name: {
            first: user.name.first,
            last: user.name.last,
        },
    });
};

exports.getAllUser = async (req, res, next) => {
    // Get all users
    try {
        var users = await User.find().select("-__v").exec();
    } catch (err) {
        return res.status(500).json({ error: err });
    }

    // Return all user data
    return res.status(200).json({
        count: users.length,
        users: users.map((user) => {
            return {
                _id: user._id,
                name: {
                    first: user.name.first,
                    last: user.name.last,
                },
                email: user.email,
                request: {
                    type: "GET",
                    url: req.protocol + "://" + req.get("host") + req.originalUrl + user._id,
                },
            };
        }),
    });
};

// TODO: Add admin column in database
// TODO: Admin can set a user to admin
