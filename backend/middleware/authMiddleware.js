const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   - format of token is Bearer rtyuihgfghjk
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {}
  }
});

module.exports = { protect };
