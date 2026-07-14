const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    coverImage: {
      type: String,
      required: true,
    },

    pdfFile: {
      type: String,
      required: true,
    },

    pages: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    sales: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);