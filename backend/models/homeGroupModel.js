const mongoose = require("mongoose");

const homeGroupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const HomeGroup = mongoose.model("HomeGroup", homeGroupSchema);

module.exports = HomeGroup;
