const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",

      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    amount: {
      type: Number,

      required: true,
    },

    paymentReference: {
      type: String,

      required: true,
    },

    status: {
      type: String,

      default: "paid",
    },

    productTitle: {
      type: String,

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
