const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },
  },
  {
    timestamps: true,
  },
);

const City = mongoose.model("City", citySchema);

module.exports = City;
