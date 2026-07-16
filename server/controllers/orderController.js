const Order = require("../models/Order");

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id,

        })
        .populate("product")
        .sort({ createdAt: -1 });

        res.json({

            success: true,

            orders,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to fetch library.",

        });

    }

};

module.exports = {

    getMyOrders,

};