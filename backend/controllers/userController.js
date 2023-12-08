const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc     Register new user
// @route    POST/api/users
// @access   public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  res.json({ message: "Register User" });
});

// @desc     Login a user
// @route    POST/api/users/login
// @access   public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

// @desc     Get user data
// @route    GET /api/users/me
// @access   public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Get current User data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
