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

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // Include the generated token in the response
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Login a user
// @route    POST/api/users/login
// @access   public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });
  console.log("User:", user);
  console.log("Email:", email);
  console.log("Password:", password);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("User not found or Password does not match");
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  // res.json({ message: "Login User" });
});

// @desc     Get user data
// @route    GET /api/users/me
// @access   private
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Get current User data" });
});

// generate JWT
const generateToken = (id) => {
  try {
    console.log("ID for token generation:", id);
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
