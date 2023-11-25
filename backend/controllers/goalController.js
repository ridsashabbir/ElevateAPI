const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc     Get Goals
// @route    GET/api/goals
// @access   private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  // if (!req.body.text) {
  //   return res.status(400).json({ message: "please add a text field" });
  // }

  // Only send the 200 response if the condition is not met
  res.status(200).json(goals);
});

// @desc     Set Goal
// @route    POST/api/goals
// @access   private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "please add a text field" });
  }
  res.status(200).json({ message: "Create goals" });
});

// @desc     Update Goal
// @route    PUT/api/goals/:id
// @access   private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc     Delete Goal
// @route    DELETE/api/goals/:id
// @access   private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
