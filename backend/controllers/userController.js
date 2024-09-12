const User = require("../models/userModel");

// @desc    Get user data
// @route   GET /users/getUser
// @access  Private
const getUser = (req, res) => {
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `Error occured ${error}` });
  }
};

const updateProfile = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    );
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `Error occured ${error}` });
  }
};

module.exports = { getUser, updateProfile };
