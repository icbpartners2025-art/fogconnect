const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, authorize } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getEvents)
  .post(protect, authorize("Admin"), createEvent);

router
  .route("/:id")
  .put(protect, authorize("Admin"), updateEvent)
  .delete(protect, authorize("Admin"), deleteEvent);

module.exports = router;
