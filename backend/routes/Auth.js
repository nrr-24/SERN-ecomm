const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

console.log(authController); // Check if register, login, getUser are defined

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Get user details route
router.get("/user", authController.getUser);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
