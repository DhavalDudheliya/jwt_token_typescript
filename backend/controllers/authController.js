const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    // Check if user already exists
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "Registered successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
      res
        .cookie("jwt", generateToken(user._id), {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          message: "Logged in successfully",
        });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
