const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

await sendEmail(
  user.email,
  "Welcome to ResearchHub AI 🎉🎉",
  `
    <h2>Welcome ${user.name} 🙌</h2>
    <p>Thank you for joining ResearchHub AI.</p>
    <p>Start generating research projects today.</p>
  `
);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
user: {
    id: user._id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    usageCount: user.usageCount,
},
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (
  req,
  res
) => {
  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken =
      crypto.randomBytes(32)
      .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpires =
      Date.now() + 3600000;

    await user.save();

    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Reset Your Password",
      `
      <h2>Password Reset</h2>

      <p>
      Click the button below
      to reset your password.
      </p>

      <a href="${resetLink}">
      Reset Password
      </a>
      `
    );

    res.json({
      success: true,
      message:
        "Password reset email sent",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const resetPassword = async (
  req,
  res
) => {
  try {

    const { token } =
      req.params;

    const { password } =
      req.body;

    const user =
      await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        password,
        salt
      );

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpires =
      undefined;

    await user.save();

    res.json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};