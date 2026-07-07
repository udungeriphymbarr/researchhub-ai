const axios = require("axios");

const initializePayment = async (req, res) => {
    try {

        const { email } = req.user;

        const amount = 100 * 100;

        const response = await axios.post(

            "https://api.paystack.co/transaction/initialize",

 {
    email,
    amount,

    callback_url:
        "https://researchhub-ai-one.vercel.app/payment-success",
},

            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }

        );

        res.json({
            success: true,
            authorization_url:
                response.data.data.authorization_url,
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
    console.log("====== VERIFY PAYMENT START ======");

    const { reference } = req.params;

    console.log("Reference:", reference);

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    console.log("Paystack Response:");
    console.log(response.data);

    const payment = response.data.data;

    console.log("Status:", payment.status);
    console.log("Customer:", payment.customer.email);

    const user = await User.findOne({
      email: payment.customer.email,
    });

    console.log("User:", user);

    if (!user) {
      console.log("USER NOT FOUND");

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.plan = "premium";
    user.subscriptionStatus = "active";
    user.paymentReference = reference;
    user.subscriptionExpires = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
    user.usageCount = 0;

    await user.save();

    console.log("USER UPDATED");

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

    console.log("========== VERIFY ERROR ==========");

    console.log(error.response?.status);

    console.log(error.response?.data);

    console.log(error.message);

    console.log("===============================");

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });

  }
};

module.exports = {
    initializePayment,
    verifyPayment,
};