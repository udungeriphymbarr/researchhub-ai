const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===========================
    // BASIC INFO
    // ===========================

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    // ===========================
    // PASSWORD RESET
    // ===========================

    resetPasswordToken: String,

    resetPasswordExpires: Date,

    // ===========================
    // SUBSCRIPTION
    // ===========================

    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    subscriptionStatus: {
      type: String,
      enum: ["inactive", "active"],
      default: "inactive",
    },

    subscriptionExpires: {
      type: Date,
      default: null,
    },

    paymentReference: {
      type: String,
      default: "",
    },

    // ===========================
    // AI USAGE
    // ===========================

    usageCount: {
      type: Number,
      default: 0,
    },

    usageLimit: {
      type: Number,
      default: 20,
    },

    usageResetDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);