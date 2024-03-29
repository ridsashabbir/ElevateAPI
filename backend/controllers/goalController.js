const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc     Get Goals
// @route    GET/api/goals
// @access   private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  const goalCount = goals.length; // Get the number of goals

  // Only send the 200 response if the condition is not met
  res.status(200).json({ goalCount, goals });
});

// @desc     Set Goal
// @route    POST/api/goals
// @access   private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "please add a text field" });
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(200).json(goal);
});

// @desc     Update Goal
// @route    PUT/api/goals/:id
// @access   private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure that only logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc     Delete Goal
// @route    DELETE/api/goals/:id
// @access   private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404); // Change status to 404 for "Not Found"
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure that only logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.deleteOne({ _id: req.params.id }); // You don't need to pass req.params.id to remove()

  res.status(200).json({ message: `Goal deleted at ID: ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
