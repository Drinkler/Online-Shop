const express = require("express");
const router = express.Router();

//* --- Middlewares ---
const { loginValidation, signUpValidation } = require("../middleware/validation");
const { checkAuth, checkAdmin } = require("../middleware/check-auth");

//* --- Controllers ---
const UserController = require("../controllers/user");

//* --- Methods ---
// Sign up user with email, name, surname and password
router.post("/signup", signUpValidation, UserController.signUpUser);

// Login user with email and password
router.post("/login", loginValidation, UserController.loginUser);

// Get user by userId
router.get("/:userId", /*checkAuth,*/ UserController.getUser);

// Get all users
router.get("/", /*checkAdmin,*/ UserController.getAllUser);

// Update users information by userId
router.patch("/:userId", /*checkAuth,*/ UserController.updateUser); // TODO ADD updateUserValidation

// Add order to user
router.patch("/:userId/order/:orderId", UserController.addOrder);

// Delete a user by userId
router.delete("/:userId", /*checkAuth,*/ UserController.deleteUser);

// Delete all users
router.delete("/", UserController.deleteAllUsers);

// Remove order from user
router.delete("/:userId/order", UserController.removeOrder);

module.exports = router;
