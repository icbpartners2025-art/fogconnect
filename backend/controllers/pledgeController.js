const asyncHandler = require("express-async-handler");
const Pledge = require("../models/pledgeModel");

// @desc    Get all pledges
// @route   GET /api/pledges
// @access  Private
const getPledges = asyncHandler(async (req, res) => {
  const pledges = await Pledge.find({}).populate("user");
  res.json(pledges);
});

// @desc    Create a pledge
// @route   POST /api/pledges
// @access  Private
const createPledge = asyncHandler(async (req, res) => {
  const { amount, dueDate } = req.body;

  const pledge = await Pledge.create({
    user: req.user._id,
    amount,
    dueDate,
  });

  if (pledge) {
    res.status(201).json(pledge);
  } else {
    res.status(400);
    throw new Error("Invalid pledge data");
  }
});

// @desc    Update a pledge
// @route   PUT /api/pledges/:id
// @access  Private
const updatePledge = asyncHandler(async (req, res) => {
  const { amount, dueDate, status } = req.body;

  const pledge = await Pledge.findById(req.params.id);

  if (pledge) {
    if (
      pledge.user.toString() !== req.user._id.toString() &&
      req.user.role.name !== "Admin"
    ) {
      res.status(401);
      throw new Error("Not authorized to update this pledge");
    }

    pledge.amount = amount || pledge.amount;
    pledge.dueDate = dueDate || pledge.dueDate;
    pledge.status = status || pledge.status;

    const updatedPledge = await pledge.save();
    res.json(updatedPledge);
  } else {
    res.status(404);
    throw new Error("Pledge not found");
  }
});

// @desc    Delete a pledge
// @route   DELETE /api/pledges/:id
// @access  Private
const deletePledge = asyncHandler(async (req, res) => {
  const pledge = await Pledge.findById(req.params.id);

  if (pledge) {
    if (
      pledge.user.toString() !== req.user._id.toString() &&
      req.user.role.name !== "Admin"
    ) {
      res.status(401);
      throw new Error("Not authorized to delete this pledge");
    }

    await pledge.remove();
    res.json({ message: "Pledge removed" });
  } else {
    res.status(404);
    throw new Error("Pledge not found");
  }
});

module.exports = { getPledges, createPledge, updatePledge, deletePledge };
