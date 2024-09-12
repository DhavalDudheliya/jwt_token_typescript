const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { updateProfile, getUser } = require("../controllers/UserController");

const router = express.Router();

// Get user data
router.get("/getUser", protect, getUser);

router.put("/updateProfile", protect, updateProfile);

module.exports = router;
