const asyncHandler = require("express-async-handler");
const Role = require("../models/roleModel");

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private/Admin
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find({});
  res.json(roles);
});

// @desc    Create a role
// @route   POST /api/roles
// @access  Private/Admin
const createRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  const roleExists = await Role.findOne({ name });

  if (roleExists) {
    res.status(400);
    throw new Error("Role already exists");
  }

  const role = await Role.create({
    name,
    permissions,
  });

  if (role) {
    res.status(201).json(role);
  } else {
    res.status(400);
    throw new Error("Invalid role data");
  }
});

// @desc    Update a role
// @route   PUT /api/roles/:id
// @access  Private/Admin
const updateRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  const role = await Role.findById(req.params.id);

  if (role) {
    role.name = name || role.name;
    role.permissions = permissions || role.permissions;

    const updatedRole = await role.save();
    res.json(updatedRole);
  } else {
    res.status(404);
    throw new Error("Role not found");
  }
});

// @desc    Delete a role
// @route   DELETE /api/roles/:id
// @access  Private/Admin
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    await role.remove();
    res.json({ message: "Role removed" });
  } else {
    res.status(404);
    throw new Error("Role not found");
  }
});

module.exports = { getRoles, createRole, updateRole, deleteRole };
