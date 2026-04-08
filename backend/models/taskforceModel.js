const mongoose = require("mongoose");

const taskforceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    church: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Taskforce = mongoose.model("Taskforce", taskforceSchema);

module.exports = Taskforce;
