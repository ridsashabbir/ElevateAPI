// @desc     Register new user
// @route    POST/api/users
// @access   public
const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

// @desc     Login a user
// @route    POST/api/users/login
// @access   public
const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

// @desc     Get user data
// @route    GET /api/users/me
// @access   public
const getMe = (req, res) => {
  res.json({ message: "Get current User data" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
