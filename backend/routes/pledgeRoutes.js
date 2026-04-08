const express = require("express");
const router = express.Router();
const {
  getPledges,
  createPledge,
  updatePledge,
  deletePledge,
} = require("../controllers/pledgeController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPledges).post(protect, createPledge);
router.route("/:id").put(protect, updatePledge).delete(protect, deletePledge);

module.exports = router;
