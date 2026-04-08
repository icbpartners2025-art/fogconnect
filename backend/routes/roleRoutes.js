const express = require("express");
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, authorize("Admin"), getRoles)
  .post(protect, authorize("Admin"), createRole);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateRole)
  .delete(protect, authorize("Admin"), deleteRole);

module.exports = router;
