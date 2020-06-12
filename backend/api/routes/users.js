const express = require("express");
const router = express.Router();

// Middlewares
const { loginValidation, signUpValidation, updateUserValidation } = require("../middleware/validation");

// Controllers
const UserController = require("../controllers/user");

// Methods
router.post("/signup", signUpValidation, UserController.signUpUser);

router.post("/login", loginValidation, UserController.loginUser);

router.get("/:userId", UserController.getUser);

router.get("/", UserController.getAllUser);

router.delete("/:userId", UserController.deleteUser);

router.patch("/:userId", UserController.updateUser); // TODO ADD updateUserValidation

module.exports = router;
