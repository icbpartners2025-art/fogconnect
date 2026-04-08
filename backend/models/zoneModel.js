const mongoose = require("mongoose");

const zoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    church: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
    },
  },
  {
    timestamps: true,
  },
);

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
