const express = require("express");
const router = express.Router();
const {
  getChurches,
  createChurch,
  updateChurch,
  deleteChurch,
} = require("../controllers/churchController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getChurches)
  .post(protect, authorize("Admin"), createChurch);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateChurch)
  .delete(protect, authorize("Admin"), deleteChurch);

module.exports = router;
