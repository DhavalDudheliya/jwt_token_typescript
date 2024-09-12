const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  try {
    console.log("inside try");
    token = req.cookies.jwt;
    if (!token) {
      console.log("no token");
      res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded.id });

    next();
  } catch (error) {
    console.log("no token");
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

module.exports = protect;
