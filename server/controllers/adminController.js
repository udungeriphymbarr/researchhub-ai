const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {

    // ==========================
    // COUNTS
    // ==========================

    const totalUsers = await User.countDocuments();

    const premiumUsers = await User.countDocuments({
      plan: "premium",
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    // ==========================
    // REVENUE
    // ==========================

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    // ==========================
    // DOWNLOADS
    // ==========================

    const downloadResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$downloads",
          },
        },
      },
    ]);

    const downloads =
      downloadResult.length > 0
        ? downloadResult[0].total
        : 0;

    // ==========================
    // RECENT USERS
    // ==========================

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email plan createdAt");

    // ==========================
    // RECENT ORDERS
    // ==========================

    const recentOrders = await Order.find()
      .populate("user", "name")
      .populate("product", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        users: totalUsers,
        premiumUsers,
        products: totalProducts,
        orders: totalOrders,
        downloads,
        revenue,
      },

      recentUsers,
      recentOrders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard statistics.",
    });

  }
};

module.exports = {
  getDashboardStats,
};