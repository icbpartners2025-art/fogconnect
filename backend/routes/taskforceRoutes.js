const express = require("express");
const router = express.Router();
const {
  getTaskforces,
  createTaskforce,
  updateTaskforce,
  deleteTaskforce,
} = require("../controllers/taskforceController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getTaskforces)
  .post(protect, authorize("Admin"), createTaskforce);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateTaskforce)
  .delete(protect, authorize("Admin"), deleteTaskforce);

module.exports = router;
