const mongoose = require("mongoose");

const provinceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  },
);

const Province = mongoose.model("Province", provinceSchema);

module.exports = Province;
