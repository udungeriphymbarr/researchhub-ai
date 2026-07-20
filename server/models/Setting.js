const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    // Branding
    siteName: {
      type: String,
      default: "ResearchHub AI",
    },

    heroTitle: {
      type: String,
      default: "AI Powered Research Platform",
    },

    heroSubtitle: {
      type: String,
      default:
        "Generate Topics, Research Questions, Outlines & Buy Premium Resources.",
    },

    footerText: {
      type: String,
      default: "© ResearchHub AI. All rights reserved.",
    },

    // Contact

    contactEmail: {
      type: String,
      default: "",
    },

    supportEmail: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    // Store

    currency: {
      type: String,
      default: "NGN",
    },

    currencySymbol: {
      type: String,
      default: "₦",
    },

    productsPerPage: {
      type: Number,
      default: 12,
    },

    featuredProductsCount: {
      type: Number,
      default: 6,
    },

    // System

    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Setting", settingSchema);
