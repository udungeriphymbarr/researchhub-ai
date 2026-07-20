const axios = require("axios");

const Product = require("../models/Product");

const Order = require("../models/Order");

const initializePayment = async (req, res) => {
  try {
    const { email } = req.user;

    const amount = 3000 * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",

      {
        email,
        amount,

        metadata: {
          type: "subscription",
        },

        callback_url: "https://researchhub-ai-one.vercel.app/payment-success",
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,
      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    console.log("========== PAYSTACK ERROR ==========");

    console.log(error.response?.data || error.message);

    console.log("===================================");

    res.status(500).json({
      success: false,
      message: "Payment initialization failed.",
    });
  }
};

const User = require("../models/User");

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const payment = response.data.data;

    if (payment.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment failed.",
      });
    }

    const user = await User.findOne({
      email: payment.customer.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.plan = "premium";

    user.subscriptionStatus = "active";

    user.paymentReference = reference;

    user.subscriptionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    user.usageCount = 0;

    await user.save();

    res.json({
      success: true,
      message: "Subscription activated.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        subscriptionStatus: user.subscriptionStatus,
        usageCount: user.usageCount,
      },
    });
  } catch (error) {
    console.log("VERIFY ERROR");
    console.log(error.response?.status);
    console.log(error.response?.data);
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
};

const initializeProductPayment = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = req.user;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product not found.",
      });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",

      {
        email: user.email,

        amount: product.price * 100,

        metadata: {
          type: "product",
          productId: product._id,
          userId: user.id,
        },

        callback_url: "https://researchhub-ai-one.vercel.app/payment-success",
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,

      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,

      message: "Unable to initialize payment.",
    });
  }
};

const verifyProductPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const payment = response.data.data;

    if (payment.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment failed.",
      });
    }

    const { productId, userId } = payment.metadata;

    const product = await Product.findById(productId);

    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({
        success: false,
        message: "User or Product not found.",
      });
    }

    const existingOrder = await Order.findOne({
      paymentReference: reference,
    });

    if (!existingOrder) {
      await Order.create({
        product: product._id,

        user: user._id,

        productTitle: product.title,

        amount: product.price,

        paymentReference: reference,

        status: "paid",
      });
    }

    res.json({
      success: true,

      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,

      message: "Verification failed.",
    });
  }
};

module.exports = {
  initializePayment,
  verifyPayment,

  initializeProductPayment,
  verifyProductPayment,
};
