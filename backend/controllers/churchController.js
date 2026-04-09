const asyncHandler = require("express-async-handler");
const Church = require("../models/churchModel");
const City = require("../models/cityModel");
const mongoose = require("mongoose");

// Helper function to get or create a city by name
const getOrCreateCity = async (cityValue) => {
  if (!cityValue) return null;

  // If it's already an ObjectId, return it
  if (mongoose.Types.ObjectId.isValid(cityValue)) {
    return cityValue;
  }

  // If it's a string, try to find or create a City document
  if (typeof cityValue === "string") {
    let city = await City.findOne({ name: cityValue });
    if (!city) {
      city = await City.create({ name: cityValue });
    }
    return city._id;
  }

  return null;
};

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
  const { name, address, city, leader, admin } = req.body;

  const church = new Church({
    name: name || "Sample name",
    address: address || "Sample address",
    city: city ? await getOrCreateCity(city) : null,
    leader: leader || null,
    admin: admin || null,
  });

  const createdChurch = await church.save();
  res.status(201).json(createdChurch);
});

// @desc    Update a church
// @route   PUT /api/churches/:id
// @access  Private/Admin
const updateChurch = asyncHandler(async (req, res) => {
  const { name, address, city, leader, admin } = req.body;

  const church = await Church.findById(req.params.id);

  if (church) {
    church.name = name || church.name;
    church.address = address || church.address;

    // Handle city - convert string to ObjectId if needed
    if (city !== undefined) {
      church.city = await getOrCreateCity(city);
    }

    // Handle leader and admin if provided
    if (leader !== undefined) {
      church.leader = leader || null;
    }
    if (admin !== undefined) {
      church.admin = admin || null;
    }

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
    await church.deleteOne();
    res.json({ message: "Church removed" });
  } else {
    res.status(404);
    throw new Error("Church not found");
  }
});

module.exports = { getChurches, createChurch, updateChurch, deleteChurch };