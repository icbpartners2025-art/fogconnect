const asyncHandler = require("express-async-handler");
const Zone = require("../models/zoneModel");
require("../models/churchModel");

// @desc    Get all zones
// @route   GET /api/zones
// @access  Private
const getZones = asyncHandler(async (req, res) => {
  const zones = await Zone.find({}).populate("church");
  res.json(zones);
});

// @desc    Create a zone
// @route   POST /api/zones
// @access  Private/Admin
const createZone = asyncHandler(async (req, res) => {
  const { name, church } = req.body;

  const zone = await Zone.create({
    name,
    church,
  });

  if (zone) {
    res.status(201).json(zone);
  } else {
    res.status(400);
    throw new Error("Invalid zone data");
  }
});

// @desc    Update a zone
// @route   PUT /api/zones/:id
// @access  Private/Admin
const updateZone = asyncHandler(async (req, res) => {
  const { name, church } = req.body;

  const zone = await Zone.findById(req.params.id);

  if (zone) {
    zone.name = name || zone.name;
    zone.church = church || zone.church;

    const updatedZone = await zone.save();
    res.json(updatedZone);
  } else {
    res.status(404);
    throw new Error("Zone not found");
  }
});

// @desc    Delete a zone
// @route   DELETE /api/zones/:id
// @access  Private/Admin
const deleteZone = asyncHandler(async (req, res) => {
  const zone = await Zone.findById(req.params.id);

  if (zone) {
    await zone.remove();
    res.json({ message: "Zone removed" });
  } else {
    res.status(404);
    throw new Error("Zone not found");
  }
});

module.exports = { getZones, createZone, updateZone, deleteZone };
