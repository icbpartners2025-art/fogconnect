const express = require("express");
const router = express.Router();
const {
  getHomeGroups,
  createHomeGroup,
  updateHomeGroup,
  deleteHomeGroup,
} = require("../controllers/homeGroupController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getHomeGroups)
  .post(protect, authorize("Admin"), createHomeGroup);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateHomeGroup)
  .delete(protect, authorize("Admin"), deleteHomeGroup);

module.exports = router;
