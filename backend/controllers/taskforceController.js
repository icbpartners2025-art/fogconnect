const asyncHandler = require("express-async-handler");
const Taskforce = require("../models/taskforceModel");
require("../models/churchModel");
require("../models/userModel");

// @desc    Get all taskforces
// @route   GET /api/taskforces
// @access  Private
const getTaskforces = asyncHandler(async (req, res) => {
  const taskforces = await Taskforce.find({})
    .populate("church")
    .populate("leader")
    .populate("members");
  res.json(taskforces);
});

// @desc    Create a taskforce
// @route   POST /api/taskforces
// @access  Private/Admin
const createTaskforce = asyncHandler(async (req, res) => {
  const { name, church, leader, members } = req.body;

  const taskforce = await Taskforce.create({
    name,
    church,
    leader,
    members,
  });

  if (taskforce) {
    res.status(201).json(taskforce);
  } else {
    res.status(400);
    throw new Error("Invalid taskforce data");
  }
});

// @desc    Update a taskforce
// @route   PUT /api/taskforces/:id
// @access  Private/Admin
const updateTaskforce = asyncHandler(async (req, res) => {
  const { name, church, leader, members } = req.body;

  const taskforce = await Taskforce.findById(req.params.id);

  if (taskforce) {
    taskforce.name = name || taskforce.name;
    taskforce.church = church || taskforce.church;
    taskforce.leader = leader || taskforce.leader;
    taskforce.members = members || taskforce.members;

    const updatedTaskforce = await taskforce.save();
    res.json(updatedTaskforce);
  } else {
    res.status(404);
    throw new Error("Taskforce not found");
  }
});

// @desc    Delete a taskforce
// @route   DELETE /api/taskforces/:id
// @access  Private/Admin
const deleteTaskforce = asyncHandler(async (req, res) => {
  const taskforce = await Taskforce.findById(req.params.id);

  if (taskforce) {
    await taskforce.remove();
    res.json({ message: "Taskforce removed" });
  } else {
    res.status(404);
    throw new Error("Taskforce not found");
  }
});

module.exports = {
  getTaskforces,
  createTaskforce,
  updateTaskforce,
  deleteTaskforce,
};
