require("dotenv").config({ path: "../../" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const { signUpValidation } = require("../middleware/validation");

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email: email })
        .exec()
        .then((user) => {
            // Check if a user is found
            if (!user) {
                res.status(401).json({
                    message: "Auth failed.",
                });
            } else {
                // If user found, compare passwords
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log("password error");
                        return res.status(401).json("Auth failed.");
                    } else if (result) {
                        // Create auth token for user
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
                        // After successful sign up, return token
                        return res.status(200).json({
                            message: "Successfully signed in.",
                            token: token,
                        });
                    }
                    return res.status(400).json({ message: "Auth failed." });
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.signUpUser = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;

    // Check if email already exists
    const emailExists = await User.findOne({ email: email }).exec();
    if (emailExists) return res.status(409).json({ message: "E-Mail already exists." });

    // Hash password
    // TODO look up how to catch error
    try {
        const salt = await bcrypt.genSalt();
        var hashedPassword = await bcrypt.hash(password, saalt);
    } catch (error) {
        return res.status(500).json({ error: error });
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
                name: savedUser.name.first + " " + savedUser.name.last,
                email: savedUser.email,
            },
        });
    } catch (err) {
        return res.status(400).json({ error: err });
    }

    // // Check if email already exists
    // User.find({ email: email })
    //     .exec()
    //     .then((users) => {
    //         // If a user gets returned, email already exists
    //         if (users.length) {
    //             return res.status(409).json({
    //                 message: "Email already exists.",
    //             });
    //         } else {
    //             // hash password and save it
    //             bcrypt
    //                 .genSalt(10)
    //                 .then((salt) => {
    //                     bcrypt.hash(password, salt, (err, hash) => {
    //                         if (err) {
    //                             // Hash didn't work
    //                             return res.status(500).json({
    //                                 error: err,
    //                             });
    //                         } else {
    //                             // Create user
    //                             const user = new User({
    //                                 name: {
    //                                     first: name,
    //                                     last: surname,
    //                                 },
    //                                 email: email,
    //                                 password: hash,
    //                             });
    //                             // Save user
    //                             user.save()
    //                                 .then((result) => {
    //                                     // Response
    //                                     res.status(200).json({
    //                                         message: "User successfully created.",
    //                                         createdUser: {
    //                                             _id: result._id,
    //                                             // TODO: Lock up how to do virtuals (fullName)
    //                                             name: result.name.first + " " + result.name.last,
    //                                             email: result.email,
    //                                         },
    //                                     });
    //                                 })
    //                                 .catch((err) => {
    //                                     res.status(500).json({
    //                                         error: err,
    //                                     });
    //                                 });
    //                         }
    //                     });
    //                 })
    //                 .catch((err) => {
    //                     res.status(500).json({
    //                         error: err,
    //                     });
    //                 });
    //         }
    //     })
    //     .catch((err) => {
    //         res.status(500).json({
    //             error: err,
    //         });
    //     });
};

exports.deleteUser = (req, res, next) => {
    // TODO: Check if user is authorized to delete the user
    const userId = req.params.userId;

    // Delete User by userId
    User.deleteOne({ _id: userId })
        .exec()
        .then((result) => {
            // Check if a user got deleted
            if (result.n != 0 && result.deletedCount != 0) {
                res.status(200).json({
                    message: "User successfully deleted.",
                    result: result,
                });
            } else {
                res.status(409).json({
                    message: "No User was found to delete.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.updateUser = (req, res, next) => {
    // TODO: Check if user is authorized to update users information
    const userId = req.body.userId;

    // Get parameters which we will update
    const updateOperators = {};
    for (const operator of req.body) {
        updateOperators[operator.propName] = operator.value;
    }

    // Update user
    User.updateOne({ _id: userId }, { $set: updateOperators })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "User successfully updated.",
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

// TODO: Get users information
// TODO: Add admin column in database
// TODO: Admin can set a user to admin
// TODO: Check if required is there and unique is unique
