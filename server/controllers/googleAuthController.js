const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify Firebase Token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name } = decoded;

    // Find user
    let user = await User.findOne({ email });

    // Create if doesn't exist
    if (!user) {
      const crypto = require("crypto");

      user = await User.create({
        name: name || "Google User",
        email,
        password: crypto.randomBytes(32).toString("hex"),
        isVerified: true,
        plan: "free",
        usageCount: 0,
      });
    }

    // Generate your normal JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
        usageCount: user.usageCount,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  googleLogin,
};
