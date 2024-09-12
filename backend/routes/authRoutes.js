const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

module.exports = router;
