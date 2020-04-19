const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../../" });
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists.",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(200).json({
                                    message: "User created",
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({ message: "Auth failed" });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: "Auth failed" });
                }
                if (result) {
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
                        message: "Auth successful",
                        token: token,
                    });
                }
                return res.status(200).json({ message: "Auth failed" });
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

router.delete("/:userId", (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(() => {
            //TODO: Can delete multiple users, check if result is given or not?
            res.status(200).json({
                message: "User deleted.",
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
