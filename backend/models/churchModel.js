const mongoose = require("mongoose");

const churchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    // Add other fields as per the design document
  },
  {
    timestamps: true,
  },
);

const Church = mongoose.model("Church", churchSchema);

module.exports = Church;
