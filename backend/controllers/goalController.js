// @desc     Get Goals
// @route    GET/api/goals
// @access   private
const getGoals = (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "please add a text field" });
  }

  // Only send the 200 response if the condition is not met
  res.status(200).json({ message: "Get goals" });
};

// @desc     Set Goal
// @route    POST/api/goals
// @access   private
const setGoal = (req, res) => {
  res.status(200).json({ message: "Create goals" });
};

// @desc     Update Goal
// @route    PUT/api/goals/:id
// @access   private
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};

// @desc     Delete Goal
// @route    DELETE/api/goals/:id
// @access   private
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
