const User = require("../models/User");

const getSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      plan: user.plan,
      usageCount: user.usageCount,
      usageLimit: user.usageLimit,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionExpires: user.subscriptionExpires,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getSubscription,
};