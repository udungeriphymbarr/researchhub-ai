const User = require("../models/User");

const subscriptionMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Premium users bypass limits
    if (user.plan === "premium") {
      return next();
    }

    // Reset monthly usage
    const now = new Date();
    const lastReset = new Date(user.usageResetDate);

    const days =
      (now - lastReset) / (1000 * 60 * 60 * 24);

    if (days >= 30) {
      user.usageCount = 0;
      user.usageResetDate = now;
      await user.save();
    }

    // Check limit
    if (user.usageCount >= user.usageLimit) {
      return res.status(403).json({
        success: false,
        message:
          "You have reached your monthly AI limit. Upgrade to Premium.",
      });
    }

    next();

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Subscription check failed.",
    });
  }
};

module.exports = subscriptionMiddleware;