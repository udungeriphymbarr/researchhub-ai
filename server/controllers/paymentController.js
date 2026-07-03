const axios = require("axios");

const initializePayment = async (req, res) => {
    try {

        const { email } = req.user;

        const amount = 5000 * 100;

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

        const { reference } = req.params;

        const response = await axios.get(

            `https://api.paystack.co/transaction/verify/${reference}`,

            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }

        );

        const payment = response.data.data;

        if (payment.status !== "success") {

            return res.status(400).json({
                success:false,
                message:"Payment failed.",
            });

        }

        const user = await User.findOne({
            email: payment.customer.email,
        });

        if (!user) {

            return res.status(404).json({
                success:false,
                message:"User not found.",
            });

        }

        user.plan = "premium";

        user.subscriptionStatus = "active";

        user.paymentReference = reference;

        user.subscriptionExpires = new Date(
            Date.now() +
            30 * 24 * 60 * 60 * 1000
        );

        user.usageCount = 0;

        await user.save();

        res.json({
            success:true,
            message:"Subscription activated.",
        });

    }

    catch(error){

        console.log(error.response?.data);

        res.status(500).json({
            success:false,
            message:"Verification failed.",
        });

    }

};

module.exports = {
    initializePayment,
    verifyPayment,
};