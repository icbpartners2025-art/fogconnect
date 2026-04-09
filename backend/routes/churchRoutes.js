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
  .post(
    protect,
    authorize(
      "Super Admin",
      "Prophet",
      "Bishop",
      "Arch Bishop",
      "Pastor",
      "Admin",
    ),
    createChurch,
  );

router
  .route("/:id")
  .put(
    protect,
    authorize(
      "Super Admin",
      "Prophet",
      "Bishop",
      "Arch Bishop",
      "Pastor",
      "Admin",
    ),
    updateChurch,
  )
  .delete(
    protect,
    authorize(
      "Super Admin",
      "Prophet",
      "Bishop",
      "Arch Bishop",
      "Pastor",
      "Admin",
    ),
    deleteChurch,
  );

module.exports = router;
