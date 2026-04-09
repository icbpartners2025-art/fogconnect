const asyncHandler = require("express-async-handler");
const Church = require("../models/churchModel");
require("../models/cityModel");

// @desc    Get all churches
// @route   GET /api/churches
// @access  Private
const getChurches = asyncHandler(async (req, res) => {
  const churches = await Church.find({}).populate("city");
  res.json(churches);
});

// @desc    Create a church
// @route   POST /api/churches
// @access  Private/Admin
const createChurch = asyncHandler(async (req, res) => {
  const church = new Church({
    name: "Sample name",
    address: "Sample address",
    city: null,
    user: req.user._id,
  });

  const createdChurch = await church.save();
  res.status(201).json(createdChurch);
});

// @desc    Update a church
// @route   PUT /api/churches/:id
// @access  Private/Admin
const updateChurch = asyncHandler(async (req, res) => {
  const { name, address, city } = req.body;

  const church = await Church.findById(req.params.id);

  if (church) {
    church.name = name || church.name;
    church.address = address || church.address;
    church.city = city || church.city;

    const updatedChurch = await church.save();
    res.json(updatedChurch);
  } else {
    res.status(404);
    throw new Error("Church not found");
  }
});

// @desc    Delete a church
// @route   DELETE /api/churches/:id
// @access  Private/Admin
const deleteChurch = asyncHandler(async (req, res) => {
  const church = await Church.findById(req.params.id);

  if (church) {
    await church.remove();
    res.json({ message: "Church removed" });
  } else {
    res.status(404);
    throw new Error("Church not found");
  }
});

module.exports = { getChurches, createChurch, updateChurch, deleteChurch };
