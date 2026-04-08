const express = require("express");
const router = express.Router();
const {
  getZones,
  createZone,
  updateZone,
  deleteZone,
} = require("../controllers/zoneController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getZones)
  .post(protect, authorize("Admin"), createZone);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateZone)
  .delete(protect, authorize("Admin"), deleteZone);

module.exports = router;
