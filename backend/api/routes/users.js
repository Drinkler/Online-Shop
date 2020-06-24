const express = require("express");
const router = express.Router();

//* --- Middlewares ---
const { loginValidation, signUpValidation } = require("../middleware/validation");
const { checkAuth, checkAdmin } = require("../middleware/check-auth");

//* --- Controllers ---
const UserController = require("../controllers/user");

//* --- Methods ---
// Signup user
router.post("/signup", signUpValidation, UserController.signUpUser);

// Login user
router.post("/login", loginValidation, UserController.loginUser);

// Get user
router.get("/:userId", checkAuth, UserController.getUser);

// Get all users
router.get("/", checkAdmin, UserController.getAllUser);

// Update user
router.patch("/:userId", checkAuth, UserController.updateUser);

// Add order to user
router.patch("/:userId/order/:orderId", checkAuth, UserController.addOrder);

// Delete user
router.delete("/:userId", checkAuth, UserController.deleteUser);

// Delete all users
router.delete("/", checkAdmin, UserController.deleteAllUsers);

// Remove order from user
router.delete("/:userId/order", checkAuth, UserController.removeOrder);

module.exports = router;
