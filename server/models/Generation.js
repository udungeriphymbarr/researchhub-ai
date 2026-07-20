const mongoose = require("mongoose");

const generationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    type: {
      type: String,
      required: true,
    },

    input: {
      type: String,
      required: true,
    },

    output: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Generation", generationSchema);
