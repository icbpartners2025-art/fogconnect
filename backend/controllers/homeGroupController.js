const asyncHandler = require("express-async-handler");
const HomeGroup = require("../models/homeGroupModel");

// @desc    Get all home groups
// @route   GET /api/homegroups
// @access  Private
const getHomeGroups = asyncHandler(async (req, res) => {
  const homeGroups = await HomeGroup.find({})
    .populate("zone")
    .populate("leader");
  res.json(homeGroups);
});

// @desc    Create a home group
// @route   POST /api/homegroups
// @access  Private/Admin
const createHomeGroup = asyncHandler(async (req, res) => {
  const { name, zone, leader } = req.body;

  const homeGroup = await HomeGroup.create({
    name,
    zone,
    leader,
  });

  if (homeGroup) {
    res.status(201).json(homeGroup);
  } else {
    res.status(400);
    throw new Error("Invalid home group data");
  }
});

// @desc    Update a home group
// @route   PUT /api/homegroups/:id
// @access  Private/Admin
const updateHomeGroup = asyncHandler(async (req, res) => {
  const { name, zone, leader } = req.body;

  const homeGroup = await HomeGroup.findById(req.params.id);

  if (homeGroup) {
    homeGroup.name = name || homeGroup.name;
    homeGroup.zone = zone || homeGroup.zone;
    homeGroup.leader = leader || homeGroup.leader;

    const updatedHomeGroup = await homeGroup.save();
    res.json(updatedHomeGroup);
  } else {
    res.status(404);
    throw new Error("Home group not found");
  }
});

// @desc    Delete a home group
// @route   DELETE /api/homegroups/:id
// @access  Private/Admin
const deleteHomeGroup = asyncHandler(async (req, res) => {
  const homeGroup = await HomeGroup.findById(req.params.id);

  if (homeGroup) {
    await homeGroup.remove();
    res.json({ message: "Home group removed" });
  } else {
    res.status(404);
    throw new Error("Home group not found");
  }
});

module.exports = {
  getHomeGroups,
  createHomeGroup,
  updateHomeGroup,
  deleteHomeGroup,
};
